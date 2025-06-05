interface Product {
    _id: string;
    title: string;
    quantity: number;
    price: number;
}

interface EditFormProps {
  onCancel: () => void;
  product: Product;
}

export const EditForm:React.FC<EditFormProps> = ({ onCancel, product }) => {
  return (
    <>
        <form>
          <div className="input-group">
            <label htmlFor="product-name">Product Name:</label>
            <input
              type="text"
              id="product-name"
              name="product-name"
              required
              defaultValue={product.title}
              
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
              defaultValue={product.price}
              
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
              defaultValue={product.quantity}
              
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