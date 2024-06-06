import japamobile from '../assets/imgs/japa-mobile.jpg'
import japabanner from '../assets/imgs/japa-desktop.jpg'
import { useEffect, useState } from 'react';


const DashboardBanner = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobileView = windowWidth <= 700;

  return (
    <div className=''>
      {isMobileView ? 
      <div className='my-4 h-[140px] w-[90%] mx-auto rounded relative'>
            <a href="https://buy.stripe.com/3cs8wV4GWdFmfrG144"><button className='bg-primaryColor text-white my-4 px-3 w-25 h-8 py-1 rounded-lg absolute bottom-0 right-20'>Buy Now</button></a>
        <img src={japamobile} className='w-full h-full object-cover rounded'  alt="" />
      </div> : 
      <div className='my-4 h-[210px] w-[90%] mx-auto rounded relative'>
      <a href="https://buy.stripe.com/3cs8wV4GWdFmfrG144"><button className='bg-primaryColor text-white my-4 px-3 w-40 h-12 py-1 rounded-lg absolute top-8 right-40'>Buy Now</button></a>
  <img src={japabanner} className='w-full h-full object-cover rounded'  alt="" />
</div>}
    </div>
  )
}

export default DashboardBanner