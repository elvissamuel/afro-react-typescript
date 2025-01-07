import bgImg from "../assets/imgs/loginImg.png"
import logo from "../assets/imgs/afrologo.png"
import { useForm, SubmitHandler } from "react-hook-form"
import { OnboardingFormValues } from "src/models/models"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { decryptAES, encryptData } from "src/AES/AES"
import { onboarding } from "src/api/api"
import { Toaster, toast } from 'sonner'
import { useOnboardUserStore } from "src/store/user-store"


const FinalLoginPage = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<OnboardingFormValues>()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const {setUser} = useOnboardUserStore.getState()

  const onSubmit: SubmitHandler<OnboardingFormValues> = async (data) => {
    setLoading(true);
    const encryptedInfo = encryptData({data, secretKey: process.env.REACT_APP_AFROMARKETS_SECRET_KEY })
    const response: any = await onboarding(encryptedInfo);
    const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);
    const loginResponse = JSON.parse(decryptedData ?? "");
    if(loginResponse.response === "Registration successful"){
      toast.success(`${loginResponse.description}`);
      setUser(data)

      setTimeout(() => {
        navigate('/verify', { replace: true })
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
                    <h2 className="text-2xl lg:text-3xl font-semibold text-center">Create an AMS Vendor Account</h2>
                    <p className="text-lg text-slate-400 text-center">Bridge the gap between you and your customers</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] lg:w-[50%]" action="">
                        <div className="flex flex-col gap-4">
                            <div>
                                <p className="text-slate-500 font-semibold">Full Name</p>
                                <input
                                {...register('full_name', {required:true})}
                                id="full_name"
                                name="full_name"
                                autoComplete="full_name"
                                required placeholder="First name, last name" className="border outline-0 px-2 border-[#229952] py-3 rounded-xl w-full" />
                                {errors.full_name && <span className='text-sm'>This field is required</span>}
                            </div>
                            <div>
                                <p className="text-slate-500 font-semibold">Email Address</p>
                                <input
                                {...register('email', {required:true})}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required placeholder="youremail@email.com" className="border outline-0 px-2 border-[#229952] py-3 rounded-xl w-full" />
                                {errors.email && <span className='text-sm'>This field is required</span>}
                            </div>

                            <button type="submit" disabled={loading} className="bg-[#229952] w-full my-4 lg:my-8 text-white font-semibold rounded-full py-3">{loading ? "Loading..." : "Continue"}</button>
                            <p className="text-center">Already have an account? <a className="text-[#229952]" href="/sign-in">Sign in</a></p>
                        </div>
                    </form>
                </div>
                <p className="absolute bottom-6 right-8 font-semibold">Step 1/4</p>

            </div>
        </section>
    )
}

export default FinalLoginPage