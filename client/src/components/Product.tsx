import { useState } from "react";
import { EditForm } from "./EditForm";
import type { Product as ProductType, NewProduct } from "../types";
import { useContext } from "react";
import { CurrencyContext } from "../CurrencyContext";

interface ProductProps {
  product: ProductType;
  onUpdateProduct: (id: string, updatedProduct: NewProduct) => void;
  onDeleteProduct: (id: string) => void;
  onAddToCart: (id: string) => void;
}

export const Product:React.FC<ProductProps> = ({ product, onUpdateProduct, onDeleteProduct, onAddToCart }) => {
  const [showEdit, setShowEdit] = useState(false);
  const { currency, rates } = useContext(CurrencyContext);
  const currencySymbol = currency === 'USD' ? '$' : '£'
  const handleToggleEditForm = (formState: boolean) => {
    setShowEdit(formState);
  }

  return (
    <>
      <li className="product">
        <div className="product-details">
          <h3>{product.title}</h3>
          <p className="price">{currencySymbol}{(product.price * rates[currency]).toFixed(2)}</p>
          <p className="quantity">{product.quantity} left in stock</p>
          <div className="actions product-actions">
            <button className="add-to-cart" onClick={() => onAddToCart(product._id)}>Add to Cart</button>
            {(!showEdit) && (
              <button className="edit" onClick={() => setShowEdit(true)}>Edit</button>
            )}
            {(showEdit) && (
              <EditForm onCancel={() => setShowEdit(false)} product={product} onUpdateProduct={onUpdateProduct} onToggle={handleToggleEditForm} />
            )}
          </div>
          <button className="delete-button" onClick={() => onDeleteProduct(product._id)}><span>X</span></button>
        </div>
      </li>
    </>
  )
}
