"use client"
import React from "react";
import Link from "next/link";
import CheckOutBanner from "./SubComponents/CheckOutBanner";
import BillingDetail from "./SubComponents/BillingDetail";
import { useCart } from "@/context/CartContext";
const Checkout = () => {
   const { state } = useCart() 
   
  
  return (
    <div className="min-h-full w-full flex flex-col  bg-white items-center  ">
      {/* banner */}
     <CheckOutBanner />
      <div className="h-full w-full md:w-[1440px] flex justify-center items-center   ">
        <div className="h-full  md:py-24  py-0 w-[90%] md:w-[1242px] flex  md:flex-row gap-16 md:items-start items-center flex-col-reverse justify-between ">
          {/* Billing Deatils */}
         <BillingDetail />
            {/* Order Summary */}
       

            <div className="w-[90%] md:w-[608px] ">
        <div className="md:w-[533px] flex flex-col gap-6 items-center justify-center w-full  ">
            {/* <table className="w-full  gap-6 flex flex-col  border-b border-mygray ">
                <thead className="flex flex-row justify-between">
                    <tr>
                        <td className="font-medium text-2xl  text-black">Product</td>
                    </tr>
                    <tr>
                        <td className="font-medium text-2xl text-black">Subtotal</td>
                    </tr>
                </thead>
              <tbody
                {state.items.map((item) => (
                  <div   className=" w-full h-full flex gap-6 flex-col " >

                    <tr key={item.id} className="flex flex-row justify-between">
                        <td className="font-normal text-[16px] text-black">{item.name}</td>
                        <td className="font-light text-[16px] text-black">Rs. {item.price}</td>
                    </tr>
                
                   </div>
                ))}
              
                     <tr className="flex flex-row justify-between">

<td className="font-normal text-[16px] text-black">Subtotal</td>
<td className="font-light text-[16px] text-black">Rs. {state.total}</td>
                      </tr >
                 
                    <tr className="flex flex-row justify-between">

                        <td className="font-normal text-[16px] text-black">Total</td>
                        <td className="font-bold text-2xl text-golden">Rs. {state.total}</td>
                    </tr> 
             </tbody>
             {
                  state.items.length == 0 && (
                    <div className="text-center">
                      Your cart is empty
                    </div>
                  )
                }
            </table> */}

<table className="w-full">
                <thead>
                  <tr className="flex flex-row justify-between w-full">
                    <th className="font-medium text-2xl text-black">Product</th>
                    <th className="font-medium text-2xl text-black">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="flex flex-col gap-6 w-full border-b border-mygray">
                  {state.items.map((item) => (
                    <tr key={item.id} className="flex flex-row justify-between w-full">
                      <td className="font-normal text-[16px] text-black">{item.name}</td>
                      <td className="font-light text-[16px] text-black">Rs. {item.price}</td>
                    </tr>
                  ))}
                  
                  {state.items.length > 0 ? (
                    <>
                      <tr className="flex flex-row justify-between w-full">
                        <td className="font-normal text-[16px] text-black">Subtotal</td>
                        <td className="font-light text-[16px] text-black">Rs. {state.total}</td>
                      </tr>
                      <tr className="flex flex-row justify-between w-full">
                        <td className="font-normal text-[16px] text-black">Total</td>
                        <td className="font-bold text-2xl text-golden">Rs. {state.total}</td>
                      </tr>
                    </>
                  ) : (
                    <tr>
                      <td colSpan={2} className="text-center py-4">
                        Your cart is empty
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

            <div className="w-full min-h-[107px]">
              <h1 className="font-normal text-[16px] text-black">Direct Bank Transfer</h1>
              <p className="font-light text-[16px] text-mygray">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
            </div>

            <div className="w-full min-h-[50px]">
              <div className="flex flex-row gap-4">
              <input type="radio" name="payment" id="" className="h-4 w-4"/> 
              <label htmlFor="payment" className="font-normal text-[16px] text-mygray">Direct Bank Transfer</label>
              </div>
              <div className="flex flex-row gap-4">
              <input type="radio" name="cashondelivery" id="" className="h-4 w-4" />
              <label htmlFor="cashondelivery" className="font-normal text-[16px] text-mygray">Cash on Delivery</label>
              </div>
            </div>

            <p className="font-light text-[16px] text-black">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.</p>
          
            <button className='w-[318px] h-[50px]  rounded-xl border-2 border-myblack text-black text-[16px] hover:bg-golden hover:text-white  font-medium'> <Link href={'/'}> Place Order</Link></button> 

        </div>
              
            </div>
        </div>
       </div>
    </div>
  );
};

export default Checkout;
