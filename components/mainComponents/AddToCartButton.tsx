'use client';

import { useCart } from '@/hooks/useCart';
import React, { useState } from 'react';
import Colors from './Colors';

interface Props {
  id: number;
  images: string[];
  price: number;
  onSale: boolean;
  newPrice: number | null;
  name: string;
  quantity: number;
  colors?: string[];
  stock: number
}

const AddToCartButton = ({
  id,
  images,
  price,
  onSale,
  newPrice,
  name,
  quantity,
  colors,
  stock
}: Props) => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState('');

  const handleAddToCart = () => {
    if (colors && colors.length > 0 && !selectedColor) {
      // Safety check: if colors exist, ensure one is selected
      return;
    }

    addToCart({
      id,
      images,
      price,
      onSale,
      newPrice,
      name,
      quantity,
      selectedColor,
      stock
    });

  };

  const hasColors = colors && colors.length > 0;
  return (
    <div className="space-y-4">
      {/* Color Selector */}
      {hasColors && (
        <Colors
          colors={colors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      )}

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={hasColors && !selectedColor}
        className={`w-full px-6 py-3 rounded-md transition
          ${
            hasColors && !selectedColor
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
      >
        {hasColors && !selectedColor ? 'Select Color to Add' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default AddToCartButton;
