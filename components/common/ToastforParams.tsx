"use client"

import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastforParams() {

    const params = useSearchParams()

    useEffect(() => {
        if (params?.get("success") && params?.get("success") != "") {
            toast.success(params?.get("success"), { theme: "colored" });
        }
        else if(params?.get("error") && params?.get("error") != ""){
            toast.error(params?.get("error"), { theme: "colored" });
        }
    }, [params]) // agr params me koi change ata hai toh useEffect hook run hoga

  return (
    <div>
      <ToastContainer />
    </div>
  )
}

export default ToastforParams
