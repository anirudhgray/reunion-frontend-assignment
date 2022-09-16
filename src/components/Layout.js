import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout({children}) {
  return (
    <div className='flex flex-column h-screen'>
      <Navbar />
      <main className='flex-grow-1'>
        {children}
      </main>
      <Footer />
    </div>
  )
}
