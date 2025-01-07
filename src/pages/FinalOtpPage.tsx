import bgImg from "../assets/imgs/loginImg.png"
import logo from "../assets/imgs/afrologo.png"
import { useRef, useState } from "react";
import OTPInput from "./OtpInputField";
import { useOnboardUserStore } from "src/store/user-store";

const FinalOtpPage = () => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const {user} = useOnboardUserStore.getState()

  const handleChange = (index: number, value: string) => {
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input box if it's not the last one
      if (index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleBackspace = (index: number, value: string) => {
    if (value === '' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleClear = () => {
    setOtp(Array(6).fill(''));
    inputsRef.current[0]?.focus(); // Reset focus to the first input
  };


    return (
        <section className="h-screen overflow-hidden">
            <div className="grid grid-cols-3 h-full px-4 lg:px-0">
                <div className=" h-full hidden lg:block"><img src={bgImg} className="object-cover h-full" alt="bg-img" /></div>

                <div className="w-full col-span-3 lg:col-span-2 flex flex-col items-center gap-6 pt-12 lg:pt-28">
                    <div className="w-[130px]">
                        <img className="object-cover w-full" src={logo} alt="afro-logo" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-semibold text-center">Verify Your Email Address</h2>
                    <p className="text-lg w-[50%] text-slate-400 text-center">A verification code has been sent to {user?.email},
                    enter the code below to verify your account</p>

                    <form className="w-[90%] lg:w-[60%]" action="">
                        <div>
                        <OTPInput />
                        <button className="bg-slate-300 w-full my-4 lg:my-8 text-white font-semibold rounded-full py-3">Continue</button>
                        </div>
                    </form>
                </div>


                <p className="absolute bottom-6 right-8 font-semibold">Step 2/4</p>

            </div>
        </section>
    )
}

export default FinalOtpPage