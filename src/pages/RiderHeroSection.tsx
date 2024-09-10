"use client"

import riderHero from "../assets/icons/rider-hero-img.png"

type Props = {}
export type DataSentProp = {
  ip_address: string
  search_word?: string
}

const RiderHeroSection = (props: Props) => {


return (
    <div className=' font-manrope px-4 lg:px-2 relative overflow-hidden min-h-screen bg-[#E9F7FD] -z-20'>
        <div>
            <div className='pt-4'>
                <div className='-z-10 w-[35%] h-[90%] absolute right-0 top-0 bg-gradient-to-t to-[#D3EBDC] from-[#FDFAF5]' />
                <div className=' flex flex-col lg:flex-row justify-center gap-20'>
                    <div className='lg:w-[580px] lg:mt-28'>
                        <div className='mx-auto flex flex-col gap-4'>
                            <h2 className='font-extrabold text-[4rem] leading-none my-4'>Ride with us, get started today!</h2>
                            <p>Join our team and bring delicious meal to doorsteps!</p>
                            <div className='flex items-center gap-4 my-4'>
                                <button className='bg-transparent text-primaryColor border border-primaryColor w-[140px] rounded-lg p-2'>Get on Iphone</button>
                                <button className='bg-transparent text-primaryColor border border-primaryColor w-[140px] rounded-lg p-2'>Get on Andriod</button>
                            </div>
                        </div>
                    </div>
                    <div className='hidden lg:block'>
                        <img src={riderHero} alt="vendorHero" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RiderHeroSection
