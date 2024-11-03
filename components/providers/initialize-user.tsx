"use client"
import { useUser } from '@/hooks/use-user'
import { GetCurrentUser } from '@/lib/actions/actions';
import React, { useEffect } from 'react'
import Spinner from '../spinner';

const InitializeUser = ({children}:{children:React.ReactNode}) => {
    const {user, setIsloading, setUser, isLoading} = useUser();
    useEffect(()=>{
      const unsub = async()=>{
        setIsloading(true);
        const response = await GetCurrentUser();
       setUser(response!);
       setIsloading(false)
      };
      unsub()
    },[])
if(!isLoading && user)
  return (
   <>
   {children}
   </>
  )
if(isLoading)
    return 
    <Spinner/>
}

export default InitializeUser