import { Facebook, Instagram, TicketIcon } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <footer className='h-[300px] bg-medium text-light flex flex-col items-center justify-between pt-8'>
      <div className='text-center'>
      <h4 className='font-semibold text-3xl'>Follow Us</h4>
      <p>Follow us for design ideas, exclusive offers, and new arrivals.</p>
      </div>
      <div className='flex gap-10'>
        <Instagram />
        <Facebook />
        
      </div>
      <div className='text-sm mb-2'>
        <p>&copy; {new Date().getFullYear() } Mirmee</p>
      </div>
    </footer>
  )
}

export default Footer
