import userReducer from './user/user.slice';
import categoriesReducer from './categories/categories.slice';
import cartReducer from './cart/cart.slice';

export const rootReducer = {
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
};
