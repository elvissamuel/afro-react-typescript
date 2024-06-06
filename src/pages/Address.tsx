import React from 'react'

type Props = {}

const Address = (props: Props) => {
  return (
    <div>
      <div className='bg-secondaryColor my-2 h-8 px-4 py-3 flex text-lg font-semibold text-primaryColor items-center'>Address Book</div>
      <div className='text-primaryColor bg-secondaryColor min-h-[80vh] flex justify-end p-4 '>
        <button className='h-[35px] bg-primaryColor text-white w-[200px]'>Add New Address</button>
        
      </div>

    </div>
  )
}

export default Address