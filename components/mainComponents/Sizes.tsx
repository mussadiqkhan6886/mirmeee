'use client';

import React, { Dispatch, SetStateAction, useState } from 'react'

type Props = {
  sizes: { size: string; sizeStock: number }[];
  selectedSize: string;
  setSelectedSize: Dispatch<SetStateAction<string>>;
};

const Sizes = ({ sizes, selectedSize, setSelectedSize }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      {!selectedSize && <p className="text-red-500">Select Size</p>}
      <div className='grid grid-cols-2 gap-3'>
      {sizes.map((s, i) => (
        <div
          key={i}
          onClick={() => {
            setSelectedSize(s.size);
          }}
          className={`px-4 py-1 border cursor-pointer ${
            selectedSize === s.size ? 'bg-black text-white' : ''
          }`}
        >
          {s.size}
        </div>
      ))}
      </div>
    </div>
  );
};



export default Sizes
