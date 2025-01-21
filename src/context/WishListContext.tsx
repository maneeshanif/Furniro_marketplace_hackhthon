
'use client'

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react'

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
}

interface WishlistState {
  items: WishlistItem[]
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: WishlistItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'SET_WISHLIST'; payload: WishlistState }

const WishlistContext = createContext<{
  state: WishlistState
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  setWishlist: (wishlist: WishlistState) => void
} | null>(null)

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (!state.items.some(item => item.id === action.payload.id)) {
        return {
          ...state,
          items: [...state.items, action.payload]
        }
      }
      return state

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }

    case 'SET_WISHLIST':
      return action.payload

    default:
      return state
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] })

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      dispatch({ type: 'SET_WISHLIST', payload: JSON.parse(savedWishlist) })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state))
  }, [state])

  const addItem = (item: WishlistItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const setWishlist = (wishlist: WishlistState) => {
    dispatch({ type: 'SET_WISHLIST', payload: wishlist })
  }

  return (
    <WishlistContext.Provider value={{ state, addItem, removeItem, setWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}