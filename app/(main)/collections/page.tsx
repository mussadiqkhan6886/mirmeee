'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Collections = () => {

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if(pathname == "/collections"){
      router.push("/")
    }
  }, [])

  return (
    <div className='h-screen'>
      
    </div>
  )
}

export default Collections 
