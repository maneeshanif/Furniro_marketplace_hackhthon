"use client"
import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';

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

const BillingDetail = ({ onBillingDataChange }: { onBillingDataChange: (billingDetails: BillingDetailsType) => void }) => {
  const { user } = useUser();
  
  // Split the name into first and last name
  const [firstName, lastName] = (user?.name || '').split(' ');
  
  const [formData, setFormData] = useState({
    firstName: firstName || '',
    lastName: lastName || '',
    companyName: "llc",
    country: 'Pakistan',
    street: user?.address || '',
    city: user?.city || '',
    province: user?.state || '',
    phone: user?.phone || '',
    email: user?.email || '',
    additionalInfo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const updatedData = {
      ...formData,
      [id]: value
    };
    setFormData(updatedData);
    
    // Notify parent component of changes
    onBillingDataChange(updatedData);
  };

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      const [newFirstName, newLastName] = (user.name || '').split(' ');
      setFormData(prev => ({
        ...prev,
        firstName: newFirstName || prev.firstName,
        lastName: newLastName || prev.lastName,
        street: user.address || prev.street,
        city: user.city || prev.city,
        province: user.state || prev.province,
        phone: user.phone || prev.phone,
        email: user.email || prev.email
      }));
    }
  }, [user]);

  // Rest of your JSX remains the same, just ensure all inputs use handleInputChange
  return (
        <div className="h-full flex gap-2 flex-col items-center w-[90%] md:w-[608px]">
          <h1 className="font-medium text-2xl text-black">Billing Details</h1>
          <div className="md:w-[453px] justify-between gap-2 flex h-[75px]">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-start text-black">First Name</label>
              <input 
                type="text" 
                id='firstName'
                value={formData.firstName}
                onChange={handleInputChange}
                className="md:w-[211px] p-4 w-[172px] h-[75px] bg-white rounded-lg border-gray-400 border"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-start text-black">Last Name</label>
              <input 
                type="text" 
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="md:w-[211px] p-4 w-[172px] h-[75px] bg-white rounded-lg border-gray-400 border"
              />
            </div>
          </div>
    
          <label htmlFor="companyName" className="text-start text-black">Company Name(Optional)</label>
          <input 
            type="text" 
            id="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="w-full p-4 md:w-[453px] h-[75px] bg-white rounded-lg border-gray-400 border"
          />
    
          <label htmlFor="country" className="text-start text-black">Country / Region</label>
          <input 
            type="text" 
            id="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full p-4 md:w-[453px] h-[75px] bg-white rounded-lg border-gray-400 border"
          />
    
          <label htmlFor="street" className="text-start text-black">Street Address</label>
          <input 
            type="text" 
            id="street"
            value={formData.street}
            onChange={handleInputChange}
            className="w-full p-4 md:w-[453px] h-[75px] bg-white rounded-lg border-gray-400 border"
          />
    
          <label htmlFor="city" className="text-start text-black">Town / City</label>
          <input 
            type="text" 
            id="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full p-4 md:w-[453px] h-[75px] bg-white rounded-lg border-gray-400 border"
          />
    
          <label htmlFor="province" className="text-start text-black">Province</label>
          <input 
            type="text" 
            id="province"
            value={formData.province}
            onChange={handleInputChange}
            className="w-full p-4 md:w-[453px] h-[75px] bg-white rounded-lg border-gray-400 border"
          />
    
          <label htmlFor="phone" className="text-start text-black">Phone</label>
          <input 
            type="text" 
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-4 md:w-[453px] h-[75px] bg-white rounded-lg border-gray-400 border"
          />
    
          <label htmlFor="email" className="text-start text-black">Email Address(Optional)</label>
          <input 
            type="text" 
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-4 md:w-[453px] h-[75px] bg-white rounded-lg border-gray-400 border"
          />
    
          <input 
            type="text" 
            id="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            className="w-full md:w-[453px] h-[75px] p-4 bg-white rounded-lg border-gray-400 border mt-8"
            placeholder="Additional information"
          />
        </div>
      );
};

export default BillingDetail;
