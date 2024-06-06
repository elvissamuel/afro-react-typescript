import React from 'react'
import logo from '../assets/imgs/afrologo.png'

type Props = {}

const Legal = (props: Props) => {

  return (
    <div className=" flex items-center bg-gradient-to-r from-secondaryColor via-white to-white h-full justify-center px-6 py-2 lg:px-8">
      <div className='flex flex-col items-center md:w-[80%] pb-16'> 
        <div className='w-[180px] h-[180px]'>
          <img src={logo} alt='afro-logo' className='object-contain w-full h-full' />
        </div>

        <div>
          <h2 className='text-3xl font-semibold text-primaryColor mb-3'>Return and Refund Policy</h2>
          <h3 className='font-semibold mt-3'>Introduction</h3>

          <p>We are committed to providing you with the best quality products and service. However, we understand that sometimes you may need to return or exchange an item that you purchased from us. That's why we have a simple and hassle-free return and refund policy for your convenience.</p>

          <h3 className='font-semibold mt-3'>Refund</h3>
          <p>We'll refund your return costs on items sold and/or Fulfilled by AfroMarketSquare up to our standard delivery option cost, in the following cases:</p>
          <ul className='list-disc ml-6'>
            <li>You received an incorrect item.</li>
            <li>You received a damaged item.</li>
            <li>You received a defective item.</li>
            <li>You received an item that does not match its description.</li>
          </ul>

          <p>If you are not completely satisfied with your purchase, you can return it to us within 7 days of delivery for a full refund or exchange, subject to the following conditions:</p>

          <ul className='list-disc ml-6'>
            <li>The item must be in its original packaging, unopened, unused, and undamaged.</li>
            <li>The item must have a valid receipt or proof of purchase.</li>
            <li>The item must not be perishable, such as fresh or frozen foods, or have a limited shelf life.</li>
            <li>The item must not be a gift card, voucher, or coupon.</li>
          </ul>

          <p>Once we receive and inspect your returned item, we will process your refund or exchange within 14 days. Refunds will be issued to your original payment method, unless otherwise agreed.</p>

          <h3 className='font-semibold mt-3'>Statutory Cancellation Right</h3>
          <p>You have the statutory right to cancel your order for any reason within 7 days beginning with the day you receive the item. To exercise your cancellation right please contact our customer service team at support@........... or call us at ……………………….. We will provide you with a return authorization number and instructions on how to ship the item back to us. You are responsible for the cost of return shipping, unless the item is defective or damaged.</p>

          <h3 className='font-semibold mt-3'>Note</h3>
          <p>We reserve the right to refuse a return or exchange if the item does not meet the above conditions, or if we suspect fraud or abuse.
          We value your feedback and appreciate your business. If you have any questions or concerns about our return and refund policy, please do not hesitate to contact us</p>
        </div>

      </div>
      

    </div>
  )
}

export default Legal