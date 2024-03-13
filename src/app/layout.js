"use client"
import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Montserrat } from 'next/font/google'
import './globals.css'
import Header from './components/layout/header'
import Side_bar from './components/layout/side-bar'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main className='max-w-full mx-auto px-6'>
          <Header />
          <div className='flex'>
            <Side_bar />
            <div className='basis-11/12 overflow-auto'>
              {children}
            </div>
          </div>
          <footer className='border-t-2 text-center mt-10 p-6'>
            © 2024 all rights reserved | thiennguyen0710.dn@gmail.com
          </footer>
        </main>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            // Define default options
            className: '',
            duration: 2000,
            style: {
              background: '#b72a23',
              color: '#fff',
            }
          }}
        />
      </body>
    </html>
  )
}
