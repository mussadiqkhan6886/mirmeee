'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { X } from 'lucide-react';


const ImageProduct = ({images, name}: {images: string[], name: string}) => {
      const [mainImage, setMainImage] = useState(images[0]);
      const [show, setShow] = useState(false)
  return (
   <div className="flex flex-col md:flex-row gap-4">
          <div className="md:flex hidden relative flex-col gap-2">
            {images.slice(0,5).map((img, i) => (
              <div
                key={i}
                className={`w-24 h-24 border cursor-pointer  overflow-hidden ${
                  mainImage === img ? 'border-black' : 'border-gray-300'
                }`}
                onClick={() => setMainImage(img)}
              >
                <Image
                  src={img}
                  alt={`thumbnail ${i}`}
                  width={120}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
            {images.length > 5 && <button onClick={() => setShow(true)} className='w-24 h-24 absolute bg-black/40 underline cursor-pointer bottom-0 text-white font-semibold'>View All</button>}
          </div>

          {show && (
        <div className="fixed inset-0 bg-black/60 z-50 flex">
          <X
            onClick={() => setShow(false)}
            className="text-3xl absolute right-10 top-10 text-white border border-white rounded-full p-1 cursor-pointer"
          />

          <div className="max-w-[1700px] mx-auto w-full h-full px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 place-items-center
                      overflow-y-auto max-h-screen pt-20 pb-10 scrollbar-hide">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className={`md:w-[200px] md:h-[180px] border cursor-pointer overflow-hidden ${
                        mainImage === img ? "border-black" : "border-gray-300"
                      }`}
                      onClick={() => {
                        setMainImage(img);
                        setShow(false);
                      }}
                    >
                      <Image
                        unoptimized
                        loading="lazy"
                        src={img}
                        alt={`thumbnail ${i}`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>

                    </div>
                  </div>
                )}

                <div className="w-full hidden md:flex h-full mb-2 xl:w-[560px] border border-gray-200 overflow-hidden">
                  <Image
                    src={mainImage}
                    alt={name}
                    width={500}
                    height={400}
                    className="object-cover object-center w-full h-full"
                  />
                </div>

          {/* MOBILE SWIPER - IMAGES ONLY, NOT CLICKABLE */}
       {/* MOBILE SWIPER - WITH BLACK PAGINATION */}
        <div className="md:hidden w-full">
          <Swiper
          modules={[Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            className="productSwiper"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <div className="w-full h-[400px] rounded overflow-hidden">
                  <Image
                    src={img}
                    alt={`image ${i}`}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>


         
        </div>
  )
}

export default ImageProduct
