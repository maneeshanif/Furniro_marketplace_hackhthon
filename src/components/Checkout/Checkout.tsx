

"use client"
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import CheckOutBanner from "./SubComponents/CheckOutBanner";
import BillingDetail from "./SubComponents/BillingDetail";
import OrderSummary from "./SubComponents/OrderSummary";


interface BillingDetailsType {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  street: string;
  city: string;
  province: string;
  phone: string | number;
  email: string;
  additionalInfo: string;
}

const Checkout = () => {
  const router = useRouter();
  const { user } = useUser();
  const { state, removeItem , clearCart } = useCart();
  const [billingDetails, setBillingDetails] = useState<BillingDetailsType | null>(null);

  const handleBillingDataChange = (data: BillingDetailsType ) => {
    setBillingDetails(data);
  };

  const handlePlaceOrder = async () => {
    if (!user || !billingDetails) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId:  user._id,
          billingDetails,
          orderItems: state.items,
          status: 'pending',
          paymentMethod: 'bank',
          total: state.total
        }),
      });

     console.log(user._id)

      const data = await response.json();

      if (data.success) {
        removeItem(data);
        clearCart();
        localStorage.removeItem("cart"); // Clear invalid data
        router.push(`/account/orders`);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="min-h-full w-full flex flex-col bg-white items-center">
      <CheckOutBanner />
      <div className="h-full w-full md:w-[1440px] flex justify-center items-center">
        <div className="h-full md:py-24 py-0 w-[90%] md:w-[1242px] flex md:flex-row gap-16 md:items-start items-center flex-col-reverse justify-between">
          <BillingDetail onBillingDataChange={handleBillingDataChange} />
          <OrderSummary onPlaceOrder={handlePlaceOrder}  />
        </div>
      </div>
    </div>
  );
};

export default Checkout;








