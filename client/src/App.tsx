import { useState, useEffect } from 'react'
import { AddForm } from "./components/AddForm";
import { AddProductButton } from "./components/AddProductButton";
import { Cart } from "./components/Cart";
import { ProductList } from "./components/ProductList";
import type { Product, Item, NewProduct } from "./types";
import { addItemToCart, addProduct, deleteProduct, getCartItems, getProducts, updateProduct } from './services';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  
  let cartTotal = 0;

  items.forEach(item => (
    cartTotal += (item.price * item.quantity)
  ));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchCartItems = async () => {
      try {
        const items = await getCartItems();
        setItems(items);
      } catch (e) {
        console.error(e);
      }
    }

    fetchProducts();
    fetchCartItems();
  }, []);

  const handleToggleForm = (formState: boolean) => {
    setShowForm(formState);
  }

  const handleAddProduct = async (newProduct: NewProduct) => {
    try {
      const newProductData = await addProduct(newProduct);
      setProducts((prev) => prev.concat(newProductData));
    } catch (e) {
      console.error(e);
    }
  }

  const handleUpdateProduct = async (productId: string, updatedProduct: NewProduct) => {
    try {
      const updatedProductData = await updateProduct(productId, updatedProduct);
      setProducts((prev) => {
        return prev.map((product) => {
          if (product._id === updatedProductData._id) {
            return updatedProductData;
          } else {
            return product;
          }
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      setProducts((prev) => {
        return prev.filter((product) => product._id !== productId)
      });
    } catch (e) {
      console.error(e);
    }
  }

  const handleAddToCart = async (productId: string) => {
    try {
      const newItem = await addItemToCart(productId);
      setItems((prev) => prev.concat(newItem.item));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <div id="app">
        <header>
          <h1>The Shop!</h1>
          <Cart items={items} cartTotal={cartTotal}/>
        </header>

        <main>
          <ProductList products={products} onUpdateProduct={handleUpdateProduct} onDeleteProduct={handleDeleteProduct} onAddToCart={handleAddToCart}/>
          <div className={`add-form ${showForm ? "visible" : ""}`}>
            <AddProductButton handleAddClick={() => setShowForm(true)} />
            <AddForm onCancel={() => setShowForm(false)} onAddProduct={handleAddProduct} onToggle={handleToggleForm} />
          </div>
        </main>
      </div>
    </>
  )
}

export default App
