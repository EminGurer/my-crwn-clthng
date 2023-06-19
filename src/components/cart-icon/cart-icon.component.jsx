import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartCount,
  selectIsCartOpen,
} from '../../redux-store/cart/cart.selector';
import { setIsCartOpen } from '../../redux-store/cart/cart.slice';
import {
  CartIconContainer,
  ItemCount,
  ShoppingIcon,
} from './cart-icon.styles.tsx';

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
  return (
    <CartIconContainer
      onClick={toggleIsCartOpen}
      className='cart-icon-container'
    >
      <ShoppingIcon className='shopping-icon' />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
