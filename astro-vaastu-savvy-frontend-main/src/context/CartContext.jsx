import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Use a function for lazy initialization to avoid layout shift on refresh
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false); // For a sliding cart UI
  const [totalItems, setTotalItems] = useState(0);

  // Sync with Local Storage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    
    // Calculate total items for the navbar badge
    const count = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
    setTotalItems(count);
  }, [cartItems]);

  /* ===============================
      Improved Add To Cart
  =============================== */
  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      // Handle both _id (MongoDB) and id (Frontend mocks)
      const productId = product._id || product.id;
      const existingItem = prev.find((item) => (item._id || item.id) === productId);

      if (existingItem) {
        return prev.map((item) =>
          (item._id || item.id) === productId
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: product.quantity || 1 }];
      }
    });
  }, []);

  /* ===============================
      Remove Item with Animation Delay
  =============================== */
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => (item._id || item.id) !== id));
  };

  /* ===============================
      Update Quantity
  =============================== */
  const updateQuantity = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCartItems((prev) =>
      prev.map((item) =>
        (item._id || item.id) === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // UI Calculated Stats
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);