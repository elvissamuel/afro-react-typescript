import React from 'react'
import successIcon from "../assets/imgs/successLogo.png"

type StarComponentProps = {
  numberOfUncolored?: number
  numberOfColored?: number
}

const SuccessPage = (props: StarComponentProps) => {
  
return (
  <div className='flex gap-1'>
    <div className='max-w-80 mx-auto text-center flex flex-col gap-20 py-14'>
        <div className='mx-auto'>
           <img src={successIcon} alt="successicon" />
        </div>
        <div className='text-gray-500'>
            <p className='text-[#54BB71] font-semibold my-4 text-lg'>Successful!</p>
            <p>Your payment was successful.</p>
            <p>Thank you for your purchase</p>
        </div>
    </div>
  </div>
)
}

export default SuccessPage