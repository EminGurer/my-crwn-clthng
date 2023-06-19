import Button from '../button/button.component';
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from './cart-dropdown.styles.tsx';
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
    <CartDropdownContainer>
      <CartItems className='cart-items'>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutPage}>Checkout</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
