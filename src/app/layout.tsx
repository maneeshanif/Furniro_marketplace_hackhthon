import type { Metadata } from "next";
import { Poppins } from "next/font/google";
// import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishListContext";



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],


});


export const metadata: Metadata = {
  title: "Furniro | Furniture (Hub)",
  description: "Furniro is a furniture hub that provides a wide range of furniture products. weather you are looking for a sofa, dining table, chair, or any other furniture, we have it all. We provide the best quality furniture at the best price. Shop now and get the best furniture at the best price. Furniro is the best furniture hub. Funrio is the best place to buy furniture online.Weather Your are one who want to buy furniture online or Local ShopKeeper to Sell Furniture Online At Best Price.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >

        <CartProvider >
          <WishlistProvider >
        <Navbar />
        {children}
        <Toaster />
        <Footer />
        </ WishlistProvider >
        </CartProvider>
      </body>
    </html>
  );
}
