"use client"
import userHero from "../assets/icons/user-hero-img.png"

type Props = {}
export type DataSentProp = {
  ip_address: string
  search_word?: string
}

const FinalUserHeroSection = (props: Props) => {


return (
    <section className=' font-manrope relative overflow-hidden min-h-screen bg-[#FBF3E6]'>
        <div>
            <div className='pt-4'>
                <div className=' w-[35%] h-[90%] absolute right-0 top-0 bg-gradient-to-t to-[#D3EBDC] from-[#FAEFDE] ' />
                <div className=' flex flex-col lg:flex-row justify-center gap-20'>
                    <div className='lg:w-[44%] lg:mt-28'>
                        <div className='mx-auto flex flex-col gap-4 mt-10 lg:mt-0 z-10'>
                            <h2 className='font-extrabold text-[4rem] leading-none pr-20 my-4 z-10'>Craving it? Let's make it happen.</h2>
                            <p className='z-10'>New to the area or missing African flavors? Enjoy your favorite dishes hassle-free with us. Download our app to order!</p>
                            <div className='flex items-center gap-4 my-4 z-10'>
                                <a href='https://apps.apple.com/ng/app/afromarket-square/id6476175128' rel="noopener noreferrer" target="_blank" className='bg-primaryColor text-white w-[140px] rounded-lg p-2 text-center'>Get on Iphone</a>
                                <a href='https://play.google.com/store/apps/details?id=com.ams.afro_market_android&pcampaignid=web_share' rel="noopener noreferrer" target="_blank" className='bg-primaryColor text-center text-white w-[140px] rounded-lg p-2'>Get on Andriod</a>
                            </div>

                {/* <div className='flex items-center gap-2 z-50'>
                    <a  href='https://apps.apple.com/ng/app/afromarket-square/id6476175128' rel="noopener noreferrer" target="_blank" className='w-36  h-12 text-white text-sm rounded-xl'>
                    <img src={appstoreIcon} className='w-full h-full object-cover rounded-xl block' alt="" />

                    </a>

                    <a href='https://play.google.com/store/apps/details?id=com.ams.afro_market_android&pcampaignid=web_share' rel="noopener noreferrer" target="_blank" className='w-36 h-12 text-white text-sm rounded-xl'>
                    <img src={playstoreIcon} className='w-full h-full object-cover rounded-xl block' alt="" />

                    </a>
                </div> */}
                        </div>
                    </div>
                    <div className='hidden lg:block z-10'>
                        <img src={userHero} alt="vendorHero" />
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default FinalUserHeroSection
