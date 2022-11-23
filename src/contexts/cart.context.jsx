import { createContext, useEffect, useReducer } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  decrementItemQuantity: () => {},
  removeItemFromCart: () => {},
  count: 0,
  cartAmount: 0,
});

const CART_ACTION_TYPES = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  TOGGLE_CART: 'TOGGLE_CART',
  UPDATE_CART_COUNT_AND_AMOUNT: 'UPDATE_CART_COUNT_AND_AMOUNT',
};
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  count: 0,
  cartAmount: 0,
};
const cartReducer = (state, action) => {
  const { type, payload } = action;
  const { cartItems } = state;
  switch (type) {
    case CART_ACTION_TYPES.TOGGLE_CART:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTION_TYPES.ADD_ITEM:
      return {
        ...state,
        cartItems: helper(cartItems, payload, 'increment'),
      };
    case CART_ACTION_TYPES.REMOVE_ITEM:
      return {
        ...state,
        cartItems: helper(cartItems, payload, 'decrement'),
      };
    case CART_ACTION_TYPES.DELETE_ITEM:
      const newCartItems = cartItems.filter(
        (cartItem) => cartItem.id !== payload.id
      );
      return {
        ...state,
        cartItems: newCartItems,
      };
    case CART_ACTION_TYPES.UPDATE_CART_COUNT_AND_AMOUNT:
      return {
        ...state,
        count: payload.reduce((acc, item) => acc + item.quantity, 0),
        cartAmount: payload.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        ),
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
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
  const setIsCartOpen = () => {
    dispatch({ type: CART_ACTION_TYPES.TOGGLE_CART, payload: !isCartOpen });
  };
  const setCartCountAndAmount = (cartItems) => {
    dispatch({
      type: CART_ACTION_TYPES.UPDATE_CART_COUNT_AND_AMOUNT,
      payload: cartItems,
    });
  };
  const addItemToCart = (item) => {
    dispatch({ type: CART_ACTION_TYPES.ADD_ITEM, payload: item });
  };
  const removeItemFromCart = (item) => {
    dispatch({ type: CART_ACTION_TYPES.REMOVE_ITEM, payload: item });
  };
  const deleteItemFromCart = (item) => {
    dispatch({ type: CART_ACTION_TYPES.DELETE_ITEM, payload: item });
  };
  useEffect(() => {
    setCartCountAndAmount(cartItems);
  }, [cartItems]);

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
