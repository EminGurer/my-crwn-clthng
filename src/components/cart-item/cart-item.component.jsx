import './cart-item.styles.scss';
import {
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart,
} from '../../redux-store/cart/cart.slice';
import { useDispatch } from 'react-redux';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { name, imageUrl, price, quantity } = item;

  return (
    <div className='cart-item-container'>
      <img src={imageUrl} alt={name} />
      <div className='item-details'>
        <span className='name'>{name}</span>
        <span className='price'>
          {price}$ x {quantity}
        </span>
      </div>
      <div className='item-buttons'>
        <button onClick={() => dispatch(addItemToCart(item))}>+</button>
        <button onClick={() => dispatch(removeItemFromCart(item))}>-</button>
        <button onClick={() => dispatch(deleteItemFromCart(item))}>x</button>
      </div>
    </div>
  );
};

export default CartItem;
