"use client"
import { LoginSchema } from '@/schema/login-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { ServerSignIn } from '@/lib/actions/auth-actions'
import ResponseCard, { ResponseType } from '../response-card'
import Spinner from '../spinner'

const LoginForm = ({footer, className}:{footer?:ReactNode, className?:string}) => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues:{
      email: '',
      password: '' 
    }
  });
  const [error, setError] = useState('');
  const handleSubmit = async(data:z.infer<typeof LoginSchema>)=>{
    setError('')
    if(navigator.onLine) {
     const response = await ServerSignIn(data);
     if(response.error) setError(response.error);
    }
    else{
      setError('your offline')
    }
  }
  return (
    <Form {...form}>
   <form onSubmit={form.handleSubmit(handleSubmit)} className={cn(className, 'flex flex-col space-y-2')}>
    <FormField
    control={form.control}
    name='email'
    render={({field})=>{
     return <FormItem>
          <FormControl>
            <Input  {...field} placeholder='Enter email' required type='email'/>
          </FormControl>
          <FormMessage/>
      </FormItem>
    }}
    />
    <FormField
    control={form.control}
    name='password'
    render={({field})=>{
     return <FormItem>
          <FormControl>
            <Input  {...field} placeholder='Enter password' required type='password'/>
          </FormControl>
          <FormMessage/>
      </FormItem>
    }}
    />
 {form.formState.isSubmitting ? 
<div className='w-full flex items-center justify-center py-2 rounded-lg animate-pulse bg-muted-foreground/5 '>
<Spinner/>
</div>:
<>
{footer ? 
  <>
  <ResponseCard message={error} type={ResponseType.error} />
  {footer}
  </>  :
  <Button>
    Login
  </Button>
  }
</> 
}
   </form>
    </Form>
  )
}

export default LoginForm