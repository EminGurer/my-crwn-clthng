import './checkout.styles.scss';
import CartItem from '../../components/cart-item/cart-item.component';
import { useSelector } from 'react-redux';
import {
  selectCartAmount,
  selectCartItems,
} from '../../redux-store/cart/cart.selector';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartAmount = useSelector(selectCartAmount);
  return (
    <div className='checkout-container'>
      <h2>Checkout items</h2>
      <div className='checkout-items'>
        {cartItems.map((cartItem) => {
          return <CartItem key={cartItem.id} item={cartItem} />;
        })}
      </div>
      <div className='checkout-info'>
        <h2>{cartAmount}$ in total</h2>
      </div>
    </div>
  );
};

export default Checkout;
