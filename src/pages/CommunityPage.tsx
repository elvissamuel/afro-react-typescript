import { useLocation } from "react-router-dom"
import communityImg1 from "../assets/icons/communityImg1.png"
import communityImg2 from "../assets/icons/communityImg2.png"
import communityImg3 from "../assets/icons/communityImg3.png"
import CommunityBanner from "./CommunityBanner"
import CommunityComponent from "./CommunityComponent"

const CommunityPage = () => {
    const location = useLocation()

    const array = [
        {image: communityImg1, title: "Join our vendor hub", body: "we are dedicated to providing an efficient and seamless platform for vendors to reach a broader audience and grow their business. ", bgColor: "#D3EBDC" },
        {image: communityImg2, title: "Shop with us", body: "we are dedicated to providing an efficient and seamless platform for vendors to reach a broader audience and grow their business.", bgColor: "#FCF7EF" },
        {image: communityImg3, title: "Delivery Partnership", body: "Our delivery unit will be designed to onboard and support delivery riders across the UK, ensuring faster and more efficient delivery services", bgColor: "#DAF2FC" }
    ]

    return (
        <section className="py-20 px-2 w-[80%] mx-auto min-h-screen flex flex-col gap-6 items-center">

        <div className="flex flex-col items-center gap-3 mb-8">
            <p className=" p-2 text-sm px-4 inline-block py-2 text-slate-500 text-center rounded-xl font-semibold bg-[#E9F7FD] ">JOIN US</p>
            <h2 className="text-3xl font-semibold">JOIN OUR GROWING COMMUNITY</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
        <div className={`flex flex-col items-center pb-8 rounded-3xl gap-4`} style={{ backgroundColor: "#D3EBDC" }}>
            <div className="w-full">
                <img className="w-full h-full object-contain" src={communityImg1} alt="" />
            </div>
            <h2 className="text-center font-bold text-lg">Join our vendor hub</h2>
            <p className="text-center px-6">{array[0].body}</p>

            <a href="/vendor" className={`text-center border-slate-300 w-2/3 py-2 rounded-xl ${location.pathname.includes("vendor") ? "border-2 border-slate-950" : "border"}`}>Get Started</a>
        </div>
        <div className={`flex flex-col items-center pb-8 rounded-3xl gap-4`} style={{ backgroundColor: array[1].bgColor }}>
            <div className="w-full">
                <img className="w-full h-full object-contain" src={array[1].image} alt="" />
            </div>
            <h2 className="text-center font-bold text-lg">{array[1].title}</h2>
            <p className="text-center px-6">{array[1].body}</p>

            <a href="/" className={`text-center border-slate-300 w-2/3 py-2 rounded-xl ${(!location.pathname.includes("vendor") && !location.pathname.includes("rider")) ? "border-2 border-slate-950" : "border"}`}>Get Started</a>
        </div>
        <div className={`flex flex-col items-center pb-8 rounded-3xl gap-4`} style={{ backgroundColor: array[2].bgColor }}>
            <div className="w-full">
                <img className="w-full h-full object-contain" src={array[2].image} alt="" />
            </div>
            <h2 className="text-center font-bold text-lg">{array[2].title}</h2>
            <p className="text-center px-6">{array[2].body}</p>

            <a href="/rider" className={`text-center border-slate-300 w-2/3 py-2 rounded-xl ${location.pathname.includes("rider") ? "border-2 border-slate-950" : "border"}`}>Get Started</a>
        </div>
            
        </div>

        <CommunityBanner />

        </section>
    )
}

export default CommunityPage;