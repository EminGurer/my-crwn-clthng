import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../../components/categories-preview/categories-preview.component';
import Category from '../category/category.component';
import './shop.styles.scss';
import { fetchCategoriesStart } from '../../redux-store/categories/categories.slice';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
    //eslint-disable-next-line
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;
