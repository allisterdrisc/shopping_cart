import { useState, useEffect } from 'react';
import type { Product, NewProduct } from '../types';

interface EditFormProps {
  onCancel: () => void;
  product: Product;
  onUpdateProduct: (id: string, updatedProduct: NewProduct) => void;
  onToggle: (formState: boolean) => void;
}

export const EditForm:React.FC<EditFormProps> = ({ onCancel, product, onUpdateProduct, onToggle }) => {
  const [title, setTitle] = useState(product.title || '');
  const [price, setPrice] = useState<string | undefined>(String(product.price)) || undefined;
  const [quantity, setQuantity] = useState<string | undefined>(String(product.quantity)) || undefined;

  useEffect(() => {
    setQuantity(String(product.quantity))
  }, [product.quantity, setQuantity]);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
  

    const updatedProduct = {
      title: title,
      price: Number(price),
      quantity: Number(quantity),
    }

    onUpdateProduct(product._id, updatedProduct);
    
    onToggle(false);
  }

  return (
    <>
        <form onSubmit={handleSubmit} aria-label="Edit Product Form">
          <div className="input-group">
            <label htmlFor="product-name">Product Name:</label>
            <input
              type="text"
              id="product-name"
              name="product-name"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              
            />
          </div>
          <div className="input-group">
            <label htmlFor="product-quantity">Quantity:</label>
            <input
              type="number"
              id="product-quantity"
              name="product-quantity"
              min="0"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              
            />
          </div>
          <div className="actions form-actions">
            <button type="submit">Submit Changes</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
    </>
  );
}