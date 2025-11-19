'use client';

import axios from 'axios';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import { FiHome, FiMessageSquare, FiPackage, FiPlusCircle, FiShoppingBag } from 'react-icons/fi'

const Header = () => {

     const menuItems = [
    { name: 'Testimonials', href: '/admin-dashboard/testimonials', icon: <FiMessageSquare className="w-4 h-4" /> },
    { name: 'Products', href: '/admin-dashboard/products-list', icon: <FiPackage className="w-4 h-4" /> },
    { name: 'Add Product', href: '/admin-dashboard/add-product', icon: <FiPlusCircle className="w-4 h-4" /> },
    { name: 'Orders', href: '/admin-dashboard/orders-list', icon: <FiShoppingBag className="w-4 h-4" /> },
  ]
  const pathname = usePathname()
  const router = useRouter()

  if(pathname === "/admin-dashboard/login"){
    return null
  }

  const logout = async () => {
    const res = await axios.get('/api/logout')
    router.push("/admin-dashboard/login")
  }

  return (
    <>
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm border-b">
        <h1 className={` text-3xl font-semibold text-main`}>Admin Panel</h1>
        <div className="flex gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 bg-main bg-black text-white px-4 py-2 rounded-lg "
        >
          <FiHome className="w-4 h-4" />
          Go Home
        </Link>
        <button className='underline cursor-pointer' onClick={logout}>Logout</button>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="border-b shadow-sm">
        <ul className="flex flex-wrap items-center justify-center gap-6 px-6 py-3 text-gray-600">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-2 px-2 py-1 transition `}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Header
