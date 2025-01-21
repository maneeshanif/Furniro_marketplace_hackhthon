import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'

const Demo = () => {
  return (
    <section className='h-full md:h-[670px] w-full flex flex-col md:flex-row px-4  space-y-4 md:justify-evenly items-center bg-white'>
        <div className=' h-full md:h-[250px] w-[90%] md:w-[422px] flex flex-col justify-between '>
            <div>
                <h1 className='font-bold text-[40px] text-myblack'>50+ Beautiful rooms 
                inspiration</h1>
                <p className='text-mygray font-medium text-[16px]'>Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
                </div> 
            <Button variant={'primary'} size={'sm1'}>Explore More</Button>
            </div>
        <div className='h-full md:h-[582px] w-full md:w-[870px] flex md:flex-row gap-2 flex-col justify-between'>
            <div className='h-full  md:w-[402px] '>
            <Image src={'/images/filter/khackpeace.png'} alt='demo' width={402} height={582} />
            </div>
            <div className='h-full w-[400px] flex flex-col justify-between  '>
            <Image src={'/images/filter/palamachi.png'} alt='demo' width={400} height={372} />
            <Image src={'/images/filter/indicator.png'} alt='demo' width={120} height={27} className='h-[27px] w-[120px]' />
            </div>
        </div>
    </section>
  )
}

export default Demo
