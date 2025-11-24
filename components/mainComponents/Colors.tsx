'use client';

import React, { Dispatch, SetStateAction, useState } from 'react'

type Props = {
  colors: string[]
  selectedColor: string
  setSelectedColor: Dispatch<SetStateAction<string>>
}

const Colors = ({colors, selectedColor, setSelectedColor}: Props) => {
  return (
    <div className='flex flex-wrap gap-4 mt-2 flex-col items-start'>
        {!selectedColor && <p className='uppercase text-red-500'>Select Color</p>}
        <p>Color: {' '} {selectedColor}</p>
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5   gap-4'>
        {colors.map((color, i) => (
            <div onClick={() => setSelectedColor(color)} key={i} className={`${selectedColor === color ? "bg-black text-white" : ""} px-4 py-1 border border-black/30 text-sm cursor-pointer text-center`}>
            {color}
            </div>
        ))}
    </div>
    </div>
  )
}

export default Colors
