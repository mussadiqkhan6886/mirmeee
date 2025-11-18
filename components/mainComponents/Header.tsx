'use client';

import Image from 'next/image'
import React, { useState } from 'react'
import {Menu, Search, ShoppingBag, X} from "lucide-react";
import { navigation } from '@/lib/constants';
import Link from 'next/link';

const Header = () => {

    const [sideBar, setSideBar] = useState(false)

  return (
    <header className='lg:px-30 md:px-20 sm:px-10 px-4 bg-white'>
      <div className='flex justify-between items-center py-4'>
        <Search />
        <div>
            <Image src={"/logo.jpg"} alt='logo of shop' width={70} height={70} />
        </div>
        <div className='flex gap-5 items-center'>
            <ShoppingBag />
            {!sideBar && <Menu onClick={() => setSideBar(true)} className='inline-block md:hidden' />}
            {sideBar && <X onClick={() => setSideBar(false)} className='inline-block md:hidden' />}
        </div>
      </div>
      <nav className='md:flex hidden items-center justify-center'>
        <ul className='flex gap-6 lg:gap-8 items-center py-4'>
        {navigation.map(item => (
            <li key={item.title}><Link className='text-sm text-gray-700 hover:text-font whitespace-nowrap hover:underline duration-200' href={item.link}>{item.title}</Link></li>
        ))}
        </ul>
      </nav>
      {sideBar && <nav className='flex md:hidden items-center justify-center'>
        <ul className='flex flex-col gap-8 items-center py-6'>
        {navigation.map(item => (
            <li key={item.title}><Link className='text-sm text-font' href={item.link}>{item.title}</Link></li>
        ))}
        </ul>
      </nav>}
    </header>
  )
}

export default Header
