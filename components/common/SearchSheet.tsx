"use client"

import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Search } from 'lucide-react'
import MobileNav from '../header/MobileNav'
import SearchSheetNav from '../header/SearchSheetNav'
import DatePicker from './DatePicker'
import { Button } from '../ui/button'
import { addDays, format, differenceInDays, parse } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchSheet({session}:{session:any}) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const params = useSearchParams()
  const [dateState, setDateState] = useState([
    {
        startDate: new Date(),
        endDate: addDays(new Date, 7),
        key: "selection"
    }
  ])

  const [search, setSearch] = useState<string>("")
  const [searchedParams, setSearchedParamas] = useState({
    country: "",
    days: ""
  })


const handleDateChange = (data: any) => {
  setDateState([data?.selection])
}

useEffect(() => {
  const difference = differenceInDays(
    parse(params?.get("endDate")!, "dd-MM-y", new Date()), // we are parse the date value bcoz in params we get these values in string so we have to parse it into date
    parse(params?.get("startDate")!, "dd-MM-y", new Date()) // iska matlab hai ki params(url) me se startdate and enddate nikal ke do aur unke beech ka difference nikal ke do
  )

  if(difference){
    setSearchedParamas({
      ...searchedParams,
      country: params.get("country") ? params.get("country")! : "",
      days: `${difference} days`
    })
  }
}, [params])

const handleSubmit = () => {
  const startdate = format(dateState[0].startDate, "dd-MM-y")
  const enddate = format(dateState[0].endDate, "dd-MM-y")
  router.replace(`/?country=${search}&startDate=${startdate}&endDate=${enddate}`)
  setOpen(false)
}


  return (
    <div>
      <Sheet open = {open}>
        <SheetTrigger asChild>
        <div className='w-full md:w-auto cursor-pointer' onClick={() => setOpen(true)}>
            <div className='hidden md:flex items-center space-x-2 border rounded-3xl p-2'>
                <span className='text-sm pl-2'>
                  {searchedParams.country != "" ? searchedParams.country : "Anywhere"}</span>
                <span>|</span>
                <span className='text-sm'>
                  {searchedParams.days != "" ? searchedParams.days : "Any week"}</span>
                <span>|</span>
                <span className='text-sm pr-2 text-gray-500'>Add guest</span>
                <span className='bg-brand p-2 text-white rounded-full'>
                <Search height={17} width={17}/>
                </span>
            </div>
            <MobileNav />
      </div>
        </SheetTrigger>
        <SheetContent side="top">
            <SheetHeader>
            <SheetTitle>
                <SearchSheetNav session={session} searchInputCallback={setSearch}/>
            </SheetTitle>
            <SheetDescription>
                <div className='text-center'>
                <DatePicker state={dateState} dateChangeCallback={handleDateChange} />
                <div className='flex justify-center space-x-4 my-4'>
                  <Button className='bg-brand' onClick={handleSubmit}>
                    Search
                  </Button>
                  <Button variant='outline' onClick={() => setOpen(false)}>Close</Button>
                </div>
                </div>
            </SheetDescription>
            </SheetHeader>
        </SheetContent>
      </Sheet>
    
    </div>
  )
}
