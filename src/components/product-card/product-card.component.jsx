import Button from '../button/button.component';
import './product-card.styles.scss';
import { addItemToCart } from '../../redux-store/cart/cart.slice';
import { useDispatch } from 'react-redux';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { imageUrl, name, price } = product;

  const addToCartHandler = () => {
    dispatch(addItemToCart(product));
  };
  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={name} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button onClick={addToCartHandler} buttonType='inverted'>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
