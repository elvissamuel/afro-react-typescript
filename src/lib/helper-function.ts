import { CustomHeaders, headerProps, OrderProps } from "src/models/models";
import axios, { AxiosResponse } from 'axios';


export interface CartResponseBody {
  cartReference: string;
  numberOfItems: number;
  deliveryCost: number;
  orders: OrderProps[]; // Replace `any` with the actual order type if known
}

export interface CartData {
  responseBody: CartResponseBody;
  message: string;
}

export interface SaveCartDataParams {
  cartReference: string;
  numberOfItems: number;
  orders: OrderProps[];
}

// storage.js
export const saveCartData = (responseBody: CartResponseBody) => {
  const {
    cartReference,
    numberOfItems,
    orders,
  } = responseBody;

  const cartData = {
    cartReference,
    numberOfItems,
    orders,
    cartCreateResponse: responseBody,
  };

  localStorage.setItem('Afro_Cart_Data', JSON.stringify(cartData));
};

export const getCartData = () : CartData | null => {
  const cartData = localStorage.getItem('Afro_Cart_Data');
  return cartData ? JSON.parse(cartData) : null;
};

export const getCartReference = () => {
  const cartData = getCartData();
  return cartData ? cartData.responseBody.cartReference : null;
};

export const getDeliveryCost = () => {
  const cartData = getCartData();
  return cartData ? cartData.responseBody.deliveryCost : null;
};

export const getNumberOfItems = () => {
  const cartData = getCartData();
  return cartData ? cartData.responseBody.numberOfItems : 0;
};

export const getOrders = () => {
  const cartData = getCartData();
  return cartData ? cartData.responseBody.orders : [];
};

// POST request helper
export const apiPost = async (url: string, data: any, headers: CustomHeaders): Promise<AxiosResponse<string>> => {
  try {
    const response = await axios.post<string>(url, data, { headers });
    return response;
  } catch (error) {
    throw error;
  }
  
};

// PATCH request helper
export const apiPatch = async (url: string, data: any, headers: CustomHeaders): Promise<AxiosResponse<string>> => {
  try {
    const response = await axios.patch<string>(url, data, { headers });
    return response;
  } catch (error) {
    throw error;
  }
};

// DELETE request helper
export const apiDelete = async (url: string, headers: CustomHeaders): Promise<AxiosResponse<string>> => {
  try {
    const response = await axios.delete<string>(url, { headers });
    return response;
  } catch (error) {
    throw error;
  }
};

// GET request helper
export const apiGet = async (url: string, headers: CustomHeaders): Promise<AxiosResponse<string>> => {
  try {
    const response = await axios.get<string>(url, { headers });
    return response;
  } catch (error) {
    throw error;
  }
};
