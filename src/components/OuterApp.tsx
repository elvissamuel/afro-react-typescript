import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BellIcon, BriefcaseIcon, ChevronDownIcon, CubeIcon, HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Outlet } from "react-router-dom";
import logo from "../assets/imgs/afrologo.png"


export default function OuterApp () {
    const userNavigation = [
        { name: 'Your profile', href: '#' },
        { name: 'Sign out', href: '#' },
      ]

    return (
        <div className="">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 lg:px-6 border-b fixed top-0 w-full bg-white">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Your Company"
                src={logo}
                className="h-12 w-auto"
              />
            </div>
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

                <main className="pt-20 pb-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <Outlet />
              
              </div>
          </main>
        </div>
    )
}