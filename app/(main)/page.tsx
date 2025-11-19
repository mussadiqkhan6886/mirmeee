import { MovingCollections } from '@/components/mainComponents/Collections'
import Bundles from '@/components/mainComponents/Featured'
import Hero from '@/components/mainComponents/Hero'
import NewArrival from '@/components/mainComponents/NewArrival'
import NewIn from '@/components/mainComponents/NewIn'
import Reviews from '@/components/mainComponents/Reviews'
import React from 'react'

const Home = () => {
  return (
    <main>
      <Hero />
      <MovingCollections />
      <NewArrival />
      <Bundles />
      <NewIn />
      <Reviews />
    </main>
  )
}

export default Home
