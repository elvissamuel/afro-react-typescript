import React from 'react'
import logo from '../assets/imgs/Favorite.png'

type Props = {}

const Wishlist = (props: Props) => {
  return (
    <div>
      <div className='bg-secondaryColor my-2 h-8 px-4 py-3 flex text-lg font-semibold text-primaryColor items-center'>Wishlist</div>

      <div className='text-primaryColor bg-secondaryColor min-h-[80vh] p-4 flex justify-center items-center'>
        <img src={logo} alt='logo' />
      </div>

    </div>
  )
}

export default Wishlist