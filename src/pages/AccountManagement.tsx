import React from 'react'
import logo from '../assets/imgs/inboxIcon.png'

type Props = {}

const AccountManagement = (props: Props) => {
  return (
    <div>
      <div className='bg-secondaryColor my-2 h-8 px-4 py-3 flex text-lg font-semibold text-primaryColor items-center'>Account Management</div>
      <div className='text-primaryColor bg-secondaryColor min-h-[80vh] p-4 flex justify-center items-center'>
        <img src={logo} alt='logo' width={100} height={100} />
      </div>


    </div>
  )
}

export default AccountManagement