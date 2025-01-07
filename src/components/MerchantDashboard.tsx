'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { BriefcaseIcon, ChevronDownIcon, CubeIcon, MagnifyingGlassIcon, WalletIcon } from '@heroicons/react/20/solid'
import logo from "../assets/imgs/afrologo.png"
import Profile from 'src/pages/Profile'
import { Outlet, useLocation } from 'react-router-dom'

const navigation = [
  { name: 'Profile', href: 'dashboard/profile', icon: UsersIcon, current: true },
  { name: 'Wallet', href: 'dashboard/wallet', icon: WalletIcon, current: false },
  { name: 'Settings', href: 'dashboard/setting', icon: Cog6ToothIcon, current: false },
  { name: 'Logout', href: '#', icon: CalendarIcon, current: false }
]

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]


export default function MerchantDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [current, setCurrent] = useState("")
  const location = useLocation();

  return (
    <>
      <div>
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src={logo}
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={`
                                ${item.current
                                  ? 'bg-gray-50 text-primaryColor'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-primaryColor'}
                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                              `}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={`
                                  ${item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'}
                                  'h-6 w-6 shrink-0',
                                `}
                              />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>

                    <li className="mt-auto">
                      <a
                        href="setting"
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                      >
                        <Cog6ToothIcon
                          aria-hidden="true"
                          className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                        />
                        Settings
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:top-20 lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            {/* <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Your Company"
                src={logo}
                className="h-12 w-auto"
              />
            </div> */}
            <nav className="flex flex-1 flex-col">
              <ul className="flex flex-1 flex-col gap-y-7">
              <Menu as="div" className="relative bg-gray-100 p-2 rounded-xl">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full bg-gray-50"
                    />
                    <span className="hidden lg:flex lg:items-start lg:flex-col">
                      <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-500">
                        Tom Cook
                      </span>
                      <p className='text-xs text-gray-500'>elvissamuel8@gmail.com</p>
                    </span>
                    <ChevronDownIcon aria-hidden="true" className="ml-2 h-5 w-5 text-gray-400" />

                  </MenuButton>
                  <MenuItems
                    className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <a href={item.href} className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50">
                          {item.name}
                        </a>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
                <li>
                  <ul className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name} onClick={() => setCurrent(item.name)}>
                        <a
                          href={item.href}
                          className={`
                            ${location.pathname.includes(item.href)
                              ? 'bg-gray-50 text-primaryColor'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-primaryColor'}
                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                          `}
                        >
                          <item.icon
                            aria-hidden="true"
                            className={`
                              ${location.pathname.includes(item.href) ? 'text-primaryColor' : 'text-gray-400 group-hover:text-primaryColor'}
                              'h-6 w-6 shrink-0',
                            `}
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>

              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          {/* <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>

            <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form action="#" method="GET" className="relative flex flex-1">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-2 h-full w-5 text-gray-400"
                />
                <input
                  id="search-field"
                  name="search"
                  type="search"
                  placeholder="Search..."
                  className="block h-[50px] w-[400px] bg-[#F6F6F6] my-auto px-4 rounded-lg border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-8">
                <HomeIcon aria-hidden="true" className="h-7 w-7 text-gray-400" />
                <CubeIcon aria-hidden="true" className="h-7 w-7 text-gray-400" />
                <BriefcaseIcon aria-hidden="true" className="h-7 w-7 text-gray-400" />
                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-7 w-7" />
                </button>
                

                <Menu as="div" className="relative bg-gray-100 p-2 rounded-xl">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full bg-gray-50"
                    />
                    <span className="hidden lg:flex lg:items-start lg:flex-col">
                      <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-500">
                        Tom Cook
                      </span>
                      <p className='text-xs text-gray-500'>elvissamuel8@gmail.com</p>
                    </span>
                    <ChevronDownIcon aria-hidden="true" className="ml-2 h-5 w-5 text-gray-400" />

                  </MenuButton>
                  <MenuItems
                    className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <a href={item.href} className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50">
                          {item.name}
                        </a>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div> */}

          <main className="pt-2 pb-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <Outlet />
              
              </div>
          </main>
        </div>
      </div>
    </>
  )
}
