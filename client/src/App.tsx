import { useState, useEffect, useReducer } from 'react'
import { AddForm } from "./components/AddForm";
import { AddProductButton } from "./components/AddProductButton";
import { Cart } from "./components/Cart";
import { ProductList } from "./components/ProductList";
import { SortButton } from './components/SortButton';
import { ThemeButton } from './components/ThemeButton';
import { CurrencyButton } from './components/CurrencyButton';
import type { Product, Item, NewProduct } from "./types";
import { addItemToCart, addProduct, checkoutCart, deleteProduct, getCartItems, getProducts, updateProduct } from './services';

interface FetchAction {
  type: 'FETCH_PRODUCTS';
  products: Product[];
}

interface AddAction {
  type: 'ADD_PRODUCT';
  newProduct: Product;
}

interface UpdateAction {
  type: 'UPDATE_PRODUCT';
  id: string;
  updatedProduct: Product;
}

interface DeleteAction {
  type: 'DELETE_PRODUCT';
  id: string;
}

interface SortProductsByStr {
  type: 'SORT_PRODUCTS_STR';
  sortBy: 'title';
  direction: 'ascending' | 'descending';
}

interface SortProductsByNum {
  type: 'SORT_PRODUCTS_NUM';
  sortBy: 'price' | 'quantity';
  direction: 'ascending' | 'descending';
}

type ProductAction = FetchAction | AddAction | UpdateAction | DeleteAction | SortProductsByStr | SortProductsByNum;

