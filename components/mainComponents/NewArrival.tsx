import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NewArrival = () => {
  return (
    <section className='h-screen relative'>
      <Image src={"/new.jpg"} alt='is new arrival banner image' width={1000} height={1000} className='w-full h-full object-cover' />
      <div className='absolute top-1/2 left-20 text-font flex flex-col items-start'>
        <h3 className='text-3xl md:text-5xl font-semibold uppercase'>Explore New Arrivals</h3>
        <Link className='border-light border px-4 py-2 mt-4 block bg-medium text-light' href={"/collections/new-arrival"}>Explore</Link>
      </div>
    </section>
  )
}

export default NewArrival
