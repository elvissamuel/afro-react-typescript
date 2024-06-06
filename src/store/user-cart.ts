import {create} from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface CartState {
  cartReference: string | null;
  cart: any | null;
  numberOfItems: number;
  orders: any[];
  setCartReference: (cartReference: string) => void;
  setCart: (cart: any) => void;
  setNumberOfItems: (numberOfItems: number) => void;
  setOrders: (orders: any[]) => void;
  resetCart: () => void;
}

type CartPersist = (
  config: (set: any, get: any, api: any) => CartState,
  options: PersistOptions<CartState>
) => (set: any, get: any, api: any) => CartState;

export const useCartStore = create<CartState>(
  (persist as CartPersist)(
    (set) => ({
      cartReference: null,
      cart: null,
      numberOfItems: 0,
      orders: [],
      setCartReference: (cartReference: string) => set({ cartReference }),
      setCart: (cart: any) => set({ cart }),
      setNumberOfItems: (numberOfItems: number) => set({ numberOfItems }),
      setOrders: (orders: any[]) => set({ orders }),
      resetCart: () => set({ cartReference: null, cart: null, numberOfItems: 0, orders: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
