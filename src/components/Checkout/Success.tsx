"use client"
import { Button } from '@/components/ui/button'
// import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const Success = () => {
  const router = useRouter();

  return (
    
    <div className=' w-full flex flex-col  bg-white items-center  '>
         {/* <div className='h-full md:h-[316px] w-[90%] md:w-[1440px] flex flex-col  items-center justify-center'>
             <div className=' md:h-[316px] relative w-[90%] md:w-[1440px] '>
            <Image src={'/images/shopbenner.png'} alt='hero' width={1440} height={316} />
            <div className='w-[150px] md:w-[124px] absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] h-[90%] flex flex-col justify-center items-center md:h-[84px] '>
              <h1 className='font-medium text-4xl text-black'>SuccessPage</h1>
              <p className='font-normal text-[16px] text-mygray'>home&gt;Success</p>
              </div>
            </div>
            </div> */}
            <div className=' w-[90%] md:h-[760px] md:w-[1440px] flex flex-col  space-y-2 py-12 items-center justify-center  bg-background   '>
            <div className="container md:max-w-5xl max-h-7xl rounded-md border border-golden mx-auto flex flex-col justify-between items-center p-4 lg:p-8 bg-white" >
      <p className="text-2xl md:text-4xl font-semibold text-myblack">Your order has been placed successfully ✅</p>
      <p className="text-2xl md:text-4xl font-semibold text-myblack">Thank you for shopping with us 💛</p>
      <div className='flex  md:flex-row flex-col gap-2 items-center'>
      <Button className='mt-4 w-[300px] h-[50px] bg-golden hover:bg-myblack' onClick={()=>router.push('/account/orders')}>View Orders</Button>
      <Button className='mt-4 w-[300px] h-[50px] bg-golden hover:bg-myblack' onClick={()=>router.push('/shop')}>Continue Shopping</Button>
      </div>
    </div>
      </div>
    </div>
  )
}

export default Success