import AuthCard from '@/components/auth/auth-card'
import AuthPage from '@/components/auth/auth-page'
import LoginForm from '@/components/auth/login-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <AuthPage>
    <AuthCard title='Sigin in to Messenger' desc='Please login with your account to continue'>
    <LoginForm
      className='w-full'
    footer={<>
        <div className="action flex items-center gap-4">
      <Button className='rounded-full' type='submit'>Login</Button>
      <Button
       variant={'link'}>Forgot password?</Button>
      </div>
      <Link
       href={'/sign-up'} className='text-sm pt-4 text-muted-foreground hover:underline'>Don&apos;t have an account</Link>
      </>
    }
    />
    </AuthCard>
 </AuthPage>
  )
}

export default page