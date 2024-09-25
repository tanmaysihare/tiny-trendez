import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart, setCart, removeFromCart, updateCartQuantity }) => {

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
          setCart(savedCart);
        }
      }, [setCart]);
      
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
      }, [cart]);
      
  const handleQuantityChange = (productId, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity > 0) {
      updateCartQuantity(productId, newQuantity);
    }
  };

  if (cart.length === 0) {
    return <p>This Feature is not available, Coming soon... but you can place your order on whatsapp: +91 7000917851 "just say hi"</p>;
  }

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>Price: ${item.price}</p>
            <p>
              Quantity: 
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e)}
                min="1"
              />
            </p>
            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <Link to="/">Continue Shopping</Link>
    </div>
  );
};

export default Cart;
