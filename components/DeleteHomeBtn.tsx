"use client"

import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Trash } from 'lucide-react'
import { Button } from './ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
  

export default function DeleteHomeBtn({id}:{id:number}) {
    const router = useRouter()
    const supabase = createClientComponentClient()

    const deleteHome = async() => {
        const {error} = await supabase.from("add-home").delete().eq("id", id)

        if(error){
            toast.error(error?.message, {theme: "colored"})
            return
        }

        router.refresh()
        toast.success("Deleted successfully!", { theme: "colored" });
    }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
        <Button size="icon" variant="destructive">
            <Trash />
        </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className='bg-brand' onClick={deleteHome}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}
