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
import { Axis3DIcon, X } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema, registerType } from '@/validations/authSchema'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation'
import SocialBtns from './SocialBtns'

function SignUpModal() {

    const [open, setOpen] = useState<boolean>(false)
    const supabase = createClientComponentClient()
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<registerType>({
        resolver: yupResolver(registerSchema),
    })

      const onSubmit = async(payload: registerType) => {
        setLoading(true)
        const {data, error} = await supabase.auth.signUp({ // functionality of supabase
            email: payload.email,
            password: payload.password,
            options: {
                data: {
                    name: payload.name
                }
            }
        })

        setLoading(false)
        if(error){
            toast.error(error.message, {theme: "colored"})
        }
        else if(data.user){ // agr hume user mil gya hai toh use login bhi krwa do
            await supabase.auth.signInWithPassword({
                email: payload.email,
                password: payload.password
            })

            setOpen(false);
            router.refresh();
            toast.success("Logged in successfully!", { theme: "colored" });
        }
      }

  return (
    <>
    
    <ToastContainer />

    <AlertDialog open={open}>
        <AlertDialogTrigger asChild>
        <li className='hover:bg-gray-200 cursor-pointer rounded-md p-2' onClick={() => setOpen(true)}>
            Signup
        </li>
        </AlertDialogTrigger>
        <AlertDialogContent>       
            <AlertDialogHeader>
               <AlertDialogTitle asChild>
                <div className='flex justify-between items-center'>
                    <span>Signup</span>
                    <X onClick={() => setOpen(false)} className='cursor-pointer'/>
                </div>
               </AlertDialogTitle>
               <AlertDialogDescription>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='text-lg font-bold'>Welcome to Airbnb</h1>
                    <div className='mt-4'>
                        <Label htmlFor='name'>Name</Label>
                        <Input placeholder='Enter your name' id='name'
                        {...register("name")}
                        />
                        <span className='text-red-400'>{errors.name?.message}</span>
                    </div>
                    <div className='mt-4'>
                        <Label htmlFor='email'>Email</Label>
                        <Input placeholder='Enter your mail' id='email'
                        {...register("email")}
                        />
                        <span className='text-red-400'>{errors.email?.message}</span>
                    </div>
                    <div className='mt-4'>
                        <Label htmlFor="password">Password</Label>
                        <Input type= "password" placeholder='Enter your password' id='password'
                        {...register("password")}
                        />
                        <span className='text-red-400'>{errors.password?.message}</span>
                    </div>
                    <div className='mt-4'>
                        <Label htmlFor='confirmPassword'>Confirm Password</Label>
                        <Input type= "password" placeholder='Confirm your password' id='confirmPassword'
                        {...register("password_confirmation")}
                        />
                        <span className='text-red-400'>{errors.password_confirmation?.message}</span>
                    </div>
                    <div className='mt-5'>
                        <Button className='bg-brand w-full' disabled={loading}>{loading ? "Processing" : "Continue"}</Button>
                    </div>
                    <h1 className='text-center font-bold my-2 text-lg'> -- OR -- </h1>

                </form>
                <SocialBtns />
                
               </AlertDialogDescription>
            </AlertDialogHeader>
        </AlertDialogContent>
    </AlertDialog>
    </>
  )
}

export default SignUpModal
