'use client';

import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { italiano } from '@/lib/fonts';
import { Star } from 'lucide-react';

const Reviews = () => {

    const [data, setData ] = useState<reviewType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/testimonials", {next: {revalidate: 60}})
            const json = await res.json()
            setData(json.testimonials)
        }

        fetchData()
    }, [])

    console.log(data)

  return (
    <section className="my-20 max-w-[1240px] px-10 mx-auto">
        <h3 className={`font-bold text-3xl md:text-5xl mb-6 md:mb-10 text-center tracking-wide ${italiano.className }`}>Let Customers speak for us</h3>
        <Swiper
            modules={[Navigation]}
            spaceBetween={15}
            slidesPerView={4}
            navigation
            loop
            breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
            }}
        >
            {data.map((item, i) => (
                <SwiperSlide key={i}>
                    <div className=' p-3 flex items-center flex-col justify-center'>
                        <div className='flex gap-3'>
                        <p className='font-semibold text-lg'>{item.name}</p>
                        <p className='flex items-center gap-2'>{item.rating} <Star className='text-yellow-500' /></p>
                        </div>
                        <div className='text-center mt-2'>
                            <p>{item.message}</p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </section>
  )
}

export default Reviews
