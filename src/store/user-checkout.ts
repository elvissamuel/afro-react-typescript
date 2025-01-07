import { cartResponse } from 'src/models/models';
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

export interface TransactionResponse {
  deliveryFeeAmount: number;
  feeAmount: number;
  logisticsAmount: number;
  paymentReference: string;
  totalAmount: number;
  transactionDate: string;
  transactionId: number;
  transactionReference: string;
  transactionStatus: string;
}

export interface CartResponse extends cartResponse {
  // Define the properties of cartResponse here
}

export interface DeliveryDetails {
  address: string;
  dates: string;
}

export interface CheckoutResponse {
  transactionResponse: TransactionResponse;
  cartResponse: CartResponse;
  stripeResponse: string;
  deliveryDetails: DeliveryDetails;
}


interface CheckoutState {
  checkoutResponse: CheckoutResponse | null;
  setCheckoutResponse: (response: CheckoutResponse) => void;
  resetCheckoutResponse: () => void;
}

type CheckoutPersist = (
  config: (set: any, get: any, api: any) => CheckoutState,
  options: PersistOptions<CheckoutState>
) => (set: any, get: any, api: any) => CheckoutState;

export const useCheckoutStore = create<CheckoutState>(
  (persist as CheckoutPersist)(
    (set) => ({
      checkoutResponse: null,
      setCheckoutResponse: (response: CheckoutResponse) => set({ checkoutResponse: response }),
      resetCheckoutResponse: () => set({ checkoutResponse: null }),
    }),
    {
      name: 'checkout-storage',
    }
  )
);
