import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'react-toastify';

function SocialBtns() {

    const supabase = createClientComponentClient()

    // for github login
    const githubLogin = async() => {
        const {error} = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${location.origin}/auth/callback`
            }
        })

        if(error){
            toast.error(error.message, {theme: "colored"})
        }
    }

    // for google login
    const googleLogin = async() => {
      const {error} = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
              redirectTo: `${location.origin}/auth/callback`
          }
      })

      if(error){
          toast.error(error.message, {theme: "colored"})
      }
  }


  return (
    <div>
      <Button variant='outline' className='w-full mt-5' onClick={googleLogin}>
        <Image
        src="/images/google.png"
        alt='google-logo'
        width={24}
        height={24}
        className='mr-4'
        />
        Continue with Google
      </Button>
      <Button variant='outline' className='w-full mt-5' onClick={githubLogin}>
        <Image
        src="/images/github.png"
        alt='google-logo'
        width={24}
        height={24}
        className='mr-4'
        />
        Continue with Github
      </Button>
    </div>
  )
}

export default SocialBtns
