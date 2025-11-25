'use client';

import Image from 'next/image'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const Hero = () => {
  return (
    <section className='text-light relative'>
       <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      speed={800}
      className="w-full h-[105vh]"
    >
      <SwiperSlide>
        <Image
          src="/hero.jpg"
          alt="hero 1"
          width={1000}
          height={1000}
          className="w-full brightness-55 h-[105vh] object-cover object-top"
        />
      </SwiperSlide>

      <SwiperSlide>
        <Image
          src="/hero (2).jpg"
          alt="hero 2"
          width={1000}
          height={1000}
          className="w-full brightness-55 h-[105vh] object-cover object-top"
        />
      </SwiperSlide>

      <SwiperSlide>
        <Image
          src="/hero (1).jpg"
          alt="hero 3"
          width={1000}
          height={1000}
          className="w-full brightness-55 h-[105vh] object-cover object-top"
        />
      </SwiperSlide>
    </Swiper>
      <div className='absolute z-40 md:left-1/2 right-2 bottom-28 text-right  md:bg-transparent md:top-1/2 md:-translate-x-1/2 md:-translate-y-49 md:text-center flex items-center flex-col w-[80%]'>
        <h1 className='font-bold text-[30px] uppercase md:text-[45px] lg:text-[60px] leading-7 md:leading-14'>
            Style Your Hair, Elevate Your Look
        </h1>
        <p className='text-[12px] w-[90%] md:leading-6 md:w-[65%] sm:text-sm md:text-lg md:text-center mt-4'>
            Discover premium hair bows, clips, scrunchies, and headbands to match every mood and outfit.
        </p>
      </div>
    </section>
  )
}

export default Hero
