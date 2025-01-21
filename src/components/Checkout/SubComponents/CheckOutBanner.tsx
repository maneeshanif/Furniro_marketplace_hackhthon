import React from 'react'
import Image from "next/image";
const CheckOutBanner = () => {
  return (
    <div className="h-full md:h-[316px] w-[90%] md:w-[1440px] flex flex-col  items-center justify-center">
    <div className=" md:h-[316px] relative w-[90%] md:w-[1440px] ">
      <Image
        src={"/images/shopbenner.png"}
        alt="hero"
        width={1440}
        height={316}
      />
      <div className="w-[150px] md:w-[124px] absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] h-[90%] flex flex-col justify-center items-center md:h-[84px] ">
        <h1 className="font-medium text-4xl text-black">Checkout</h1>
        <p className="font-normal text-[16px] text-mygray">home&gt;Checkout</p>
      </div>
    </div>
  </div>
  )
}

export default CheckOutBanner
