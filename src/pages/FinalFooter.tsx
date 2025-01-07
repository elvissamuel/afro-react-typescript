import logo from "../assets/imgs/afrologo.png"
import locationIcon from "../assets/icons/locationIconMain.png"
import messageIcon from "../assets/icons/messageIcon.png"

const FinalFooter = () => {

    return (
        <section className="pt-20 pb-8 flex items-center flex-col px-4 w-[80%] mx-auto bg-white">
            <div className="grid lg:grid-cols-5 gap-10 w-full">
                <div className="flex flex-col gap-4 col-span-2 ">
                    <div className="w-[140px]">
                        <img className="w-full object-contain" src={logo} alt="afro-logo" />
                    </div>
                    <div className="flex items-center gap-2">
                        <div>
                            <img src={locationIcon} alt="" />
                        </div>
                        <p>United Kingdom</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div>
                            <img src={messageIcon} alt="" />
                        </div>
                        <p>support@afromarketsquare.com</p>
                    </div>

                </div>

                <div>
                    <h2 className="text-lg font-semibold my-4">Company</h2>
                    <ul className="flex flex-col gap-2">
                        <li>Marketplace</li>
                        <li>About Us</li>
                        <li>Blog</li>
                        <li>FAQs</li>
                        <li>Contact Us</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold my-4">Community</h2>
                    <ul className="flex flex-col gap-2">
                        <li>Vendor Hub</li>
                        <li>Share our dreams</li>
                        <li>Partnership</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold my-4">Legal</h2>
                    <ul className="flex flex-col gap-2">
                        <li>Term of Service</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
            </div>
            <p className="mx-auto text-center mt-20">© 2024 AfroMarketSquare. All Rights Reserved</p>
        </section>
    )
}

export default FinalFooter