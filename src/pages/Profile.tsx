import React, { useState } from 'react'
import logo from '../assets/imgs/afrologo.png'
import ProfileDetails from './ProfileDetails'
import ProfileEdit from './ProfileEdit'
import ProfileChangePasssword from './ProfileChangePassword'

type Props = {}

const Profile = (props: Props) => {
  const [editProfile, setEditProfile] = useState(false);
  const [managePassword, setManagePassword] = useState(false);


  return (
    <div>
        <div className='border p-2 inline-block rounded-3xl'>
            <button onClick={() => setManagePassword(false)} className={`p-2 ${managePassword ? "" : "bg-slate-100" } rounded-3xl text-slate-400 text-sm`}>Manage Profile</button>
            <button onClick={() => setManagePassword(true)} className={`p-2 ${managePassword ? "bg-slate-100 " : ""} rounded-3xl text-slate-400 text-sm`}>Manage Password</button>
        </div>

            {!managePassword ? <div>
              {
                      editProfile ? <ProfileEdit setEditProfile={setEditProfile} />
                        :
                        <ProfileDetails setEditProfile={setEditProfile} />}
            </div> :
            <div>
              <ProfileChangePasssword />
            </div>}

    </div>
  )
}

export default Profile