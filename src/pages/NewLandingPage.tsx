"use client"
import img1 from "../assets/imgs/egusi-plate.png"
import logo from "../assets/imgs/afrologo.png"
import img2 from "../assets/imgs/egusi 1 small.png"
import img3 from "../assets/imgs/EGUSI-WITH-BALL-8-1-1024x683 1.png"
import img4 from "../assets/imgs/fried-chicken-with-rice-png-11552946877l1m5eokomr 1.png"
import img5 from "../assets/imgs/Garri 1.png"
import playstoreIcon from "../assets/imgs/playstore.png"
import appstoreIcon from "../assets/imgs/appstore.png"

type Props = {}
export type DataSentProp = {
  ip_address: string
  search_word?: string
}

const NewLandingPage = (props: Props) => {


return (
    <div className='font-manrope px-4 lg:px-16 relative overflow-hidden min-h-screen'>
        <nav className='flex items-center justify-between px-4 lg:px-0 lg:justify-around py-1'>
            <div className='w-20 h-20'>
                <img className='w-full h-full object-contain' src={logo} alt="logo" />
            </div>


                <ul className='hidden lg:flex items-center gap-4 text-[#229952] font-semibold'>
                    <li>Marketplace</li>
                    <li>Features</li>
                    <li>About Us</li>
                    <li>Blog</li>
                    <li>FAQs</li>
                </ul>
                
                <p className='lg:hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>
                </p>

                <button className='hidden lg:block font-semibold bg-white text-[#229952] px-2 py-1 rounded-xl'>Contact us</button>
        </nav>
        <div className='flex flex-col gap-4 lg:flex-row items-center justify-between lg:px-28 lg:pr-44 lg:mt-20'>
            <div className='w-full max-w-[500px] lg:ml-28 mt-10 flex flex-col gap-6'>
                <div className='w-full'>
                <h2 className='text-[#229952] text-[50px] lg:text-[68px] font-bold whitespace-pre-wrap leading-tight'><span className='text-[#8DD19F]'>Bring</span>  Tradition To <span className='text-[#8DD19F]'>Your</span> Table...</h2>
                <p>We simplify the process of bridging the gap between suppliers and customers. Enjoy a wide variety of african food in one place.</p>
                </div>
                <div className='grid grid-cols-4 gap-1'>
                    <div>
                        <img src={img2} alt="" />
                    </div>
                    <div>
                        <img src={img3} alt="" />
                    </div>
                    <div>
                        <img src={img4} alt="" />
                    </div>
                    <div>
                        <img src={img5} alt="" />
                    </div>
                </div>
            
                <div className='flex items-center gap-2'>
                    <a  href='https://apps.apple.com/ng/app/afromarket-square/id6476175128' rel="noopener noreferrer" target="_blank" className='w-36 text-white text-sm rounded-xl'>
                    <img src={appstoreIcon} className='w-full object-cover rounded-xl block' alt="" />

                    </a>

                    <a href='https://play.google.com/store/apps/details?id=com.ams.afro_market_android&pcampaignid=web_share' rel="noopener noreferrer" target="_blank" className='w-36 text-white text-sm rounded-xl'>
                    <img src={playstoreIcon} className='w-full object-cover rounded-xl block' alt="" />

                    </a>
                </div>
                
            </div>
            <div className='w-[340px] h-[340px] lg:w-[480px] lg:h-[480px] mx-auto lg:mr-20 pt-10 mb-10'>
                <img className='w-full h-full object-contain' src={img1} alt="" />
            </div>
        </div>
        <div className='hidden lg:block h-[180vh] w-[90%] absolute -top-96 -right-[55%] -z-10'>
            <div className='bg-[#229952] h-full w-full rounded-full flex items-center justify-center'>
                <div className='h-[68%] bg-white w-[68%] rounded-full' />
            </div>
        </div>
        <p className="text-center text-xs leading-5 text-primaryColor mb-6 font-semibold">
            &copy; 2024 AfroMarketSquare, Ltd. All rights reserved.
          </p>
    </div>
  )
}

export default NewLandingPage
