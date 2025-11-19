import { MovingCollections } from '@/components/mainComponents/Collections'
import Hero from '@/components/mainComponents/Hero'
import NewArrival from '@/components/mainComponents/NewArrival'
import Products from '@/components/mainComponents/Products'
import Reviews from '@/components/mainComponents/Reviews'
import { bundle } from '@/lib/constants'
import React from 'react'

const Home = () => {
  return (
    <main>
      <Hero />
      <MovingCollections />
      <NewArrival />
      <Products data={bundle} heading='Bundles For You' />
      <Products data={bundle} heading='New In' />
      <Products data={bundle} heading='Formals' />
      <Reviews />
    </main>
  )
}

export default Home
