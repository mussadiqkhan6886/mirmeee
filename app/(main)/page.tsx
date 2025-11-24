import Bundles from '@/components/mainComponents/Bundles'
import { MovingCollections } from '@/components/mainComponents/Collections'
import Formals from '@/components/mainComponents/Formals'
import Hero from '@/components/mainComponents/Hero'
import NewArrival from '@/components/mainComponents/NewArrival'
import NewIn from '@/components/mainComponents/NewIn'
import Reviews from '@/components/mainComponents/Reviews'
import React from 'react'

const Home = async () => {

  return (
    <main>
      <Hero />
      <MovingCollections />
      <NewArrival />
      <Bundles />
      <NewIn />
      <Formals />
      <Reviews />
    </main>
  )
}

export default Home
