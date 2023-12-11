'use client';

import Link from "next/link"
import Image from 'next/image';
import userAvatar from '../../../public/icons/user-avatar.png';
import { useState } from "react";

function Topbar({user}) {
    const [toggle, setToggle] = useState(false);

  return (
    <div className="sticky top-0 z-40 w-full h-16 border-b border-slate-200 bg-white flex items-center px-6">
      <ul className="ml-auto flex space-x-4 font-semibold text-md">
        <li className="relative">
            <span className="cursor-pointer flex items-center font-normal text-sm" onClick={() => setToggle(!toggle)}><Image src={userAvatar} className="mr-2" width={36} height={36} alt="User Profile" /> {user.name}</span>

            <ul onClick={() => setToggle(false)} className={`${!toggle ? 'hidden' : ''} absolute top-full right-0 bg-white shadow z-40 p-3 w-32 min-w-full space-y-2`}>
                <li><Link href={'/admin/users/profile'} className="block pb-2 border-b border-slate-200">Profile</Link></li>
                <li><Link href={'/logout'} className="block">Logout</Link></li>
            </ul>
        </li>
      </ul>
    </div>
  )
}

export default Topbar
