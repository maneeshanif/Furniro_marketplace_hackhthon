"use client";
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from '../prodcard/CardProd';
import ProductCardSkeleton from '../prodcard/CardSkeleton';
import ShopPagination from './Pagination';
import Image from 'next/image';
import ProductFetch from '../../../utils/ProductFetch';
import CustomerCare from '@/components/CustomerCare/CustomerCare';


interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  isNew: boolean;
  tags: string[];
  imageUrl: string;
}

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {
            const data = await ProductFetch;
            setProducts(data);
            setFilteredProducts(data);
       
          };
     fetchProducts();
  
 
    setLoading(false);
  }, []);


  
  type SortOrder = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
  
  const handleSort = (value: SortOrder) => {
    let sorted = [...filteredProducts];
    switch (value) {
      case 'price-asc':
        sorted.sort((a: Product, b: Product) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a: Product, b: Product) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a: Product, b: Product) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        sorted.sort((a: Product, b: Product) => b.title.localeCompare(a.title));
        break;
      default:
        sorted = [...products];
    }
    setFilteredProducts(sorted);
    setCurrentPage(1);
  };



  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className='min-h-full w-full flex flex-col bg-white items-center'>
      {/* Banner */}
      <div className='h-full md:h-[316px] w-[90%] md:w-[1440px] flex flex-col items-center justify-center'>
        <div className='md:h-[316px] relative w-[90%] md:w-[1440px]'>
          <Image
            width={1440}
            height={316}
            src='/images/shopbenner.png'
            alt="Shop banner"
            className="w-full h-full object-cover"
          />
          <div className='w-[150px] md:w-[124px] absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] h-[90%] flex flex-col justify-center items-center md:h-[84px]'>
            <h1 className='font-medium text-4xl text-black'>Shop</h1>
            <p className='font-normal text-[16px] text-mygray'>home&gt;Shop</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='h-[80px] px-4 md:px-0 flex items-center justify-center md:h-[100px] w-full md:w-[1440px] bg-peach'>
        <div className='h-full md:h-[38px] w-[1240px] flex flex-col md:flex-row items-center justify-between'>
          <div className='h-full w-full md:w-[500px] flex items-center justify-between'>
                {/* box 1 */}
         <div className='h-[30px] w-[58px] flex items-center '>
          <Image src={'/images/filter/filter1.png'} alt='hero' width={58} height={30} />
         </div>
         {/* box 2 */}
         <div className='h-[30px] w-[58px] flex  justify-between items-center '>
          <span className='h-[28px] w-[28px] '><Image src={'/images/filter/filter2.png'} alt='hero' width={28} height={20} /></span>
          <span className='h-[24px] w-[24px] '><Image src={'/images/filter/filter3.png'} alt='hero' width={24} height={24} /></span>
         </div>
            <span className='h-[37px] md:w-[285px] flex items-center justify-end'>
              <h2 className='text-[16px] font-semibold text-myblack'>
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} results
              </h2>
            </span>
          </div>

          <div className='h-[38px] w-full md:w-[500px] flex items-center justify-between '>
            <Select onValueChange={(value) => setItemsPerPage(Number(value))} defaultValue="16">
            <p className='text-[16px] font-semibold text-myblack'>Show</p>
              <SelectTrigger className="w-[55px] rounded-none bg-white">
                <SelectValue placeholder="Show" />
              </SelectTrigger>
              <SelectContent className='bg-white'> 
                {[8, 12, 16, 20].map(num => (
                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={handleSort} defaultValue="default">
            <p className='text-[16px] font-semibold text-myblack'>Sort By</p>
              <SelectTrigger className="w-[188px] bg-white rounded-none">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className='w-[90%] min-h-screen md:w-[1440px] flex flex-col justify-between  pb-10 items-center'>
        <div className='w-[90%] md:w-[1340px] md:px-auto px-6 grid grid-cols-1 py-6 md:grid-cols-4 gap-2'>
          {loading ? (
            Array(8).fill(null).map((_, index) => (
              <div className='w-full h-screen'  key={index} >
              <ProductCardSkeleton/>
              </div>
            ))
          ) : (
            displayedProducts.map((product, index) => (
              <ProductCard
                key={index}
                Product={product}
              
              />
            ))
          )}
        </div>
 
        <ShopPagination
      
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
            <CustomerCare  />
      </div>
    </div>
  );
};

export default Shop;


