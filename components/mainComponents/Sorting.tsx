'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { FiChevronsDown } from 'react-icons/fi';

type SortWrapperProps = {
  products: Product[];
  slug: string
};

const SortWrapper: React.FC<SortWrapperProps> = ({ products, slug }) => {
  const [sortOption, setSortOption] = useState('default');
  const [sortedProducts, setSortedProducts] = useState(products);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let sorted = [...products];

    switch (sortOption) {
      case 'price-low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'a-z':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'z-a':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        sorted = [...products];
    }

    setSortedProducts(sorted);
  }, [sortOption, products]);

  return (
    <section>
      {/* Sort Dropdown */}
      <div className="flex justify-end mb-6">
        <div className="relative inline-block w-40 md:w-56">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            <span className="text-gray-700 capitalize">
              {sortOption === 'default' ? 'Sort by' : sortOption.replace('-', ' ')}
            </span>
            <FiChevronsDown
              className={`w-4 h-4 transition-transform ${
                open ? 'rotate-180' : ''
              }`}
            />
          </button>

          {open && (
            <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              {[
                { label: 'Default', value: 'default' },
                { label: 'Price: Low to High', value: 'price-low-high' },
                { label: 'Price: High to Low', value: 'price-high-low' },
                { label: 'Name: A to Z', value: 'a-z' },
                { label: 'Name: Z to A', value: 'z-a' },
              ].map(({ label, value }) => (
                <li
                  key={value}
                  onClick={() => {
                    setSortOption(value);
                    setOpen(false);
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                    sortOption === value ? 'bg-gray-50 font-medium' : ''
                  }`}
                >
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Sorted Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8">
        {sortedProducts.map((product) => (
          <ProductCard key={product._id} {...product} oldSlug={slug} />
        ))}
      </div>
    </section>
  );
};

export default SortWrapper;
