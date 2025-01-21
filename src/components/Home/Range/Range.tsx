import Image from 'next/image'
import React from 'react'

const Range = () => {
  return (
    <section className='h-full flex  flex-col items-center  justify-center   w-full bg-white'>
        <div className='h-full md:h-[685px] w-full md:w-[1188px] flex items-center flex-col space-y-4 md:space-y-0 justify-between '>
          <div className='h-[76px] md:w-[559px] flex items-center flex-col '>
             <h2 className='text-[24px] md:text-[32px] font-bold text-myblack'>Browse The Range</h2>
              <p className='text-[14px] md:text-[20px] font-normal text-mygray'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className='md:h-[537px] w-full grid grid-cols-1 md:grid-cols-3 px-6 sm:px-0 gap-6 '>
            <div className='h-full w-[381px] flex flex-col items-center justify-between bg-white'>
                <Image src='/images/dining.png' alt='range' width={762} height={508} />
                <p className='text-[24px] font-semibold text-myblack'>Dining</p>
            </div>
            <div className='h-full w-[381px] flex flex-col items-center justify-between bg-white'>
                <Image src='/images/living.png' alt='range' width={762} height={508} />
                <p className='text-[24px] font-semibold text-myblack'>Living</p>
            </div>
            <div className='h-full w-[381px] flex flex-col items-center justify-between bg-white'>
                <Image src='/images/bedroom.png' alt='range' width={762} height={508} />
                <p className='text-[24px] font-semibold text-myblack'>Bedroom</p>
            </div>
           
          </div>
        </div>
    </section>
  )
}

export default Range
