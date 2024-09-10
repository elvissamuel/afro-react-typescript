import appStoreIcon from "../assets/icons/appStoreIcon.png"
import googlePlayIcon from "../assets/icons/googlePlayIcon.png"
import phoneImg from "../assets/icons/phoneImg.png"
import TestimonyComponent from "./TestimonyComponent"

const FinalTestimonialsPage = () => {

    const testimonies = [
        {name: "Adebola Omonira", role: "Customer", testimony: "The products I got from Afro Market Square are noticeably cheaper than those from the African store. I look forward to making more purchases on this platform"},
        {name: "Adetoun Ife", role: "Customer", testimony: "It was an excellent experience — convenient, offering great bargains, and the home delivery option made it stress-free. I would definitely choose Afro Market Square again for its reliability and ease of use. Shopping there was a seamless and satisfying experience, ensuring I received quality products without hassle"},
        {name: "Adebola Omonira", role: "Customer", testimony: "The products I got from Afro Market Square are noticeably cheaper than those from the African store. I look forward to making more purchases on this platform"},
        {name: "Adebola Omonira", role: "Customer", testimony: "The products I got from Afro Market Square are noticeably cheaper than those from the African store. I look forward to making more purchases on this platform"},
        {name: "Adebola Omonira", role: "Customer", testimony: "The products I got from Afro Market Square are noticeably cheaper than those from the African store. I look forward to making more purchases on this platform"},
    ]

    return (
        <section className=" bg-secondaryColorVar py-20 px-4 lg:px-32">
            <div className="lg:flex items-start justify-around">
                <div className="lg:w-[420px]">
                    <h2 className="font-semibold my-4">Get your food items and make your food orders on Afro market app</h2>
                    <div className="flex items-center gap-4">
                        <div>
                            <img src={appStoreIcon} alt="" />
                        </div>
                        <div>
                            <img src={googlePlayIcon} alt="" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center mt-16 lg:mt-0 gap-8">
                    <div>
                        <img src={phoneImg} alt="" />
                    </div>
                    <div>
                        <img src={phoneImg} alt="" />
                    </div>
                </div>
            </div>

            <div>
                <p className="text-primaryColor font-bold border-l-2 mt-16 border-primaryColor pl-2">Hear from our customers</p>

                <div className="flex gap-4 my-14 w-[100%] border mx-auto overflow-x-scroll">
                    {
                        testimonies.map((testimony, index) => (
                            <div className="w-[500px]">
                                <TestimonyComponent key={index} {...testimony} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default FinalTestimonialsPage