import { client } from '@/sanity/lib/client'
const res = async () => {
        const response = await client.fetch(`*[_type == "product"]{
            _id,
            title,
            price,
            description,
            imageUrl,
            isNew,
            tags,
            discountPercentage
        }`)
        const data = response
        return data
        // console.log(data)
    }

  const data =  res()



export default data
