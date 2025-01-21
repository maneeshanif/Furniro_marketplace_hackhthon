// types.ts
export interface CartItem {
    id: string
    name: string
    price: number
    image: string
    quantity: number
  }
  
  export interface CartState {
    items: CartItem[]
    total: number
  }

  export type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'LOAD_CART'; payload: CartState }
  | { type: 'SET_CART'; payload: CartState }  // Add this action type