import logo from "../assets/icons/communityBannerLogo.png"

const CommunityBanner = () => {

    return (
        <div className="bg-[#FCF7EF] w-full py-8 flex flex-col gap-6 lg:flex-row items-center justify-between px-8 my-8">
            <div className="lg:flex gap-4 items-center lg:w-[70%]">
                <div className="w-32 h-32">
                    <img src={logo} alt="" className="w-full h-full object-contain" />
                </div>
                <div>
                    <h2 className="font-bold mb-2">Hungry for more?</h2>
                    <p className="text-sm">Discover exclusive content and stay informed with the latest trends, tips, and offers.
                    Read More and subscribe to get fresh updates directly to your inbox.</p>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <p className="font-semibold text-sm">Enter your email below and join our community</p>
                <div>
                    <input type="text" className="p-2 border rounded-xl" placeholder="email" name="" id="" />
                    <button className="bg-primaryColor text-white rounded-3xl px-6 py-2 text-sm mx-2">Subscribe</button>
                </div>
            </div>
        </div>
    )
}

export default CommunityBanner;