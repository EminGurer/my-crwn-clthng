import { createContext, useReducer } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  cartItems: [],
  count: 0,
  cartAmount: 0,
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  decrementItemQuantity: () => {},
  removeItemFromCart: () => {},
});
const CART_ACTION_TYPES = {
  TOGGLE_CART: 'TOGGLE_CART',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
};
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  count: 0,
  cartAmount: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.TOGGLE_CART:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Undefined type for cart reducer type: ${type}`);
  }
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

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, count, cartAmount }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );
  const updateCartItems = (newCartItems) => {
    const newCount = newCartItems.reduce((acc, item) => acc + item.quantity, 0);
    const newCartAmount = newCartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        count: newCount,
        cartAmount: newCartAmount,
      },
    });
  };
  const setIsCartOpen = () => {
    dispatch({ type: CART_ACTION_TYPES.TOGGLE_CART, payload: !isCartOpen });
  };
  const addItemToCart = (item) => {
    const newCartItems = helper(cartItems, item, 'increment');
    updateCartItems(newCartItems);
  };
  const removeItemFromCart = (item) => {
    const newCartItems = helper(cartItems, item, 'decrement');
    updateCartItems(newCartItems);
  };
  const deleteItemFromCart = (item) => {
    const newCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    updateCartItems(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
    count,
    cartAmount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
