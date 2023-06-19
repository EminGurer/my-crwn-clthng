import Button from '../button/button.component';
import { ProductCardContainer, Footer } from './product-card.styles.tsx';
import { addItemToCart } from '../../redux-store/cart/cart.slice';
import { useDispatch } from 'react-redux';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { imageUrl, name, price } = product;

  const addToCartHandler = () => {
    dispatch(addItemToCart(product));
  };
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name} />
      <Footer>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </Footer>
      <Button onClick={addToCartHandler} buttonType='inverted'>
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
