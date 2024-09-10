import logo from "../assets/imgs/afrologo.png"
import userIcon from "../assets/icons/userIcons.png"
import { useLocation } from "react-router-dom"

const FinalNav = () => {
  const location = useLocation()

    return (
        <nav className={`flex items-center justify-between w-full border px-4 lg:px-32 lg:justify-between py-1  ${location.pathname.includes("vendor") ? "bg-white" : location.pathname.includes("rider") ? "bg-[#E9F7FD]" : "bg-[#FBF3E6]" }`}>
                <div className='flex items-center gap-20'>
                    <div className='w-20 h-20 '>
                        <img className='w-full h-full object-contain' src={logo} alt="logo" />
                    </div>
                        <ul className='hidden lg:flex items-center gap-4 text-[#606060] font-semibold'>
                            <li>Marketplace</li>
                            <li>Features</li>
                            <li>About Us</li>
                            <li>Blog</li>
                            <li>FAQs</li>
                        </ul>
                </div>
            
                    <p className='lg:hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                    </p>
                    <button className='flex items-center gap-2 border rounded-3xl py-2 px-3 text-primaryColor border-primaryColor bg-white'>
                        <img className='text-primaryColor text-4xl' src={userIcon} alt="user-icon" />
                        <p>Sign In</p>
                    </button>
            </nav>
    )
}

export default FinalNav