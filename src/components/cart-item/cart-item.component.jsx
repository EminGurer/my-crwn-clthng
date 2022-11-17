import './cart-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartItem = ({ item }) => {
  const { removeItemFromCart, addItemToCart, deleteItemFromCart } =
    useContext(CartContext);
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
        <button onClick={() => addItemToCart(item)}>+</button>
        <button onClick={() => removeItemFromCart(item)}>-</button>
        <button onClick={() => deleteItemFromCart(item)}>x</button>
      </div>
    </div>
  );
};

export default CartItem;
