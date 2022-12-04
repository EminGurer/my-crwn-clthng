import userReducer from './user/user.slice';
import categoriesReducer from './categories/categories.slice';

export const rootReducer = {
  user: userReducer,
  categories: categoriesReducer,
};
