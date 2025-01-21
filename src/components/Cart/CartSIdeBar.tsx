'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { useToast } from "@/hooks/use-toast"
export function Cart() {
  const { state, removeItem, updateQuantity } = useCart()
  const { toast } = useToast()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative ">
          <Image src={'/images/shopping-cart.png'} alt='search' height={28} width={28} className='h-8 w-8 ' />
          {state.items.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-golden  text-white text-xs flex items-center justify-center">
              {state.items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[320px] sm:w-[540px] overflow-y-scroll">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>Shopping Cart</SheetTitle>

        </SheetHeader>
        <div className="mt-8 space-y-4 ">
          {state.items.map((item) => (

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
                <p className="text-sm text-golden">1 × ${item.price.toFixed(2)}</p>
              </div>
              {/* Quantity */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                >
                  -
                </Button>
                <span className="w-8 text-center  text-myblack">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500"
                  onClick={() => {removeItem(item.id)
                  toast({
                    title: `❌  ${item.name} removed from cart`,
                   
                    variant: "MyVariant",
                  });
                }
                  }
                  
                >
                  <X className="h-20 w-20 " />
                </Button>
              </div>
            </div>
          ))}
          {state.items.length === 0 && (
            <div className="text-center py-6 text-mygray">
              Your cart is empty
            </div>
          )}
        </div>
        {state.items.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between font-medium">
              <span className='text-myblack'>Subtotal:</span>
              <span className='text-golden'>Rs {state.total.toFixed(2)}</span>
            </div>
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