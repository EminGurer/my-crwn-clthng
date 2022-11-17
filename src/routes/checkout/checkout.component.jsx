import './checkout.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../../components/cart-item/cart-item.component';

const Checkout = () => {
  const { cartItems, cartTotalAmount } = useContext(CartContext);
  return (
    <div className='checkout-container'>
      <h2>Checkout items</h2>
      <div className='checkout-items'>
        {cartItems.map((cartItem) => {
          return <CartItem key={cartItem.id} item={cartItem} />;
        })}
      </div>
      <div className='checkout-info'>
        <h2>{cartTotalAmount}$ in total</h2>
      </div>
    </div>
  );
};

export default Checkout;
