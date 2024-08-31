"use client";
import { signIn } from 'next-auth/react'
import React from 'react'

const Appbar = () => {
  return (
    <div className="flex justify-between " 
    >
        <div>
            Muzi
        </div>
        <div>
            <button className="m-2 p-2 bg-blue-400" onClick={()=>signIn()}>
                    Signin
            </button>
        </div>
    </div>
  )
}

export default Appbar