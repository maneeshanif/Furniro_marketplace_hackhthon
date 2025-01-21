// useCartEffects.ts
import { useEffect } from "react";
import { CartState, CartAction } from '@/types/type';
import { Dispatch } from 'react';

export const useCartEffects = (
  dispatch: Dispatch<CartAction>,
  state: CartState
) => {
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        dispatch({ type: "SET_CART", payload: parsedCart });
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        localStorage.removeItem("cart"); // Clear invalid data
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (state.items) { // Check if items exists before storing
      localStorage.setItem("cart", JSON.stringify({
        items: state.items,
        total: state.total
      }));
    }
  }, [state.items, state.total]);
};

