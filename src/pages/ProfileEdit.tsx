import { Dispatch, SetStateAction } from "react";

interface ProfileProps {
    setEditProfile: Dispatch<SetStateAction<boolean>>;
  }

const ProfileEdit = ({setEditProfile}: ProfileProps) => {

    return (

        <div>
            <div>
            <h2 className='my-8'>Profile Edit</h2>

            <div className='my-6 mb-16'>
                <div className='flex gap-2 items-center'>
                    <div className='w-[52px] h-[52px] rounded-full bg-slate-100 p-2 flex items-center justify-center font-semibold'>
                        JD
                    </div>
                    <button className="px-3 py-2 bg-primaryColor text-white rounded-3xl text-sm">Upload Photo</button>
                    <button className="px-3 py-2 border text-red-500 rounded-3xl text-sm">Delete Photo</button>
                </div>
                <p className="text-slate-500 my-2 text-sm w-[500px]"><span className="text-yellow-400">Warning: </span> Please note that only JPEG and PNG image files are accepted. Any files in other formats will not be processed. </p>
            </div>

            <form action="" className="grid gap-4 grid-cols-2 w-[550px]">
                <div>
                    <label htmlFor="full_name" className='text-sm block font-semibold text-slate-400'>Business Name<span className='text-red-500 font-bold'>*</span></label>
                    <input type="text" id='full_name' name='full_name' className='outline-none border-[1px] rounded-lg px-3 py-1.5 w-full' />
                </div>
                <div>
                    <label htmlFor="full_name" className='text-sm block font-semibold text-slate-400'>Email Address<span className='text-red-500 font-bold'>*</span></label>
                    <input type="text" id='full_name' name='full_name' className='outline-none border-[1px] rounded-lg px-3 py-1.5 w-full' />
                </div>
                <div className="col-span-2">
                    <label htmlFor="full_name" className='text-sm block font-semibold text-slate-400'>Business Address<span className='text-red-500 font-bold'>*</span></label>
                    <input type="text" id='full_name' name='full_name' className='outline-none border-[1px] rounded-lg px-3 py-1.5 w-full' />
                </div>
                <div>
                    <label htmlFor="full_name" className='text-sm block font-semibold text-slate-400'>Mobile Number<span className='text-red-500 font-bold'>*</span></label>
                    <input type="text" id='full_name' name='full_name' className='outline-none border-[1px] rounded-lg px-3 py-1.5 w-full' />
                </div>
                <div>
                    <label htmlFor="full_name" className='text-sm block font-semibold text-slate-400'>State<span className='text-red-500 font-bold'>*</span></label>
                    <input type="text" id='full_name' name='full_name' className='outline-none border-[1px] rounded-lg px-3 py-1.5 w-full' />
                </div>
                <div>
                    <label htmlFor="full_name" className='text-sm block font-semibold text-slate-400'>Town/City<span className='text-red-500 font-bold'>*</span></label>
                    <input type="text" id='full_name' name='full_name' className='outline-none border-[1px] rounded-lg px-3 py-1.5 w-full' />
                </div>
                <div>
                    <label htmlFor="full_name" className='text-sm block font-semibold text-slate-400'>Postal Code<span className='text-red-500 font-bold'>*</span></label>
                    <input type="text" id='full_name' name='full_name' className='outline-none border-[1px] rounded-lg px-3 py-1.5 w-full' />
                </div>
            </form>

            <button onClick={()=> setEditProfile(false)} className='bg-red-500 text-white p-2 px-8 my-10 rounded-3xl'>Close</button>
        </div>
        </div>
    )
}

export default ProfileEdit;