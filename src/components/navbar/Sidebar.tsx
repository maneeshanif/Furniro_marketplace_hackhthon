"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import {  LayoutDashboard, Loader2, LogOut, ShoppingCart, UserCircle } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"
import { useUser } from "@/context/UserContext"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"


const sidebarLinks = [
    {
      title: "Dashboard",
      href: "/account",
      icon: LayoutDashboard,
    },
    {
      title: "Orders",
      href: "/account/orders",
      icon: ShoppingCart,
    },
    // {
    //   title: "Pending Orders",  soon i will add this think in my marketplace even many more thinks goonna be added soon that will make  my market place top best project inshallah
    //   href: "/profile/pendingorders",
    //   icon: Clock,
    // },
    // {
    //   title: "Order History",
    //   href: "/profile/orderhistory",
    //   icon: History,
    // },
    {
      title: "Update Profile",
      href: "/account/updateprofile",
      icon: UserCircle,
    },
  ]
  


export default function SidebarContent() {
    const pathname = usePathname()
    const { user } = useUser()
  
    const [loading, setloading] = useState(false)
  
    const handleLogOut = async () => {
      setloading(true)
      const response =  await fetch("/api/auth/signout")
      if(!response.ok){
        setloading(false)
        throw new Error("logout failed")
      }
      setloading(false)
  
  
    }
  
    return (
      <div className="flex bg-white h-full flex-col gap-4">
        <div className="flex flex-col gap-4 px-4 py-3">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <Avatar>
              <AvatarImage src={user.image? urlFor(user.image).url() : ""} alt={user.name}  className="h-12 w-12 object-cover rounded-full capitalize"/>
              <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-black">{user.role}</span>
            </div>
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-2 p-4">
            {sidebarLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
  
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                    isActive ? "bg-accent text-accent-foreground" : ""
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.title}
                </Link>
              )
            })}
          </div>
        </ScrollArea>
        <div className="mt-auto p-4">
          <Button  onClick={handleLogOut} variant="ghost" className="w-full justify-start gap-2" size="sm">
            <LogOut className="h-4 w-4"  />
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Logging out..." : "Log out"}
          </Button>
        </div>
      </div>
    )
  }