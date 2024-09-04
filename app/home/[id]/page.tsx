import React from 'react'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Navbar from '@/components/header/Navbar'
import Image from 'next/image'
import { getS3ImageUrl } from '@/lib/utils'

export default async function findHome({params}:{params:{id:number}}) {
    const supabase = createServerComponentClient({cookies})
    const {data, error} = await supabase.from("add-home")
    .select("*, users(metadata->email)").eq("id", params.id) // here "*" means to select all attributes of "users" table
    const home: HomeType | null = data?.[0]
    //console.log(home)
  return (
    <div className='mb-10'>
      <Navbar />
      <div className='container mt-5'>
        <h1 className='text-2xl font-bold'>{home?.title}</h1>
        <p>{home?.city}, {home?.state}, {home?.country}</p>
        <Image 
        src={getS3ImageUrl(home?.image)}
        width={100}
        height={100}
        alt='home_img'
        className='w-full h-[500px] rounded-lg object-cover object-center my-3'
        unoptimized
        />
        <h1 className='mt-5 text-brand font-bold text-2xl'>
            Hosted by...👦🏻
        </h1>
        <h1 className='text-2xl font-semibold'>
          {home?.title}
        </h1>
        <div className='mt-5' 
        dangerouslySetInnerHTML={{__html: home?.description}}>
        </div>
      </div>
    </div>
  )
}
