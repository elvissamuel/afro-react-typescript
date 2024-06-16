
import { toast } from 'sonner'
import { productProps } from '../models/models'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCountStore, useUserIp, useUserStore } from 'src/store/user-store'
import { useCartStore } from 'src/store/user-cart'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { decryptAES, encryptData } from 'src/AES/AES'
import { addToCart33, createCart33 } from 'src/api/api'

type Props = {
  product: productProps
}

const HomeProducts = (props: Props) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const {ipAddress} = useUserIp.getState();
  const {user, updateCartResponse} = useUserStore.getState();
  const { setCartReference, setNumberOfItems, setOrders } = useCartStore.getState()
  const {count} = useCountStore.getState();
  const queryClient = useQueryClient()

  const handleAddToCart = async () => {
      setLoading(true)
        const data = {ip_address: ipAddress, product_id: props.product.productId, quantity: count }
        console.log('Sent data: ', data)
        const encryptedInfo = encryptData({data, secretKey:process.env.REACT_APP_AFROMARKETS_SECRET_KEY})
        const response = await createCart33(encryptedInfo);
        if(response.data){
          if(response.status === 200){
            const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
            const cartResponse = JSON.parse(decryptedData!)
            updateCartResponse(cartResponse.responseBody)
            setCartReference(cartResponse.responseBody.cartReference);
            setNumberOfItems(cartResponse.responseBody.numberOfItems);
            setOrders(cartResponse.responseBody.orders);
            toast.success("Cart was created and item was added successfully");
          }else if(response.status === 500){
            const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
            const data = JSON.parse(decryptedData!)
            console.log("Add product error: ", data.message)
          }
        }
    setLoading(false)
  }
        
        const {mutate: addProduct} = useMutation({
          mutationFn: handleAddToCart,
          // @ts-ignore
          onSuccess: queryClient.invalidateQueries({queryKey: ['All_Afro_Orders']})
        
        })

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
        <button onClick={()=>addProduct()} className='px-3 shadow-md font-semibold text-primaryColor hover:text-black hover:bg-white py-1 text-sm border w-[107px] bg-secondaryColor rounded-xl'>Add to Cart</button>
      </div>
    </div>
)
}

export default HomeProducts