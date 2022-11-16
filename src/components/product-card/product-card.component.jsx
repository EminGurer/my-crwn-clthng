import Button from '../button/button.component';
import './product-card.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
const ProductCard = ({ product }) => {
  const { imageUrl, name, price } = product;
  const { addItemToCart } = useContext(CartContext);

  const addToCartHandler = () => {
    addItemToCart(product);
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
