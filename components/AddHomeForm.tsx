"use client"
// user can only access this add-home router when he logged in otherwise wo redirect kr jaega home page pe 
// ye wala part humne middleware.ts me handle kr liya hai (redirect wala)
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { countries } from '@/config/countries';
import { categories } from '@/config/categories';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { homeSchema, homeSchemaType } from '@/validations/homeSchema';
import { Button } from './ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { generateRandomNumber } from '@/lib/utils';
import Env from '@/config/Env';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function AddHomeForm() {
  const router = useRouter()
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [homeCategories, setHomeCategories] = useState<Array<string> | []>([]) // homeCategories lega array of string ya toh empty array
  const [loading, setLoading] = useState<boolean>(false)

  const supabase = createClientComponentClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<homeSchemaType>({
    resolver: yupResolver(homeSchema),
})

  useEffect(() => {
    setValue("categories", homeCategories)
    setValue("description", description)
  },[homeCategories, description])

  const handleFilechange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if(file){
      setImage(file);
      setValue("image", file);
    }
  }

  const submit = async(payload: homeSchemaType) => {
    setLoading(true)

    const user = await supabase.auth.getUser()
    const uiquePath = Date.now() + "_" + generateRandomNumber() // simply create a unique id for an image. We can also use uuid here
    const {data:imageData, error:imageErr} = await supabase.storage
    .from(Env.S3_BUCKET)
    .upload(uiquePath, image!) // upload the image in supabase storage

    if(imageErr){
      toast.error(imageErr.message, {theme: "colored"})
      setLoading(false)
      return
    }

    const {error:homeErr} = await supabase.from("add-home").insert({ // "add-home" is the name of the table created at supabase
      user_id: user.data.user?.id, // user_id ke andr logged in user ki id dalo
      country: payload.country,
      state: payload.state,
      city: payload.city,
      title: payload.title,
      price: payload.price,
      description: payload.description,
      categories: homeCategories,
      image: imageData?.path
    })

    if(homeErr){
      toast.error(homeErr.message, {theme: "colored"})
      setLoading(false)
      return
    }

    //home data upload hone k baad user ko dashboard me redirect krwado
    router.push("/dashboard?success=Home added successfully!")

  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='mt-5'>
          <Label htmlFor='title'>Title</Label>
          <Input placeholder="Enter title" id="title"
          {...register("title")}
          />
          <span className='text-brand'>{errors.title?.message}</span>
        </div>
        <div className='mt-5'>
          <Label htmlFor='countries'>Country</Label>
          <select 
          className="outline-brand h-10 px-3 py-2 rounded-md w-full border"
          id="countries"
          {...register("country")}
          > 
            <option value=""> -- Select country -- </option>
            {countries.map((item) => (<option value={item.value} key={item.value}>
              {item.label}
            </option>))}
          </select>
          <span className='text-brand'>{errors.country?.message}</span>
        </div>
        <div className='mt-5'>
          <Label htmlFor='state'>State</Label>
          <Input placeholder="Enter your state" id="state"
          {...register("state")}
          />
          <span className='text-brand'>{errors.state?.message}</span>
        </div>
        <div className='mt-5'>
          <Label htmlFor='city'>City</Label>
          <Input placeholder="Enter your city" id="city"
          {...register("city")}
          />
          <span className='text-brand'>{errors.city?.message}</span>
        </div>
        <div className='mt-5'>
          <Label htmlFor='price'>Price</Label>
          <Input placeholder="Enter your city" id="price"
          {...register("price")}
          />
          <span className='text-brand'>{errors.price?.message}</span>
        </div>
        <div className='mt-5'>
          <Label htmlFor='image'>Image</Label>
          <Input type='file' id="image" onChange={handleFilechange}/>
          <span className='text-brand'>{errors.image?.message}</span>
        </div>
      </div>
      <div className='mt-5 w-full'>
          <Label htmlFor='description'>Description</Label>
          <ReactQuill 
          theme="snow" 
          value={description} 
          onChange={setDescription} />
          <span className='text-brand'>{errors.description?.message}</span>
      </div>
      <div className='mt-5'>
      <Label htmlFor='categories'>Categories</Label>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {categories.map((item) => (
          <div className='flex space-x-4'>
            <input type='checkbox' id={item.name} value={item.name} checked=
            {(homeCategories as string[]).includes(item.name)} 
            onChange={(event) => {
              if(event.target.checked){
                setHomeCategories([...homeCategories, item.name]) // when user select the checked categories
              }
              else{
                const filterCategories = homeCategories.filter(
                  (item) => item !== event.target.value) // when user unselect the checked categories then remove that categories from server
                  setHomeCategories(filterCategories)
              }
            }}
            />
            <Label htmlFor={item.name} className='text-sm font-medium'>{item.name}</Label>
          </div>
        ))}
      </div>
      <span className='text-brand'>{errors.categories?.message}</span>
      </div>
      <Button className='bg-brand mt-5 w-full' disabled={loading}>{loading ? "Processing...": "Submit"}</Button>
    </form>
  )
}
