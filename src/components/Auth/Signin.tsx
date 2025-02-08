"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { logInSchema } from '@/validation/signinvaldation'

const Signin = () => {
    
    const router = useRouter()

    const [inputValues, setinputValues] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const schemaResponse = await logInSchema.safeParseAsync(inputValues)
        if (!schemaResponse.success) return toast.error("Invalid Email or Password")

         const response = await fetch("/api/auth/signin",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputValues)
         })   
         console.log(response)

         if(response.ok){
            const result = await response.json()
            toast(result.message)
            router.push("/")
         }
         if(!response.ok){
            const result = await response.json()
            toast(result.message)
            throw new Error("login failed")
         }

    }

  return (
    <div className=' w-full flex flex-col  bg-white items-center  '>
          {/* banner */}
       <div className='h-full md:h-[316px] w-[90%] md:w-[1440px] flex flex-col  items-center justify-center'>
       <div className=' md:h-[316px] relative w-[90%] md:w-[1440px] '>
      <Image src={'/images/shopbenner.png'} alt='hero' width={1440} height={316} />
      <div className='w-[150px] md:w-[124px] absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] h-[90%] flex flex-col justify-center items-center md:h-[84px] '>
        <h1 className='font-medium text-4xl text-black'>SignIn</h1>
        <p className='font-normal text-[16px] text-mygray'>home&gt;Signin</p>
        </div>
      </div>
      </div>
      {/* signup */}
      <div className=' w-[90%] md:h-[760px] md:w-[1440px] flex flex-col  space-y-2 py-12 items-center justify-center    '>
      {/* form */}
       <form onSubmit={handleSubmit} className='w-[90%] min-h-[400px]  md:w-[608px] flex justify-center items-center flex-col space-y-2'>
        <h2 className='font-semibold text-center text-[20px] md:text-[32px] text-black'>Sign-In</h2>

    <label htmlFor="email" className="text-start  text-black">Email</label>
     <input type="email"   onChange={(e) => setinputValues({
                            ...inputValues, email: e.target.value
                        })}
                        value={inputValues.email} id="email" className="w-full p-4 md:w-[453px] h-[75px] bg-white rounded-lg  border-gray-400 border" />
    <label htmlFor="password" className="text-start text-black">Password</label>
     <input type="password"   onChange={(e) => setinputValues({
                            ...inputValues, password: e.target.value
                        })}
                        value={inputValues.password} id="password" className="w-full p-4 md:w-[453px] h-[75px] bg-white rounded-lg  border-gray-400 border" />
     <p className='font-normal text-[16px] text-mygray'>Dont have an account? <span className='text-golden'><Link href={'/signup'}>Register</Link></span></p>
     <Button type='submit' variant='primary' className='w-[90%] md:w-[253px] h-[50px] text-white' >Signin</Button>
       </form>
      </div>

     </div>
  )
}

export default Signin