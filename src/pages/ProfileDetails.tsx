import { Dispatch, SetStateAction } from "react";

interface ProfileProps {
    setEditProfile: Dispatch<SetStateAction<boolean>>;
  }

const ProfileDetails = ({setEditProfile}: ProfileProps) => {

    return (

        <div>
            <div>
            <h2 className='my-8'>Profile Details</h2>

            <div className='flex justify-between items-center my-6 mb-16'>
                <div className='flex gap-2 items-center'>
                    <div className='w-[45px] h-[45px] rounded-full bg-slate-100 p-2 text-center'>
                        JD
                    </div>
                    <div>
                        <p className='text-slate-500 text-sm'>John Doe</p>
                        <p className='text-sm text-slate-400'>example@mail.com</p>
                    </div>
                </div>

                <div>
                    <button onClick={()=>setEditProfile(true)} className='p-2 rounded-3xl text-sm text-slate-500 border'>Edit Profile</button>
                </div>
            </div>

            <div className='grid grid-cols-2'>
                <h2 className='col-span-2 text-slate-400 text-sm mb-2'>Personal Information</h2>
                    <div>
                        <p className='text-sm text-slate-400'>Full Name</p>
                        <p>John Doe</p>
                    </div>

                    <div>
                        <p className='text-sm text-slate-400'>Email Address</p>
                        <p>example@mail.com</p>
                    </div>

                    <h2 className='col-span-2 mt-6 text-slate-400 text-sm mb-2'>Business Information</h2>
                    <div>
                        <p className='text-sm text-slate-400'>Business Name</p>
                        <p>John Doe Store</p>
                    </div>

                    <div>
                        <p className='text-sm text-slate-400'>Phone Store</p>
                        <p>example@mail.com</p>
                    </div>

                    <h2 className='col-span-2 mt-6 text-slate-400 text-sm mb-2'>Business Address</h2>
                    <div>
                        <p className='text-sm text-slate-400'>80, BO Rawines, Terrinfe</p>
                        <p>EC50 9AU</p>
                    </div>

                    <div>
                        <p className='text-sm text-slate-400'>Postal Code</p>
                        <p>EC50</p>
                    </div>

                    <div className='mt-8'>
                        <p className='text-sm text-slate-400'>State</p>
                        <p>Yorkshire</p>
                    </div>

                    <div className='mt-8'>
                        <p className='text-sm text-slate-400'>City/town</p>
                        <p>Bath</p>
                    </div>
            </div>

            <button className='bg-red-500 text-white p-2 px-8 my-10 rounded-3xl'>Close</button>
        </div>
        </div>
    )
}

export default ProfileDetails;