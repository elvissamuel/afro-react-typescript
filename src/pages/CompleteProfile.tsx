import bgImg from "../assets/imgs/loginImg.png"
import logo from "../assets/imgs/afrologo.png"
import targetIcon from "../assets/imgs/targetIcon.png"
import { decryptAES, encryptData } from "src/AES/AES"
import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useOnboardUserStore } from "src/store/user-store"
import { CompleteProfileFormValues } from "src/models/models"
import { Toaster, toast } from 'sonner'
import { completeUserProfile } from "src/api/api"

const CompleteProfile = () => {
    const {register, handleSubmit, reset, getValues} = useForm<CompleteProfileFormValues>()
    const { user } = useOnboardUserStore.getState()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const onSubmit: SubmitHandler<CompleteProfileFormValues> = async (data) => {

        setLoading(true);

        if(!user){
            toast.error("User not found");
            console.log("user was not found")
            setLoading(false);
            return;
        }

        const encryptedInfo = encryptData({data: {...data, email: user.email}, secretKey: process.env.REACT_APP_AFROMARKETS_SECRET_KEY })
        const response: any = await completeUserProfile(encryptedInfo);
        const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);
        const loginResponse = JSON.parse(decryptedData ?? "");
        if(loginResponse.response === "Password set successfully"){
          toast.success(`${loginResponse.response}`);
          reset();
          setTimeout(() => {
            navigate('/login', { replace: true })
          }, 1000);
        }else{
          toast.error(`${loginResponse.response}`);
        }
        setLoading(false);
    
      }

    return (
        <section className="h-full overflow-hidden relative">
            <Toaster richColors position='top-right' />
            <div className="grid grid-cols-3 h-full px-4 lg:px-0">
                <div className=" h-full hidden lg:block"><img src={bgImg} className="object-cover h-full" alt="bg-img" /></div>

                <div className="w-full col-span-3 lg:col-span-2 flex flex-col items-center gap-6 pt-6 lg:pt-8">
                    <div className="w-[130px]">
                        <img className="object-cover w-full" src={logo} alt="afro-logo" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-semibold text-center">Complete Your Profile</h2>
                    <p className="text-lg text-slate-400 text-center">The Last Step, You are Almost There!</p>

                    <form onSubmit={handleSubmit(onSubmit, (error) => console.error(error))} className="w-[90%] lg:w-[60%]" action="">
                        <div className="flex flex-col gap-4">
                            <div>
                                <p className="text-slate-500 font-semibold">Business Name</p>
                                <input
                                {...register('business_name', {required:true})} type="text" placeholder="First name, last name" className="border outline-0 px-2 border-[#229952] py-3 rounded-xl w-full" name="business_name" id="business_name" />

                            </div>
                            <div className="relative">
                                <p className="text-slate-500 font-semibold">Business Line</p>
                                <input
                                {...register('address_line_1', {required:true})} type="text" placeholder="Enter address" className="border outline-0 px-2 border-[#229952] py-3 rounded-xl w-full" name="address_line_1" id="address_line_1" />
                                <img src={targetIcon} alt="" className="absolute top-1/2 right-4" />
                            </div>
                            <div className="relative">
                                <p className="text-slate-500 font-semibold">Business Address</p>
                                <input
                                {...register('address_line_2', {required:true})} type="text" placeholder="Enter address" className="border outline-0 px-2 border-[#229952] py-3 rounded-xl w-full" name="address_line_2" id="address_line_2" />
                                <img src={targetIcon} alt="" className="absolute top-1/2 right-4" />
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-slate-500 font-semibold">Mobile Number</p>
                                    <input {...register('phone_number', {required:true})} type="text" placeholder="Enter phone no" className="border outline-0 px-2 border-[#229952] py-3 rounded-xl w-full" name="phone_number" id="phone_number" />
                                </div>  
                                <div>
                                    <p className="text-slate-500 font-semibold">State</p>
                                    <input type="text" placeholder="First name, last name" className="border outline-0 px-2 border-[#229952] py-3 rounded-xl w-full" name="" id="" />

                                </div>
                                <div>
                                    <p className="text-slate-500 font-semibold">Town/City</p>
                                    <input
                                    {...register('city', {required:true})}
                                     type="text" placeholder="First name, last name" className="border outline-0 px-2 border-[#229952] py-3 rounded-xl w-full" name="city" id="city" />
                                </div>
                                <div>
                                    <p className="text-slate-500 font-semibold">Post Code</p>
                                    <input {...register('post_code', {required:true})} type="text" placeholder="First name, last name" className="border outline-0 px-2 border-[#229952] py-3 rounded-xl w-full" name="post_code" id="post_code" />
                                </div>
                            </div>

                            <button onClick={() => console.log("fdf: ", getValues("business_name"))} type="submit" className="bg-[#229952] w-full my-4 lg:my-8 text-white font-semibold rounded-full py-3">{loading ? "Loading..." : "Submit"}</button>
                        </div>
                    </form>
                </div>

            </div>
            <p className="absolute bottom-2 right-8 font-semibold">Step 4/4</p>

        </section>
    )
}

export default CompleteProfile