'use client';

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {Menu, Search, ShoppingBag, X} from "lucide-react";
import { navigation } from '@/lib/constants';
import Link from 'next/link';

const Header = () => {

    const [sideBar, setSideBar] = useState(false)
    const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${scrolled || sideBar ? "bg-light text-font lg:px-16 md:px-7 px-2 py-0" : " text-light lg:px-18 md:px-10 px-4 py-4"} fixed w-full max-w-[1440px]  border-b border-light z-10 duration-300`}>
      <div className='flex justify-between items-center'>
        <div>
            <Image src={"/logo.jpg"} alt='logo of shop' width={70} height={70} />
        </div>
        <nav className='lg:flex hidden items-center justify-center'>
          <ul className='flex lg: gap-x-5 xl:gap-x-8 items-center'>
          {navigation.map(item => (
              <li key={item.title}><Link className=' font-semibold text-sm xl:text-[17px] uppercase  whitespace-nowrap hover:underline duration-200' href={item.link}>{item.title}</Link></li>
          ))}
          </ul>
        </nav>
        <div className='flex gap-5 items-center'>
            <Link href={"/cart"}><ShoppingBag /></Link>
            {!sideBar && <Menu onClick={() => setSideBar(true)} className='inline-block lg:hidden' />}
            {sideBar && <X onClick={() => setSideBar(false)} className='inline-block lg:hidden' />}
        </div>
      </div>
      
      {sideBar && <nav className='flex lg:hidden items-center justify-center'>
        <ul className='flex flex-col gap-8 items-center py-6'>
        {navigation.map(item => (
            <li key={item.title}><Link className='text-sm uppercase text-font' href={item.link}>{item.title}</Link></li>
        ))}
        </ul>
      </nav>}
    </header>
  )
}

export default Header
