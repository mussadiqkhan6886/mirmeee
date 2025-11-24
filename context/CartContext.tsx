"use client";
import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";

// 🧱 Define item type
export interface CartItem {
  id: string;
  name: string;
  price: number;
  onSale: boolean;
  newPrice: number | null
  quantity: number;
  images: string[];
  selectedColor?: string
  selectedSize?: string,
  stock: number
}

// 🧠 Define context type
export interface CartContextType {
  cart: CartItem[];
  totalAmount: number;
  totalItems: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  

  // 🧮 Recalculate totals
  useEffect(() => {
    const amount = cart.reduce((sum, item) => item.onSale ? sum + item.newPrice! * item.quantity : sum + item.price * item.quantity, 0);
    const items = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalAmount(amount);
    setTotalItems(items);
  }, [cart]);

  // ➕ Add item
    const addToCart = (newItem: CartItem) => {
      setCart((prev) => {
        const existing = prev.find(
          (item) => item.id === newItem.id && item.selectedColor === newItem.selectedColor
        );

        if (existing) {
          // Ensure quantity does not exceed stock
          const updatedQuantity = Math.min(
            existing.quantity + newItem.quantity,
            newItem.stock
          );
          return prev.map((item) =>
            item.id === newItem.id && item.selectedColor === newItem.selectedColor
              ? { ...item, quantity: updatedQuantity }
              : item
          );
        }

        // If new item, don't allow quantity greater than stock
        const quantity = Math.min(newItem.quantity, newItem.stock);
        return [...prev, { ...newItem, quantity }];
      });
    };

  // ❌ Remove item
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => { setCart((prev) => prev.map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item ) ); };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalAmount,
        totalItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
