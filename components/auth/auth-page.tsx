import React, { ReactNode } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import LoginForm from './login-form'
import { auth } from '@/auth'

const AuthPage =async ({children}:{children?:ReactNode}) => {
  const session = await auth()
  return (
    <div className='w-full h-screen flex items-center'>
        <div className="left flex-1 relative h-full  flex flex-col  lg:p-20  p-5 pt-20">
       
         {children ? <div className='absolute top-0 left-0 w-full h-full p-10  bg-muted-foreground/5 shadow-sm'>
          <div className="header">
                <img src="https://scontent.fixe3-1.fna.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&ccb=1-7&_nc_sid=f537c7&_nc_ohc=4OOM3L_YfZYQ7kNvgGHA7YN&_nc_zt=14&_nc_ht=scontent.fixe3-1.fna&_nc_gid=AO4WlzVpioIxG6FJXKMXE5x&oh=00_AYCHta04cdxBMBew806X4KngLjWtaq7TohH9sAimmdCucQ&oe=672A97BD"
                className='w-10 h-10'
                alt="" />
            </div>
          {children}</div>: 
         <>
      <div className="header">
                <img src="https://scontent.fixe3-1.fna.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&ccb=1-7&_nc_sid=f537c7&_nc_ohc=4OOM3L_YfZYQ7kNvgGHA7YN&_nc_zt=14&_nc_ht=scontent.fixe3-1.fna&_nc_gid=AO4WlzVpioIxG6FJXKMXE5x&oh=00_AYCHta04cdxBMBew806X4KngLjWtaq7TohH9sAimmdCucQ&oe=672A97BD"
                className='w-10 h-10'
                alt="" />
            </div>
            <h1 className='gradient-text lg:text-[6vw] text-[8.6vw] md:text-[7vw] font-semibold tracking-tighter leading-none'>
            A place for meaningful conversations
            </h1>
            <p className='px-4 pt-10 text-muted-foreground'>
            Connect with your friends and family, build your community and deepen your interests.
            </p>
           {session?.user ?
            <>
           <Link href={'/chat'}>
           <Button className='ml-4 mt-2'>Start Messeging</Button>
           </Link>
            </>
           :
            <div className="form flex flex-col space-y-2 p-2 max-w-[400px] w-full">
            <LoginForm footer={<>
              <div className="action flex items-center gap-4">
            <Button className='rounded-full'>Login</Button>
            <Button variant={'link'}>Forgot password?</Button>
            </div>
            <Link href={'/sign-up'} className='text-sm pt-4 text-muted-foreground hover:underline'>Don&apos;t have an account</Link>
            </>
          }/>  
          </div>
           }
         </>
         }
             
        </div>
        <div className='right hidden lg:flex flex-1 h-full
     bg-right
        bg-[url("/banner.jpg")]
        bg-contain bg-no-repeat 
         lg:p-20  p-5 pt-20 '></div>
    </div>
  )
}

export default AuthPage