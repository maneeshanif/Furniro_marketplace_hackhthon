    import { createClient } from '@sanity/client'
    import axios from 'axios'
    import dotenv from 'dotenv'
    import { fileURLToPath } from 'url'
    import path from 'path'

    // Load environment variables from .env.local
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

    // Create Sanity client
    const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2021-08-31'
    })

    async function uploadImageToSanity(imageUrl) {
    try {
        console.log(`Uploading image: ${imageUrl}`)

        // Fetch image from the external URL
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
        const buffer = Buffer.from(response.data)

        // Upload the image to Sanity
        const asset = await client.assets.upload('image', buffer, {
        filename: imageUrl.split('/').pop()
        })

        console.log(`Image uploaded successfully: ${asset._id}`)
        return asset._id

    } catch (error) {
        console.error('Failed to upload image:', imageUrl, error)
        return null
    }
    }


async function importData() {
    try {
      console.log('Fetching products from API...')
      const response = await axios.get('https://template6-six.vercel.app/api/products')
      const products = response.data
  
      console.log(`Fetched ${products.length} products`)
  
      for (const product of products) {
        console.log(`Processing product: ${product.title}`)
  
        let imageRef = null
        if (product.imageUrl) { 
          imageRef = await uploadImageToSanity(product.imageUrl)
        } else {
          imageRef = null
          console.log('No image found for product:', product.title)
        }
  
        // Prepare product data for Sanity
        const sanityProduct = {
          _type: 'product',
          title: product.title,
          description: product.description,
          price: product.price,
          discountPercentage: product.dicountPercentage || 0, 
          tags: product.tags || [],
          imageUrl: product.imageUrl, 
          isNew: product.isNew || false,
          image: imageRef
            ? {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: imageRef,
                },
              }
            : null,
        }
  
        console.log('Uploading product to Sanity:', sanityProduct.title)
        console.log('Uploading product image to Sanity:', sanityProduct.imageUrl)
  
      
        const result = await client.create(sanityProduct)
  
        console.log(`Product uploaded successfully: ${result._id}`)
      }
  
      console.log('Data import completed successfully!')
    } catch (error) {
      console.error('Error importing data:', error)
    }
  }

importData()



























// import { createClient } from '@sanity/client'
// import axios from 'axios'
// import dotenv from 'dotenv'
// import { fileURLToPath } from 'url'
// import path from 'path'

// // Load environment variables from .env.local
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// dotenv.config({ path: path.resolve(__dirname, '../.env.local') })


// // Create Sanity client
// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//   useCdn: false,
//   token: process.env.SANITY_API_TOKEN,
//   apiVersion: '2021-08-31'
// })

// async function uploadImageToSanity(imageUrl) {

//   try {

//     console.log(`Uploading image: ${imageUrl}`)

//     const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })

//     const buffer = Buffer.from(response.data)

//     const asset = await client.assets.upload('image', buffer, {
//       filename: imageUrl.split('/').pop()
//     })

    
//     console.log(`Image uploaded successfully: ${asset._id}`)
//     return asset._id

//   } catch (error) {
//     console.error('Failed to upload image:', imageUrl, error)
//     return null
//   }
// }
// async function importData() {

//   try {

//     console.log('Fetching products from API...')
    
//     const response = await axios.get('https://template6-six.vercel.app/api/products')

//     const products = response.data

//     console.log(`Fetched ${products.length} products`)


//     for (const product of products) {
//       console.log(`Processing product: ${product.title}`)
//       let imageRef = null
//       if (product.image) {
//         imageRef = await uploadImageToSanity(product.image)
//       }


//       const sanityProduct = {
//         _type: 'product',
//         // _id: product._id,
//         title: product.title,
//         description: product.description,

//         price: product.price,
//         discountPercentage: 0,
//         tags: product.category ? [product.tags] : [],
//         imageUrl: imageRef
//         ? {
//             _type: 'image',
//             asset: {
//               _type: 'external',
//               url: imageRef, // Use the external URL directly here
//             },
//           }
//         : null,
//       }


  

//       console.log('Uploading product to Sanity:', sanityProduct.name)


//       const result = await client.create(sanityProduct)


//       console.log(`Product uploaded successfully: ${result._id}`)
//     }
//     console.log('Data import completed successfully!')
//   } catch (error) {
//     console.error('Error importing data:', error)
//   }
// }
// importData()