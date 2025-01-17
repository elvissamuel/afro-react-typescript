import { cartResponse, OrderProps, productProps } from "src/models/models";
import { create } from "zustand"
import { persist, PersistOptions } from 'zustand/middleware';

interface User {
  authorization: string;
  isBusiness: boolean;
  kycVerified: boolean;
  cartResponse: cartResponse; // Define this type according to your cart structure
  email: string;
  fullName: string;
}

interface UserProps {
  full_name: string;
  email: string;
}

interface UserEmailState {
  email: string | null;
  setEmail: (email: string) => void;
}

interface UserSearchValueState {
  searchValue: string | null;
  setSearchValue: (searchValue: string) => void;
}

interface UserSearchStringState {
  searchString: string | null;
  setSearchString: (searchString: string) => void;
}

interface CountState {
  count: number;
  setCount: (count: number) => void;
  increment: () => void;
  decrement: () => void;
}

interface UserIpState {
  ipAddress: string | null;
  setIpAddress: (ipAddress: string) => void;
}

interface UserProductState {
  product: [] | null;
  setProduct: (product: productProps[]) => void;
}

interface UserCategoryState {
  category: string;
  setCategory: (category: string) => void;
}

interface UserOrdersState {
  orders: [] | null;
  setOrders: (orders: OrderProps[]) => void;
  updateOrders: (orders: OrderProps) => void;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateCartResponse: (cartResponse: cartResponse) => void;
}

interface UserStateProps {
  user: UserProps | null;
  setUser: (user: UserProps) => void;
  clearUser: () => void;
}

type UserStorePersist = (
  config: (set: any, get: any, api: any) => UserState,
  options: PersistOptions<UserState>
) => (set: any, get: any, api: any) => UserState;

type UserStorePersistProps = (
  config: (set: any, get: any, api: any) => UserStateProps,
  options: PersistOptions<UserStateProps>
) => (set: any, get: any, api: any) => UserStateProps;

type CountStorePersist = (
  config: (set: any, get: any, api: any) => CountState,
  options: PersistOptions<CountState>
) => (set: any, get: any, api: any) => CountState;

type UserProductsPersist = (
  config: (set: any, get: any, api: any) => UserProductState,
  options: PersistOptions<UserProductState>
) => (set: any, get: any, api: any) => UserProductState;

type UserCategoryPersist = (
  config: (set: any, get: any, api: any) => UserCategoryState,
  options: PersistOptions<UserCategoryState>
) => (set: any, get: any, api: any) => UserCategoryState;

type UserOrdersPersist = (
  config: (set: any, get: any, api: any) => UserOrdersState,
  options: PersistOptions<UserOrdersState>
) => (set: any, get: any, api: any) => UserOrdersState;

type UserEmailPersist = (
  config: (set: any, get: any, api: any) => UserEmailState,
  options: PersistOptions<UserEmailState>
) => (set: any, get: any, api: any) => UserEmailState;

type UserSearchValuePersist = (
  config: (set: any, get: any, api: any) => UserSearchValueState,
  options: PersistOptions<UserSearchValueState>
) => (set: any, get: any, api: any) => UserSearchValueState;

type UserSearchStringPersist = (
  config: (set: any, get: any, api: any) => UserSearchStringState,
  options: PersistOptions<UserSearchStringState>
) => (set: any, get: any, api: any) => UserSearchStringState;

type UserIpPersist = (
  config: (set: any, get: any, api: any) => UserIpState,
  options: PersistOptions<UserIpState>
) => (set: any, get: any, api: any) => UserIpState;

export const useUserStore = create<UserState>(
  (persist as UserStorePersist)(
    (set, get) => ({
      user: null,
      setUser: (user:User) => set({ user }),
      clearUser: () => set({ user: null }),
      updateCartResponse: (cartResponse: cartResponse) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, cartResponse } });
        }
      },
    }),
    {
      name: 'user-storage', 
    }
  )
);

export const useOnboardUserStore = create<UserStateProps>(
  (persist as UserStorePersistProps)(
    (set, get) => ({
      user: null,
      setUser: (user:UserProps) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'onboard-user-storage', 
    }
  )
);

export const useUserEmail = create<UserEmailState>(
  (persist as UserEmailPersist)(
    (set) => ({
      email: null,
      setEmail: (email: string) => set({ email }),
    }),
    {
      name: "Afro-UserEmail",
    }
  )
)

export const useUserSearchValue = create<UserSearchValueState>(
  (persist as UserSearchValuePersist)(
    (set) => ({
      searchValue: null,
      setSearchValue: (searchValue: string) => set({ searchValue }),
    }),
    {
      name: "Afro-SearchValue",
    }
  )
)

export const useUserSearchString = create<UserSearchStringState>(
  (persist as UserSearchStringPersist)(
    (set) => ({
      searchString: null,
      setSearchString: (searchString: string) => set({ searchString }),
    }),
    {
      name: "Afro-SearchString",
    }
  )
)

export const useUserIp = create<UserIpState>(
  (persist as UserIpPersist)(
    (set) => ({
      ipAddress: null,
      setIpAddress: (ipAddress: string) => set({ ipAddress }),
    }),
    {
      name: "Afro-UserIp",
    }
  )
)

export const useUserProducts = create<UserProductState>(
  (persist as UserProductsPersist)(
    (set) => ({
      product: [],
      setProduct: (product: productProps[]) => set({ product }),
    }),
    {
      name: "Afro-Products",
    }
  )
)

export const useCountStore = create<CountState>(
  (persist as CountStorePersist)(
    (set, get) => ({
      count: 1,
      setCount: (count: number) => {
        if (count >= 1) {
          set({ count });
        }
      },
      increment: () => set({ count: get().count + 1 }),
      decrement: () => set({ count: Math.max(1, get().count - 1) }),
    }),
    {
      name: 'count-storage',
    }
  )
);

export const useUserOrders = create<UserOrdersState>(
  (persist as UserOrdersPersist)(
    (set, get) => ({
      orders: [],
      setOrders: (orders: OrderProps[]) => set({ orders }),
      updateOrders: (orders: OrderProps) => {
        const currentOrders = get().orders;
        if (currentOrders) {
          set({ user: { ...currentOrders, orders } });
        }
      },
    }),
    {
      name: "Afro-orders",
    }
  )
)

export const useUserCtaegory = create<UserCategoryState>(
  (persist as UserCategoryPersist)(
    (set) => ({
      category: "",
      setCategory: (category: string) => set({ category }),
    }),
    {
      name: "Afro-Category",
    }
  )
)