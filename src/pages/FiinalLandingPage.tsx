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

type Props = {}
export type DataSentProp = {
  ip_address: string
  search_word?: string
}

const FinalLandingPage = (props: Props) => {
  const location = useLocation()

return (
    <div className=' font-manrope relative overflow-hidden min-h-screen'>
      <FinalNav />
        {location.pathname.includes("vendor") ? <FinalHeroSection /> : location.pathname.includes("rider") ? <RiderHeroSection /> : <FinalUserHeroSection />}
        <div className='hidden lg:block'>
          <HeroBanner />
        </div>
        {!location.pathname.includes("rider") && <FinalServices />}
        <LocationsPage />
        <CommunityPage />
        <FinalTestimonialsPage />
        <FinalFooter />
    </div>
  )
}

export default FinalLandingPage
