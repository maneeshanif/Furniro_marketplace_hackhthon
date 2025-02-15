// "use client"

// import React, { createContext, useState, useContext, useEffect } from "react"

// type User = {
//   name: string
//   email: string
//   image: string
//   role: string
// }

// type UserContextType = {
//   user: User
//   updateUser: (updates: Partial<User>) => void
// }

// const defaultUser: User = {
//   name: "",
//   email: "",
//   image: "",
//   role: "",
// }

// const UserContext = createContext<UserContextType | undefined>(undefined)

// export function UserProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User>(defaultUser)

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch("/api/user/getUser", {
//           method: "POST",
//           credentials: "include",
//         })
//         const data = await response.json()
//         console.log("Fetched user data:", data) // Debugging
//         if (data.user) {
//           setUser(data.user) // Ensure you're setting only the user object
//         }
//       } catch (error) {
//         console.error("Failed to fetch user data", error)
//       }
//     }

//     fetchUserData()
//   }, [])

//   const updateUser = async (updates: Partial<User>) => {
//     setUser((prevUser) => ({ ...prevUser, ...updates }))

//     // Persist updates in the database
//     await fetch("/api/user/profileupdate", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updates),
//       credentials: "include",
//     })
//   }

//   return (
//     <UserContext.Provider value={{ user, updateUser }}>
//       {children}
//     </UserContext.Provider>
//   )
// }

// export function useUser() {
//   const context = useContext(UserContext)
//   if (context === undefined) {
//     throw new Error("useUser must be used within a UserProvider")
//   }
//   return context
// }

"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

type User = {
  _id: string
  name: string
  email: string
  image: string
  role: string
  address: string,
  zipCode: string,
  city: string,
  state: string,
  phone:number,
  bio: string
}

type UserContextType = {
  user: User
  updateUser: (updates: Partial<User>) => void
}

const defaultUser: User = {
 _id: "",
  name: "",
  email: "",
  image: "",
  role: "",
  address: "",
  zipCode: "",
  city: "",
  state: "",
  phone: 0,
  bio: ""
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const revalidate = 60
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser)

  // useEffect(() => {
  //   const defaultSanityData = async () => {
  //     const response = await fetch("/api/user/getUser", {
  //       method: "POST",
  //       credentials: "include",
  //     })
  //     const data = await response.json()
  //     console.log("Fetched user data:", data) // Debugging log
  //     if (data.user) {
  //       setUser(data.user) // Set only the 'user' object
  //     }
      
  //   }
  //   defaultSanityData()
  // }, [])
  

  useEffect(() => {

    const defaultSanityData = async () => {
      const defaultUser = await fetch("/api/user/getUser", {
        method: "POST",
        credentials: "include"
      }).then((res) => res.json())
      console.log(defaultUser)
      setUser(defaultUser)
    }

    defaultSanityData()
  }, [])

  const updateUser = (updates: Partial<User>) => {
    setUser((prevUser) => ({ ...prevUser, ...updates }))
    // Here you would typically send the updates to your API
  }

  return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}