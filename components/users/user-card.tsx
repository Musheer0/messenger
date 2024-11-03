"use client"
import { PublicUser } from '@/lib/actions/actions'
import React from 'react'
import { AvatarIcon } from '../avatar'
import { Button } from '../ui/button'
import { IoPersonAdd } from "react-icons/io5";
import { useUser } from '@/hooks/use-user'
const UserCard = ({user, onclick}:{user:PublicUser,onclick?:()=>void}) => {
    const {user:session_user} = useUser()

  return (
    <div
    onClick={async()=>{
        onclick && await onclick()
    }}
    className='flex items-start justify-between w-full hover:bg-muted-foreground/5 cursor-pointer border-b p-2'>
<div className="left flex items-start gap-2">
<AvatarIcon url={user.image!} fallback={user.name!}/>
        <div className="info flex flex-col gap-1">
            <p className='font-semibold leading-none'>{user.name}</p>
            <p className='leading-none text-xs text-muted-foreground'>{user.email}</p>
        </div>
</div>
            {user.id!==session_user?.id &&
            <Button title='add friend'  className='bg-green-500 dark:bg-green-600 hover:bg-green-500/90'>
            <IoPersonAdd />
            <p className=' text-xs'>Add friend</p>
            </Button>
            }
    </div>
  )
}

export default UserCard