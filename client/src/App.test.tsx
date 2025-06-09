import App from './App';
import { Product } from './components/Product';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { getProducts, getCartItems, addProduct, updateProduct, deleteProduct, addItemToCart, checkoutCart } from './services';

const mockProducts = [
  {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  },
  {
    _id: "2",
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 0,
    price: 649.99,
  },
  {
    _id: "3",
    title: "Yamaha Portable Keyboard",
    quantity: 2,
    price: 155.99,
  },
];

const mockCart = [
  {
    _id: "a1",
    productId: "1",
    title: "Amazon Kindle E-reader",
    quantity: 1,
    price: 79.99,
  }
];

vi.mock('./services.ts');
const mockedGetProducts = vi.mocked(getProducts, true);
const mockedGetCartItems = vi.mocked(getCartItems, true);
const mockedAddProduct = vi.mocked(addProduct, true);
const mockedUpdateProduct = vi.mocked(updateProduct, true);
const mockedDeleteProduct = vi.mocked(deleteProduct, true);
const mockedAddItemToCart = vi.mocked(addItemToCart, true);
const mockedCheckoutCart = vi.mocked(checkoutCart, true);

it('displays The Shop! heading', async () => {
  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCartItems.mockResolvedValue(mockCart);

  render(<App />);
  const title = await screen.findByRole('heading', { name: 'The Shop!' });
  expect(title).toBeInTheDocument();
});

it('shows the add product button before the form opens', async () => {
  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCartItems.mockResolvedValue(mockCart);
  render(<App />);
  const addButton = await screen.findByRole('button', {name: 'Add New Product'});
  const addForm = screen.queryByRole('form', {name: 'Add Product Form'});
  expect(addButton).toBeInTheDocument();
  expect(addForm).not.toBeInTheDocument();
});

it('shows the add form after add button is clicked', async () => {
  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCartItems.mockResolvedValue(mockCart);
  render(<App />);
  const addButton = await screen.findByRole('button', {name: 'Add New Product'});
  await userEvent.click(addButton);
  const addForm = await screen.findByRole('form', {name: 'Add Product Form'});
  expect(addForm).toBeInTheDocument();
  expect(addButton).not.toBeInTheDocument();
});

it('closes the form and new product appears when add new product form is submitted', async () => {
  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCartItems.mockResolvedValue(mockCart);
  mockedAddProduct.mockResolvedValue({
    _id: "4",
    title: "Tinker, Tailor, Soldier, Spy - A John le Carre Novel",
    quantity: 12,
    price: 13.74,
  });
  render(<App />);
  // open the form
  const addButton = await screen.findByRole('button', {name: 'Add New Product'});
  await userEvent.click(addButton);
  const addForm = await screen.findByRole('form', {name: 'Add Product Form'});
  // fill out the form
  await userEvent.type(screen.getByLabelText(/product name/i), "Tinker, Tailor, Soldier, Spy - A John le Carre Novel");
  await userEvent.type(screen.getByLabelText(/quantity/i), "12");
  await userEvent.type(screen.getByLabelText(/price/i), "13.74");
  // submit the form
  const sumbitButton = screen.getByRole('button', {name: 'Add'});
  await userEvent.click(sumbitButton);

  // New product should appear and form should go away
  const newProduct = await screen.findByRole('heading', {name: /Tinker, Tailor, Soldier, Spy - A John le Carre Novel/i});
  expect(newProduct).toBeInTheDocument();
  expect(addForm).not.toBeInTheDocument();
});

it('shows the edit button before edit form is shown', async () => {
  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCartItems.mockResolvedValue(mockCart);
  render(<Product product={mockProducts[0]} onUpdateProduct={vi.fn()} onDeleteProduct={vi.fn()} onAddToCart={vi.fn()} />);
  const editButton = await screen.findByRole('button', {name: 'Edit'});
  const editForm = screen.queryByRole('form', {name: 'Edit Product Form'});
  expect(editButton).toBeInTheDocument();
  expect(editForm).not.toBeInTheDocument();
});

