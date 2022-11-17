import Button from '../button/button.component';
import './cart-dropdown.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
  const navigate = useNavigate();
  const { cartItems, isCartOpen, setIsCartOpen } = useContext(CartContext);

  const goToCheckoutPage = () => {
    navigate('/checkout');
    if (isCartOpen) setIsCartOpen(!isCartOpen);
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
