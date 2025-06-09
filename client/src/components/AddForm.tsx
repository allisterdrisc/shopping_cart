import { useState } from 'react';
import type { NewProduct } from '../types';

interface AddFormProps {
  onCancel: () => void;
  onAddProduct: (product: NewProduct) => void;
  onToggle: (formState: boolean) => void;
}

export const AddForm:React.FC<AddFormProps> = ({ onCancel, onAddProduct, onToggle }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
  
    const newProduct = {
      title: title,
      price: Number(price),
      quantity: Number(quantity),
    }

    onAddProduct(newProduct);

    setTitle('');
    setPrice('');
    setQuantity('');
    onToggle(false);
  }

  return (
    <>
        <form onSubmit={handleSubmit} aria-label="Add Product Form">
          <div className="input-group">
            <label htmlFor="product-name">Product Name:</label>
            <input
              type="text"
              id="product-name"
              name="product-name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="product-price">Price:</label>
            <input
              type="number"
              id="product-price"
              name="product-price"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="product-quantity">Quantity:</label>
            <input
              type="number"
              id="product-quantity"
              name="product-quantity"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="actions form-actions">
            <button type="submit">Add</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
    </>
  )
}