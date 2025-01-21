"use client";

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
interface card {
  image: string
  title: string
  description: string
  prize: string,
  oldPrize: string
}
const Card:card[] =[{
  image: '/images/products/1.png',
  title: 'Syltherine',
  description: 'Stylish cafe chair',
  prize: 'Rp 2.500.000',
  oldPrize: 'Rp 3.500.000'
},
{
  image: '/images/products/2.png',
  title: 'Leviosa',
  description: 'Stylish cafe chair',
  prize: 'Rp 2.500.000',
  oldPrize: ''
},
{
  image: '/images/products/3.png',
  title: 'Lolito',
  description: 'Luxury big sofa',
  prize: 'Rp 7.000.000',
  oldPrize: 'Rp 14.000.000'
},
{
  image: '/images/products/4.png',
  title: 'Respira',
  description: 'Outdoor bar table and stool',
  prize: 'Rp 500.000',
  oldPrize: ''
},

]

const RelatedProd = () => {
  return (
    <section className='h-full flex py-10  items-center  justify-center border-b border-mygray  w-full bg-white'>
    <div className='h-full md:h-[777px] w-full md:w-[1236px] flex flex-col items-center justify-between py-1 bg-white'>
      <h1 className='text-[40px] font-bold text-myblack'>Related Products</h1>
      <div className=' md:h-[500px] w-[90%] md:w-[1236px] md:px-0 px-12 grid grid-cols-1 md:grid-cols-4 gap-3 bg-white'>


        {Card.map((card, index) => (
          <div key={index} className='w-[285px] h-[446px] border-2 border-gray-200 bg-white'>
            <div className='w-[285px] h-[301px] bg-gray-300'>
              <Image src={card.image} alt='products' width={285} height={301} />
            </div>
              <div className='w-[285px] flex justify-center items-center h-[145px] bg-white' >
                <div className='w-[249px] flex flex-col justify-between h-[99px] bg-white'>
                    <h1 className='font-semibold text-2xl text-myblack'>{card.title}</h1>
                    <p className='text-mygray text-[16px] font-medium'>{card.description}</p>
                    <div className='flex flex-row justify-between'>
                    <span className='font-semibold text-myblack text-[20px]'>{card.prize} </span> <p className='text-mygray text-[16px] line-through'>{card.oldPrize}</p>
                    </div>
                </div>
              </div>

           </div>
        ))}


    
  
    
  
      
   
   
      </div>
      <Button variant='products' size='sx'>Show More</Button>
    </div>
</section>
  )
}

export default RelatedProd







