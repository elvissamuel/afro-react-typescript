import React, { ChangeEvent, MouseEvent, useContext, useEffect, useRef, useState } from 'react'
import logo from '../assets/imgs/afrologo.png'
import bgImg from "../assets/imgs/loginImg.png"
import { handleEmailVerification, verifyEmail } from '../api/api';
import { decryptAES, encryptData } from '../AES/AES';
import { Toaster, toast } from 'sonner'
import { useLocation, useNavigate } from 'react-router-dom';
import { useOnboardUserStore, useUserEmail } from 'src/store/user-store';


const Verify = () => {
  const {email} = useUserEmail.getState()
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const inputRef4 = useRef<HTMLInputElement>(null);
  const inputRef5 = useRef<HTMLInputElement>(null);
  const inputRef6 = useRef<HTMLInputElement>(null);
  const {user} = useOnboardUserStore.getState()


  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [input3, setInput3] = useState('')
  const [input4, setInput4] = useState('')
  const [input5, setInput5] = useState('')
  const [input6, setInput6] = useState('')
  const [userEmail, setUserEmail] = useState('elvissamuel8@gmail.com')
  const location = useLocation();
  const navigate = useNavigate();
  // const {userEmail} = useContext(LoginContext)
  const [loading, setLoading] = useState(false)
  const [afroUserEmail, setAfroUserEmail] = useState('')

  useEffect(()=>{
    if (typeof window !== 'undefined' && window.localStorage) {
      const afroUserEmail = window.localStorage.getItem('Afro_Email') ?? ''
      setAfroUserEmail(afroUserEmail)
      }
  }, [])

  if(!location.pathname){
    return null
  }


  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault() 
      const pathName = location.pathname;
      const token = [input1, input2, input3, input4, input5, input6]
      const verifyCode = token.join('')
      const data = {token: verifyCode, email: user?.email}
      const encryptedInfo = encryptData({data, secretKey: process.env.REACT_APP_AFROMARKETS_SECRET_KEY})
      console.log('token: ', token.join(''), 'email: ', data.email)
      setLoading(true)
      const response = await verifyEmail(encryptedInfo)
      console.log("verify res: ", response)
      const decryptedData: any = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);
      console.log("verify decrypted data: ", decryptedData)
      if(decryptedData.response === "Registration successful"){
        toast.success(`${decryptedData.description}`);
        
        navigate('/create-password', { replace: true })
      }
      const loginResponse = JSON.parse(decryptedData ?? "");
      if(loginResponse.response === "Registration successful"){
      toast.success(`${loginResponse.description}`);

    }
      setTimeout(() => {
        setInput1('')
        setInput2('')
        setInput3('')
        setInput4('')
        setInput5('')
        setInput6('')
      }, 1000);
  }


    const handleInput1 = (e: ChangeEvent<HTMLInputElement>)=>{
        setInput1(e.target.value);
        if(e.target.value.length!==0) { 
            inputRef2?.current?.focus()
        }else{
            inputRef1?.current?.focus()
        } 
    }
    const handleInput2 = (e: ChangeEvent<HTMLInputElement>)=>{
        setInput2(e.target.value);
        if(e.target.value.length!==0) { 
            inputRef3?.current?.focus()
        }else{
            inputRef2?.current?.focus()
        } 
    }
    const handleInput3 = (e: ChangeEvent<HTMLInputElement>)=>{
        setInput3(e.target.value);
        if(e.target.value.length!==0) { 
            inputRef4.current?.focus()
        }else{
            inputRef3.current?.focus()
        } 
    }
    const handleInput4 = (e: ChangeEvent<HTMLInputElement>)=>{
        setInput4(e.target.value);
        if(e.target.value.length!==0) { 
            inputRef5.current?.focus()
        }else{
            inputRef4.current?.focus()
        } 
    }
    const handleInput5 = (e: ChangeEvent<HTMLInputElement>)=>{
      setInput5(e.target.value);
      if(e.target.value.length!==0) { 
          inputRef6.current?.focus()
      }else{
          inputRef5.current?.focus()
      } 
  }
    const handleInput6 = (e: ChangeEvent<HTMLInputElement>)=>{
        setInput6(e.target.value);
    }
  return (
    <section className="h-screen overflow-hidden">
      <div className="grid grid-cols-3 h-full px-4 lg:px-0">
        <Toaster richColors position='top-right' />
        <div className=" h-full hidden lg:block"><img src={bgImg} className="object-cover h-full" alt="bg-img" /></div>
            <div  className="w-full col-span-3 lg:col-span-2 flex flex-col items-center gap-6 pt-12 lg:pt-28">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
                <img
                  className="mx-auto h-14 w-auto"
                  src={logo}
                  alt="Company-logo"
                />
      
              </div>
                    <div className="flex flex-col justify-center items-center mx-auto w-full max-w-sm lg:w-96 ">
                     <div>
      
                       <h2 className="text-xl lg:text-3xl font-semibold text-center">Verify Your Email Address</h2>
                    <p className="text-sm my-2 text-slate-400 text-center">A verification code has been sent to {user?.email},
                    enter the code below to verify your account</p>
                     </div>
      
                     <div className="mt-10">
      
                       <div className='flex gap-4 text-primaryColor'>
                 <input ref={inputRef1} maxLength={1} value={input1} onInput={(e: ChangeEvent<HTMLInputElement>)=>handleInput1(e)} type="text" className=' bg-secondaryColor rounded-xl px-2 w-12 h-16 text-center font-semibold outline-none' />
                 <input ref={inputRef2} maxLength={1} value={input2} onInput={(e: ChangeEvent<HTMLInputElement>)=>handleInput2(e)}  type="text" className='rounded-xl px-2 w-12 h-16 text-center font-semibold bg-secondaryColor outline-none' />
                 <input ref={inputRef3} maxLength={1} value={input3} onInput={(e: ChangeEvent<HTMLInputElement>)=>handleInput3(e)}  type="text" className=' rounded-xl px-2 w-12 h-16 text-center font-semibold bg-secondaryColor outline-none' />
                 <input ref={inputRef4} maxLength={1} value={input4} onInput={(e: ChangeEvent<HTMLInputElement>)=>handleInput4(e)}  type="text" className=' rounded-xl px-2 w-12 h-16 text-center font-semibold bg-secondaryColor outline-none' />
                 <input ref={inputRef5} maxLength={1} value={input5} onInput={(e: ChangeEvent<HTMLInputElement>)=>handleInput5(e)} type="text" className=' rounded-xl px-2 w-12 h-16 text-center font-semibold bg-secondaryColor outline-none' />
                 <input ref={inputRef6} maxLength={1} value={input6} onInput={(e: ChangeEvent<HTMLInputElement>)=>handleInput6(e)} type="text" className=' rounded-xl px-2 w-12 h-16 text-center font-semibold bg-secondaryColor outline-none' />
                       </div>
      
                 <button onClick={(e)=>handleSubmit(e)} disabled={input5 === ''} className={`mx-auto px-32 rounded-3xl py-3 my-6 block ${input6 === '' ? 'bg-gray-300 text-gray-100' : loading ? 'bg-gray-400 text-gray-700' : 'bg-primaryColor text-white'}`}>
                    {loading ? 'Loading...' : 'Continue'}
                 </button>
      
                     </div>
                   </div>
            </div>
      </div>
      <p className="absolute bottom-6 right-8 font-semibold">Step 2/4</p>

    </section>
  )
}

export default Verify