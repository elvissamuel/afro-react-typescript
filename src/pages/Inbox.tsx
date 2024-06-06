import React from 'react'
import logo from '../assets/imgs/inboxIcon.png'

type Props = {}

const Inbox = (props: Props) => {
  return (
    <div>
      <div className='bg-secondaryColor my-2 h-8 px-4 py-3 flex text-lg font-semibold text-primaryColor items-center'>Inbox</div>
      <div className='text-primaryColor bg-secondaryColor min-h-[80vh] p-4 flex justify-center items-center'>
        {/* <div className='flex flex-col gap-1 rounded-xl bg-white p-4'>
          <p>01 January</p>
          <p>Arriving Today!</p>
          <p className='text-black'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, nobis?</p>
          <div className='flex gap-2 items-start my-2'>
            <div className='w-20 h-20 bg-slate-200 rounded-xl' />
              <div>
                <p className='text-lg font-semibold'>Product Name</p>
                <p>Price</p>
              </div>
          </div>
        </div> */}
        <img src={logo} alt='inboxIcon' width={100} height={100} />
      </div>
    </div>
  )
}

export default Inbox