'use client';

import React, { Dispatch, SetStateAction, useState } from 'react'

type Props = {
  size: string[]
  selectedSize: string
  setSelectedSize: Dispatch<SetStateAction<string>>
}

const Sizes = ({size, selectedSize, setSelectedSize}: Props) => {
  return (
    <div className='flex flex-wrap gap-4 mt-2 flex-col items-start'>
        {!selectedSize && <p className='uppercase text-red-500'>Select Size</p>}
        <p>Size: {' '} {selectedSize}</p>
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5   gap-4'>
        {size.map((s, i) => (
            <div onClick={() => setSelectedSize(s)} key={i} className={`${selectedSize === s ? "bg-black text-white" : ""} px-4 py-1 border border-black/30 text-sm cursor-pointer text-center`}>
            {s}
            </div>
        ))}
    </div>
    </div>
  )
}

export default Sizes
