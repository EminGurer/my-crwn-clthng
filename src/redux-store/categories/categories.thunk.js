import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const categoriesArray = await getCategoriesAndDocuments();
    return categoriesArray;
  }
);
