'use client'

import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetTrigger 
} from '@/components/ui/sheet'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source: string) {
  return builder.image(source).url()
}

type Product = {
  _id: string
  title: string
  description: string
  tags: string[]
  imageUrl: string
  price: number
  discountPercentage?: number
  isNew?: boolean
  id: string
}

export function SearchSheet() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsLoading(true)
    try {
      const groqQuery = `*[_type == "product" && (
        lower(title) match "*${query.toLowerCase()}*" || 
        lower(description) match "*${query.toLowerCase()}*" ||
        "${query.toLowerCase()}" in tags[]
      )] {
        _id,
        title,
        description,
        tags,
        "imageUrl": image,
        price,
        discountPercentage,
        isNew,
        id
      }`

      const results = await client.fetch(groqQuery)
      setSearchResults(results)
    } catch (error) {
      console.error('Error searching products:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const debounce = <T extends (...args: string[]) => void>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  }

  const debouncedSearch = debounce(handleSearch, 300)

  const getProductImageUrl = (product: Product) => {
    if (product.imageUrl) {
      return urlFor(product.imageUrl)
    }
    return '/images/placeholder-product.png'
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Open search">
          <Image src="/images/search.png" alt="search" height={28} width={28} className="h-8 w-8" />
        </Button>
      </SheetTrigger>

      <SheetContent 
        side="bottom" 
        className="w-[80vw] h-[80vh] mx-auto rounded-t-3xl"
      >
        <SheetHeader className="relative mt-4">
          <SheetTitle className="sr-only">Search Products</SheetTitle>
          <div className="flex items-center gap-2 px-4 w-full max-w-2xl mx-auto">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-2 outline-none text-lg"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                debouncedSearch(e.target.value)
              }}
              aria-label="Search products"
              autoFocus
            />
          </div>
        </SheetHeader>

        <div 
          className="mt-8 px-4 max-w-2xl mx-auto overflow-y-auto max-h-[calc(80vh-120px)]"
          role="region"
          aria-label="Search results"
        >
          {isLoading ? (
            <div className="text-center py-6 text-mygray" role="status">
              Searching...
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((product) => (
                <SheetTrigger asChild  key={product._id} >
                <Link 
                  href={`/shop/${product._id}`} 
                  
                  className="block"
                  aria-label={`View details for ${product.title}`}
                >
                  <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                      <Image
                        src={getProductImageUrl(product)}
                        alt={`Product image of ${product.title}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-myblack">{product.title}</h3>
                      {product.description && (
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {product.description}
                        </p>
                      )}
                      {product.tags && product.tags.length > 0 && (
                        <div className="flex gap-2 mt-1 flex-wrap" aria-label="Product tags">
                          {product.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="text-sm font-medium text-myblack mt-1">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </Link>
                </SheetTrigger>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="text-center py-6 text-mygray" role="status">
              {`No results found for ${searchQuery}`}
            </div>
          ) : (
            <div className="text-center py-6 text-mygray" role="status">
              Start typing to search products
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}




























// 'use client'

// import { Search } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { 
//   Sheet, 
//   SheetContent, 
//   SheetHeader, 
//   SheetTitle,
//   SheetTrigger 
// } from '@/components/ui/sheet'
// import { useState } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { client } from '@/sanity/lib/client'

// type Product = {
//   _id: string
//   name: string
//   description: string
//   tags: string[]
//   images: string[]
//   price: number
// }

// export function SearchSheet() {
//   const [searchQuery, setSearchQuery] = useState('')
//   const [searchResults, setSearchResults] = useState<Product[]>([])
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSearch = async (query: string) => {
//     if (!query.trim()) {
//       setSearchResults([])
//       return
//     }

//     setIsLoading(true)
//     try {


//       const groqQuery =  `*[_type == "product" && (
//   lower(title) match "*${query.toLowerCase()}*" || 
//   lower(description) match "*${query.toLowerCase()}*" ||
//   "${query.toLowerCase()}" in tags[]
// )] {
//   _id,
//   title,
//   description,
//   tags,
//   "imageUrl": image,  // Get the full image reference
//   price,
//   discountPercentage,
//   isNew,
//   id
// }`
//     //   const groqQuery = `*[_type == "product" && (
//     //     lower(title) match "*${query.toLowerCase()}*" || 
//     //     lower(description) match "*${query.toLowerCase()}*" ||
//     //     "${query.toLowerCase()}" in tags[]
//     //   )] {
//     //     _id,
//     //     title,
//     //     description,
//     //     tags,
//     //     "imageUrl": image.asset->url,
//     //     price,
//     //     discountPercentage,
//     //     isNew,
//     //     id
//     //   }`

//       const results = await client.fetch(groqQuery)
//       setSearchResults(results)
//     } catch (error) {
//       console.error('Error searching products:', error)
//       setSearchResults([])
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const debounce = (func: Function, wait: number) => {
//     let timeout: NodeJS.Timeout
//     return (...args: any[]) => {
//       clearTimeout(timeout)
//       timeout = setTimeout(() => func(...args), wait)
//     }
//   }

//   const debouncedSearch = debounce(handleSearch, 300)

//   // Helper function to get product image URL or fallback
//   const getProductImageUrl = (product: Product) => {
//     if (product.images && product.images.length > 0) {
//       return product.images[0]
//     }
//     return '/images/placeholder-product.png' // Replace with your fallback image path
//   }

//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="ghost" size="icon" className="relative" aria-label="Open search">
//           <Image src="/images/search.png" alt="search" height={28} width={28} className="h-8 w-8" />
//         </Button>
//       </SheetTrigger>

//       <SheetContent 
//         side="bottom" 
//         className="w-[80vw] h-[80vh] mx-auto rounded-t-3xl"
//       >
//         <SheetHeader className="relative mt-4">
//           <SheetTitle className="sr-only">Search Products</SheetTitle>
//           <div className="flex items-center gap-2 px-4 w-full max-w-2xl mx-auto">
//             <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="w-full p-2 outline-none text-lg"
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value)
//                 debouncedSearch(e.target.value)
//               }}
//               aria-label="Search products"
//               autoFocus
//             />
//           </div>
//         </SheetHeader>

//         <div 
//           className="mt-8 px-4 max-w-2xl mx-auto overflow-y-auto max-h-[calc(80vh-120px)]"
//           role="region"
//           aria-label="Search results"
//         >
//           {isLoading ? (
//             <div className="text-center py-6 text-mygray" role="status">
//               Searching...
//             </div>
//           ) : searchResults.length > 0 ? (
//             <div className="space-y-4">
//               {searchResults.map((product) => (
//                 <Link 
//                   href={`/shop/${product._id}`} 
//                   key={product._id}
//                   className="block"
//                 >
//                   <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
//                     <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100">
//                       <Image
//                         src={getProductImageUrl(product)}
//                         alt={`Product image of ${product.name}`}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-medium text-myblack">{product.name}</h3>
//                       {product.description && (
//                         <p className="text-sm text-gray-500 line-clamp-1">
//                           {product.description}
//                         </p>
//                       )}
//                       {product.tags && product.tags.length > 0 && (
//                         <div className="flex gap-2 mt-1 flex-wrap" aria-label="Product tags">
//                           {product.tags.map((tag, index) => (
//                             <span 
//                               key={index}
//                               className="text-xs bg-gray-100 px-2 py-1 rounded-full"
//                             >
//                               {tag}
//                             </span>
//                           ))}
//                         </div>
//                       )}
//                       <p className="text-sm font-medium text-myblack mt-1">
//                         ${product.price}
//                       </p>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           ) : searchQuery ? (
//             <div className="text-center py-6 text-mygray" role="status">
//              {` No results found for ${searchQuery}`}
//             </div>
//           ) : (
//             <div className="text-center py-6 text-mygray" role="status">
//               Start typing to search products
//             </div>
//           )}
//         </div>
//       </SheetContent>
//     </Sheet>
//   )
// }









// 'use client'

// import { Search } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { 
//   Sheet, 
//   SheetContent, 
//   SheetHeader, 
//   SheetTitle,
//   SheetTrigger 
// } from '@/components/ui/sheet'
// import { useState } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { client } from '@/sanity/lib/client'

// type Product = {
//   _id: string
//   name: string
//   description: string
//   tags: string[]
//   images: string[]
//   price: number
// }

// export function SearchSheet() {
//   const [searchQuery, setSearchQuery] = useState('')
//   const [searchResults, setSearchResults] = useState<Product[]>([])
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSearch = async (query: string) => {
//     if (!query.trim()) {
//       setSearchResults([])
//       return
//     }

//     setIsLoading(true)
//     try {
//       const groqQuery = `*[_type == "product" && (
//         lower(name) match "*${query.toLowerCase()}*" || 
//         lower(description) match "*${query.toLowerCase()}*" ||
//         "${query.toLowerCase()}" in tags[]->name
//       )] {
//         _id,
//         name,
//         description,
//         "tags": tags[]->name,
//         "images": images[].asset->url,
//         price
//       }`

//       const results = await client.fetch(groqQuery)
//       setSearchResults(results)
//     } catch (error) {
//       console.error('Error searching products:', error)
//       setSearchResults([])
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const debounce = (func: Function, wait: number) => {
//     let timeout: NodeJS.Timeout
//     return (...args: any[]) => {
//       clearTimeout(timeout)
//       timeout = setTimeout(() => func(...args), wait)
//     }
//   }

//   const debouncedSearch = debounce(handleSearch, 300)

//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="ghost" size="icon" className="relative" aria-label="Open search">
//           <Image src="/images/search.png" alt="search" height={28} width={28} className="h-8 w-8" />
//         </Button>
//       </SheetTrigger>

//       <SheetContent 
//         side="bottom" 
//         className="w-[80vw] h-[80vh] mx-auto rounded-t-3xl"
//       >
//         <SheetHeader className="relative mt-4">
//           <SheetTitle className="sr-only">Search Products</SheetTitle>
//           <div className="flex items-center gap-2 px-4 w-full max-w-2xl mx-auto">
//             <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="w-full p-2 outline-none text-lg"
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value)
//                 debouncedSearch(e.target.value)
//               }}
//               aria-label="Search products"
//               autoFocus
//             />
//           </div>
//         </SheetHeader>

//         <div 
//           className="mt-8 px-4 max-w-2xl mx-auto overflow-y-auto max-h-[calc(80vh-120px)]"
//           role="region"
//           aria-label="Search results"
//         >
//           {isLoading ? (
//             <div className="text-center py-6 text-mygray" role="status">
//               Searching...
//             </div>
//           ) : searchResults.length > 0 ? (
//             <div className="space-y-4">
//               {searchResults.map((product) => (
//                 <Link 
//                   href={`/product/${product._id}`} 
//                   key={product._id}
//                   className="block"
//                 >
//                   <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
//                     <div className="relative h-16 w-16 rounded-md overflow-hidden">
//                       <Image
//                         src={product.images[0]}
//                         alt={`Product image of ${product.name}`}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-myblack">{product.name}</h3>
//                       <p className="text-sm text-gray-500 line-clamp-1">
//                         {product.description}
//                       </p>
//                       <div className="flex gap-2 mt-1" aria-label="Product tags">
//                         {product.tags.map((tag, index) => (
//                           <span 
//                             key={index}
//                             className="text-xs bg-gray-100 px-2 py-1 rounded-full"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                       <p className="text-sm font-medium text-myblack mt-1">
//                         ${product.price}
//                       </p>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           ) : searchQuery ? (
//             <div className="text-center py-6 text-mygray" role="status">
//              {` No results found for ${searchQuery}`}
//             </div>
//           ) : (
//             <div className="text-center py-6 text-mygray" role="status">
//               Start typing to search products
//             </div>
//           )}
//         </div>
//       </SheetContent>
//     </Sheet>
//   )
// }



// // 'use client'

// // import { Search } from 'lucide-react'
// // import { Button } from '@/components/ui/button'
// // import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
// // import { useState } from 'react'
// // import Image from 'next/image'
// // import Link from 'next/link'


// // type Product = {
// //   _id: string
// //   name: string
// //   description: string
// //   tags: string[]
// //   images: string[]
// //   price: number
// // }

// // export function SearchSheet() {
// //   const [searchQuery, setSearchQuery] = useState('')
// //   const [searchResults, setSearchResults] = useState<Product[]>([])
// //   const [isLoading, setIsLoading] = useState(false)

// //   const handleSearch = async (query: string) => {
// //     if (!query.trim()) {
// //       setSearchResults([])
// //       return
// //     }

// //     setIsLoading(true)
// //     try {
// //       // GROQ query that searches across multiple fields
// //       const groqQuery = `*[_type == "product" && (
// //         lower(name) match "*${query.toLowerCase()}*" || 
// //         lower(description) match "*${query.toLowerCase()}*" ||
// //         "${query.toLowerCase()}" in tags[]->name
// //       )] {
// //         _id,
// //         name,
// //         description,
// //         "tags": tags[]->name,
// //         "images": images[].asset->url,
// //         price
// //       }`

// //       const results = await client.fetch(groqQuery)
// //       setSearchResults(results)
// //     } catch (error) {
// //       console.error('Error searching products:', error)
// //       setSearchResults([])
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   // Debounce the search to avoid too many requests
// //   const debounce = (func: Function, wait: number) => {
// //     let timeout: NodeJS.Timeout
// //     return (...args: any[]) => {
// //       clearTimeout(timeout)
// //       timeout = setTimeout(() => func(...args), wait)
// //     }
// //   }

// //   const debouncedSearch = debounce(handleSearch, 300)

// //   return (
// //     <Sheet>
// //       <SheetTrigger asChild>
// //         <Button variant="ghost" size="icon" className="relative">
// //           <Image src="/images/search.png" alt="search" height={28} width={28} className="h-8 w-8" />
// //         </Button>
// //       </SheetTrigger>

// //       <SheetContent 
// //         side="bottom" 
// //         className="w-[80vw] h-[80vh] mx-auto rounded-t-3xl"
// //       >
// //         <SheetHeader className="relative mt-4">
// //           <div className="flex items-center gap-2 px-4 w-full max-w-2xl mx-auto">
// //             <Search className="h-5 w-5 text-gray-400" />
// //             <input
// //               type="text"
// //               placeholder="Search products..."
// //               className="w-full p-2 outline-none text-lg"
// //               value={searchQuery}
// //               onChange={(e) => {
// //                 setSearchQuery(e.target.value)
// //                 debouncedSearch(e.target.value)
// //               }}
// //               autoFocus
// //             />
// //           </div>
// //         </SheetHeader>

// //         <div className="mt-8 px-4 max-w-2xl mx-auto overflow-y-auto max-h-[calc(80vh-120px)]">
// //           {isLoading ? (
// //             <div className="text-center py-6 text-mygray">
// //               Searching...
// //             </div>
// //           ) : searchResults.length > 0 ? (
// //             <div className="space-y-4">
// //               {searchResults.map((product) => (
// //                 <Link href={`/product/${product._id}`} key={product._id}>
// //                   <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
// //                     <div className="relative h-16 w-16 rounded-md overflow-hidden">
// //                       <Image
// //                         src={product.images[0]}
// //                         alt={product.name}
// //                         fill
// //                         className="object-cover"
// //                       />
// //                     </div>
// //                     <div>
// //                       <h3 className="font-medium text-myblack">{product.name}</h3>
// //                       <p className="text-sm text-gray-500 line-clamp-1">
// //                         {product.description}
// //                       </p>
// //                       <div className="flex gap-2 mt-1">
// //                         {product.tags.map((tag, index) => (
// //                           <span 
// //                             key={index}
// //                             className="text-xs bg-gray-100 px-2 py-1 rounded-full"
// //                           >
// //                             {tag}
// //                           </span>
// //                         ))}
// //                       </div>
// //                       <p className="text-sm font-medium text-myblack mt-1">
// //                         ${product.price}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </Link>
// //               ))}
// //             </div>
// //           ) : searchQuery ? (
// //             <div className="text-center py-6 text-mygray">
// //               No results found for "{searchQuery}"
// //             </div>
// //           ) : (
// //             <div className="text-center py-6 text-mygray">
// //               Start typing to search products
// //             </div>
// //           )}
// //         </div>
// //       </SheetContent>
// //     </Sheet>
// //   )
// // }