it('shows the edit form after edit button is clicked', async () => {
  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCartItems.mockResolvedValue(mockCart);
  render(<Product product={mockProducts[0]} onUpdateProduct={vi.fn()} onDeleteProduct={vi.fn()} onAddToCart={vi.fn()} />);
  const editButton = await screen.findByRole('button', {name: 'Edit'});
  await userEvent.click(editButton);
  const editForm = await screen.findByRole('form', {name: 'Edit Product Form'});
  expect(editForm).toBeInTheDocument();
  expect(editButton).not.toBeInTheDocument();
});

it('updates product and closes the edit form when submitted', async () => {
  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCartItems.mockResolvedValue(mockCart);
  mockedUpdateProduct.mockResolvedValue({
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 89.99, // updated price
  });

  render(<App />);
  // Wait for the product to appear
  const productHeading = await screen.findByRole('heading', { name: /amazon kindle e-reader/i });
  expect(productHeading).toBeInTheDocument();
  // Click edit button 
  const editButton = screen.getAllByRole('button', { name: 'Edit' })[0];
  await userEvent.click(editButton);
  // Wait for the form to appear
  const editForm = await screen.findByRole('form', { name: 'Edit Product Form' });
  // Enter updated inputs for product and submit
  const priceInput = screen.getByLabelText(/price/i);
  await userEvent.clear(priceInput);
  await userEvent.type(priceInput, "89.99");
  const submitButton = screen.getByRole('button', { name: 'Submit Changes' });
  await userEvent.click(submitButton);
  // Edit form disappears and edit button reappears
  expect(editForm).not.toBeInTheDocument();
  const reappearedEditButton = screen.getAllByRole('button', { name: 'Edit' })[0];
  expect(reappearedEditButton).toBeInTheDocument();
  // Updated price of product is shown
  const updatedPrice = screen.getByText(/\$89\.99/);
  expect(updatedPrice).toBeInTheDocument();
});

it('removes a product when deleted', async () => {
  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCartItems.mockResolvedValue(mockCart);
  mockedDeleteProduct.mockResolvedValue(undefined);
  render(<App />);
  // product is displayed before being deleted
  const kindle = await screen.findByRole('heading', {name: 'Amazon Kindle E-reader'});
  expect(kindle).toBeInTheDocument();
  const deleteButton = screen.getAllByRole('button', {name: 'X'})[0];
  expect(deleteButton).toBeInTheDocument();
  // Click delete button
  await userEvent.click(deleteButton);
  expect(kindle).not.toBeInTheDocument();
});

it('removes items from the cart when checking out', async () => {
  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCartItems.mockResolvedValue(mockCart);
  mockedCheckoutCart.mockResolvedValue(null);
  render(<App />);
  // cart item is displayed
  const cartItem = await screen.findByRole('cell', {name: 'Amazon Kindle E-reader'});
  expect(cartItem).toBeInTheDocument();
  // Click checkout button
  const checkoutButton = screen.getByRole('button', {name: 'Checkout'});
  await userEvent.click(checkoutButton);
  expect(cartItem).not.toBeInTheDocument();
});

it('adds a item to the cart when add product is clicked', async () => {
  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCartItems.mockResolvedValue(mockCart);
  mockedAddItemToCart.mockResolvedValue({
    product: {
      _id: "1",
      title: "Amazon Kindle E-reader",
      quantity: 5,
      price: 79.99,
    },
    item: {
      _id: "2",
      title: "Amazon Kindle E-reader",
      quantity: 1,
      price: 79.99,
      productId: "1",
    }});
  render(<App />);
  // Check that a product has appeared in the list
  const product = await screen.findByRole('heading', { name: 'Amazon Kindle E-reader'});
  expect(product).toBeInTheDocument();
  // Click the 'Add to Cart' button for a product
  const addToCartButton = screen.getAllByRole('button', { name: 'Add to Cart' })[0];
  await userEvent.click(addToCartButton);
  // The cart shows the new item
  const cartItem = await screen.findByRole('cell', { name: 'Amazon Kindle E-reader'});
  expect(cartItem).toBeInTheDocument();
});

