'use client';

import { useCart } from '@/hooks/useCart';
import React, { useState, useEffect } from 'react';
import Colors from './Colors';
import Sizes from './Sizes';

interface Variant {
  color: string;
  size: string;
  stock: number;
}

interface Props {
  id: number;
  images: string[];
  price: number;
  onSale: boolean;
  discountPrice: number | null;
  name: string;
  quantity: number;
  variants: Variant[];
}

const AddToCartButton = ({
  id,
  images,
  price,
  onSale,
  discountPrice,
  name,
  quantity,
  variants,
}: Props) => {
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [stock, setStock] = useState(0);

  const colors = variants
    .filter((v) => v.color)
    .map((v) => ({ color: v.color, colorStock: v.stock }));

  const sizes = variants
    .filter((v) => v.size)
    .map((v) => ({ size: v.size, sizeStock: v.stock }));

  // 🔹 Update stock whenever color or size changes
  useEffect(() => {
    let matchedVariant;

    if (selectedColor && selectedSize) {
      matchedVariant = variants.find(
        (v) => v.color === selectedColor && v.size === selectedSize
      );
    } else if (selectedColor) {
      matchedVariant = variants.find((v) => v.color === selectedColor);
    } else if (selectedSize) {
      matchedVariant = variants.find((v) => v.size === selectedSize);
    }

    setStock(matchedVariant?.stock || 0);
  }, [selectedColor, selectedSize, variants]);

  const handleAddToCart = () => {
    if ((colors.length && !selectedColor) || (sizes.length && !selectedSize) || stock === 0) return;

    addToCart({
      id,
      images,
      price,
      onSale,
      discountPrice,
      name,
      quantity,
      selectedColor,
      selectedSize,
      stock,
    });
  };

  return (
    <div className="space-y-4">
      {colors.length > 0 && (
        <Colors colors={colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      )}

      {sizes.length > 0 && (
        <Sizes sizes={sizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
      )}

      <button
        onClick={handleAddToCart}
        disabled={(colors.length && !selectedColor) || (sizes.length && !selectedSize) || stock === 0}
        className={`w-full px-6 py-3 rounded-md transition ${
          (colors.length && !selectedColor) || (sizes.length && !selectedSize) || stock === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCartButton;
