interface Product {
    _id: string;
    title: string;
    quantity: number;
    price: number;
}

interface Item extends Product {
    productId: string;
}

interface CartProps {
  items: Item[];
  onCheckout: () => void;
}

export const Cart:React.FC<CartProps> = ({ items, onCheckout }) => {
  let cartTotal = 0;

  items.forEach(item => (
    cartTotal += (item.price * item.quantity)
  ));

  if (!items) {
    return (
      <div className="cart">
        <h2>Your Cart</h2>
        <p>Your cart is empty</p>
        <p>Total: $0</p>
        <button className="checkout" disabled>Checkout</button>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <table className="cart-items">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: Item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="total">Total: ${cartTotal.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <div className="checkout-button">
        <button className="checkout" onClick={onCheckout}>Checkout</button>
      </div>
    </div>
  )
}
