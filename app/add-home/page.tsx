import React from 'react'
import Navbar from '@/components/header/Navbar'
import CounterAnimate from '@/components/common/CounterAnimate'
import { generateRandomNumber } from '@/lib/utils'
import Image from 'next/image'
import AddHomeForm from '@/components/AddHomeForm'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function page() {
  return (
    <div>
      <ToastContainer />
      
      <Navbar />

      <div className='container'>
        <div className='grid grid-cols-1 md:grid-cols-2 place-items-center md:gap-2 gap-4'>
            <div>
                <h1 className='text-brand font-bold text-7xl'>Airbnb It</h1>
                <p className='text-3xl text-black font-bold'>
                    You could earn
                </p>
                <div className='flex space-x-4 items-center'>
                    <CounterAnimate num={generateRandomNumber()} />
                    <span className='text-3xl'>/per night</span>
                </div>
                <div className='flex space-x-4 mt-5'>
                    <Image src="/images/home_img.jpeg" 
                    width={200} 
                    height={200} 
                    alt='home-img' 
                    className='rounded-md object-cover'
                    />

                    <Image src="/images/home_img.jpeg" 
                    width={200} 
                    height={200} 
                    alt='home-img' 
                    className='rounded-md object-cover'
                    />
                </div>
            </div>
            <div>
                <AddHomeForm />
            </div>
        </div>
      </div>
    </div>
  )
}
