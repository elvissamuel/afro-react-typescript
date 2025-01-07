import logo from '../assets/imgs/afrologo.png'
import { useContext, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { handleLogin, updateUserCart } from '../api/api';
import { decryptAES, encryptData } from '../AES/AES';
import { LoginContext } from '../contexts/LoginContext';
import { Toaster, toast } from 'sonner'
import { LoginFormValues } from '../models/models';
import { useNavigate } from 'react-router-dom';
import { useUserIp, useUserStore } from 'src/store/user-store';
import { useQueryClient } from '@tanstack/react-query';

export default function Login() {
  const [loading, setLoading] = useState(false)
  const {register, handleSubmit, formState: {errors}, reset} = useForm<LoginFormValues>()
  const navigate = useNavigate();
  const {ipAddress} = useUserIp.getState();
  const {updateCartResponse} = useUserStore.getState()
  const contextValues = useContext(LoginContext)
  const clientQuery = useQueryClient()
  if(!contextValues){
    return null;
  }

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setLoading(true)
    const encryptedInfo = encryptData({data, secretKey: process.env.REACT_APP_AFROMARKETS_SECRET_KEY })
    const response: any = await handleLogin(encryptedInfo);

    if (response.data) {

      if(response.status === 200){
      const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);
      const userData = JSON.parse(decryptedData ?? "");
      console.log("All user info: ", userData)
      const { responseBody } = userData;
      const { cartResponse, authorization, isBusiness, kycVerified, email, fullName } = responseBody;

      useUserStore.getState().setUser({
        authorization,
        isBusiness,
        kycVerified,
        cartResponse,
        email,
        fullName
      });

      if(userData.responseBody.cartResponse.cartReference === undefined){
        const data = {ip_address: ipAddress, authorization: userData.responseBody.authorization }
        const encryptedInfo = encryptData({data, secretKey: process.env.REACT_APP_AFROMARKETS_SECRET_KEY})
        const newCart = await updateUserCart(encryptedInfo)
        if(newCart.status === 200){

          const response = await decryptAES(newCart.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
          const myData = JSON.parse(response!)
          updateCartResponse({cartReference: myData.responseBody.cartReference, deliveryCost: myData.responseBody.deliveryCost, logisticsFee: myData.responseBody.logisticsFee, orders: myData.responseBody.orders })
          clientQuery.invalidateQueries({queryKey: ['All_Afro_Orders']})

          console.log("depresponse: ", response)
        }
        console.log("update cart res: ", newCart)
        }

      toast.success('Login was successful');
      reset();
      setTimeout(() => {
      navigate('/dashboard');
      }, 2000);
    }else if(response.status === 500){
      const decryptedData: any = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);
      toast.error(JSON.parse(decryptedData).message)
    }
    }else{
      toast.error("No response")
    }
    setLoading(false)
  }

    return (
      <>
        <div className="flex bg-gradient-to-r from-secondaryColor via-white to-white min-h-full h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <Toaster richColors position='top-right' />
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-14 w-auto"
              src={logo}
              alt="Your Company"
            />
           
          </div>
          
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md p-8 bg-viaColor">
            <h2 className=" text-center text-xl font-bold leading-9 tracking-tight text-primaryColor">
                Login
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-primaryColor">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    {...register('email', {required:true})}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full bg-secondaryColor rounded-md border-0 py-1.5 px-3 text-primaryColor shadow-sm placeholder:text-primaryColor sm:text-sm sm:leading-6"
                  />
                  {errors.email && <span className='text-sm'>This field is required</span>}
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-primaryColor">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="/forgot-password" className="font-semibold text-primaryColor hover:text-primaryColorVar">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    {...register('password', {required:true})}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full bg-secondaryColor rounded-md border-0 py-1.5 px-3 text-primaryColor shadow-sm placeholder:text-primaryColor sm:text-sm sm:leading-6"
                  />
                  {errors.password && <span className='text-sm'>This field is required</span>}
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className={`${loading ? 'bg-gray-500' : 'bg-primaryColor'} flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-600`}
                >
                  {loading ? 'Loading...' : 'Sign in'}
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-primaryColor">
              Dont have an account?{' '}
              <a href='/signup' className="font-semibold leading-6 text-primaryColor underline hover:text-primaryColorVar">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
  