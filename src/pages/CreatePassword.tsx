import bgImg from "../assets/imgs/loginImg.png"
import logo from "../assets/imgs/afrologo.png"
import eyeIcon from "../assets/imgs/eyeIcon.png"
import { useOnboardUserStore } from "src/store/user-store"
import { useState } from "react"
import { SetPasswordFormValues } from "src/models/models"
import { useNavigate } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { setUserPassword } from "src/api/api"
import { decryptAES, encryptData } from "src/AES/AES"
import { Toaster, toast } from 'sonner'

const CreatePassword = () => {
    const {register, handleSubmit, reset} = useForm<SetPasswordFormValues>()
    const { user } = useOnboardUserStore.getState()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("");

    const onSubmit: SubmitHandler<SetPasswordFormValues> = async (data) => {
        console.log("user was not 7777: ", data)

        setLoading(true);
        if(confirmPassword !== data.password){
            toast.error("Passwords do not match");
            console.log("Passwords do not match")
            setLoading(false);

            return;
        }

        if(!user){
            toast.error("User not found");
            console.log("user was not found")
            setLoading(false);
            return;
        }

        const encryptedInfo = encryptData({data, secretKey: process.env.REACT_APP_AFROMARKETS_SECRET_KEY })
        const response: any = await setUserPassword(encryptedInfo);
        const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);
        const loginResponse = JSON.parse(decryptedData ?? "");
        if(loginResponse.response === "Password set successfully"){
          toast.success(`${loginResponse.response}`);
          reset();
          setTimeout(() => {
            navigate('/complete-profile', { replace: true })
          }, 1000);
        }else{
          toast.error(`${loginResponse.response}`);
        }
        setLoading(false);
    
      }

    return (
        <section className="h-screen overflow-hidden">
            <Toaster richColors position='top-right' />
            <div className="grid grid-cols-3 h-full px-4 lg:px-0">
                <div className=" h-full hidden lg:block"><img src={bgImg} className="object-cover h-full" alt="bg-img" /></div>

                <div className="w-full col-span-3 lg:col-span-2 flex flex-col items-center gap-6 pt-12 lg:pt-28">
                    <div className="w-[130px]">
                        <img className="object-cover w-full" src={logo} alt="afro-logo" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-semibold text-center">Create Password</h2>
                    <p className="text-lg text-slate-400 text-center">For added security, use a strong password.{}</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] lg:w-[50%]" action="">
                        <div className="flex flex-col gap-4">
                            <input
                              value={user?.email}
                              {...register('email', {required:true})}
                              type="text" placeholder="Enter email" className="hidden border outline-0 px-2 border-[#229952] py-3 rounded-xl w-full" name="email" id="email" 
                              />
                            <div className="relative">
                                <p className="text-slate-500 font-semibold">Password</p>
                                <input
                                {...register('password', {required:true})}
                                type="text" placeholder="Enter password" className="border outline-0 px-2 border-[#229952] py-3 rounded-xl w-full" name="password" id="password" />
                                <img src={eyeIcon} alt="" className="absolute top-1/2 right-4" />

                            </div>
                            <div className="relative">
                                <p className="text-slate-500 font-semibold">Confirm Password</p>
                                <input onChange={(e) => setConfirmPassword(e.target.value)} type="text" placeholder="Enter password" className="border outline-0 px-2 border-[#229952] py-3 rounded-xl w-full" name="" id="" />
                                <img src={eyeIcon} alt="" className="absolute top-1/2 right-4" />
                            </div>

                            <button type="submit" disabled={loading} className="bg-[#229952] hover:bg-black z-40 w-full my-4 lg:my-8 text-white font-semibold rounded-full py-3">{loading ? "Loading..." : "Continue"}</button>
                        </div>
                    </form>
                </div>
                <p className="absolute bottom-6 right-8 font-semibold">Step 3/4</p>

            </div>
        </section>
    )
}

export default CreatePassword