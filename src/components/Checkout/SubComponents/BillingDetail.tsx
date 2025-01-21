import React from 'react'

const BillingDetail = () => {
  return (
    <div className="h-full flex gap-2 flex-col   items-center w-[90%] md:w-[608px] ">
    <h1 className="font-medium text-2xl text-black">Billing Deatils</h1>
    <div className="md:w-[453px] justify-between gap-2 flex  h-[75px] ">
      <div className="flex flex-col ">
      <label htmlFor="fname" className="text-start text-black">First Name</label>
      <input type="text" id='fname' className="md:w-[211px]  p-4 w-[172px] h-[75px] bg-white rounded-lg  border-gray-400 border" />
      </div>
      <div className="flex flex-col">
      <label htmlFor="lname" className="text-start text-black">Last Name</label>
      <input type="text" id="lname" className="md:w-[211px] p-4 w-[172px] h-[75px] bg-white rounded-lg  border-gray-400 border" />
      </div>
    </div>
    <label htmlFor="companyname" className="text-start  text-black">Company Name(Optional)</label>
     <input type="text" id="companyname" className="w-full p-4 md:w-[453px] h-[75px] bg-white rounded-lg  border-gray-400 border" />
    <label htmlFor="country" className="text-start  text-black">Country / Region</label>
     <input type="text" id="country" className="w-full p-4 md:w-[453px] h-[75px] bg-white rounded-lg  border-gray-400 border" />
    <label htmlFor="street" className="text-start text-black">Street Address</label>
     <input type="text" id="street" className="w-full p-4 md:w-[453px] h-[75px] bg-white rounded-lg  border-gray-400 border" />
    <label htmlFor="city" className="text-start text-black">Town / City</label>
     <input type="text" id="city" className="w-full p-4 md:w-[453px] h-[75px] bg-white rounded-lg  border-gray-400 border" />
    <label htmlFor="province" className="text-start text-black">Province</label>
     <input type="text" id="province" className="w-full p-4 md:w-[453px] h-[75px] bg-white rounded-lg  border-gray-400 border" />
     <label htmlFor="phone" className="text-start text-black">Phone</label>
     <input type="text" id="phone" className="w-full p-4 md:w-[453px] h-[75px] bg-white rounded-lg  border-gray-400 border" />
    <label htmlFor="email" className="text-start text-black">Email Address(Optional)</label>
     <input type="text" id="email" className="w-full  p-4 md:w-[453px] h-[75px] bg-white rounded-lg  border-gray-400 border" />
     <input type="text" className="w-full md:w-[453px] h-[75px] p-4 bg-white rounded-lg  border-gray-400 border mt-8"  placeholder="Additional information"/>
  </div>
  )
}

export default BillingDetail
