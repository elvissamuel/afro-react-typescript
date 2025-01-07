import img1 from "../assets/icons/aboutus-img1.png"
import FinalNav from "./FinalNav";

const AboutUsPage = () => {

    const offers = [
        {title: "Wide Variety of Products", body: "From staple items like yam, rice, and garri, to fresh vegetables like ewedu and ugwu, and proteins such as boneless goat meat, chicken, and fish, we offer everything you need to prepare your favorite African dishes. We also provide ready-to-eat meals for those days when cooking isn't an option."},
        {title: "Doorstep Delivery", body: "Enjoy the convenience of having your groceries and ready meals delivered right to your doorstep, saving you time and effort."},
        {title: "Bulk Buying Group", body: "Join our bulk buying group for just £20 per year and take advantage of bulk prices. Each buying circle needs at least 15 buyers, ensuring that you get the best deals on your groceries."},
        {title: "Quality You Can Trust", body: "We work with trusted vendors who source high-quality ingredients, so you can trust that every item you receive meets our high standards."},
    ]

    const choices = [
        {title: "Save Time and Hassle", body: "Skip the long lines and multiple trips to the store. Order everything you need online and let us take care of the rest."},
        {title: "One-Stop Shop", body: "Find all your raw and cooked food items in one place, making it easier than ever to plan your meals."},
        {title: "Cost-Effective", body: "By ordering in bulk and in one transaction, you save on delivery fees and benefit from our competitive prices."},
        {title: "Community Engagement", body: "Connect with our vendors and learn more about their products and practices, fostering a sense of community and trust."},
        {title: "Subscription Options", body: "Enjoy regular deliveries of your favorite foods with our flexible subscription plans."},
        {title: "Satisfaction Guarantee", body: "Your satisfaction is our priority. If you're not happy with your purchase, we will make it right."},
    ]

    return (
        <section>
            <FinalNav />
            <div className="flex flex-col lg:flex-row items-start gap-8 px-4 lg:px-32 mt-28 py-10">
                <div className="w-[90%] lg:w-[50%]">
                    <img src={img1} className="w-full object-cover" alt="logo" />
                </div>
                <div>
                    <h2 className="font-semibold text-xl my-3">Welcome to AfroMarketSquare</h2>
                    <p className="mb-4">
                    At AfroMarketSquare, we understand the unique challenges that come with balancing a busy lifestyle and the desire to enjoy high-quality, authentic African cuisine. As a small business committed to serving the black minority communities across the United Kingdom, we have created a seamless and convenient solution for all your grocery and meal needs.
                    </p>

                    <h2 className="font-semibold text-xl my-3">Our Story</h2>
                    <p className="mb-4">Born out of a need to provide a reliable and accessible source for African foodstuff, AfroMarketSquare is an e-commerce startup dedicated to bringing the flavors of home right to your doorstep. Whether you're a new immigrant or a longtime resident longing for a taste of Africa, we make it easy to enjoy the dishes you love without the hassle of traditional grocery shopping.</p>

                    <h2 className="font-semibold text-xl my-3">Our Mission</h2>
                    <p className="mb-4">Our mission is simple: to make high-quality African food accessible, affordable, and convenient for everyone. We believe that everyone deserves to enjoy the richness of African cuisine without the stress of shopping around for ingredients or spending hours in the kitchen.</p>
                </div>
            </div>

            <div className="flex flex-col gap-6 px-4 lg:px-32">
                <h2 className="font-semibold text-xl mt-8">What We Offer</h2>
                {offers.map((offer, index) => (
                    <div>
                        <h3 key={index} className="font-semibold text-lg">{offer.title}:</h3>
                        <p>{offer.body}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-6 px-4 lg:px-32">
                <h2 className="font-semibold text-xl mt-8">Why Choose AfroMarketSquare?</h2>
                {choices.map((offer, index) => (
                    <div>
                        <h3 key={index} className="font-semibold text-lg">{offer.title}:</h3>
                        <p>{offer.body}</p>
                    </div>
                ))}
            </div>

            <p className="text-center mt-24 mb-6">© 2024 AfroMarketSquare. All Rights Reserved</p>
        </section>
    )
}

export default AboutUsPage;