'use client'

import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await axios.post(`/api/login`,
        { email, password },
        { withCredentials: true }
      )
      if (res.data.success) {
        router.replace('/admin-dashboard')
      }
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <section className="lg:w-[30%] md:w-[45%] sm:w-[60%] w-[80%]">
        <h1 className="detailsHeading text-center">Admin Login</h1>
        <form onSubmit={handleSubmit} className='space-y-2'>
          <label className="block text-gray-700 font-medium mb-1">Username</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
          />

          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="submit"
            value="Login"
            className="w-full bg-black text-white cursor-pointer font-semibold py-2 rounded-md hover:bg-white hover:text-black hover:border hover:border-black transition"
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </section>
    </main>
  )
}

export default AdminLogin
