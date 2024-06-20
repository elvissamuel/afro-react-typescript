import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeFromCart, handleCheckout01 } from '../api/api'
import { Toaster, toast } from 'sonner'
import { decryptAES, encryptData } from '../AES/AES'
import { OrderProps } from '../models/models'
import { useUserIp, useUserStore } from 'src/store/user-store'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCheckoutStore } from 'src/store/user-checkout'

type Props = {
  order: OrderProps[]
  setOpenSummary: Dispatch<SetStateAction<boolean>>;
  setOpenCart: Dispatch<SetStateAction<boolean>>;
  setStripeUrl: Dispatch<SetStateAction<string | undefined>>;
}

const ShoppingCart = (props: Props) => {
  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const client = useQueryClient()
  const {user} = useUserStore.getState()
  const {ipAddress} = useUserIp.getState()
  const navigate =  useNavigate()
  const location = useLocation();
  const setCheckoutResponse = useCheckoutStore.getState().setCheckoutResponse;


  const handleDeleteItem = async (id: number): Promise<any> => {
    try {
        const data = {authorization: user?.authorization, cart_reference: user?.cartResponse.cartReference, product_id: id};
        const encryptedInfo = encryptData({data, secretKey: process.env.REACT_APP_AFROMARKETS_SECRET_KEY});
        return removeFromCart({encryptedInfo, setLoading, toast});
    } catch (error) {
        console.error("Error removing item from cart:", error);
        throw error;
    }
};
  
  const encryptedData = encryptData({data: {authorization: user?.authorization, ip_address: ipAddress, cart_reference: user?.cartResponse.cartReference}, secretKey:process.env.REACT_APP_AFROMARKETS_SECRET_KEY})

  const {mutate: deleteCartItem} = useMutation({
    mutationFn: (id:number) => handleDeleteItem(id),
    // @ts-ignore
    onSuccess: client.invalidateQueries({queryKey: ['All_Afro_Orders']})
  
  })

  let sum = 0;
  if (props.order !== undefined) {
    sum = props.order
      .map((val: OrderProps) => val.price * val.quantity)
      .reduce((acc: number, value: number) => acc + value, 0);
  
    sum = parseFloat(sum.toFixed(1)); 
    }

  const handleSubmit = async ()=>{
    setLoading(true)
    const response = await handleCheckout01(encryptedData);
    if(response.status === 200){
      const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
      const parsedData = JSON.parse(decryptedData!);
      console.log(" checkout res: ", parsedData.responseBody)
      setCheckoutResponse(parsedData.responseBody);
    }

    if(response.status === 500){
      const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
      const parsedData = JSON.parse(decryptedData!);
      console.log(" checkout err res: ", parsedData.responseBody)
    }

    props.setOpenCart(false)

    if(location.pathname.includes("dashboard")){
      props.setOpenSummary(true);  
    }else{
      toast("You have to signup/login before you checkout")
      setTimeout(() => {
      navigate("/login");
        
      }, 2000);
    }
    setLoading(false)

  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
        <Toaster richColors position='top-right' />
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        {props.order !== undefined && props.order.length !== 0 ? 
                        <div className="flow-root">
                          <ul className="-my-6 divide-y divide-gray-200">
                            {props.order?.map((order: OrderProps) => (
                              <li key={order.productId} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={order.imageUrl} width={100} height={100}
                                    alt='product'
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <p>{order.productName}</p>
                                      </h3>
                                      <p className="ml-4">₤{order.price * order.quantity}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{order.orderRef}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty {order.quantity}</p>

                                    <div className="flex">
                                      <button
                                        onClick={()=>deleteCartItem(order.productId)}
                                        type="button"
                                        className="font-medium text-primaryColor hover:text-primaryColorVar"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div> :
                        <div className='text-black font-semibold'>This is no item in cart</div>}
                      </div>
                    </div>

                    {props.order !== undefined && <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>₤{sum}</p>
                      </div>
                      {props.order.length >= 1 && <div className="mt-6">
                        <button
                        onClick={()=>handleSubmit()}
                        disabled={loading}
                          className="flex items-center justify-center rounded-md border border-transparent bg-primaryColor px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          { loading ? "Loading..." : "Checkout"}
                        </button>
                      </div>}
                    </div>}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ShoppingCart