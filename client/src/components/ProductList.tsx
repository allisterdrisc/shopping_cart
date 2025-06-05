import { Product } from "./Product";
import type { Product as ProductType, NewProduct } from '../types';

interface ProductListProps {
  products: ProductType[];
  onUpdateProduct: (id: string, updatedProduct: NewProduct) => void;
  onDeleteProduct: (id: string) => void;
  onAddToCart: (id: string) => void;
}

export const ProductList:React.FC<ProductListProps> = ({ products, onUpdateProduct, onDeleteProduct, onAddToCart }) => {
  return (
    <>
    <div className="product-listing">
        <h2>Products</h2>
        <ul className="product-list">
          {products.map((product) => (
            <Product product={product} key={product._id} onUpdateProduct={onUpdateProduct} onDeleteProduct={onDeleteProduct} onAddToCart={onAddToCart}/>
          ))}
        </ul>
      </div>
    </>
  )
}