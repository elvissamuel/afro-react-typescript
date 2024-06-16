"use client"
import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Popover,  } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import logo from "../assets/imgs/afrologo.png";
import { Toaster } from 'sonner'
import { getAllOrders, getCategories } from '../api/api'
import { CategoryProps } from './DashboardNav'
import ShoppingCart from './ShoppingCart'
import OrderSummary from './OrderSummary'
import { useQuery } from '@tanstack/react-query'
import { encryptData } from 'src/AES/AES'
import { useUserIp, useUserStore } from 'src/store/user-store'

type Props = {
  setSearchValue?: React.Dispatch<React.SetStateAction<string>>
}

const HomeNav = (props: Props) => {
  
  const [logout, setLogout] = useState(false)
  const [categories, setCategories] = useState<CategoryProps[]>([])
  const [dataIP, setDataIP] = useState()
  const [openCart, setOpenCart] = useState(false)
  const [openSummary, setOpenSummary] = useState(false)
  const {user} = useUserStore.getState()
  const {ipAddress} = useUserIp.getState()

  const {data: allOrder, } = useQuery({
    queryKey: ['All_Afro_Orders'],
    queryFn: async ()=>{

      const data = {ip_address: ipAddress}
      console.log("sent cart data: ", data)
      const encryptedData = encryptData({data, secretKey:process.env.REACT_APP_AFROMARKETS_SECRET_KEY})
      const response = await getAllOrders(encryptedData)
      return response
    },
    // enabled: user?.cartResponse.cartReference !== undefined
  })

  useEffect(() => {
    fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        const myIPAddress = data.ip;
        setDataIP(myIPAddress);
      })
      .catch((error) => {
        console.error("Error fetching IP:", error);
      });
  }, []);
    

    useEffect(()=>{
      getCategories(setCategories)
    }, [])

  return (
    <Disclosure as="nav" className=" sticky top-0 bg-white z-20 border-b-8 border-secondaryColor">
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
                    <Popover className="relative border-none px-1 py-2 text-sm font-medium text-white">
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
                                <div key={item.name} onClick={()=>{if(props.setSearchValue !== undefined) props.setSearchValue(item.name)}} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                                  
                                  <div>
                                    <div className="font-semibold text-gray-900">
                                      {item.name}
                                      <span className="absolute inset-0" />
                                    </div>
                                  </div>
                                  
                                </div>
                                
                              ))}
                              <p className='text-zinc-700 pl-4 font-semibold cursor-pointer' onClick={()=>{if(props.setSearchValue !== undefined) props.setSearchValue('')}}>View All</p>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
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
                    <XMarkIcon className="block bg-primaryColor h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block bg-primaryColor h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div>
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
                    {openCart && <ShoppingCart order={allOrder !== undefined ? allOrder.orders : []} setOpenSummary={setOpenSummary} setOpenCart={setOpenCart} />}
                    {openSummary && <OrderSummary order={allOrder !== undefined ? allOrder.orders : []} setOpenSummary={setOpenSummary} /> }

                  </button>
              </div>
              <div className="hidden lg:ml-4 lg:block">
                <div className="flex items-center gap-2">
                  
                  <div className='text-primaryColor text-sm p-1 font-semibold flex-shrink-0 '><a href={'/login'}><button className='rounded px-2 py-1 bg-secondaryColor'>Login</button></a></div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
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
                            <div className="grid grid-cols-1 gap-x-2 gap-y-1 p-4 lg:grid-cols-2">
                              {categories && categories.map((item) => (
                                <div key={item.name} onClick={()=>{if(props.setSearchValue !== undefined) props.setSearchValue(item.name)}} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                
                                  <div>
                                    <div className="font-semibold text-gray-900">
                                      {item.name}
                                      <span className="absolute inset-0" />
                                    </div>
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
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  
                  <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 text-primaryColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clip-rule="evenodd" />
                  </svg>

                  </span>
                </div>
                <div className="ml-3">
                </div>
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View cart</span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-primaryColor hover:text-primaryColorVar">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    </span>
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
                <Disclosure.Button
                  as="a"
                  href="/login"
                  className="text-primaryColor text-base p-1 font-semibold block w-[200px] mx-auto text-center rounded px-2 py-2 bg-secondaryColor"
                >
                  Login

                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default HomeNav