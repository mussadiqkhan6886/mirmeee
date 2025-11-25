'use client';

import { useCart } from '@/hooks/useCart';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Page = () => {
  const { cart, removeFromCart, updateQuantity, totalAmount } = useCart();

  if (cart.length <= 0) {
    return (
      <main className="h-screen flex items-center pt-24 justify-center">
        <p className="text-4xl sm:text-5xl tracking-wide text-gray-700">
          Your Cart is Empty 🛒
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 my-16 pt-30">
      {/* 🛍️ Header */}
      <h1
        className={` text-3xl sm:text-5xl font-semibold mb-10 text-center tracking-wide`}
      >
        Your Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* 🧾 Cart Items Section */}
        <div className="flex flex-col gap-8 flex-1">
          {cart.map((item, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row gap-6 border-b border-gray-200 pb-6"
            >
              <Image
                src={item.images[0]}
                alt={item.name}
                width={120}
                height={120}
                className="object-cover rounded-md"
              />

              <div className="flex flex-col justify-between flex-1">
                {/* 🏷️ Product Name and Color */}
                <div>
                  <h2 className="font-medium text-gray-800 text-lg">
                    {item.name}
                  </h2>
                  {item.selectedColor && (
                    <p className="text-gray-500 text-sm mt-1">
                      Color: <span className="font-medium">{item.selectedColor}</span>
                    </p>
                  )}
                  {item.selectedSize && (
                    <p className="text-gray-500 text-sm mt-1">
                      Size: <span className="font-medium">{item.selectedSize}</span>
                    </p>
                  )}
                </div>

                {/* ➕ Quantity + Remove */}
                <div className="flex items-center gap-6 mt-3">
                  <div className="flex items-center gap-4 border border-gray-300 rounded-md px-3 py-1">
                    <button
                      className="text-xl font-semibold hover:text-gray-700"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <p className="font-medium">{item.quantity}</p>
                    <button
                      className="text-xl font-semibold hover:text-gray-700"
                      onClick={() => {
                        if(item.quantity < item.stock){
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-600 transition text-sm"
                  >
                    <Trash /> Remove
                  </button>
                </div>
              </div>

              {/* 💰 Price Section */}
              <div className="text-right sm:text-left mt-2 sm:mt-0">
                {item.onSale ? (
                  <h4 className="text-gray-700 text-sm">
                    <span className="line-through opacity-70">
                      Rs. {item.price}
                    </span>{' '}
                    <span className="font-semibold text-[17px] text-gray-900">
                      Rs. {item.discountPrice}
                    </span>{' '}
                    <span className="text-red-500 text-xs font-medium">
                      Save Rs. {item.price - item.discountPrice!}
                    </span>
                  </h4>
                ) : (
                  <h4 className="text-gray-800 font-medium text-[17px]">
                    Rs. {item.price}
                  </h4>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 💳 Order Summary Section */}
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg w-full lg:w-[350px] h-fit sticky top-24">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Order Summary
          </h3>

          <div className="flex justify-between mb-2 text-gray-600">
            <p>Subtotal</p>
            <p className="font-medium">Rs. {totalAmount}</p>
          </div>

          <div className="flex justify-between mb-2 text-gray-600">
            <p>Shipping</p>
            <p>{totalAmount >= 2000 ? "Free Shipping" : "250 PKR"}</p>
          </div>

          <hr className="my-4 border-gray-300" />

          <div className="flex justify-between text-lg font-semibold text-gray-800">
            <p>Total</p>
            <p>Rs. {totalAmount + (totalAmount >= 2000 ? 0 : 250) }</p>
          </div>

          <Link
            href="/checkout"
            className="block mt-6 w-full bg-black text-white text-center py-3 rounded-md hover:bg-gray-800 transition font-medium tracking-wide"
          >
            Proceed to Checkout
          </Link>

          <Link
            href="/"
            className="block mt-3 text-center text-gray-600 hover:text-gray-800 transition text-sm underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Page;
