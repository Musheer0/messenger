"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoChatbubblesSharp } from "react-icons/io5";
import { PiUsersThreeLight } from "react-icons/pi";
import { PiUsersThreeFill } from "react-icons/pi";
import { AvatarIcon } from '../avatar';
import { cn } from '@/lib/utils';
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

const MobileNavigation = () => {
    const pathname = usePathname()
    const  isActive = !!pathname.split('/').find((path)=>path==='chat') ? pathname.split('/')[2]  : true
if(!isActive)
  return (
    <div 
    className='flex  md:hidden border-t   w-full justify-between  shadow-md'
    >
    
    <div className="links flex  w-full">
    {navigationLinks.map((link, i)=>{
        const isActive =pathname.includes(link.href)
        const Icon =isActive ? link.ActiveIcon :  link.Icon;
            return<Link href={link.href} key={link.href} 
            className={cn(
                'p-2  relative group flex flex-col items-center  justify-center flex-1 hover:bg-muted-foreground/15',
               i!==navigationLinks.length && 'border-r', isActive && 'bg-muted-foreground/15'
            )}
            >
                              <Icon size={24}/>
                              <p className='text-sm text-muted-foreground'>{link.name}</p>
            </Link>
        })}
    </div>
    </div>
  )
}

export default MobileNavigation