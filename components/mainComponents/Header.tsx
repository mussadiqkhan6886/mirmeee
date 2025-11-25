'use client';

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {Menu, Search, ShoppingBag, X} from "lucide-react";
import { navigation } from '@/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/hooks/useCart';

const Header = () => {

    const [sideBar, setSideBar] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const {cart} = useCart()
    const pathname = usePathname()
useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 50 || pathname !== "/") {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // run once on mount and also when pathname changes
  handleScroll();

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [pathname]);


  return (
    <header className={`${scrolled || sideBar ? "bg-light text-font lg:px-16 md:px-7 px-2 py-0" : " text-light lg:px-18 md:px-10 px-4 py-4"} fixed top-0 w-full max-w-[1440px]  border-b border-light z-50 duration-300`}>
      <div className='flex justify-between items-center'>
        <div className='block lg:hidden'>
          {!sideBar && <Menu onClick={() => setSideBar(true)} className='inline-block lg:hidden' />}
            {sideBar && <X onClick={() => setSideBar(false)} className='inline-block lg:hidden' />}
        </div>
        <div>
            <Image src={"/logo.jpg"} alt='logo of shop' width={70} height={70} />
        </div>
        <nav className='lg:flex hidden items-center justify-center'>
          <ul className='flex lg:gap-x-5 xl:gap-x-8 items-center'>
          {navigation.map(item => (
              <li key={item.title}><Link className='text-sm uppercase  whitespace-nowrap hover:underline duration-200' href={item.link}>{item.title}</Link></li>
          ))}
          </ul>
        </nav>
        <div className='flex gap-5 items-center relative'>
            <Link href={"/cart"}><ShoppingBag size={18} /></Link>
            <div className='bg-red-500 text-white absolute p-1 py-0 rounded-full -top-2 -right-1 text-[12px]'>{cart.length}</div>
        </div>
      </div>
      
      {sideBar && <nav className='flex z-50 lg:hidden items-center justify-center'>
        <ul className='flex flex-col gap-8 items-center py-6'>
        {navigation.map(item => (
            <li onClick={() => setSideBar(false)} key={item.title}><Link className='text-sm uppercase text-font' href={item.link}>{item.title}</Link></li>
        ))}
        </ul>
      </nav>}
    </header>
  )
}

export default Header
