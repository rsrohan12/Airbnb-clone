import React from 'react'
import BrandLogo from './BrandLogo'
import { Input } from '../ui/input'
import NavMenu from './NavMenu'
import Link from 'next/link'

export default function SearchSheetNav({session, searchInputCallback}:{session:any, 
  searchInputCallback:(value:string) => void
}) { // here in this function we can't use async method because nextjs does not allow that to use in client side

  return (
    <div className='flex justify-between items-center md:px-10'>
      <div className='hidden md:block'>
        <BrandLogo />
      </div>
      <Input className='w-full md:w-1/3 rounded-3xl p-5' 
      placeholder='Search by country...' 
      onChange={(event) => searchInputCallback(event.target.value)}/>
      <div className='hidden md:flex items-center space-x-4'>
        <Link href="/add-home"><span>Add your home</span></Link>
        <NavMenu session = {session}/> {/* data me session aur session me user pada h*/}
      </div>
    </div>
  )
}
