"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoChatbubblesSharp } from "react-icons/io5";
import { PiUsersThreeLight } from "react-icons/pi";
import { PiUsersThreeFill } from "react-icons/pi";
import { AvatarIcon } from '../avatar';
import { useUser } from '@/hooks/use-user';
import { ModeToggle } from '../theme-toggler';
export const navigationLinks = [
    {
        name: 'chat',
        href: '/chat',
        Icon: IoChatbubblesOutline,
        ActiveIcon: IoChatbubblesSharp
    },
    {
        name: 'users',
        href: '/users',
        Icon: PiUsersThreeLight,
        ActiveIcon: PiUsersThreeFill
    }
]

const DesktopNavigation = () => {
    const pathname = usePathname();
    const {user} = useUser()
  return (
    <div 
    className='hidden md:flex border-r px-2 h-full py-2 flex-col shadow-md'
    >
    
    <div className="links flex flex-col gap-1 flex-1">
    {navigationLinks.map((link)=>{
        const Icon =pathname.includes(link.href) ? link.ActiveIcon :  link.Icon
            return<Link href={link.href} key={link.href} >
             <div  className='p-2 rounded-md relative group hover:bg-muted-foreground/15'>
             <div className="tooltip z-[50] absolute top-1/2 -translate-y-1/2 -right-full opacity-0 group-hover:opacity-100 text-xs translate-x-0 group-hover:translate-x-5 bg-foreground text-background px-4 py-1 rounded-full transition-all duration-300">
             {link.name}
             </div>
              <Icon size={24}/>
            </div>
            </Link>
        })}
        <ModeToggle/>
    </div>
    <AvatarIcon url={user?.image!} fallback={user?.name!}/>
    </div>
  )
}

export default DesktopNavigation