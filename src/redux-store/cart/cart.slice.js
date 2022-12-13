import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCartOpen: false,
  cartItems: [],
};

const helper = (cartItems, item, operation) => {
  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
  if (operation === 'increment') {
    if (existingItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
    return [...cartItems, { ...item, quantity: 1 }];
  }
  if (operation === 'decrement') {
    if (existingItem.quantity === 1) {
      return cartItems.filter((item) => item.id !== existingItem.id);
    }
    return cartItems.map((cartItem) =>
      cartItem.id === item.id && item.quantity !== 1
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload;
    },
    addItemToCart(state, action) {
      state.cartItems = helper(state.cartItems, action.payload, 'increment');
    },
    removeItemFromCart(state, action) {
      state.cartItems = helper(state.cartItems, action.payload, 'decrement');
    },
    deleteItemFromCart(state, action) {
      const newCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = newCartItems;
    },
  },
});

export const {
  setIsCartOpen,
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
