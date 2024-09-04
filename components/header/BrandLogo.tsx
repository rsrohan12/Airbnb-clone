import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function BrandLogo() {
  return (
    <Link href="/">
      <Image src= "/images/logo.png" width={120} height={120}
       alt='logo' className='hidden lg:block'/>
      <Image src= "/images/logo-sm.png" width={70} height={70}
       alt='logo' className='lg:hidden'/> 
    </Link>
  )
}

export default BrandLogo
