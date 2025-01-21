"use client"
import { Button } from '@/components/ui/button'
import React, { useState, useEffect } from 'react'
import CardProd from '@/components/shop/prodcard/CardProd'
import ProductFetch from '../../../utils/ProductFetch'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(1);
  const productsPerRow = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await ProductFetch;
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleShowMore = () => {
    setVisibleProducts((prev) => prev + 1);
  };

  const visibleProductsArray = products.slice(0, visibleProducts * productsPerRow);

  return (
    <section className='flex py-10 items-center justify-center bg-white'>
      <div className='w-full md:w-[1236px] flex flex-col items-center justify-between py-1 bg-white'>
        <h1 className='text-[40px] font-bold text-myblack'>Our Products</h1>
        <div className='w-[90%] md:w-[1236px] md:px-0 px-12 grid grid-cols-1 md:grid-cols-4 gap-3 mb-4 bg-white'>
          {visibleProductsArray.map((product, index) => (
            <CardProd  key={index} Product={product} />
          ))}
        </div>
        {visibleProducts * productsPerRow < products.length && (
          <Button variant='products' size='sx' onClick={handleShowMore}>
            Show More
          </Button>
        )}
      </div>
    </section>
  );
};

export default Products;












// "use client"
// import { Button } from '@/components/ui/button'
// import React, { useState } from 'react'
// import CardProd from '@/components/shop/prodcard/CardProd'
// import ProductFetch from '../../../utils/ProductFetch'

// const products = await ProductFetch

// const Products = () => {
//   const [visibleProducts, setVisibleProducts] = useState(1); 

//   const productsPerRow = 4; 
//   const handleShowMore = () => {
//     setVisibleProducts((prev) => prev + 1); 
//   };

//   return (
//     <section className=' flex py-10 items-center justify-center  bg-white'>
//       <div className=' w-full md:w-[1236px] flex flex-col items-center justify-between py-1 bg-white'>
//         <h1 className='text-[40px] font-bold text-myblack'>Our Products</h1>
//         <div className=' w-[90%] md:w-[1236px] md:px-0 px-12 grid grid-cols-1 md:grid-cols-4 gap-3 mb-4 bg-white'>
//           <CardProd Product={products} />
//           {/* {products.slice(0, visibleProducts * productsPerRow)} */}
//         </div>
//         {visibleProducts * productsPerRow < products.length && (
//           <Button variant='products' size='sx' onClick={handleShowMore}>
//             Show More
//           </Button>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Products;










