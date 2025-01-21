"use client"
import React, { useState  } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaShareAlt } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'
import  ProductProdProps  from '@/types/product'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishListContext'
import { useToast } from "@/hooks/use-toast"
import { Heart } from 'lucide-react'

const CardProd = ({Product}:{Product: ProductProdProps}) => {
  const { toast } = useToast()

  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist()



  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
        id: Product._id,
        name: Product.title,
        price: Product.price,
        image: Product.imageUrl,
        quantity: 1
    });
    toast({
      title: `✅ ${Product.title} added to cart`,
    
      variant: "MyVariant",
    });
   
}
const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
        removeFromWishlist(Product._id);
        toast({title:`❌${Product.title} removed from wishlist`});
    } else {
        addToWishlist({
            id: Product._id,
            name: Product.title,
            price: Product.price,
            image: Product.imageUrl
        });
       
        
        toast({title:`✅${Product.title}  added to wishlist`});
    }
    setIsLiked(!isLiked);
}

   function ViewMore (Product : ProductProdProps){ {
    router.push(`/shop/${Product._id}`)
    console.log('View more clicked');
  }
}

  return (
    <>

      <div  className='w-[285px] h-[446px] border-2 border-gray-200 group relative  '>
       
           <div className='relative'>
          <Image src={Product.imageUrl} alt={Product.title} width={285} height={301} className='w-[285px] h-[301px]  ' />
          {Product.isNew ?  <p className='absolute top-2 left-2 text-[16px] bg-green-500 w-[40px] h-[40px] flex justify-center  rounded-full items-center font-semibold text-white'>New</p> : ''}
         {Product.discountPercentage > 0 ? <p className='absolute top-2 right-2 text-[16px] bg-red-400 w-[40px] h-[40px] flex justify-center  rounded-full items-center font-semibold text-white'>-{Product.discountPercentage}</p> : ''}
          </div>

          {/* hover part  */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/60 w-[285px] h-[446px] ">
                <button className="bg-white text-[#B88E2F] font-bold py-2 px-4 w-[202px] h-[48px] flex justify-center items-center" onClick={handleAddToCart}>
                  Add to Cart
                </button>
                <div className="flex space-x-4 text-[#333333] text-xl">
                  <button>
                    <FaShareAlt />
                  </button>
                  <button onClick={() => {ViewMore(Product)}}>
                  <FaEye />
                 
                  </button>
                  <button onClick={handleToggleWishlist}>
                  {isLiked ? <Heart className="fill-red-500  " /> : <Heart />}
                    {/* <FaRegHeart /> */}
                  </button>
                </div>
              </div>
          
      
          <div className='w-[285px] flex justify-center items-center h-[145px] ' >
            <div className='w-[249px] flex flex-col justify-between h-[99px] bg-white'>
                <h1 className='font-semibold text-2xl text-myblack'>{Product.title}</h1>
                <p className='text-mygray text-[16px] font-medium'>{Product.tags[2]}</p>
                <div className='flex flex-row justify-between'>
              <span className='font-semibold text-myblack text-[20px]'>Rs.{Product.price - (Product.price * Product.discountPercentage / 100) }</span>
           {Product.discountPercentage > 0 ? <p className='text-mygray text-[16px] line-through'>Rs.{Product.price}</p> : ''} 
                </div>
            </div>
          </div>
          </div>

    </>
  )
}


export default CardProd
