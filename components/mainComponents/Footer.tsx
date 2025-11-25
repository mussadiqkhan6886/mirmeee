import { Facebook, Instagram } from 'lucide-react'
import { FaTiktok } from 'react-icons/fa';
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='h-[300px] bg-medium text-light flex flex-col items-center justify-between pt-8'>
      <div className='text-center'>
      <h4 className='font-semibold text-3xl'>Follow Us</h4>
      <p>Follow us for design ideas, exclusive offers, and new arrivals.</p>
      </div>
      <div className='flex gap-10 items-center'>
        <Link href="https://www.instagram.com/mirmeeeee/?__pwa=1"><Instagram /></Link> 
        <Facebook />
        <Link href="https://www.tiktok.com/@mirmeeeee?_r=1&_t=ZS-91hWMMT9hwI"> <FaTiktok /> </Link>
      </div>
      <div className='text-sm mb-2'>
        <p>&copy; {new Date().getFullYear() } Mirmee</p>
      </div>
    </footer>
  )
}

export default Footer
