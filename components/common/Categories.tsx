"use client"

import { categories } from '@/config/categories'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Categories() {
  const router = useRouter()
  const [categ, setCateg] = useState("")
  const params = useSearchParams()

  useEffect(() => {
    if(params?.get("category")){
      setCateg(params?.get("category")!)
    }
  }, [params])

  const CLickOnCategory = (name:string) => {
    const fullUrl = new URL(window.location.href)
    fullUrl.searchParams.set("category", name)
    router.replace(`/${fullUrl.search}`)
  }
  return (
    <div className='flex items-center space-x-8 whitespace-nowrap px-10 my-3
    overflow-x-auto pb-2'>
      {categories.map((item) => (
        <div className='flex items-center flex-col cursor-pointer' onClick={() => CLickOnCategory(item.name)}>
            <Image src={item.icon} width={25} height={25} alt={item.name} />
            <span className={`${item.name === categ ? "inline-block border-b-4 border-brand" : ""}`}>
              {item.name}
            </span>
        </div>
      ))}
    </div>
  )
}

export default Categories
