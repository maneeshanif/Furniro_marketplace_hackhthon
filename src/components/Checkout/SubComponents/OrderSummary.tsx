"use client"
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface OrderSummaryProps {
  onPlaceOrder: (paymentMethod: string) => Promise<void>;
  // isProcessing: boolean;
}

const OrderSummary = ({ onPlaceOrder}: OrderSummaryProps) => {
  const { state } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleOrderSubmit = async () => {
    if (state.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    try {
      setIsProcessing(true);
      await onPlaceOrder(paymentMethod);
      setIsProcessing(false);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="w-[90%] md:w-[608px]">
      <div className="md:w-[533px] flex flex-col gap-6 items-center justify-center w-full">
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
                 <td className="font-normal text-[16px] text-black">
                   {item.name} × {item.quantity}
                   {/* {item.size && <span className="ml-1 text-mygray">({item.size})</span>} */}
                 </td>
                 <td className="font-light text-[16px] text-black">
                   Rs. {item.price * (item.quantity || 1)}
                 </td>
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
           <h1 className="font-normal text-[16px] text-black">Payment Method</h1>
           <p className="font-light text-[16px] text-mygray">
             {paymentMethod === 'bank' 
               ? 'Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.'
              : 'Pay with cash upon delivery of your order.'}
          </p>
        </div>

         <div className="w-full min-h-[50px]">
           <div className="flex flex-row gap-4">
             <input 
               type="radio" 
               name="payment" 
               id="bank"
               checked={paymentMethod === 'bank'}
               onChange={() => setPaymentMethod('bank')}
               className="h-4 w-4"
             />
             <label htmlFor="bank" className="font-normal text-[16px] text-mygray">
               Direct Bank Transfer
             </label>
           </div>
           <div className="flex flex-row gap-4">
             <input 
               type="radio" 
               name="payment" 
               id="cod"
               checked={paymentMethod === 'cod'}
               onChange={() => setPaymentMethod('cod')}
               className="h-4 w-4" 
             />
             <label htmlFor="cod" className="font-normal text-[16px] text-mygray">
               Cash on Delivery
             </label>
           </div>
         </div>

         <p className="font-light text-[16px] text-black">
           Your personal data will be used to support your experience throughout this website, 
           to manage access to your account, and for other purposes described in our privacy policy.
         </p>
      
      <button 
        onClick={handleOrderSubmit}
        disabled={isProcessing || state.items.length === 0}
        className={`w-[318px] h-[50px] rounded-xl border-2 border-myblack text-black text-[16px] 
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-golden hover:text-white'} 
          font-medium`}
      >
        {isProcessing ? 'Processing...' : 'Place Order'}
      </button>
    </div>
  </div>
  );
};

export default OrderSummary;
