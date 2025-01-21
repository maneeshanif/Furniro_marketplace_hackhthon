import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'

const Contact = () => {
  return (
    <div className='min-h-full w-full flex flex-col  bg-white items-center  '>
        {/* banner */}
       <div className='h-full md:h-[316px] w-[90%] md:w-[1440px] flex flex-col  items-center justify-center'>
       <div className=' md:h-[316px] relative w-[90%] md:w-[1440px] '>
      <Image src={'/images/shopbenner.png'} alt='hero' width={1440} height={316} />
      <div className='w-[150px] md:w-[124px] absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] h-[90%] flex flex-col justify-center items-center md:h-[84px] '>
        <h1 className='font-medium text-4xl text-black'>Contact</h1>
        <p className='font-normal text-[16px] text-mygray'>home&gt;Contact</p>
        </div>
      </div>
      </div>
      {/* conatct from */}
      <div className='h-[1144px] w-[90%] md:w-[1440px] flex flex-col space-y-2 py-12 items-center justify-center '>
        <div className='h-[90px] w-[90%] md:w-[680px] flex flex-col items-center justify-center '>
           <h2 className='font-semibold text-[20px] md:text-[32px] text-black'>Get In Touch With Us</h2> 
           <p className='font-normal text-[12px] md:text-[16px] text-mygray'>For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>

        </div>
        <div className='h-full md:h-[923px] w-[90%]  md:w-[1050px] flex md:flex-row space-y-2 flex-col justify-between items-center '>
         <div className='h-[90%] md:h-[537px] w-[90%] flex justify-center items-center  md:w-[393px] '>
            <div className='h-[90%] md:h-[437px] w-[90%] flex flex-col   justify-center items-center md:w-[273px]'>
              <div className='  flex  justify-between space-x-2  h-full w-full'>
                <span className='h-[28px] w-[22px]'><Image src={'/images/filter/map.png'} alt='hero' width={22} height={27} /></span>
                <div >
                    <h2 className='font-semibold text-[18px] md:text-[24px] text-black'>Address</h2>
                    <p className='font-normal text-[12px] md:text-[16px] text-mygray'>236 5th SE Avenue, New York NY10000, United States</p>
                </div>
              </div>
              <div className='  flex flex-row justify-between space-x-2  h-full w-full'>
                <span className='h-[28px] w-[22px]'><Image src={'/images/filter/bxs_phone.png'} alt='hero' width={22} height={27} /></span>
                <div >
                    <h2 className='font-semibold text-[18px] md:text-[24px] text-black'>Phone</h2>
                    <p className='font-normal text-[12px] md:text-[16px] text-mygray'>Mobile: +(84) 546-6789
                    Hotline: +(84) 456-6789</p>
                </div>
              </div>
              <div className='  flex flex-row justify-between space-x-2  h-full w-full'>
                <span className='h-[28px] w-[22px]'><Image src={'/images/filter/bi_clock-fill.png'} alt='hero' width={22} height={27} /></span>
                <div >
                    <h2 className='font-semibold text-[18px] md:text-[24px] text-black'>Working Time</h2>
                    <p className='font-normal text-[12px] md:text-[16px] text-mygray'>Monday-Friday: 9:00 - 22:00
                    Saturday-Sunday: 9:00 - 21:00</p>
                </div>
              </div>
            </div>
         </div>

         <div className='h-[90%] md:h-[923px] w-[90%] md:w-[635px]  flex justify-center items-center   '>
            <div className='h-[90%] md:h-[741px]  flex flex-col justify-between gap-2 w-full '>
               <div className='h-[121px] w-full flex flex-col justify-between'>
               <label htmlFor="name" className='font-semibold text-[16px]  text-black'>Your name</label>
               <input type="text" id="name" placeholder='Abc' className='h-[50px] w-full bg-white border-2 border-gray-300 rounded-md px-2 py-2' />
               </div>
               <div className='h-[121px] w-full flex flex-col justify-between'>
               <label htmlFor="email" className='font-semibold text-[16px]  text-black'>Email</label>
               <input type="email" id="email" placeholder='Abc@def.com' className='h-[50px] w-full border-2 border-gray-300 bg-white rounded-md px-2 py-2' />
               </div>
               <div className='h-[121px] w-full flex flex-col justify-between'>
               <label htmlFor="sbj" className='font-semibold text-[16px]  text-black'>Subject</label>
               <input type="text" id="sbj" placeholder='This is an optional' className='h-[50px] w-full border-2 border-gray-300 bg-white rounded-md px-2 py-2' />
               </div>
               <div className='h-[161px] w-full flex flex-col justify-between'>
               <label htmlFor="textarea" className='font-semibold text-[16px]  text-black'>Message</label>
               <textarea cols={30} rows={5} id="textarea" placeholder='Hi! i’d like to ask about' className=' w-full border-2 border-gray-300 bg-white rounded-md px-2 py-2' />
               </div>
               <Button variant='primary' size='xs'>Submit</Button>
            </div>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
