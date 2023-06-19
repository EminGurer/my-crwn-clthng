import {
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart,
} from '../../redux-store/cart/cart.slice';
import { useDispatch } from 'react-redux';
import {
  CartItemContainer,
  ItemButtons,
  ItemDetails,
} from './cart-item.styles.tsx';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { name, imageUrl, price, quantity } = item;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <span className='name'>{name}</span>
        <span className='price'>
          {price}$ x {quantity}
        </span>
      </ItemDetails>
      <ItemButtons>
        <button onClick={() => dispatch(addItemToCart(item))}>+</button>
        <button onClick={() => dispatch(removeItemFromCart(item))}>-</button>
        <button onClick={() => dispatch(deleteItemFromCart(item))}>x</button>
      </ItemButtons>
    </CartItemContainer>
  );
};

export default CartItem;
