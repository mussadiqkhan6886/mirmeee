'use client';

import { italiano } from '@/lib/fonts';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    data: ProductType[]
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
              {item.inStock ? <Link href={`collections/${item.collectionSlug}/${item.slug}`}>
                <Image
                  width={290}
                  height={350}
                  src={item.images[0]}
                  alt={item.name || 'Product'}
                  className="w-full md:h-[400px] object-cover cursor-pointer "
                />
              </Link> : <div className='relative opacity-60 cursor-not-allowed'>
                <Image
                  width={290}
                  height={350}
                  src={item.images[0]}
                  alt={item.name || 'Product'}
                  className="w-full md:h-[400px] object-cover cursor-pointer "
                />
                <div className='bg-red-500 text-white px-2 py-1 absolute top-5 left-5'>NOT IN STOCK</div>
              </div>}
              {item.onSale && <div className='bg-medium text-light px-4 py-1 rounded-md absolute text-sm top-3 left-3'>Sale</div>}
              <div className="p-4 text-center">
                <div className='flex justify-between items-center'>
                    <h4 className="text-lg text-font font-normal capitalize">{item.name}</h4>
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
