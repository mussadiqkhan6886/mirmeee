'use client';

import React, { Dispatch, SetStateAction, useState } from 'react'

type Props = {
  colors: { color: string; colorStock: number }[];
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
};

const Colors = ({ colors, selectedColor, setSelectedColor }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      {!selectedColor && <p className="text-red-500">Select Color</p>}
      <div className='grid grid-cols-2 gap-3'>
      {colors.map((c, i) => (
        <div
          key={i}
          onClick={() => {
            setSelectedColor(c.color);
          }}
          className={`px-4 py-1 border cursor-pointer ${
            selectedColor === c.color ? 'bg-black text-white' : ''
          }`}
        >
          {c.color}
        </div>
      ))}
      </div>
    </div>
  );
};


export default Colors
