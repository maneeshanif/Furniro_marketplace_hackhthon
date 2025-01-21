import Image from 'next/image'
import React from 'react'

const CustomerCare = () => {
  return (
    <section className='h-full md:h-[270px] py-2 flex justify-center items-center w-[90%] md:w-[1440px] bg-peach'>
       <div className='h-full md:h-[70px]  md:w-[1334px] grid grid-cols-1 gap-2 md:grid-cols-4 '>
      <div className='w-[328px] h-[70px] flex justify-between '>
        <div>
            <Image src="/images/filter/trophy.png" alt="logo" width={60} height={60} className="" />
        </div>
      <div className='flex h-[70px] w-[267px]  flex-col items-center justify-center'>
        <h2 className='font-semibold text-2xl text-myblack'>High Quality</h2>
        <p className='text-mygray text-[16px] font-medium'>crafted from top materials</p>
      </div>
      </div>
      <div className='w-[328px] h-[70px] flex justify-between '>
        <div>
            <Image src="/images/filter/guarantee.png" alt="logo" width={60} height={60} className="" />
        </div>
      <div className='flex h-[70px] w-[267px]  flex-col items-center justify-center'>
        <h2 className='font-semibold text-2xl text-myblack'>Warranty Protection</h2>
        <p className='text-mygray text-[16px] font-medium'>Over 2 years</p>
      </div>
      </div>
      <div className='w-[328px] h-[70px] flex justify-between '>
        <div>
            <Image src="/images/filter/shipping.png" alt="logo" width={60} height={60} className="" />
        </div>
      <div className='flex h-[70px] w-[267px]  flex-col items-center justify-center'>
        <h2 className='font-semibold text-2xl text-myblack'>Free Shipping</h2>
        <p className='text-mygray text-[16px] font-medium'>Order over 150 $</p>
      </div>
      </div>
      <div className='w-[328px] h-[70px] flex justify-between '>
        <div>
            <Image src="/images/filter/customer-support.png" alt="logo" width={60} height={60} className="" />
        </div>
      <div className='flex h-[70px] w-[267px]  flex-col items-center justify-center'>
        <h2 className='font-semibold text-2xl text-myblack'>24 / 7 Support</h2>
        <p className='text-mygray text-[16px] font-medium'>Dedicated support</p>
      </div>
      </div>
   
       </div>
    </section>
  )
}

export default CustomerCare
