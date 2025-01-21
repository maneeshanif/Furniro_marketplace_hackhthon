'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishListContext'
import Image from 'next/image'
import Link from 'next/link'
import { useToast } from "@/hooks/use-toast"
import { QuantityControl } from '@/components/Wishlist/QuantityControl' 




export function WishlistSide() {
    const { state ,updateQuantity } = useCart();
  const { addItem } = useCart();
  const { state: wishlistState, removeItem: removeWishlistItem } = useWishlist()
  const { toast } = useToast()
  
  const handleAddToCart = (item: {
    id: string;
    name: string;
    price: number;
    image: string;
  }) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
    
    toast({
      title: `✅ ${item.name} added to cart`,
      variant: "MyVariant",
    });
  }


  // Add this function to check if item is in cart
  const getCartQuantity = (itemId: string) => {
    const cartItem = state.items.find(item => item.id === itemId);
    return cartItem?.quantity || 0;
  }

  return (
    <Sheet>
  
      <SheetTrigger asChild>
         <Button variant="ghost" size="icon" className="relative ">
           <Image  src='/images/heart.png' alt='search' height={28} width={28} className='h-8 w-8 ' />
           {wishlistState.items.length > 0 && (
             <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-golden  text-white text-xs flex items-center justify-center">
               {wishlistState.items.length}
             </span>
           )}
         </Button>
       </SheetTrigger>
      
      <SheetContent className="w-[320px] sm:w-[540px] overflow-y-scroll">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle> Wishlist</SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 space-y-4 ">
          {wishlistState.items.map((item) => (
            <div key={item.id} className="flex flex-row items-center gap-4 py-4 border-b">
              <div className="relative h-[105px] w-[105px] rounded-lg  bg-red-300 ">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className=""
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-myblack">{item.name}</h3>
              </div>
              <div className="flex items-center gap-2">

              {getCartQuantity(item.id) > 0 ? (
              <QuantityControl
                quantity={getCartQuantity(item.id)}
                onIncrease={() => {
                  const currentQty = getCartQuantity(item.id);
                  updateQuantity(item.id, currentQty + 1);
                }}
                onDecrease={() => {
                  const currentQty = getCartQuantity(item.id);
                  if (currentQty > 1) {
                    updateQuantity(item.id, currentQty - 1);
                  }
                }}
              />
            ) : (
              <Button 
                onClick={() => handleAddToCart(item)}
                className="w-[100px] h-[30px] rounded-full text-black bg-white border border-black hover:bg-golden hover:border-none hover:text-white"
              >
                add to cart
              </Button>
            )}
            {/* ... remove button ... */}
      
                {/* <Button 
                  onClick={() => handleAddToCart(item)} 
                  className="w-[100px] h-[30px] rounded-full text-black bg-white border border-black hover:bg-golden hover:border-none hover:text-white"
                >
                  add to cart
                </Button> */}
              
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500"
                  onClick={() => {
                    removeWishlistItem(item.id)
                    toast({
                      title: `❌${item.name} removed from wishlist`,
                      variant: "MyVariant",
                    })
                  }}
                >
                  <X className="h-20 w-20 " />
                </Button>
              </div>
            </div>
          ))}
           {wishlistState.items.length === 0 && (
            <div className="text-center py-6 text-mygray">
              Your wishlist is empty
            </div>
          )}
        </div>
        {wishlistState.items.length > 0 && (
          <div className="mt-6 space-y-4"  >       
            <div className='flex  gap-2'>
            <Button asChild className="w-[100px] h-[30px] rounded-full text-black bg-white border border-black hover:bg-golden hover:border-none hover:text-white">
              <Link href="/cart">Cart</Link>
            </Button>
            <Button asChild className="w-[100px] h-[30px] bg-white text-black rounded-full border border-black hover:bg-golden hover:border-none hover:text-white">
              <Link href="/checkout">checkout</Link>
            </Button>
            </div>
          </div>

        )}
          
   
       
      </SheetContent>
    </Sheet>
  )
}