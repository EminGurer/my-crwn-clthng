import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    fetchCategoriesStart(state, action) {
      state.isLoading = true;
    },
    fetchCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.categories = action.payload;
    },
    fetchCategoriesFail(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFail,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
