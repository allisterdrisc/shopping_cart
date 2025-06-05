import { useState, useEffect } from 'react'
import { AddForm } from "./components/AddForm";
import { AddProductButton } from "./components/AddProductButton";
import { Cart } from "./components/Cart";
import { ProductList } from "./components/ProductList";
import type { Product, Item } from "./types";
import { getProducts, getCartItems, checkoutCart } from './services';

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

    fetchProducts();
  }, [])

  return (
    <>
      <div id="app">
        <header>
          <h1>The Shop!</h1>
          <Cart items={items} cartTotal={cartTotal}/>
        </header>

        <main>
          <ProductList products={products}/>
          <div className={`add-form ${showForm ? "visible" : ""}`}>
            <AddProductButton handleAddClick={() => setShowForm(true)} />
            <AddForm onCancel={() => setShowForm(false)} />
          </div>
        </main>
      </div>
    </>
  )
}

export default App
