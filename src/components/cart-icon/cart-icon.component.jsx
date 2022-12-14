import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartCount,
  selectIsCartOpen,
} from '../../redux-store/cart/cart.selector';
import { setIsCartOpen } from '../../redux-store/cart/cart.slice';

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
  return (
    <div onClick={toggleIsCartOpen} className='cart-icon-container'>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{cartCount}</span>
    </div>
  );
};

export default CartIcon;
