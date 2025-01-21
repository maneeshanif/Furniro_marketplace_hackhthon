import React from 'react'
import Image from 'next/image'
import  CardProdProps  from '@/types/product'
import ProductFetch from '@/utils/ProductFetch'


const products = await ProductFetch

const ProdDesc = ({_id}:{_id:string}) => {
  const product = products.find((product:CardProdProps) => product._id === _id)
  return (
    <section className='min-h-[620px] w-full flex flex-col  py-6 items-center md:px-0 px-4  border-y border-mygray '>
    <div className=' h-[1200px] flex items-center justify-between  md:h-[730px] flex-col   w-full md:w-[1440px] '>
      {/* heading */}
      <div className='h-[36px] w-full md:w-[649px] flex justify-between items-center '>
      <h2 className='font-normal text-[12px] md:text-[24px]  text-black'>Description</h2>
      <h2 className='font-normal text-[12px] md:text-[24px] text-mygray'>Additional Information</h2>
      <h2 className='font-normal text-[12px] md:text-[24px] text-mygray'>Reviews [5]</h2>
      </div>
      {/* para */}
      <div className='md:w-[1026px] flex flex-col gap-4'>
        <p className='font-normal text-[16px]  text-mygray'>{product?.description}</p>
        {/* <p className='font-normal text-[16px]  text-mygray'>Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.</p> */}
        {/* <p className='font-normal text-[16px]  text-mygray'>Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.</p> */}
      </div>
      {/* image */}
      <div className='h-[700px] md:h-[348px] md:w-[1120px] flex gap-4 md:flex-row flex-col items-start '>
  <Image src={'/images/filter/Cloudsofathreeseater2.png'} alt='hero' width={605} height={348} className="md:w-[605px] h-[348px]  bg-peach"/>
  <Image src={'/images/filter/Cloudsofathreeseater.png'} alt='hero' width={605} height={348} className="md:w-[605px] h-[348px]  bg-peach"/>
      </div>
    </div>
    </section>
  )
}

export default ProdDesc
