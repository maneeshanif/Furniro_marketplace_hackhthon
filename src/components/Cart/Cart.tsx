"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

const Cart = () => {
   const { state, removeItem,  } = useCart()
  return (
    <>
     <div className=' w-full flex flex-col  bg-white items-center  '>
          {/* banner */}
       <div className='h-full md:h-[316px] w-[90%] md:w-[1440px] flex flex-col  items-center justify-center'>
       <div className=' md:h-[316px] relative w-[90%] md:w-[1440px] '>
      <Image src={'/images/shopbenner.png'} alt='hero' width={1440} height={316} />
      <div className='w-[150px] md:w-[124px] absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] h-[90%] flex flex-col justify-center items-center md:h-[84px] '>
        <h1 className='font-medium text-4xl text-black'>Cart</h1>
        <p className='font-normal text-[16px] text-mygray'>home&gt;Cart</p>
        </div>
      </div>
      </div>
      {/* Cart */}
      <div className=' w-[90%] md:w-[1440px] flex flex-col  space-y-2 py-12 items-center justify-center   '>
        <div className='w-[90%]  md:w-[1240px] gap-4 flex md:flex-row flex-col items-center md:items-start justify-between '>
            <div className=' w-full md:w-[817px] flex flex-col items-center justify-between  '>
                <div className='h-[55px] w-full px-0 md:px-12 flex justify-around items-center bg-peach'>
                    <h2 className='font-medium text-[16px] text-black'>Product</h2>
                    <h2  className='font-medium text-[16px] text-black'>Price</h2>
                    <h2  className='font-medium text-[16px] text-black'>Quantity</h2>
                    <h2  className='font-medium text-[16px] text-black'>Subtotal</h2>
                </div>
                <div className=' w-full flex justify-around mt-4 flex-col gap-2 items-center'>
              
                {state.items.map((item) => (
                  <div key={item.id} className='w-full h-[105px] md:h-[108px] flex flex-row items-center  justify-between '>
                    <div className='w-[100px] h-[100px] flex justify-center items-center '>
                    <Image  src={item?.image} alt='hero' width={100} height={100} className='w-[100px] h-[100px] md:bg-peach' />
                    </div>
                    <div className=' w-full flex h-[25px] md:pr-16 pr-0 px-0  md:px-4 justify-between  '>
                        <h1 className='font-medium text-[12px] md:text-[16px] text-mygray'>{item?.name}</h1>
                        <p className='font-medium text-[12px] md:text-[16px] text-mygray'>{item?.price}</p>
                        <span className='font-medium text-[12px] md:text-[16px] text-myblack h-2 w-2 md:h-8 md:w-8 border border-black flex justify-center items-center rounded-md'>{item?.quantity}</span>
                   
  <p className='font-medium text-[8px]  md:text-[16px] text-black'>
    Rs. {Number(item.price) * Number(item.quantity)}
  </p>


                    </div>
                    <div>
                      <button className='pr-2' onClick={() => removeItem(state.items[0].id)}>
                    <Image  src={'/images/products/deleteicon.png'} alt='hero' width={28} height={28} />
                    </button>
                    </div>
                    </div>
                ))}
                  {state.items.length === 0 && (
            <div className="text-center py-6 text-mygray">
              Your cart is empty
            </div>
          )}
           
       
                </div>
            </div>
            <div className='md:w-[390px] h-[250px] w-[250px] md:h-[390px] flex justify-between items-center bg-peach'>
              <div className='w-[70%] h-[70%] flex flex-col justify-between items-center mx-auto '>
            <h1 className='font-medium text-[16px] md:text-[32px] text-black'>Cart Totals</h1>
            <div>
                <span className='font-medium text-[16px]  text-black'>Subtotal :</span> <span className='font-normal text-[16px]  text-mygray'>Rs {state.total}</span> <br />
                <span className='font-medium text-[16px]  text-black'>Total :</span> <span className='font-medium text-[12px] md:text-[20px]  text-golden'>Rs. {state.total}</span>
            </div>
          <button className='w-[100%] h-[50px]  rounded-xl border-2 border-myblack text-black text-[16px] hover:bg-golden hover:text-white  font-medium'> <Link href={'/checkout'}> checkout </Link></button> 
              </div>
            </div>

        </div>
      </div>

     </div>
      
    </>
  )
}

export default Cart
