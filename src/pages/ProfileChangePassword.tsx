import { Dispatch, SetStateAction } from "react";



const ProfileChangePasssword = () => {

    return (

        <div>
            <div>
            <h2 className='my-8 text-lg'>Change Password</h2>

            <form action="" className="flex flex-col gap-4 w-[550px] text-base">
                <div>
                    <label htmlFor="current_password" className='text-sm block font-semibold text-slate-400'>Current Password<span className='text-red-500 font-bold'>*</span></label>
                    <input type="text" placeholder="Enter password" id='full_name' name='current_password' className='outline-none border-[1px] rounded-lg px-3 py-2 w-full' />
                </div>
                <div>
                    <label htmlFor="new_password" className='text-sm block font-semibold text-slate-400'>New Password<span className='text-red-500 font-bold'>*</span></label>
                    <input type="text" placeholder="Enter password" id='full_name' name='new_password' className='outline-none border-[1px] rounded-lg px-3 py-2 w-full' />
                </div>
                <div className="col-span-2">
                    <label htmlFor="confirm_new_password" className='text-sm block font-semibold text-slate-400'>Confirm New Password<span className='text-red-500 font-bold'>*</span></label>
                    <input type="text" placeholder="Enter password" id='full_name' name='confirm_new_password' className='outline-none border-[1px] rounded-lg px-3 py-2 w-full' />
                </div>

            <button className='bg-primaryColor text-white p-2 px-8 w-full my-5 rounded-3xl'>Save</button>
                
            </form>

        </div>
        </div>
    )
}

export default ProfileChangePasssword;