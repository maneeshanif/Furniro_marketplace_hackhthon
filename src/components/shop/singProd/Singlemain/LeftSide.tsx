import React from 'react'
import Image from 'next/image'
import  CardProdProps  from '@/types/product'
import ProductFetch from '../../../../utils/ProductFetch'


const products = await ProductFetch
const LeftSide = ({id}:{id:string}) => {
   const product = products.find((product:CardProdProps) => product._id === id)
  //  console.log(product)
  return (
    <div className='md:h-[500px] md:w-[553px] bg-red-40 flex gap-4 md:flex-row flex-col'>
    {/* small images group */}
    <div className='md:w-[76px] w-full h-[80px] md:h-[416px] flex md:flex-col flex-row justify-between  '>
    {/* box1 */}
  
      <Image  src={product?.imageUrl} alt='hero' width={76} height={80} className="w-[76px] h-[80px]  bg-peach"/>

    {/* box2 */}

    <Image  src={product?.imageUrl} alt='hero' width={76} height={80} className="w-[76px] h-[80px]  bg-peach"/>

    {/* box3 */}
    <Image  src={product?.imageUrl} alt='hero' width={76} height={80} className="w-[76px] h-[80px]  bg-peach"/>

    {/* box4 */}
    <Image  src={product?.imageUrl}alt='hero' width={76} height={80} className="w-[76px] h-[80px]  bg-peach"/>

    </div>
    {/* main prod image big one */}
    <div className='md:w-[481px] md:h-[500px] '>
      <Image src={product?.imageUrl} alt='hero' width={480} height={500} className='md:h-[500px] w-[481px] bg-peach' />
    </div>
  </div>
  )
}

export default LeftSide
