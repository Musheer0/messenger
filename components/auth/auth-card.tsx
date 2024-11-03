import React, { ReactNode } from 'react'
import LoginForm from './login-form'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
interface AuthCardProps{
  children:ReactNode,
  title:string,
  desc:string,
  showSocialButton?:boolean
}
const AuthCard:React.FC<AuthCardProps> = ({children, title, desc, showSocialButton}) => {
  return (
 <div className={cn('w-full h-full flex gap-4 pt-4 flex-col items-start')}>
     <h1 className='leading-none font-semibold text-2xl'>{title}</h1>
     <p className=' text-muted-foreground leading-none'>
           {desc}
            </p>
    {children}
 </div>
  )
}

export default AuthCard