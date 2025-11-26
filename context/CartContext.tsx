"use client";
import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";

// 🧱 Define item type
export interface CartItem {
  id: number;
  name: string;
  price: number;
  onSale: boolean;
  discountPrice: number | null
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
  removeFromCart: (id: number, color: string, size: string) => void;
  clearCart: () => void;
  updateQuantity: (id: number, color: string, quantity: number, size: string) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  

  // 🧮 Recalculate totals
  useEffect(() => {
    const amount = cart.reduce((sum, item) => item.onSale ? sum + item.discountPrice! * item.quantity : sum + item.price * item.quantity, 0);
    const items = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalAmount(amount);
    setTotalItems(items);
  }, [cart]);

  // ➕ Add item
    const addToCart = (newItem: CartItem) => {
  setCart((prev) => {
    const existing = prev.find(
      (item) =>
        item.id === newItem.id &&
        item.selectedColor === newItem.selectedColor &&
        item.selectedSize === newItem.selectedSize
    );

    if (existing) {
      // Ensure quantity does not exceed stock
      const updatedQuantity = Math.min(
        existing.quantity + newItem.quantity,
        newItem.stock
      );

      return prev.map((item) =>
        item.id === newItem.id &&
        item.selectedColor === newItem.selectedColor &&
        item.selectedSize === newItem.selectedSize
          ? { ...item, quantity: updatedQuantity }
          : item
      );
    }

    // New item — also respect stock
    const quantity = Math.min(newItem.quantity, newItem.stock);
    return [...prev, { ...newItem, quantity }];
  });
};

const isSameItem = (
  item: CartItem,
  id: number,
  color?: string,
  size?: string
) => {
  if (item.id !== id) return false;

  if (color && item.selectedColor !== color) return false;
  if (size && item.selectedSize !== size) return false;

  return true;
};


 const removeFromCart = (id: number, color?: string, size?: string) => {
  setCart((prev) => prev.filter((item) => !isSameItem(item, id, color, size)));
};



 const updateQuantity = (
  id: number,
  color: string | undefined,
  quantity: number,
  size: string | undefined
) => {
  setCart((prev) =>
    prev.map((item) =>
      isSameItem(item, id, color, size)
        ? {
            ...item,
            quantity: Math.max(1, Math.min(quantity, item.stock)), // no exceed stock
          }
        : item
    )
  );
};


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
