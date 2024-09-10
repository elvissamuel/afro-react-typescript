import communityImg1 from "../assets/icons/communityImg1.png"
import communityImg2 from "../assets/icons/communityImg2.png"
import communityImg3 from "../assets/icons/communityImg3.png"
import CommunityBanner from "./CommunityBanner"
import CommunityComponent from "./CommunityComponent"

const CommunityPage = () => {

    const array = [
        {image: communityImg1, title: "Join our vendor hub", body: "we are dedicated to providing an efficient and seamless platform for vendors to reach a broader audience and grow their business. ", bgColor: "#D3EBDC" },
        {image: communityImg2, title: "Shop with us", body: "we are dedicated to providing an efficient and seamless platform for vendors to reach a broader audience and grow their business.", bgColor: "#FCF7EF" },
        {image: communityImg3, title: "Delivery Partnership", body: "Our delivery unit will be designed to onboard and support delivery riders across the UK, ensuring faster and more efficient delivery services", bgColor: "#DAF2FC" }
    ]

    return (
        <section className="py-20 px-2 lg:px-32 min-h-screen flex flex-col gap-6 items-center">

        <div className="flex flex-col items-center gap-3 mb-8">
            <p className=" p-2 text-sm px-4 inline-block py-2 text-slate-500 text-center rounded-xl font-semibold bg-[#E9F7FD] ">WHAT JOIN US</p>
            <h2 className="text-3xl font-semibold">JOIN OUR GROWING COMMUNITY</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
            {
                array.map((item, index) => (
                    <CommunityComponent key={index} {...item}  />
                ))
            }
        </div>

        <CommunityBanner />

        </section>
    )
}

export default CommunityPage;