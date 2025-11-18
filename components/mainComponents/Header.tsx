'use client';

import Image from 'next/image'
import React, { useState } from 'react'
import {Menu, Search, ShoppingBag, X} from "lucide-react";
import { navigation } from '@/lib/constants';
import Link from 'next/link';

const Header = () => {

    const [sideBar, setSideBar] = useState(false)

  return (
    <header className='xl:px-30 absolute w-full lg:px-20 md:px-10 px-4 bg-white'>
      <div className='flex justify-between items-center py-4'>
        <div>
            <Image src={"/logo.jpg"} alt='logo of shop' width={70} height={70} />
        </div>
        <nav className='lg:flex hidden items-center justify-center'>
          <ul className='flex gap-6 lg:gap-8 items-center pb-4'>
          {navigation.map(item => (
              <li key={item.title}><Link className='text-sm text-gray-700 hover:text-font whitespace-nowrap hover:underline duration-200' href={item.link}>{item.title}</Link></li>
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
            <li key={item.title}><Link className='text-sm text-font' href={item.link}>{item.title}</Link></li>
        ))}
        </ul>
      </nav>}
    </header>
  )
}

export default Header
