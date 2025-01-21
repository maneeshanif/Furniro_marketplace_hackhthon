'use client'

import { createContext, useContext, useReducer, ReactNode  } from 'react'
// import {useCartEffects} from '@/hooks/useCartEffects'
import { useEffect} from 'react'
import {  CartAction } from '@/types/type';

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
}

// type CartAction =
//   | { type: 'ADD_ITEM'; payload: CartItem }
//   | { type: 'REMOVE_ITEM'; payload: string }
//   | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number }
  
//  }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
} | null>(null)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price
        }
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price
      }

    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(item => item.id === action.payload)
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (itemToRemove ? itemToRemove.price * itemToRemove.quantity : 0)
      }

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.items.reduce((total, item) => {
          if (item.id === action.payload.id) {
            return total + item.price * action.payload.quantity
          }
          return total + item.price * item.quantity
        }, 0)
      }

      // cartReducer.ts (add this case to your existing reducer)
// case 'SET_CART':
//   return {
//     ...state,
//     ...action.payload
//   };
  case 'LOAD_CART':
    return action.payload;
    break;

    default:
      return state
  }
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}


// export const useCart = () => {
//   const context = useContext(CartContext)
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider')
//   }
//   const { dispatch, state } = context;
//   useCartEffects(dispatch, state);
//   return context
// };



export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

 

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: parsedCart })
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state))
  }, [state])

  
  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}