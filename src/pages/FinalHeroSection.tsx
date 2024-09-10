"use client"
import React, { useContext, useEffect, useState } from 'react'
import userIcon from "../assets/icons/userIcons.png"
import img1 from "../assets/imgs/egusi-plate.png"
import logo from "../assets/imgs/afrologo.png"
import vendorHero from "../assets/icons/hero-vendor.png"
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

const FinalHeroSection = (props: Props) => {


return (
    <div className=' font-manrope px-4 lg:px-2 relative overflow-hidden min-h-screen border-t'>
        <div>
            <div className='pt-4'>
                <div className='-z-10 w-[35%] h-[90%] md:h-[100%] absolute right-0 top-0 bg-gradient-to-t to-[#D3EBDC] from-[#FAEFDE]' />
                <div className=' flex flex-col lg:flex-row justify-center gap-20'>
                    <div className='lg:w-[580px] lg:mt-28'>
                        <div className='mx-auto flex flex-col gap-4'>
                            <h2 className='font-extrabold text-[4rem] leading-none my-4'>Tradition and Elegance Unite.</h2>
                            <p>We simplify the step of bridging the gap between suppliers and customers. Enjoy a wide variety of African foods all in one place.</p>
                            <button className='bg-primaryColor text-white w-[140px] rounded-full p-2'>Get Start</button>
                        </div>
                    </div>
                    <div className='hidden lg:block'>
                        <img src={vendorHero} alt="vendorHero" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FinalHeroSection
