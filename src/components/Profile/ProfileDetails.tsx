"use client"
import { useUser } from "@/context/UserContext"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"

const ProfilePage = () => {
    const { user } = useUser()
  
    return (
      <div className="bg-white py-20">
        <div className="container max-w-7xl mx-auto p-4 lg:p-8">
          <h1 className="text-3xl font-bold text-golden mb-8">
            Profile
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-background p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-mygray mb-4">
                Account Details
              </h2>
              <div className='flex w-full  items-center justify-between'>
            <div>
            <p className="text-md text-myblack  mb-2">
                Name: <span className='text-xl font-semibold'> {user?.name} </span>
              </p>
              <p className="text-md  text-myblack mb-2">
                Email: <span className='text-xl font-semibold'>{user?.email} </span>  
              </p>
            </div>
              <span className="text-sm text-muted-foreground mb-2">
                <Image src ={user?.image? urlFor(user.image).url() : "/images/profile.png"} className='rounded-full h-36 w-36' alt="avatar" width={144} height={144} />
              </span>
              </div>
             
              {/* <p className="text-md  text-myblack mb-2">
                Role: <span className='text-xl font-semibold'>{user?.bio} </span>  
              </p> */}
           
            </div>
            <div className="bg-background p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-mygray mb-4">
                Saved Information
              </h2>
              <p className="text-md text-muted-foreground mb-2">
                Phone: <span className='text-xl  text-myblack  font-semibold'>{user?.phone} </span>  
              </p>
              <p className="text-md text-muted-foreground mb-2">
                Address: <span className='text-xl  text-myblack  font-semibold'>{user?.address} </span>  
              </p>
              <p className="text-md text-muted-foreground mb-2">
                State:<span className='text-xl text-myblack font-semibold'>{user?.state} </span>  
              </p>
              <p className="text-md text-muted-foreground mb-2">
                City: <span className='text-xl  text-myblack  font-semibold'>{user?.city} </span>  
              </p>
              <p className="text-md text-muted-foreground mb-2">
                Zip Code: <span className='text-xl  text-myblack  font-semibold'>{user?.zipCode} </span>  
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  
  }
  
  export default ProfilePage
  
  
  