function productReducer(products: Product[], action: ProductAction) {
  switch (action.type) {
    case 'FETCH_PRODUCTS': {
      return action.products;
    }
    case 'ADD_PRODUCT': {
      return products.concat(action.newProduct);
    }
    case 'UPDATE_PRODUCT': {
      return products.map((product) => {
        if (product._id === action.id) {
          return action.updatedProduct;
        } else {
          return product;
        }
      });
    }
    case 'DELETE_PRODUCT': {
      return products.filter((product) => product._id !== action.id)
    }
    case 'SORT_PRODUCTS_STR': {
      const sortByProp = action.sortBy;
      if (!sortByProp) return products;
      if (action.direction === 'ascending') {
        return products.slice().sort((a, b) => {
          if (a[sortByProp].toLowerCase() < b[sortByProp].toLowerCase()) {
            return -1;
          } else if (a[sortByProp].toLowerCase() > b[sortByProp].toLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        });
      } else {
        return products.slice().sort((b, a) => {
          if (a[sortByProp].toLowerCase() < b[sortByProp].toLowerCase()) {
            return -1;
          } else if (a[sortByProp].toLowerCase() > b[sortByProp].toLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        });
      }
    }
    case 'SORT_PRODUCTS_NUM': {
      const sortByProp = action.sortBy;
      if (!sortByProp) return products;
      if (action.direction === 'ascending') {
        return products.slice().sort((a, b) => {
          if (a[sortByProp] < b[sortByProp]) {
            return -1;
          } else if (a[sortByProp] > b[sortByProp]) {
            return 1;
          } else {
            return 0;
          }
        });
      } else {
        return products.slice().sort((b, a) => {
          if (a[sortByProp] < b[sortByProp]) {
            return -1;
          } else if (a[sortByProp] > b[sortByProp]) {
            return 1;
          } else {
            return 0;
          }
        });
      }
    }
  }
}

interface FetchItemsAction {
  type: 'FETCH_ITEMS',
  items: Item[]
}

interface AddToCartAction {
  type: 'ADD_TO_CART',
  item: Item,
  productId: string,
  existingItem: Item | undefined
}

interface CheckoutCartAction {
  type: 'CHECKOUT_CART',
}

type ItemAction = FetchItemsAction | AddToCartAction | CheckoutCartAction;

function itemReducer(items: Item[], action: ItemAction) {
  switch (action.type) {
    case 'FETCH_ITEMS': {
      return action.items;
    }
    case 'ADD_TO_CART': {
      if (action.existingItem) {
        return items.map((item) => {
          if (item.productId === action.productId) {
            return action.item;
          } else {
            return item;
          }
        });
      } else {
        return items.concat(action.item)
      }
    }
    case 'CHECKOUT_CART': {
      return [];
    }
  }
}

const App = () => {
  const [products, productsDispatch] = useReducer(productReducer, []);
  const [items, itemsDispatch] = useReducer(itemReducer, []);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        productsDispatch({
          type: 'FETCH_PRODUCTS',
          products: products,
        })
      } catch (e) {
        console.error(e);
      }
    };

    const fetchCartItems = async () => {
      try {
        const items = await getCartItems();
        itemsDispatch({
          type: 'FETCH_ITEMS',
          items: items
        });
      } catch (e) {
        console.error(e);
      }
    }

    fetchProducts();
    fetchCartItems();
  }, []);

  const handleToggleForm = (formState: boolean) => {
    setIsFormVisible(formState);
  };

  const handleAddProduct = async (newProduct: NewProduct) => {
    try {
      const newProductData = await addProduct(newProduct);
      productsDispatch({
        type: 'ADD_PRODUCT',
        newProduct: newProductData
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateProduct = async (productId: string, updatedProduct: NewProduct) => {
    try {
      const updatedProductData = await updateProduct(productId, updatedProduct);
      productsDispatch({
        type: 'UPDATE_PRODUCT',
        id: productId,
        updatedProduct: updatedProductData,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      productsDispatch({
        type: 'DELETE_PRODUCT',
        id: productId,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSortProducts = (sortBy: 'title' | 'price' | 'quantity', clickedCount: number) => {
    const direction = (clickedCount % 2 === 0) ? 'ascending' : 'descending';
    if (sortBy === 'title') {
      productsDispatch({type: 'SORT_PRODUCTS_STR', sortBy: sortBy, direction: direction})
    } else {
      productsDispatch({type: 'SORT_PRODUCTS_NUM', sortBy: sortBy, direction: direction})
    }
  }

  const handleAddToCart = async (productId: string) => {
    const product = products.find((product) => product._id === productId);
    const existingItem = items.find((item) => item.productId === productId);
    // check if product exists and has 1 or more in stock
    if (!product || product.quantity === 0) return;

    try {
      const {product: updatedProduct, item} = await addItemToCart(productId);

      productsDispatch({
        type: 'UPDATE_PRODUCT',
        id: productId,
        updatedProduct: updatedProduct
      });

      itemsDispatch({
        type: 'ADD_TO_CART',
        item: item,
        productId: productId,
        existingItem: existingItem
      });
    } catch (e) {
      console.error(e);
    }
  }

  const handleCheckout = async () => {
    try {
      await checkoutCart();
      itemsDispatch({
        type: 'CHECKOUT_CART',
      })
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div id="app">
        <header>
          <h1>The Shop!</h1>
          <Cart items={items} onCheckout={handleCheckout}/>
        </header>

        <main>
          <ThemeButton />
          <CurrencyButton />
          <div>
            <h4>Sort by:</h4>
            <SortButton sortBy='title' onClick={handleSortProducts} />
            <SortButton sortBy='price' onClick={handleSortProducts} />
            <SortButton sortBy='quantity' onClick={handleSortProducts} />
          </div>
          <ProductList products={products} onUpdateProduct={handleUpdateProduct} onDeleteProduct={handleDeleteProduct} onAddToCart={handleAddToCart}/>
          {!isFormVisible && <AddProductButton handleAddClick={() => setIsFormVisible(true)} />}
          {isFormVisible && (
            <AddForm
              onCancel={() => setIsFormVisible(false)}
              onAddProduct={handleAddProduct}
              onToggle={handleToggleForm}
            />
          )}
        </main>
      </div>
    </>
  )
}

export default App
