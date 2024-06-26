import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import DashboardProducts from './DashboardProducts'
import Inbox from '../pages/Inbox'
import Orders from '../pages/Orders'
import Wishlist from '../pages/Wishlist'
import Address from '../pages/Address'
import AccountManagement from '../pages/AccountManagement'

const navigation = [
  { name: 'Manage Products', href: 'manage', icon: HomeIcon, current: true },
  { name: 'Inbox', href: 'inbox', icon: UsersIcon, current: false },
  { name: 'Orders', href: 'orders', icon: FolderIcon, current: false },
  { name: 'Wishlist', href: 'wishlist', icon: CalendarIcon, current: false },
  { name: 'Address Book', href: 'address', icon: DocumentDuplicateIcon, current: false },
  { name: 'Account Management', href: 'account-management', icon: DocumentDuplicateIcon, current: false },
  { name: 'Legal', href: 'legal', icon: ChartPieIcon, current: false },
  { name: 'Terms & Conditions', href: 'terms', icon: ChartPieIcon, current: false },
  { name: 'Close Account', href: 'close', icon: ChartPieIcon, current: false },
]

export default function DashboardComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [page, setPage] = useState('manage')
  const [nav, setNav] = useState(0)

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    
                    <nav className="flex flex-1 flex-col mt-4">
                      <ul className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name} onClick={()=>setPage(item.href)}>
                                
                                <p
                                  className={`
                                    ${item.current
                                      ? 'bg-gray-50 text-indigo-600'
                                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'}
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer'
                                  `}
                                >
                                  <item.icon
                                    className={`
                                      ${item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'}
                                      'h-6 w-6 shrink-0'
                                    `}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </li>

                        <li className="mt-auto">
                          <p
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                              aria-hidden="true"
                            />
                            Settings
                          </p>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:top-24 lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        
            <nav className="flex flex-1 flex-col mt-4">
              <ul className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul className="-mx-2 space-y-1">
                    {navigation.map((item, index) => (
                      <li key={item.name} onClick={()=>{setPage(item.href); setNav(index)}}>
                        <p
                          className={`
                            ${nav === index
                              ? 'bg-primaryColor text-white'
                              : 'text-primaryColor hover:text-white hover:bg-primaryColor'}
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer my-2'
                          )`}
                        >
                          <item.icon
                            className={`
                              ${nav === index ? 'text-white' : 'text-primaryColor group-hover:text-white'}
                              'h-6 w-6 shrink-0'
                            `}
                            aria-hidden="true"
                          />
                          {item.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <p
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                      aria-hidden="true"
                    />
                    Settings
                  </p>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 lg:hidden shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>          
          </div>

          <main className="py-1">
            <div className="sm:px-6 lg:px-8 mx-4 ">
              {page === "inbox" ? <Inbox /> : page === "orders" ? <Orders /> : page === "wishlist" ? <Wishlist /> : page === "address" ? <Address /> : page === "account-management" ? <AccountManagement /> : <DashboardProducts />
              }
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
