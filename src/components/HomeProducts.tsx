
import { toast } from 'sonner'
import { productProps } from '../models/models'
import { useLocation } from 'react-router-dom'

type Props = {
  product: productProps
}

const HomeProducts = (props: Props) => {
  const location = useLocation();

  if(!location.pathname){
    return null
  }

  return (
    <div key={props.product.productId} className='w-full md:w-[200px]'>
      <a href={`/home/product/${props.product.productId}`} onClick={()=>{if(!location.pathname.includes("/home/product"))toast.loading("Product is loading...", {position: "top-right"})}}>
        <div className='h-[220px] md:h-[180px] w-full relative my-2'>
          <img className='object-contain w-full h-full border rounded-lg p-3 shadow-md' src={props.product.imageUrl} alt="" width={100} height={100} />
        </div>
      </a>
      <div className='px-1 flex flex-col gap-1'>
        <div className='flex items-center font-semibold justify-between'>
            <p className='text-sm'>{props.product.name}</p>
            <span className='text-xs'>£{props.product.productPrice}</span>
        </div>
        <p className='text-xs'>{props.product.category}</p>
        <button onClick={()=>toast.warning("Can't Add to Cart",{description: 'Sign in first before you add to cart'},)} className='px-3 shadow-md font-semibold text-primaryColor hover:text-black hover:bg-white py-1 text-sm border w-[107px] bg-secondaryColor rounded-xl'>Add to Cart</button>
      </div>
    </div>
)
}

export default HomeProducts