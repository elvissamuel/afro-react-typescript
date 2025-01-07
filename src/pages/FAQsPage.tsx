import FinalNav from "./FinalNav"


const FAQsPage = () => {

    const questions = [
        {title: "What is Afromarketsquare", body: "At AfroMarketSquare, we understand the unique challenges that come with balancing a busy lifestyle and the desire to enjoy high-quality, authentic African cuisine. As a small business committed to serving the black minority communities across the United Kingdom, we have created a seamless and convenient solution for all your grocery and meal needs."},
        {title: "How is the Vendor hub", body: "At AfroMarketSquare, we are dedicated to providing an efficient and seamless platform for vendors to reach a broader audience and grow their business. Here’s everything you need to know about becoming a vendor on our platform, including the benefits, payment format, incentives, fees, and the step-by-step process to get started."},
        {title: "What is Afromarketsquare", body: "At AfroMarketSquare, we understand the unique challenges that come with balancing a busy lifestyle and the desire to enjoy high-quality, authentic African cuisine. As a small business committed to serving the black minority communities across the United Kingdom, we have created a seamless and convenient solution for all your grocery and meal needs."},
        {title: "How is the Vendor hub", body: "At AfroMarketSquare, we are dedicated to providing an efficient and seamless platform for vendors to reach a broader audience and grow their business. Here’s everything you need to know about becoming a vendor on our platform, including the benefits, payment format, incentives, fees, and the step-by-step process to get started."},
        {title: "What is Afromarketsquare", body: "At AfroMarketSquare, we understand the unique challenges that come with balancing a busy lifestyle and the desire to enjoy high-quality, authentic African cuisine. As a small business committed to serving the black minority communities across the United Kingdom, we have created a seamless and convenient solution for all your grocery and meal needs."},
        {title: "How is the Vendor hub", body: "At AfroMarketSquare, we are dedicated to providing an efficient and seamless platform for vendors to reach a broader audience and grow their business. Here’s everything you need to know about becoming a vendor on our platform, including the benefits, payment format, incentives, fees, and the step-by-step process to get started."},
        {title: "What is Afromarketsquare", body: "At AfroMarketSquare, we understand the unique challenges that come with balancing a busy lifestyle and the desire to enjoy high-quality, authentic African cuisine. As a small business committed to serving the black minority communities across the United Kingdom, we have created a seamless and convenient solution for all your grocery and meal needs."},
        {title: "How is the Vendor hub", body: "At AfroMarketSquare, we are dedicated to providing an efficient and seamless platform for vendors to reach a broader audience and grow their business. Here’s everything you need to know about becoming a vendor on our platform, including the benefits, payment format, incentives, fees, and the step-by-step process to get started."},
        {title: "What is Afromarketsquare", body: "At AfroMarketSquare, we understand the unique challenges that come with balancing a busy lifestyle and the desire to enjoy high-quality, authentic African cuisine. As a small business committed to serving the black minority communities across the United Kingdom, we have created a seamless and convenient solution for all your grocery and meal needs."},
        {title: "How is the Vendor hub", body: "At AfroMarketSquare, we are dedicated to providing an efficient and seamless platform for vendors to reach a broader audience and grow their business. Here’s everything you need to know about becoming a vendor on our platform, including the benefits, payment format, incentives, fees, and the step-by-step process to get started."},
        
    ]

    return (
        <section>
            <FinalNav />

            <div>
                <div className="bg-[#FDFAF5] p-6 my-8 mx-4 lg:mx-20">
                <p className=" p-2 text-sm px-4 py-2 text-slate-500 text-center rounded-full inline-block font-semibold bg-[#E9F7FD] ">FAQs</p>
                <h2 className="text-2xl font-semibold my-4">WHAT CAN WE HELP YOU WITH? </h2>
                <input type="text" placeholder="search" className="px-4 py-2 border rounded-full" />
                </div>
            </div>

            <div className="bg-[#FDFAF5] p-6 my-8 mx-4 lg:mx-20 grid lg:grid-cols-2 gap-4">
                {questions.map((question, index) => (
                    <div className="border p-4">
                        <h3 key={index} className="text-xl font-semibold mb-4">{question.title}?</h3>
                        <p>{question.body}</p>
                    </div>
                ))}
            </div>

        </section>
    )
}

export default FAQsPage