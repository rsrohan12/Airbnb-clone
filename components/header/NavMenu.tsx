import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { MenuIcon } from 'lucide-react'
import LoginModal from '../auth/LoginModal'
import SignUpModal from '../auth/SignUpModal'
import SignoutBtn from '../auth/SignoutBtn'
import Link from 'next/link'

function NavMenu({session}:{session: object | undefined}) { // to pass the session as parameter
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MenuIcon className='cursor-pointer'/>
      </PopoverTrigger>
      <PopoverContent className='mr-2'>
        <ul>
          {session != null ? <div> 
            <Link href="/dashboard">
              <li className='hover:bg-gray-200 cursor-pointer rounded-md p-2'>
              Dashboard
                      </li>
            </Link>
        <SignoutBtn />
          </div> : 
          <div>
          <LoginModal />
          <SignUpModal />
          </div>}
        </ul>
      </PopoverContent>
    </Popover>
  )
}

export default NavMenu
