import LocationAttributesComponent from "./LocationAttributesComponent"
import icon1 from "../assets/icons/locationicon1.png"
import icon2 from "../assets/icons/locationIcon2.png"
import icon3 from "../assets/icons/locationIcon3.png"
import icon4 from "../assets/icons/locationIcon4.png"
import icon5 from "../assets/icons/locationIcon5.png"
import icon6 from "../assets/icons/locationIcon6.png"
import icon7 from "../assets/icons/locationIcon7.png"
import locationIcon from "../assets/icons/locationIconMain.png"
import targetIcon from "../assets/icons/targetIcon.png"
import map from "../assets/icons/map2.png"
import item1 from "../assets/icons/item1.png"
import item2 from "../assets/icons/item2.png"
import item3 from "../assets/icons/item3.png"
import item4 from "../assets/icons/item4.png"
import item5 from "../assets/icons/item5.png"
import item6 from "../assets/icons/item6.png"
import { useLocation } from "react-router-dom"

const LocationsPage = () => {
    const location = useLocation();

    const attributes = [
        {icon: icon1, label: "Cost Effective" },
        {icon: icon2, label: "Sales Visibility" },
        {icon: icon3, label: "Saves Time & Hassle" },
        {icon: icon4, label: "Quality Products" },
    ]

    const attributes2 = [
        {icon: icon5, label: "Satisfaction Gauranteed" },
        {icon: icon6, label: "Community Engagement" },
        {icon: icon7, label: "Seamless Delivery" },
    ]

    const locations = [
        {icon: targetIcon, label: "Bath" },
        {icon: locationIcon, label: "Coventry" },
        {icon: targetIcon, label: "Derby" },
        {icon: locationIcon, label: "Exeter" },
        {icon: targetIcon, label: "Hereford" },
        {icon: locationIcon, label: "Lancaster" },
        {icon: targetIcon, label: "Leeds" },
        {icon: locationIcon, label: "Lincoln" },
        {icon: targetIcon, label: "Liverpool" },
        {icon: locationIcon, label: "London" },
        {icon: targetIcon, label: "Manchester" },
        {icon: locationIcon, label: "Norwich" },
        {icon: targetIcon, label: "Preston" },
        {icon: locationIcon, label: "St Albans" },
    ]

    const items = [
        item1, item2, item3, item4, item5, item6
    ]

    return (
        <section className="py-20 bg-[#FBF3E6] min-h-screen lg:px-32 flex flex-col items-center">
            {location.pathname.includes("vendor") ? <div>
                <div className="grid grid-cols-4 gap-4 px-4 lg:px-0">
                    {attributes.map((attribute, index) => (
                        <LocationAttributesComponent key={index} {...attribute} />
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-4 my-4 px-4 lg:px-0">
                    {attributes2.map((attribute, index) => (
                        <LocationAttributesComponent key={index} {...attribute} />
                    ))}
                </div>
            </div> : location.pathname.includes("rider") ? null :

            <div className="w-full px-14">
                <h2 className="font-bold border-l-8 pl-2 border-primaryColor my-2">Some items you can get on AMS</h2>
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                    {
                        items.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 my-6">
                                <img src={item} alt="product-icon" className="" />
                            </div>
                        ))
                    }
                </div>
            </div>}

            <div className="flex flex-col items-center gap-6">
            <div className="my-20 text-center">
                <p className=" text-sm px-4 py-2 my-2 text-slate-500 text-center rounded-xl font-semibold bg-[#fff] inline-block mx-auto ">WE ARE HERE</p>
                <h2 className="text-3xl font-semibold my-3"> WE GOT YOU COVERED</h2>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-10">
                <div className="">
                    <img src={map} alt="location-map" />
                </div>
                <div className="">
                    <h2 className="font-semibold text-lg my-4 px-2">Some cities we deliver to; </h2>
                    <div className="grid grid-cols-3 gap-3 px-2">
                        {
                            locations.map((loc, index) => (
                                <LocationAttributesComponent key={index} {...loc} />
                            ))
                        }
                    </div>

                </div>
            </div>

            </div>
        </section>
    )
}

export default LocationsPage