import FinalNav from "./FinalNav"
import img1 from "../assets/icons/marketplace-img1.png"
import img2 from "../assets/icons/marketplace-img2.png"
import img3 from "../assets/icons/marketplace-img3.png"
import img4 from "../assets/icons/marketplace-img4.png"


const MarketPlacePage = () => {

    const benefits = [
        {title: "Robust Admin Dashboard", body: "Our user-friendly dashboard allows you to manage your store effortlessly. You can upload, edit, or delete products, set prices, and descriptions, and monitor your sales in real time, watch your money grow."},
        {title: "Sales Visibility", body: "Keep track of all your sales and order history through our comprehensive dashboard. Whether you prefer to manage it yourself (self-service) or have our team assist you, we offer flexible subscription packages to suit your needs."},
        {title: "Customer Comparison", body: "Customers can compare prices from different vendors, helping you stand out with competitive pricing and quality products."},
        {title: "Order Processing", body: "Easily process orders in seconds, ensuring timely and efficient delivery to customers."},
        {title: "Dispute Resolution", body: "Our platform allows you to raise requests for refunds and resolve disputes quickly and easily, with dedicated customer service representatives available to assist."},
        {title: "Advertising Opportunities", body: "Advertise your products directly on our app to increase visibility and attract more customers."},
        {title: "Seamless Delivery", body: "Our team works closely with you to ensure that all deliveries are handled with care and efficiency."}
    ]

    const asVendor = [
        {title: "Sign Up and Onboarding", body: "Register on the AfroMarketSquare platform. During onboarding, we will share a detailed breakdown of commission rates and other essential information."},
        {title: "Setting Up Your Store", body: "Once onboarded, you can start setting up your store by uploading your products. Add detailed descriptions, set your prices, and ensure all information is accurate."},
        {title: "Manage Your Store", body: "Use our admin dashboard to keep track of sales, update your inventory, and manage orders. You can choose to handle this yourself or have our team assist you."},
        {title: "Advertising and Promotions", body: "Take advantage of our advertising options to promote your products and reach more customers"},
        {title: "Order Fulfillment", body: "Process orders efficiently using our platform, ensuring timely delivery to maintain customer satisfaction."},
        {title: "Resolve Issues", body: "Should any issues arise, our customer service team is here to help you resolve them quickly and efficiently"},
        {title: "Payment Format and Fees", body: "Commission Structure: A detailed breakdown of the commission structure will be provided during onboarding. This ensures transparency and helps you understand how much you will earn from each sale."},
        {title: "Payment Schedule", body: "Payments are processed on a regular weekly basis. You will receive your earnings directly to your bank account, minus the agreed commission."},
        {title: "Transaction Fees", body: "A small transaction fee may apply to each sale to cover payment processing costs. This will be clearly outlined in the vendor agreement."},
        {title: "Subscription Fee", body: "A minimal annual subscription fee applies to join the bulk buying group, ensuring that you can offer competitive prices to customers."},
        {title: "Incentives and Support", body: "Vendor Incentives: We offer various incentives to encourage high performance, such as reduced commission rates for top sellers, seasonal promotions, and featured listings."},
        {title: "Dedicated Support", body: "Our customer service representatives are always available to assist you with any issues or questions. Whether you need help managing your store, processing orders, or resolving disputes, we’re here to support you"},
        {title: "Training and Resources", body: "Access training materials and resources to help you maximize your sales and grow your business on AfroMarketSquare"},
    ]

    const whatsComing = [
        {title: "Broader Coverage", body: "More delivery riders mean we can reach more areas, ensuring timely deliveries across the UK."},
        {title: "Greater Efficiency", body: "The app streamlines delivery processes with features like real-time traffic updates and optimized routes, reducing delays and enhancing service quality"},
        {title: "Job Creation", body: "The app will create new job opportunities for delivery riders, boosting local economies and providing valuable employment."},
        {title: "Effortless Onboarding", body: "Riders can quickly sign up and begin working with our simple and intuitive onboarding process"},
        {title: "Live Order Tracking", body: "Customers can monitor their orders in real-time, providing greater transparency and reliability."},
        {title: "Improved Communication", body: "The app enhances interaction between riders, vendors, and customers, ensuring smooth and efficient deliveries."},
    ]

    const bulkBuying = [
        {title: "Greater Accessibility", body: "More customers will have access to our bulk buying groups, allowing them to save money and enjoy high-quality African food items."},
        {title: "Community Building", body: "By expanding our reach, we are fostering stronger communities that can benefit from shared purchasing power."},
        {title: "New Locations", body: "Stay tuned for announcements about new cities where bulk buying groups will be available."},
        {title: "Local Partnerships", body: "We are partnering with local vendors in these new areas to ensure a wide variety of products and reliable service."}
    ]

    return (
        <section>
            <FinalNav />
            <div className="px-4 lg:px-20 bg-[#FDFAF5] min-h-screen py-12 text-slate-600">
                <div>
                    <p>“At AfroMarketSquare, we’re not just a grocery delivery service—we’re a vibrant community passionate about celebrating and sharing Africa’s rich culinary heritage. Whether you're preparing a feast for your family or a special meal just for yourself, we’re dedicated to making your life easier and your dishes more delightful. Join us in savoring the authentic flavors of Africa, where every meal is a celebration.”</p>
                </div>

                <div className="my-8">
                    <h2 className="text-2xl font-semibold border-b-4 inline-block pb-1 border-black">AfroMarketSquare's Community</h2>
                    <p className="my-4">Discover the convenience, quality, and warmth of AfroMarketSquare. Sign up today to start enjoying the finest African cuisine delivered right to your doorstep.
                    Thank you for choosing AfroMarketSquare—we’re excited to bring the vibrant flavors of Africa to your table and be a part of your culinary journey.</p>
                </div>
                <div className="flex flex-col lg:flex-row items-start gap-8 my-8">
                    <div className="w-[90%] lg:w-[60%]">
                        <img className="w-full object-cover" src={img1} alt="" />
                    </div>
                    <div className="">
                        <h2 className="mb-4">Welcome to AfroMarketSquare Vendor Hub!</h2>
                        <p>At AfroMarketSquare, we are dedicated to providing an efficient and seamless platform for vendors to reach a broader audience and grow their business. Here’s everything you need to know about becoming a vendor on our platform, including the benefits, payment format, incentives, fees, and the step-by-step process to get started.</p>
                    </div>
                    
                </div>
                <div className="flex flex-col gap-6 my-8">
                    {benefits.map((benefit, index) => (
                        <div>
                            <h3 key={index} className="font-semibold text-xl">{benefit.title}</h3>
                            <p>{benefit.body}</p>
                        </div>
                    ))}
                </div>

                <div className="w-full my-8 min">
                    <img src={img2} className="object-cover w-full" alt="" />
                    
                </div>
                <h2 className="text-2xl font-semibold border-b-4 my-4 inline-block pb-1 border-black">Getting started AMS as a Vendor</h2>

                <div className="flex flex-col gap-6 my-8">
                {asVendor.map((benefit, index) => (
                        <div>
                            <h3 key={index} className="font-semibold text-xl">{benefit.title}</h3>
                            <p>{benefit.body}</p>
                        </div>
                    ))}
                </div>
                <p>“At AfroMarketSquare, your satisfaction is our top priority. We are dedicated to listening to your feedback and making the necessary improvements to enhance your experience. Our customer service team is always available to assist you with any issues or concerns you may have.”</p>

                <div>
                <h2 className="text-2xl my-8 font-semibold border-b-4 inline-block pb-1 border-black">What's Coming</h2>
                <div className="flex flex-col lg:flex-row items-start gap-6">
                    <div className="w-[90%] lg:w-[60%]">
                        <img src={img3} className="object-cover w-full" alt="" />
                    </div>
                    <p>We are excited to share some fantastic news with you! We are on the verge of launching our brand-new Rider App, a game-changing tool designed specifically to elevate the experience of our delivery riders throughout the UK. This innovative app is set to revolutionize the way our riders operate, offering a host of features aimed at making their jobs easier, faster, and more efficient.</p>
                </div>
                <div className="flex flex-col gap-6 my-8">
                {whatsComing.map((benefit, index) => (
                        <div>
                            <h3 key={index} className="font-semibold text-xl">{benefit.title}</h3>
                            <p>{benefit.body}</p>
                        </div>
                    ))}
                </div>
                </div>

                <div className="w-full">
                    <img src={img4} className="object-cover w-full" alt="" />
                </div>

                <div className="flex flex-col gap-6 my-8">
                {bulkBuying.map((benefit, index) => (
                        <div>
                            <h3 key={index} className="font-semibold text-xl">{benefit.title}</h3>
                            <p>{benefit.body}</p>
                        </div>
                    ))}
                </div>

                <p className="mx-auto text-center pb-4 pt-32 text-slate-400">© 2024 AfroMarketSquare. All Rights Reserved</p>
            </div>
        </section>
    )
}

export default MarketPlacePage 