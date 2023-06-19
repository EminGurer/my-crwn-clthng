import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from './directory-item.styles.tsx';
import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({ category }) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate('./shop/' + title);
  };
  const { title, imageUrl } = category;
  return (
    <DirectoryItemContainer onClick={clickHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
