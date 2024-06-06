import { useContext, useState } from 'react'
import StarComponent from '../components/StarComponent'
import ButtonComponent from '../components/ButtonComponent'
import DashBoardNav from '../components/DashboardNav'
import Counter from '../components/Counter'
import { LoginContext } from '../contexts/LoginContext'
import { addReview, addToCart33, createCart33, getSingleItems, } from '../api/api'
import { Toaster, toast } from 'sonner'
import { decryptAES, encryptData } from '../AES/AES'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { FAddReviewProps } from '../models/models'
import { TailSpin } from 'react-loader-spinner'
import BreadCrumbs from '../components/BreadCrumbs'
import StarRating from '../components/StarRating'
import { useForm, Controller } from "react-hook-form"
import { useCountStore, useUserIp, useUserStore } from 'src/store/user-store'
import { useCartStore } from 'src/store/user-cart'
import { useParams } from 'react-router-dom'

const SingleProduct = () => {
  const contextValues = useContext(LoginContext)
  const {user} = useUserStore.getState();
  const {updateCartResponse} = useUserStore.getState();
  const {ipAddress} = useUserIp.getState()
  const { setCartReference, setNumberOfItems, setOrders } = useCartStore.getState();
  const {count, setCount} = useCountStore.getState();
  const {id} = useParams();

    const [loading, setLoading] = useState(false)
    const [rating, setRating] = useState(0)
    const queryClient = useQueryClient()
    const { register, handleSubmit, reset, formState: { errors }, control } = useForm<FAddReviewProps>()

    const {data: allProducts} = useQuery({
      queryKey: ['All_Afro_Products'],
      queryFn: async () => {
        try{
          const myProducts = await getSingleItems(id!)
          const decryptedData = await decryptAES(myProducts.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
          const response = JSON.parse(decryptedData!)
          console.log("alldata: ", response)
  
          return response
        }catch (error) {
          throw new Error('Failed to fetch products: ');
        }
      },
    })

  const handleAddToCart = async () => {
    if(user?.cartResponse){
      const isEmpty = user.cartResponse.cartReference === undefined;
      if (isEmpty && allProducts) {
        const data = {authorization: user?.authorization, ip_address: ipAddress, product_id: allProducts.productId, quantity: count }
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
            setCount(1);
            toast.success("Cart was created and item was added successfully");
          }else if(response.status === 500){
            const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
            const data = JSON.parse(decryptedData!)
            console.log("Add product error: ", data.message)
          }
        }
    } else if (allProducts) {
        const data = {authorization: user?.authorization, ip_address: ipAddress, cart_reference: user?.cartResponse.cartReference, product_id: allProducts.productId, quantity: count}
        console.log('Sent data: ', data)
        const encryptedInfo = encryptData({data, secretKey:process.env.REACT_APP_AFROMARKETS_SECRET_KEY})
        const response = await addToCart33(encryptedInfo);
        if(response.data){
          if(response.status === 200){
            const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
            const cartResponse = JSON.parse(decryptedData!)
            setCartReference(cartResponse.responseBody.cartReference);
            setNumberOfItems(cartResponse.responseBody.numberOfItems);
            setOrders(cartResponse.responseBody.orders);
            setCount(1)
            toast.success("Item was added to cart successfully");
          }else if(response.status === 500){
            const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
            const data = JSON.parse(decryptedData!)
            console.log("Add product error: ", data.message)
          }
        }
    }
    }
  }

    const { mutate: addProduct } = useMutation({
      mutationFn: handleAddToCart,
      onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ['All_Afro_Orders'] });
      }
  });

  const onSubmit = async (input: FAddReviewProps)=>{
    setLoading(true)
    const data = {
      product_id: id!,
      review: input.review,
      email: input.email,
      score: rating,
      reviewer_name: input.reviewer_name,
      authorization: user?.authorization!,
      ip_address: ipAddress!
  }
  const response = await addReview(data)

  if(response){
    toast.success('Review added successfully')
    reset()
    setLoading(false)
  }
  }

    if(!contextValues){
      return null;
    }
    const { setButtonClick} = contextValues

    return (
    <div className='overflow-x-hidden'>
      <DashBoardNav />
     <BreadCrumbs title='Product' />
        <Toaster richColors position='top-center' />
        {allProducts ? 
        <div key={allProducts.productId} className='w-full xl:w-[85%] mx-auto my-6'>
        <div className='flex flex-col lg:flex-row lg:justify-around gap-8 lg:items-center px-8 mx-auto'>
            <div className='w-full  xl:w-1/2'>
                <div className='md:w-[90%] md:h-[90%] mx-auto xl:w-[450px] xl:h-[450px] shadow-md p-24'>
                    <img className='w-full h-full' src={allProducts.imageUrl} alt="prod-img" width={100} height={100} />
                </div>
                
            </div>
            <div className='py-10 w-full xl:w-1/2'>
                <div className='bg-secondaryColor text-primaryColor rounded-xl w-[127px] h-[35px] flex justify-center items-center font-semibold mb-3'>Afro Markets</div>
                <p className='text-primaryColor text-xl font-bold'>{allProducts.name}</p>
                <p className='font-extrabold'>₤{allProducts.productPrice}</p>
                <div className='flex items-center gap-1'>
                    <StarComponent numberOfColored={2} numberOfUncolored={3} />
                    <span className='text-xs text-primaryColor font-semibold'>(100 rating)</span>
                </div>
                <div className='shadow-md rounded-xl p-3 my-4 '>
                    <h2 className='font-semibold text-primaryColor'>Description({allProducts.category})</h2>
                    <span className='text-sm'>{allProducts.description}</span>
                </div>
                <div className='flex items-center my-2 justify-between gap-2  md:w-[415px] pr-6'>
                    
                    
                     <button onClick={()=>{addProduct(); setButtonClick(prev => !prev)}} className='w-[230px] bg-secondaryColor font-semibold text-primaryColor rounded-lg h-[40px]'>Add to Cart</button>
                     
                    <Counter />
                </div>
                <ButtonComponent handleClick={()=>console.log('Get wishlist button was clicked')} title='Add to wishlist' />
            </div>
        </div>

        <div className='my-16 w-[95%] mx-auto'>
            <h2 className='text-primaryColor text-lg font-semibold mb-6'>Customer Review</h2>

            <div className='grid gap-4 lg:grid-cols-2 '>
                <div className='col-span-1 flex flex-col gap-6'>
                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-4xl font-bold'>0</p>
                        <StarComponent numberOfUncolored={5} />
                        <p className='text-sm text-primaryColor'>No reviews yet</p>
                    </div>
                    <div className='pl-4 text-sm font-semibold text-gray-600'>
                        <div className='flex gap-1 items-center'>
                            <StarComponent numberOfColored={5} />
                            <div className='h-[6px] w-[240px] bg-gray-400 rounded-lg' />
                            <span>0</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <StarComponent numberOfColored={4} numberOfUncolored={1} />
                            <div className='h-[6px] w-[240px] bg-gray-400 rounded-lg' />
                            <span>0</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <StarComponent numberOfColored={3} numberOfUncolored={2} />
                            <div className='h-[6px] w-[240px] bg-gray-400 rounded-lg' />
                            <span>0</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <StarComponent numberOfColored={2} numberOfUncolored={3} />
                            <div className='h-[6px] w-[240px] bg-gray-400 rounded-lg' />
                            <span>0</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <StarComponent numberOfColored={1} numberOfUncolored={4} />
                            <div className='h-[6px] w-[240px] bg-gray-400 rounded-lg' />
                            <span>0</span>
                        </div>
                    </div>
                </div>
                <div className='col-span-1 flex flex-col gap-2 text-primaryColor'>
                        <h2 className='uppercase text-primaryColor font-bold'>Add a review</h2>
                        <p className='text-sm'>Your email address will not be published, required fields are marked <span className='text-red-600 font-bold'>*</span></p>
                        <div className='flex items-center gap-1'>
                            <p className='text-sm'>Your Rating<span className='text-red-600 font-bold'>*</span>: </p>
                            <StarRating setRating={setRating} />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4' action="">
                            
                            <div className='flex flex-col text-primaryColor'>
                            <label htmlFor="review" className='text-sm font-semibold'>Your Review <span className='text-red-600 font-bold'>*</span></label>
                            <Controller
                              name="review"
                              control={control}
                              rules={{
                                  required: true,
                                  validate: {
                                    maxLength: (value) => value.length >= 1,
                                  },
                              }}
                              render={({ field: { onChange, value } }) => (
                                  <textarea
                                  className='h-[178px] outline-none boder border-[1px] rounded-lg border-primaryColor shadow-md p-3'

                                      cols={90}
                                      placeholder="Review"
                                      rows={4}
                                      onChange={onChange}
                                      value={value}
                                  />
                              )}
                          />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="name" className='text-sm font-semibold text-primaryColor'>Name<span className='text-red-600 font-bold'>*</span></label>
                                <input {...register("reviewer_name")} type="text" id='name' className='border-primaryColor outline-none border-[1px] rounded-lg px-3 py-1.5' />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="email" className='text-sm font-semibold text-primaryColor'>Email<span className='text-red-600 font-bold'>*</span></label>
                                <input {...register("email")} type="text" id='email' className='border-primaryColor outline-none border-[1px] rounded-lg px-3 py-1.5' />
                            </div>
                            <div className='flex items-center gap-2'>
                                <input type="checkbox" className='border-[1px] outline-none border-primaryColor' name="" id="" />
                                <p className='text-sm font-semibold text-primaryColor'>Save my name, email and website in this browser for next time</p>
                            </div>
                            <button disabled={loading} className='bg-primaryColor text-white text-sm font-semibold py-2 px-4 rounded-md' type="submit">{ loading ? "Loading..." : "Submit" }</button>
                        </form>
                </div>

            </div>
        </div>
        </div> 
        : 
        <div className='flex justify-center items-center mt-20'>
          <TailSpin 
              color="#01974B"
              height={50}
              width={50} 
            />
        </div>
        }
    </div>
  ) 

  }


export default SingleProduct