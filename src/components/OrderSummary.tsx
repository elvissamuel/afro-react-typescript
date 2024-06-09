import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { OrderProps } from 'src/models/models'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { decryptAES, encryptData } from 'src/AES/AES'
import { getAllLocation, handleCheckout, removeFromCart } from 'src/api/api'
import { useUserIp, useUserStore } from 'src/store/user-store'
import { toast } from 'sonner'

type Props = {
  order: OrderProps[];
  setOpenSummary: Dispatch<SetStateAction<boolean>>;
}

export default function OrderSummary(props: Props) {
  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const [paymentError, setPaymentError] = useState(false)
  const [deliveryError, setDeliveryError] = useState(false)
  const [deliveryOption, setDeliveryOption] = useState<string>()
  const [paymentMode, setPaymentMode] = useState<string>()
  const [address, setAddress] = useState<string | null>(null)
  const {user} = useUserStore.getState()
  const {ipAddress} = useUserIp.getState()
  const client = useQueryClient()

  useQuery({
    queryKey: ['All_Location'],
    queryFn: async ()=>{

      const data = {authorization: user?.authorization}
      console.log("sent cart data: ", data)
      const encryptedData = encryptData({data, secretKey:process.env.REACT_APP_AFROMARKETS_SECRET_KEY})
      const response = await getAllLocation(encryptedData)

      if(response.status === 200){
        const result: any = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
      const myData = JSON.parse(result)
      setAddress(myData.responseBody)

      }
      return response
    },
    enabled: deliveryOption === "PICKUP"
  })

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

  const {mutate: deleteCartItem} = useMutation({
    mutationFn: (id:number) => handleDeleteItem(id),
    // @ts-ignore
    onSuccess: client.invalidateQueries({queryKey: ['All_Afro_Orders']})
  
  })

  const encryptedData = encryptData({data: {authorization: user?.authorization, ip_address: ipAddress, cart_reference: user?.cartResponse.cartReference}, secretKey:process.env.REACT_APP_AFROMARKETS_SECRET_KEY})

  const {mutate:handleCartCheckout} = useMutation({
    mutationFn: ()=> handleCheckout({data:encryptedData, setLoading, toast}),
  })

  const onSubmit = async () => {
    setLoading(true)
    if(!deliveryOption){
      setDeliveryError(true)
    }else if(!paymentMode){
      setPaymentError(true)
    }else {
    const data = {delivery_mode: deliveryOption, payment_method: paymentMode, pickup_address: address, cart_reference: user?.cartResponse.cartReference}
      const encryptedData = encryptData({data, secretKey:process.env.REACT_APP_AFROMARKETS_SECRET_KEY})
      const response = await getAllLocation(encryptedData)
      if(response.status === 200){
        const myData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
        handleCartCheckout();
      }

      if(response.data === 500){
        const myData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
        console.error("summary err: ", myData)
        toast.error("No response")

      }
      console.log("cart props: ", response)
    }
    setLoading(false)
  }

  let sum = 0;
  if (props.order !== undefined) {
    sum = props.order
      .map((val: OrderProps) => val.price * val.quantity)
      .reduce((acc: number, value: number) => acc + value, 0);
  
    sum = parseFloat(sum.toFixed(1)); // Round sum to one decimal place
  }

  return (
    <Transition show={open}>
      <Dialog className="relative z-40" onClose={setOpen}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 text-left shadow-xl
               transition-all sm:w-[90%] lg:[80%] sm:p-6 pt-24">
                <p onClick={() => props.setOpenSummary(false)} className='absolute top-4 right-4 text-lg font-semibold cursor-pointer'>X</p>

                
                <div className='grid lg:grid-cols-2'>
                  <div className='border m-1 shadow-md rounded-md p-1'>
                    <div className='border m-1 shadow-md rounded-md p-3'>
                      <h2 className='mb-4 pb-2 text-primaryColor font-semibold text-lg'>Order Summary</h2>
                      {props.order !== undefined && props.order.length !== 0 ?
                        <div>
                          {props.order.map((ord: OrderProps, index) => (
                            <div key={index} className='border shadow-md m-2 my-4 p-2 flex justify-between'>
                            <div className='flex gap-2'>
                              <div className='w-12 h-12 shadow-md'><img className='object-cover w-full h-full' src={ord.imageUrl} alt={`img- ${ord.imageUrl}-${index}`} /></div>
                              <div>
                                <p className='text-primaryColor font-semibold'>{ord.productName}</p>
                                <p className='text-xs text-primaryColor'>Qty: {ord.quantity}</p>
                              </div>
                            </div>
                            <div>
                            <p className='font-semibold text-primaryColor'>${ord.price}</p>
                            <p onClick={()=> deleteCartItem(ord.productId)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                          </p>
                          </div>
                        </div>
                          ))}
                        </div> :
                      <div className='text-black font-semibold'>This is no item in cart</div>}
                  
                    </div>
                    <div className='border shadow-md rounded-md p-3 m-1'>
                      <h2 className='text-primaryColor font-semibold text-lg'>Delivery Information</h2>
                      {deliveryError && <p className='text-red-400 text-sm'>Delivery option is required</p>}
                      <div className='flex flex-col gap-2 border shadow-md m-2 p-2 rounded'>
                        <div>
                          <div className='flex gap-2 items-start'>
                            <input checked={deliveryOption === "PICKUP"} onChange={()=>setDeliveryOption("PICKUP")} className='mt-2 rounded-full text-primaryColor border-primaryColor' type="checkbox" name="" id="" />
                            <div>
                              <p className='text-primaryColor font-semibold text-sm'>Pickup Station</p>
                              <p className='text-xs'>Pickup goods and the station</p>
                            </div>
                          </div>
                          {address !== null && deliveryOption === "PICKUP" && <div className=' m-2 p-2 shadow-md rounded-md'>
                            <h2 className='text-sm font-semibold text-primaryColor'>Available Pickup Station(s)</h2>
                            <div className='flex gap-2 items-center my-3'>
                              <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 text-primaryColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                              </svg>
                              </p>
                              <p className='text-sm font-semibold'>{address}</p>
                            </div>
                            </div>}
                        </div>
                        <div className='flex gap-2 items-start'>
                          <input checked={deliveryOption === "DOORSTEP"} onChange={()=>setDeliveryOption("DOORSTEP")} className='mt-2 rounded-full text-primaryColor border-primaryColor' type="checkbox" name="" id="" />
                          <div>
                            <p className='text-primaryColor font-semibold text-sm'>Door Delivery</p>
                            <p className='text-xs'>Door delivery bewteen specific dates</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='border rounded-md shadow-md m-1 p-3'>
                      <h2 className='my-2 text-primaryColor font-semibold text-lg'>Delivery Policy</h2>
                      <div className='flex flex-col gap-4'>
                        <div className='flex gap-2'>
                          <p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-primaryColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                          </svg>
                          </p>
                          <div>
                            <h3 className='font-semibold text-primaryColor text-sm'>Door Delivery</h3>
                            <p className='text-xs'>Delivery Fee(fees)</p>
                            <p className='text-xs'>Ready for delivery between (delivery time frame)</p>
                          </div>
                        </div>
                        <div className='flex gap-2'>
                          <p>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-primaryColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                        </svg>

                          </p>
                          <div>
                            <h3 className='font-semibold text-primaryColor text-sm'>Pickup Station</h3>
                            <p className='text-xs'>Delivery Fee(fees)</p>
                            <p className='text-xs'>Ready for delivery between (delivery time frame)</p>
                          </div>
                        </div>
                        <div className='flex gap-2'>
                          <p>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-primaryColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                          </svg>
                          </p>
                          <div>
                            <h3 className='font-semibold text-primaryColor text-sm'>Return Policy</h3>
                            <p className='text-xs'>Delivery Fee(fees)</p>
                            <p className='text-xs'>Ready for delivery between (delivery time frame)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>

                <div className='border m-1 shadow-md rounded-md p-3'>
                  <h2 className='text-primaryColor font-semibold'>Payment Mode</h2>
                  {paymentError && <p className='text-red-400 text-sm'>Payment mode is required</p>}

                  <div>

                  <div className='flex flex-col gap-4 border shadow-md m-2 p-4 rounded'>
                    <div className='flex gap-2 items-start'>
                      <input onChange={()=>setPaymentMode("STRIPE")} className='mt-2' type="checkbox" name="" id="" />
                      <div>
                        <p className='font-semibold'>Pay on Stripe</p>
                        <p className='text-xs'>Pay with stripe as at the confirmation of your order</p>
                      </div>
                    </div>
                    <div className='flex gap-2 items-start'>
                      <input disabled={true} className='mt-2' type="checkbox" name="" id="" />
                      <div>
                        <p className='font-semibold text-gray-500'>Pay on Card(Coming soon)</p>
                        <p className='text-xs'>Pay with Bank Transfer as at the time of the confirmation of your order</p>
                      </div>
                    </div>
                    <div className='flex gap-2 items-start'>
                      <input disabled={true} className='mt-2' type="checkbox" name="" id="" />
                      <div>
                        <p className='font-semibold text-gray-500'>Pay on Flutterwave(Coming soon)</p>
                        <p className='text-xs'>Pay with Flutterwave as at the time of the confirmation of your order</p>
                      </div>
                    </div>
                  </div>
                  </div>

                  <div>
                    <div className='grid grid-cols-2 m-2 gap-y-4 rounded-md mt-10 p-3 shadow-md'>
                      <p>Sub Total</p>
                      <p>₤{sum}</p>
                      <p>Taxes (10%)</p>
                      <p>₤ 0.00</p>
                      <p>Shipping</p>
                      <p>₤ 0.00</p>
                      <p className='mt-8 font-semibold'>Total</p>
                      <p className='mt-8'>₤{sum}</p>
                    </div>
                  </div>

                  <button onClick={()=> onSubmit()} disabled={loading} className=' rounded-lg h-10 text-center bg-primaryColor text-white w-full m-6 mx-auto'>{ loading ? "Loading" : "Checkout"}</button>
                </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
