import starIcon from "../assets/icons/StarIcon.png"

const HeroBanner = () => {

    return (
        <div className="bg-[#071F10] text-white flex justify-evenly items-center h-[100px] w-full ">
            <div>
                <img src={starIcon} alt="" />
            </div>
            <p className="w-[840px]">At AfroMarketSquare, we celebrate Africas rich culinary heritage by delivering authentic, high-quality ingredients right to your door. Whether for a family feast or a solo meal, we make enjoying diverse flavours easy and convenient</p>

            <div>
                <img src={starIcon} alt="" />
            </div>
        </div>
    )
}

export default HeroBanner