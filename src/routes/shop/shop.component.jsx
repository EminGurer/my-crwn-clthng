import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../../components/categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { fetchCategories } from '../../redux-store/categories/categories.thunk';

import './shop.styles.scss';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
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
