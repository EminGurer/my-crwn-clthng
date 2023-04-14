import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { useAppDispatch, useAppSelector } from '../../redux-store/redux-hooks';
import {
  selectCartCount,
  selectIsCartOpen,
} from '../../redux-store/cart/cart.selector';
import { setIsCartOpen } from '../../redux-store/cart/cart.slice';

const CartIcon = () => {
  const dispatch = useAppDispatch();
  const isCartOpen = useAppSelector(selectIsCartOpen);
  const cartCount = useAppSelector(selectCartCount);
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
  return (
    <div onClick={toggleIsCartOpen} className='cart-icon-container'>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{cartCount}</span>
    </div>
  );
};

export default CartIcon;
