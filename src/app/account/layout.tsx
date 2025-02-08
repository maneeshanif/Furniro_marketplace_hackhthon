"use client"
import { Menu} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"


import { useState } from "react"
import { UserProvider } from "@/context/UserContext"
import SidebarContent from "@/components/navbar/Sidebar"





export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <UserProvider>
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 border-r bg-white lg:block">
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="mt-20">
            <Button variant="ghost" size="icon" className="lg:hidden absolute left-4 top-4">
              <Menu className="h-20 w-20 " />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex-1 overflow-auto mt-14">
          <div className="container max-w-7xl p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </UserProvider>
  )
}
