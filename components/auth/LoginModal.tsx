"use client"

import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { X } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema, loginType } from '@/validations/authSchema'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import SocialBtns from './SocialBtns'

function LoginModal() {

    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const supabase = createClientComponentClient()

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<loginType>({
        resolver: yupResolver(loginSchema),
    })

    const onSubmit = async(payload: loginType) => {
        setLoading(true)
        const {data, error} = await supabase.auth.signInWithPassword({
            email: payload.email,
            password: payload.password
        })

        setLoading(false)
        if(error){
            toast.error(error.message, {theme: "colored"})
        }
        else if(data.user){
            setOpen(false)
            router.refresh()
            toast.success("Logged in successfully!", { theme: "colored" });
        }
    }

  return (
    <>

    <ToastContainer />

    <AlertDialog open={open}>
        <AlertDialogTrigger asChild>
        <li className='hover:bg-gray-200 cursor-pointer rounded-md p-2' onClick={() => setOpen(true)}>
            Login
        </li>
        </AlertDialogTrigger>
        <AlertDialogContent>       
            <AlertDialogHeader>
               <AlertDialogTitle asChild>
                <div className='flex justify-between items-center'>
                    <span>Login</span>
                    <X onClick={() => setOpen(false)} className='cursor-pointer'/>
                </div>
               </AlertDialogTitle>
               <AlertDialogDescription asChild> 
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1 className='text-lg font-bold'>Welcome to Airbnb</h1>
                        <div className='mt-4'>
                            <Label htmlFor='email'>Email</Label>
                            <Input type="email" placeholder='Enter your email' id='email'
                            {...register("email")}
                            />
                            <span className='text-red-400'>{errors.email?.message}</span>
                        </div>
                        <div className='mt-4'>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" placeholder='Enter your password' id='password'
                            {...register("password")}
                            />
                            <span className='text-red-400'>{errors.password?.message}</span>
                        </div>
                        <div className='mt-5'>
                            <Button className='bg-brand w-full' disabled={loading}>{loading ? "Processing" : "Continue"}</Button>
                        </div>
                        <h1 className='text-center font-bold my-2 text-lg'> -- OR -- </h1>
                        
                    </form> 
                    
                    <SocialBtns />
                </div>
               </AlertDialogDescription>
            </AlertDialogHeader>
        </AlertDialogContent>
    </AlertDialog>
    </>
  )
}

export default LoginModal
