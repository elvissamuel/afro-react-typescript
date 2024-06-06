import React from 'react'

type Props = {}

const Orders = (props: Props) => {
  return (
    <div>
      <div className='bg-secondaryColor my-2 h-8 px-4 py-3 flex text-lg font-semibold text-primaryColor items-center'>Orders</div>
      <div>
        <div className='h-10 cursor-pointer bg-secondaryColor my-1 px-4 py-3 font-semibold text-primaryColor justify-between flex items-center'>
          <p>Open Orders</p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-primaryColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </p>
        </div>
      </div>
      <div>
        <div className='h-10 cursor-pointer bg-secondaryColor px-4 py-3 font-semibold text-slate-500 flex justify-between items-center'>
          <p>Closed Orders</p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-primaryColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Orders