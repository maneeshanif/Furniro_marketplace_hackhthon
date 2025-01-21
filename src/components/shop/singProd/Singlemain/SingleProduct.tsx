
import React from 'react'
import LeftSide from './LeftSide'
import RightSide from './RightSide'

const SingleProduct = ({_id}:{_id:string}) => {
  return (
    <>
    <section className='min-h-[620px] w-full flex flex-col  pt-6 items-center  '>
    <div className=' h-full flex items-start justify-center gap-8 md:gap-14 md:h-[730px] md:flex-row flex-col w-full md:w-[1440px] '>
  {/* image section */}
    <LeftSide id={_id} />  
  {/* right side */}
   <RightSide  id={_id} />
      
    </div>
    </section>
    </>
  )
}

export default SingleProduct
