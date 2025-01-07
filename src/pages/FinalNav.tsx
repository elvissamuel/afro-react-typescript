import logo from "../assets/imgs/afrologo.png"
import userIcon from "../assets/icons/userIcons.png"
import { useLocation } from "react-router-dom"
import { useState } from "react"

const FinalNav = () => {
  const location = useLocation()
  const [openMenu, setOpenMenu] = useState(false)

    return (
        <nav className={`w-full border px-4 fixed top-0 z-30 py-1  ${location.pathname.includes("vendor") ? "bg-white" : location.pathname.includes("rider") ? "bg-[#E9F7FD]" : "bg-[#FBF3E6] border-none" }`}>
                <div className="w-[80%] mx-auto flex items-center justify-between lg:justify-between ">
                    <div className='flex items-center gap-20'>
                        <div className='w-28 h-28 '>
                            <a href="/"><img className='w-full h-full object-contain' src={logo} alt="logo" /></a>
                        </div>
                            <ul className='hidden lg:flex items-center gap-4 text-[#606060] font-semibold'>
                                <li className={`${location.pathname.includes("marketplace") && "text-[#229952]"}`}><a href="/marketplace">Marketplace</a></li>
                                <li className={`${location.pathname.includes("about-us") && "text-[#229952]"}`}><a href="/about-us">About Us</a></li>
                                <li>Blog</li>
                                <li className={`${location.pathname.includes("faqs") && "text-[#229952]"}`}><a href="/faqs">FAQs</a></li>
                                <li>Contact</li>
                            </ul>
                    </div>
                        <p className='lg:hidden' onClick={()=> setOpenMenu((prev) => !prev)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 text-[#229952]">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                            </svg>
                        </p>
                        {openMenu && <ul className='absolute bg-slate-50 w-full p-3 flex flex-col gap-2 right-0 top-20 z-20 font-semibold'>
                                <li className={`${location.pathname.includes("marketplace") && "text-[#229952]"}`}><a href="/marketplace">Marketplace</a></li>
                                <li className={`${location.pathname.includes("about-us") && "text-[#229952]"}`}><a href="/about-us">About Us</a></li>
                                <li>Blog</li>
                                <li className={`${location.pathname.includes("faqs") && "text-[#229952]"}`}><a href="/faqs">FAQs</a></li>
                                <li>Contact Us</li>
                                <button className='flex items-center w-1/3 mt-6 gap-2 border rounded-3xl py-2 px-3 text-primaryColor border-primaryColor bg-white'>
                            <img className='text-primaryColor text-4xl' src={userIcon} alt="user-icon" />
                            <p>Sign In</p>
                        </button>
                            </ul>}
                    
                        <button className='hidden lg:flex items-center gap-2 border rounded-3xl py-2 px-3 text-primaryColor border-primaryColor bg-white'>
                            <img className='text-primaryColor text-4xl' src={userIcon} alt="user-icon" />
                            <p>Sign In</p>
                        </button>
                </div>
            </nav>
    )
}

export default FinalNav