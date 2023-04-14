import { Fragment } from 'react';
import { useAppSelector } from '../../redux-store/redux-hooks';

import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../../redux-store/categories/categories.selector';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
  const categoriesMap = useAppSelector(selectCategoriesMap);
  const isLoading = useAppSelector(selectCategoriesIsLoading);
  return (
    <Fragment>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
