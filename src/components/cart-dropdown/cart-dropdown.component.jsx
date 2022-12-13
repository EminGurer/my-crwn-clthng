import Button from '../button/button.component';
import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import { setIsCartOpen } from '../../redux-store/cart/cart.slice';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectIsCartOpen,
} from '../../redux-store/cart/cart.selector';

const CartDropdown = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutPage = () => {
    navigate('/checkout');
    if (isCartOpen) dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <Button onClick={goToCheckoutPage}>Checkout</Button>
    </div>
  );
};

export default CartDropdown;
