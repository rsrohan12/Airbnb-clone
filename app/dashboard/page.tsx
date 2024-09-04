import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Navbar from '@/components/header/Navbar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { getS3ImageUrl } from '@/lib/utils'
import { Eye, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DeleteHomeBtn from '@/components/DeleteHomeBtn'
import { Toast } from '@/components/ui/toast'
import ToastforParams from '@/components/common/ToastforParams'
import Link from 'next/link'
  

export default async function page() {
    const supabase = createServerComponentClient({cookies})
    const user = await supabase.auth.getUser()
    const {data:homes, error} = await supabase.from("add-home")
    .select("id, image, title, country, city, price, created_at")
    .eq("user_id", user.data.user?.id) // equal honi chahiye user_id == logged in user ki id
  return (
    <div>
        
        <ToastforParams />

        <Navbar />

      <div className='conatiner mt-5'>
          <Table>
            <TableCaption>Your added homes</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Country</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {homes && homes.map((item) => (
                    <TableRow>
                    <TableCell>{item.country}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                        <Image 
                        src={getS3ImageUrl(item.image)} 
                        width={30} 
                        height={30} 
                        alt='home-img'
                        className='rounded-full shadow-md w-12 h-12'
                        />
                    </TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                        <div className='flex space-x-2'>

                            <DeleteHomeBtn id={item.id} />

                            <Link href={`/home/${item.id}`}>
                                <Button size="icon" className='bg-green-400'>
                                    <Eye />
                                </Button>
                            </Link>
                        </div>
                    </TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
      </div>

    </div>
  )
}
