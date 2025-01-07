"use client"
import HeroBanner from './HeroBanner'
import FinalHeroSection from './FinalHeroSection'
import FinalServices from './FinalServices'
import LocationsPage from './LocationsPage'
import CommunityPage from './CommunityPage'
import FinalTestimonialsPage from './FinalTestimonialsPage'
import FinalFooter from './FinalFooter'
import FinalNav from './FinalNav'
import FinalUserHeroSection from './FinalUserHeroSection'
import RiderHeroSection from './RiderHeroSection'
import { useLocation } from 'react-router-dom'
import TestimonialCarousel from './TestimonialComponent'

type Props = {}
export type DataSentProp = {
  ip_address: string
  search_word?: string
}

const FinalLandingPage = (props: Props) => {
  const location = useLocation()

  const testimonials = [
    {name: "Adebola Omonira", role: "Customer", testimony: "The products I got from Afro Market Square are noticeably cheaper than those from the African store. I look forward to making more purchases on this platform"},
    {name: "Adetoun Ife", role: "Customer", testimony: "It was an excellent experience — convenient, offering great bargains, and the home delivery option made it stress-free. I would definitely choose Afro Market Square again for its reliability and ease of use. Shopping there was a seamless and satisfying experience, ensuring I received quality products without hassle"},
    {name: "Adebola Omonira", role: "Customer", testimony: "The products I got from Afro Market Square are noticeably cheaper than those from the African store. I look forward to making more purchases on this platform"},
    {name: "Adebola Omonira", role: "Customer", testimony: "The products I got from Afro Market Square are noticeably cheaper than those from the African store. I look forward to making more purchases on this platform"},
    {name: "Adebola Omonira", role: "Customer", testimony: "The products I got from Afro Market Square are noticeably cheaper than those from the African store. I look forward to making more purchases on this platform"},
]

return (
    <div className=' font-manrope relative overflow-hidden min-h-screen'>
      <div className=' '>
        <div className='w-[100%] mx-auto mb-28'>
          <FinalNav />
        </div>
          {location.pathname.includes("vendor") ? <FinalHeroSection /> : location.pathname.includes("rider") ? <RiderHeroSection /> : <FinalUserHeroSection />}
          <div className='hidden lg:block'>
            <HeroBanner />
          </div>
          {!location.pathname.includes("rider") && <FinalServices />}
          <LocationsPage />
          <CommunityPage />
          {/* <FinalTestimonialsPage /> */}
          <TestimonialCarousel testimonials={testimonials} />
          <FinalFooter />
      </div>
    </div>
  )
}

export default FinalLandingPage
