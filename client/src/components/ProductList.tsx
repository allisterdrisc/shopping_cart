import { Product } from "./Product";

interface Product {
    _id: string;
    title: string;
    quantity: number;
    price: number;
}

interface ProductListProps {
  products: Product[];
}

export const ProductList:React.FC<ProductListProps> = ({ products }) => {
  return (
    <>
    <div className="product-listing">
        <h2>Products</h2>
        <ul className="product-list">
          {products.map((product) => (
            <Product product={product} key={product._id}/>
          ))}
        </ul>
      </div>
    </>
  )
}