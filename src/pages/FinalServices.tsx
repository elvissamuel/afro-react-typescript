import ServiceComponent from "./ServiceComponent"
import img1 from "../assets/icons/service1.png"
import img2 from "../assets/icons/service2.png"
import img3 from "../assets/icons/service3.png"
import img4 from "../assets/icons/service4.png"

const FinalServices = () => {

    const services = [
        {
            title: "Product Variety",
            body: "We offer all you need for your favorite African dishes. Ready-to-eat meals available too!",
            image: img1
        },
        {
            title: "Bulk Buying",
            body: "Join our bulk buying group for £20/year for exclusive bulk prices.",
            image: img2
        },
        {
            title: "Quality Told",
            body: "Our high-quality products sourced from our trusted vendors for items that meet your standards.",
            image: img3
        },
        {
            title: "Door Delivery",
            body: "Get your groceries and ready meals delivered to your doorstep for convenience, time saving and effort.",
            image: img4
        }
    ]

    return (
        <section className="py-20 flex flex-col items-center justify-center m-6 min-h-screen w-full">
            <div className="flex flex-col items-center gap-4">
                <p className=" p-2 text-sm px-4 py-2 text-slate-500 text-center rounded-xl font-semibold bg-[#E9F7FD] ">WHAT WE OFFER</p>
                <h2 className="text-4xl font-semibold">OUR SERVICES</h2>
            </div>

            <div className="grid lg:grid-cols-4 gap-4 my-16 w-[80%]">
                {services.map((service, index) => (
                    <div>
                        <ServiceComponent key={index} {...service} />
                    </div>
                ) )}
            </div>
        </section>
    )
}

export default FinalServices