import AuthCard from '@/components/auth/auth-card'
import AuthPage from '@/components/auth/auth-page'
import RegisterForm from '@/components/auth/register-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
 <AuthPage>
    <AuthCard title='Welcome to Messenger' desc='Please create account to continue'>
    <RegisterForm
      className='w-full'
    footer={<>
        <div className="action flex items-center gap-4">
      <Button className='rounded-full'>Register</Button>
      </div>
      <Link
       href={'/sign-in'} className='text-sm pt-4 text-muted-foreground hover:underline'>Already  have an account</Link>
      </>
    }
    />
    </AuthCard>
 </AuthPage>
  )
}

export default page