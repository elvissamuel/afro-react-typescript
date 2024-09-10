import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Popover,  } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import logo from "../assets/imgs/afrologo.png";
import { Toaster, toast } from 'sonner'
import ShoppingCart from '../components/ShoppingCart'
import { encryptData } from '../AES/AES'
import { getAllOrders, getCategories } from '../api/api'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserIp, useUserStore } from 'src/store/user-store'
import OrderSummary from './OrderSummary'
import { useCartStore } from 'src/store/user-cart'

type Props = {
  setSearchValue?: React.Dispatch<React.SetStateAction<string>>;
  setSearchString?: React.Dispatch<React.SetStateAction<string>>;
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export interface CategoryProps {
  name: string
  id?: string
} 

const DashboardNav = (props: Props) => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false)
  const [openCart, setOpenCart] = useState(false)
  const [openSummary, setOpenSummary] = useState(false)
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const {user} = useUserStore.getState()
  const {cartReference} = useCartStore.getState()
  const {ipAddress} = useUserIp.getState()
  const [stripeUrl, setStripeUrl] = useState<string>()
   
  
    const {data: allOrder, } = useQuery({
      queryKey: ['All_Afro_Orders'],
      queryFn: async ()=>{

        const data = {authorization: user?.authorization, ip_address: ipAddress, cart_reference: cartReference}
        console.log("sent data from dashboardNav: ", data)
        const encryptedData = encryptData({data, secretKey:process.env.REACT_APP_AFROMARKETS_SECRET_KEY})
        const response = await getAllOrders(encryptedData)
      console.log("order res from dashboardNav : ", response)

        return response
      },
      enabled: user?.cartResponse.cartReference !== undefined
    })

    useEffect(()=>{
      getCategories(setCategories)
    }, [])


  const handleLogout = () => {
    setLogout(true)
    if(typeof window !== 'undefined' && window.localStorage){
    window.localStorage.setItem('My_Login_Auth', '')
    }
    setTimeout(() => {
      toast.loading("You've logged out successfully")
    }, 500);
    setTimeout(() => {
      navigate("/")
    }, 1500);
  }
  if(!location.pathname){
    return null
  }

  return (
    <Disclosure as="nav" className="sticky top-0 z-20 bg-white border-b-8 border-secondaryColor">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 py-2 sm:px-4 lg:px-8">
            {logout && <Toaster richColors position='top-right' closeButton />}
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0">
                  <a href='/'>
                    <img
                      className="h-10 w-auto"
                      src={logo}
                      alt="Your Company"
                      width={100}
                      height={100}
                    />
                  </a>
                </div>
                <div className="hidden lg:ml-6 lg:block">
                  <div className="flex space-x-4">
                    {location.pathname.includes('/dashboard') && <Popover className="relative border-none px-1 py-2 text-sm font-medium text-white">
                      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold border-none leading-6 text-gray-500">
                        <span className='text-sm font-bold text-primaryColor hover:text-primaryColorVar'>Categories</span>
                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute -left-10 z-10 mt-5 flex w-screen max-w-max  px-4">
                          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl">
                            <div className="grid grid-cols-1 gap-x-2 gap-y-1 p-4 lg:grid-cols-2">
                              {categories && categories.map((item) => (
                                <div key={item.name} onClick={()=>{if(props.setSearchValue !== undefined) props.setSearchValue(item.name)}} className="group relative cursor-pointer flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">

                                  <div className="font-semibold text-gray-900">
                                      {item.name}
                                      <span className="absolute inset-0" />
                                  </div>
                                </div>
                              ))}
                                  {// @ts-ignore 
                                  <p className='text-zinc-700 pl-4 font-semibold cursor-pointer' onClick={()=>{if(props.setSearchValue !== undefined) props.setSearchValue(null)}}>View All</p>}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover>}
                    <p
                      className="rounded-md px-3 py-2 text-sm font-bold text-primaryColor hover:bg-secondaryColorVar hover:text-primaryColorVar"
                    >
                      What is New
                    </p>
                    <p
                      className="rounded-md px-3 py-2 text-sm font-bold text-primaryColor hover:bg-secondaryColorVar hover:text-primaryColorVar"
                    >
                      Orders
                    </p>
                    
                  </div>
                </div>
              </div>
              <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end z-40">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="h-5 w-5 text-primaryColor" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border-0 bg-secondaryColor py-1.5 pl-10 pr-3 text-primaryColor placeholder:text-primaryColor focus:bg-secondaryColor focus:text-primaryColor focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Search Product"
                      type="search"
                      onChange={(e)=> {if(props.setSearchString !== undefined){props.setSearchString(e.target.value)}; console.log("input triggered")}}
                    />
                  </div>
                </div>
              </div>
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative bg-primaryColor inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon color='white' className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon color='white' className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:block">
                <div className="flex items-center gap-2">
                  <button
                    onClick={()=>setOpenCart(prev => !prev)}
                    type="button"
                    className="z-40 relative flex-shrink-0 rounded-full p-1 text-primaryColor font-semibold hover:text-gray-700"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View cart</span>
                    {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                    {!user?.isBusiness ? 
                    <div className='flex items-center gap-1 flex-row-reverse'> 
                        {allOrder !== undefined && <div className='text-[11px] font-semibold absolute -left-2 -top-2 bg-primaryColor text-secondaryColor h-5 w-5 text-center rounded-[50%] flex justify-center items-center'>{allOrder?.orders === undefined ? 0 : allOrder?.orders.length}</div>}
                        <span className='text-sm font-semibold'>Cart</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 font-semibold">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </div> : null}
                    {openCart && <ShoppingCart setStripeUrl={setStripeUrl} order={allOrder !== undefined ? allOrder.orders : []} setOpenSummary={setOpenSummary} setOpenCart={setOpenCart} />}
                    {openSummary && <OrderSummary stripeUrl={stripeUrl} setOpenSummary={setOpenSummary} /> }

                  </button>

                  {/* Profile dropdown */}
                  {user?.authorization ? <Menu as="div" className="relative ml-4 flex-shrink-0 z-40">
                    <div className=''>
                      <Menu.Button className="relative flex items-center gap-1 rounded-full text-sm text-primaryColor focus:outline-none">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                        </span>
                        <span className='text-xs font-semibold'>{user?.fullName}</span>

                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <div className='flex items-center gap-1 px-3'>
                              <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clip-rule="evenodd" />
                              </svg>
                              </span>
                              <p
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm font-semibold text-primaryColor'
                                )}
                              >
                                My Account
                              </p>
                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <div className='flex items-center gap-1 px-3'>
                              <span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                              </svg>

                              </span>
                              <p
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm font-semibold text-primaryColor'
                                )}
                              >
                                Order
                              </p>
                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <div className='flex items-center gap-1 px-3'>
                              <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                              </svg>
                              </span>
                              <p
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm font-semibold text-primaryColor'
                                )}
                              >
                                Saved Item
                              </p>
                            </div>
                          )}
                        </Menu.Item>
                        
                        {user?.isBusiness && <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={()=>{navigate('/create-product'); if(!location.pathname.includes('create')){toast.loading("Page is loading...")}}}
                              className={
                                ' px-4 py-1 mb-1 hover:bg-secondaryColor text-sm flex items-center text-primaryColor border border-primaryColor text-center mx-auto w-[90%] rounded-lg'
                              }
                            >
                              <span className='mr-4'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 text-primaryColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                              </span>
                              <span>Create Product</span>
                            </button>
                          )}
                        </Menu.Item>}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={()=>handleLogout()}
                              className={classNames(
                                active ? 'bg-primaryColorVar' : 'bg-primaryColor',
                                'block px-4 py-2 text-sm text-white text-center mx-auto w-[90%] rounded-lg'
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu> : 
                  <div className='text-primaryColor text-sm p-1 font-semibold flex-shrink-0 '><a href={'/signup'}><button className='rounded px-2 py-1 bg-secondaryColor'>Sign up</button></a></div>}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-white"
              >
                <Popover className="relative border-none text-sm font-medium text-white">
                      <Popover.Button className="inline-flex items-center gap-x-1 font-semibold border-none text-gray-500">
                        <span className='text-base text-primaryColor font-medium'>Categories</span>
                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute -left-10 z-10 mt-5 flex w-screen max-w-max  px-4">
                          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl">
                            <div className="grid grid-cols-1 gap-x-2 gap-y-1 p-4 lg:grid-cols-2 z-50">
                              {categories && categories.map((item) => (
                                <div key={item.name} onClick={()=>{if(props.setSearchValue !== undefined) props.setSearchValue(item.name)}} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                  
                                  <div className="font-semibold text-gray-900">
                                      {item.name}
                                      <span className="absolute inset-0" />
                                  </div>
                                </div>
                              ))}
                              <p className='text-zinc-700 pl-4 font-semibold cursor-pointer' onClick={()=>{if(props.setSearchValue !== undefined) props.setSearchValue('')}}>View All</p>
                            </div>
                            
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-primaryColor hover:bg-primaryColorVar hover:text-white"
              >
                Whats New
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-primaryColor hover:bg-primaryColorVar hover:text-white"
              >
                Orders
              </Disclosure.Button>
              
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center justify-between px-5">
                <div className="flex-shrink-0 flex items-start">
                  <div >
                  
                    <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 text-primaryColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clip-rule="evenodd" />
                    </svg>
                    </span>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-primaryColor">{user?.fullName}</div>
                    <div className="text-sm font-medium text-primaryColor">{user?.email}</div>
                  </div>
                </div>

                <button
                    onClick={()=>setOpenCart(prev => !prev)}
                    type="button"
                    className=" relative flex-shrink-0 rounded-full p-1 text-primaryColor font-semibold hover:text-gray-700"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View cart</span>
                    {!user?.isBusiness ? <p  className='flex items-center gap-1 flex-row-reverse'> 
                        {allOrder !== undefined && <div className='text-[11px] font-semibold absolute -left-2 -top-2 bg-primaryColor text-secondaryColor h-5 w-5 text-center rounded-[50%] flex justify-center items-center'>{allOrder?.orders === undefined ? 0 : allOrder?.orders.length}</div>}
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 font-semibold">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                          </svg>
                        </span>
                    </p> : null}
                    {openCart && <ShoppingCart setStripeUrl={setStripeUrl} order={allOrder !== undefined ? allOrder.orders : []} setOpenCart={setOpenCart} setOpenSummary={setOpenSummary} />}

                  </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-primaryColorVar hover:text-white"
                >
                  My Account
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-primaryColorVar hover:text-white"
                >
                  Orders
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-primaryColorVar hover:text-white"
                >
                  Saved Items
                </Disclosure.Button>
               {user?.isBusiness && <Disclosure.Button>
                            <button
                              onClick={()=>navigate('/create-product')}
                              className={
                                ' px-2 py-1 mb-1 hover:bg-secondaryColor text-sm flex items-center text-primaryColor border border-primaryColor text-center mx-auto gap-2 rounded-lg'
                              }
                            >
                              <span className=''><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3 text-primaryColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                              </span>
                              <span className='text-sm'>Create Product</span>
                            </button>
                </Disclosure.Button>}
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-primaryColorVar hover:text-white"
                  onClick={()=>handleLogout()}
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default DashboardNav