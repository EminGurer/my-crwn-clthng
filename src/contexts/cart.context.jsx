import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  decrementItemQuantity: () => {},
  removeItemFromCart: () => {},
  count: 0,
  cartTotalAmount: 0,
});

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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [count, setCount] = useState(0);
  const [cartTotalAmount, setcartTotalAmount] = useState(0);

  useEffect(() => {
    const newCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const newcartTotalAmount = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setCount(newCount);
    setcartTotalAmount(newcartTotalAmount);
  }, [cartItems]);

  const deleteItemFromCart = (item) => {
    const newCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(newCartItems);
  };
  const addItemToCart = (item) => {
    setCartItems(helper(cartItems, item, 'increment'));
  };
  const removeItemFromCart = (item) => {
    setCartItems(helper(cartItems, item, 'decrement'));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
    count,
    cartTotalAmount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
