import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section className='text-light relative'>
      <Image src={"/hero.jpg"} alt='hero main image banner' width={1000} height={1000} className='w-full brightness-55 h-[105vh] object-cover object-top' />
      <div className='absolute md:left-1/2 right-2 bottom-10 text-right  md:bg-transparent md:top-1/2 md:-translate-x-1/2 md:-translate-y-55 md:text-center uppercase w-[80%]'>
        <h1 className='font-bold text-[20px] md:text-[45px] lg:text-[60px] md:leading-14'>
            Style Your Hair, Elevate Your Look
        </h1>
        <p className='text-[12px] sm:text-sm md:text-lg md:text-center mt-2'>
            Discover premium hair bows, clips, scrunchies, and headbands to match every mood and outfit.
        </p>
      </div>
    </section>
  )
}

export default Hero
