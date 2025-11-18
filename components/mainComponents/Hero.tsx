import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section>
      <Image src={"/hero.jpg"} alt='hero main image banner' width={1000} height={1000} className='w-full h-[120vh] object-cover object-bottom' />
      <div className='absolute top-0'>

      <h1>
        Style Your Hair, Elevate Your Look
      </h1>
      <p>
        Discover premium hair bows, clips, scrunchies, and headbands to match every mood and outfit.
      </p>
      </div>
    </section>
  )
}

export default Hero
