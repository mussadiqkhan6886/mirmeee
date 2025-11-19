'use client';

import { italiano } from '@/lib/fonts';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

type Props = {
    data: {
        image: string,
        title: string,
        link: string,
        price: number
        discountPrice: number
        onSale: boolean
    }[]
    heading: string
}

const Products = ({data, heading}: Props) => {
  return (
    <section className="my-20 max-w-[1240px] mx-auto">
      <h3 className={`${italiano.className} text-3xl md:text-5xl mb-6 text-center`}>{heading}</h3>
       <Swiper
        modules={[Navigation]}
        spaceBetween={15}
        slidesPerView={4}
        navigation
        loop
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {data.map((item, i) => (
          <SwiperSlide key={i}>
            <div className='hover:scale-105 duration-300 relative'>
              <Image
                width={290}
                height={350}
                src={item.image}
                alt={item.title || 'Product'}
                className="w-full md:h-[400px] object-cover cursor-pointer "
              />
              <div className='bg-medium text-light px-4 py-1 rounded-md absolute text-sm top-3 left-3'>Sale</div>
              <div className="p-4 text-center">
                <div className='flex justify-between items-center'>
                    <h4 className="text-lg text-font font-normal">{item.title}</h4>
                </div>
                <div className='flex justify-between items-center mt-2'>
                    <p className='text-sm font-semibold  text-black'>PKR {item.onSale ? <> <span className='line-through text-gray-700'>{item.price}</span> <span className='text-base'>{item.discountPrice}</span></> : <span>{item.price}</span>}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Products
