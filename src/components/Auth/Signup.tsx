"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { signUpSchema } from '@/validation/signupvaldation'

const Signup = () => {
 
    
    const [inputValues, setinputValues] = useState({
        name: "",
        email: "",
        password: "",

    })

    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const schemaResponse = await signUpSchema.safeParseAsync(inputValues)

        if (!schemaResponse.success) {
            console.log(schemaResponse.error)
            return toast.error(`${schemaResponse.error?.issues[0]?.message}`)
        }

        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(schemaResponse.data)
        })

        if (!response.ok) {
            const result = await response.json()
            console.log(result)
            toast(result.message)
        }
        const result = await response.json()
        console.log(result)
        toast(result.message)

        if (response.ok) {
            router.push("/signin")
        }
    }

  return (
    <div className=' w-full flex flex-col  bg-white items-center  '>
          {/* banner */}
       <div className='h-full md:h-[316px] w-[90%] md:w-[1440px] flex flex-col  items-center justify-center'>
       <div className=' md:h-[316px] relative w-[90%] md:w-[1440px] '>
      <Image src={'/images/shopbenner.png'} alt='hero' width={1440} height={316} />
      <div className='w-[150px] md:w-[124px] absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] h-[90%] flex flex-col justify-center items-center md:h-[84px] '>
        <h1 className='font-medium text-4xl text-black'>SignUp</h1>
        <p className='font-normal text-[16px] text-mygray'>home&gt;Signup</p>
        </div>
      </div>
      </div>
      {/* signup */}
      <div className=' w-[90%] md:h-[760px] md:w-[1440px] flex flex-col  space-y-2 py-12 items-center justify-center    '>
      {/* form */}
      <form onSubmit={handleSubmit} className='w-[90%] min-h-[400px]  md:w-[608px] flex justify-center items-center flex-col space-y-2'>
      <h2 className='font-semibold text-[20px] text-center md:text-[32px] text-black'>Sign-Up</h2>
        <label htmlFor="username" className="text-start  text-black">Name</label>
     <input type="text"  onChange={(e) => setinputValues({
                            ...inputValues, name: e.target.value
                        })}
                        value={inputValues.name} id="username" className="w-full p-4 md:w-[453px] h-[75px] bg-white rounded-lg  border-gray-400 border" />
    <label htmlFor="email" className="text-start  text-black">Email</label>
     <input type="email" id="email"   onChange={(e) => setinputValues({
                            ...inputValues, email: e.target.value
                        })}
                        value={inputValues.email} className="w-full p-4 md:w-[453px] h-[75px] bg-white rounded-lg  border-gray-400 border" />
    <label htmlFor="password" className="text-start text-black">Password</label>
     <input type="password"   onChange={(e) => setinputValues({
                            ...inputValues, password: e.target.value
                        })}
                        value={inputValues.password} id="password" className="w-full p-4 md:w-[453px] h-[75px] bg-white rounded-lg  border-gray-400 border" />
     <p className='font-normal text-[16px] text-mygray'>Already have an account? <span className='text-golden'><Link href={'/signin'}>Signin</Link></span></p>
     <Button type='submit'  variant='primary' className='w-[90%] md:w-[253px] h-[50px] text-white' >Signup</Button>
       </form>
      </div>

     </div>
  )
}

export default Signup
