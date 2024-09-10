import { useState } from 'react'
import { addToCart33, createCart33 } from '../api/api'
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { decryptAES, encryptData } from '../AES/AES'
import { toast } from 'sonner'
import { productProps } from '../models/models'
import { useLocation, useNavigate } from 'react-router-dom';
import { useCountStore, useUserIp, useUserStore } from 'src/store/user-store';
import { useCartStore } from 'src/store/user-cart';

type Props = {
  product: productProps
}

const Product = (props: Props) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const {ipAddress} = useUserIp.getState();
  const {user, updateCartResponse} = useUserStore.getState();
  const { setCartReference, setNumberOfItems, setOrders } = useCartStore.getState()
  const {setCount} = useCountStore.getState();
  const {cartReference} = useCartStore.getState()
  const queryClient = useQueryClient()

const handleAddToCart = async () => {
  if(user?.cartResponse){
    setLoading(true)
    const isEmpty = cartReference === undefined;
    if (isEmpty) {
      const data = {authorization: user?.authorization, ip_address: ipAddress, product_id: props.product.productId, quantity: 1 }
      console.log('Sent data: ', data)
      const encryptedInfo = encryptData({data, secretKey:process.env.REACT_APP_AFROMARKETS_SECRET_KEY})
      console.log("sending data without cartref: ", data)
      const response = await createCart33(encryptedInfo);
      if(response.data){
        if(response.status === 200){
          const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
          const cartResponse = JSON.parse(decryptedData!)
          updateCartResponse(cartResponse.responseBody)
          setCartReference(cartResponse.responseBody.cartReference);
          setNumberOfItems(cartResponse.responseBody.numberOfItems);
          setOrders(cartResponse.responseBody.orders);
          setCount(1);
          toast.success("Cart was created and item was added successfully");
          console.log("response from data sent for new cartRef: ", cartResponse)

          queryClient.invalidateQueries({queryKey: ['All_Afro_Orders']})
        }else if(response.status === 500){
          const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
          const data = JSON.parse(decryptedData!)
          console.log("Add product error: ", data.message)
        }
      }
  } else {
      const data = {authorization: user.authorization, ip_address: ipAddress, cart_reference: cartReference, product_id: props.product.productId, quantity: 1}
      console.log('Sent data with cartRef: ', data)
      const encryptedInfo = encryptData({data, secretKey:process.env.REACT_APP_AFROMARKETS_SECRET_KEY})
      const response = await addToCart33(encryptedInfo);
      if(response.data){
        if(response.status === 200){
          const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
          const cartResponse = JSON.parse(decryptedData!)
          updateCartResponse(cartResponse.responseBody)
          setCartReference(cartResponse.responseBody.cartReference);
          setNumberOfItems(cartResponse.responseBody.numberOfItems);
          setOrders(cartResponse.responseBody.orders);
          setCount(1);
          toast.success("Item was added to cart successfully");
          console.log('Response from data sent existing cartRef: ', cartResponse)
          
          queryClient.invalidateQueries({queryKey: ['All_Afro_Orders']})
        }else if(response.status === 500){
          const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
          const data = JSON.parse(decryptedData!)
          console.log("Add product error: ", data.message)
        }
      }
  }
  setLoading(false)
  }
}
      
      // const {mutate: addProduct} = useMutation({
      //   mutationFn: handleAddToCart,
      //   // @ts-ignore
      //   onSuccess: queryClient.invalidateQueries({queryKey: ['All_Afro_Orders']})
      
      // })

      if(!location.pathname){
        return null
      }

  return (
    <div key={props.product.productId} className='w-full md:w-[200px]'>
        <div onClick={()=>{if(!user?.isBusiness) navigate(`product/${props.product.productId}`); if(!location.pathname.includes("/product"))toast.loading("Product is loading...", {position: "top-right"})}} className='h-[180px] w-full relative my-2'>
          <img className='object-contain w-full h-full border rounded-lg p-3 shadow-md' src={props.product.imageUrl} width={100} height={100} alt="" />
        </div>
      <div className='px-1 flex flex-col gap-1'>
        <div className='flex items-center font-semibold justify-between'>
            <p className='text-sm'>{props.product.name}</p>
            <span className='text-xs'>£{props.product.productPrice}</span>
        </div>
        <p className='text-xs'>{props.product.category}</p>
        {!user?.isBusiness ? 
        <button onClick={()=>handleAddToCart()} className='px-3 shadow-md hover:text-primaryColor py-1 text-sm border w-[107px] hover:bg-secondaryColor rounded-xl'>{loading ? "Loading" : "Add to Cart"}</button> : 
        <div className='flex items-center'>
          <button className='px-3 shadow-md bg-primaryColor text-secondaryColor hover:text-primaryColor py-2 text-sm border w-[107px] hover:bg-secondaryColor'>Edit</button>
          <button className='px-3 shadow-md bg-red-600 text-white hover:text-primaryColor py-2 text-sm border w-[107px] hover:bg-secondaryColor'>Delete</button>
          </div>
        }
      </div>
    </div>
)
}

export default Product