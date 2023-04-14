import { useParams } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss';
import { useAppSelector } from '../../redux-store/redux-hooks';
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../../redux-store/categories/categories.selector';

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useAppSelector(selectCategoriesMap);
  const isLoading = useAppSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  return (
    <Fragment>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <Fragment>
          <h2 className='category-title'>{category.toUpperCase()}</h2>
          <div className='category-container'>
            {products &&
              products.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Category;
