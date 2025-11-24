'use client';

import { useCart } from '@/hooks/useCart';
import React, { useState } from 'react';
import Colors from './Colors';
import Sizes from './Sizes';

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
  size?: string[]
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
  stock,
  size
}: Props) => {
  const { addToCart, cart } = useCart();
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('')

  console.log(cart)

  const handleAddToCart = () => {
    if (colors && colors.length > 0 && !selectedColor && size && size.length > 0 && !selectedSize) {
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
      selectedSize,
      stock
    });
    

  };

  const hasColors = colors && colors.length > 0;
  const hasSize = size && size.length > 0
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
      {hasSize && (
        <Sizes
          size={size}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
      )}

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={hasColors && !selectedColor || hasSize && !selectedSize}
        className={`w-full px-6 py-3 rounded-md transition
          ${
            hasColors && !selectedColor || hasSize && !selectedSize
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
      >
        {hasColors && !selectedColor ? 'Select Color to Add' : hasSize && !selectedSize ? 'Select Size to Add' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default AddToCartButton;
