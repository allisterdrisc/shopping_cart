import { useState } from "react";
import { EditForm } from "./EditForm";

interface Product {
    _id: string;
    title: string;
    quantity: number;
    price: number;
}

interface ProductProps {
  product: Product;
}

export const Product:React.FC<ProductProps> = ({ product }) => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <li className="product">
        <div className="product-details">
          <h3>{product.title}</h3>
          <p className="price">${product.price}</p>
          <p className="quantity">{product.quantity} left in stock</p>
          <div className="actions product-actions">
            <button className="add-to-cart">Add to Cart</button>
            {(!showEdit) && (
              <button className="edit" onClick={() => setShowEdit(true)}>Edit</button>
            )}
            {(showEdit) && (
              <EditForm onCancel={() => setShowEdit(false)} product={product}/>
            )}
          </div>
          <button className="delete-button"><span>X</span></button>
        </div>
      </li>
    </>
  )
}