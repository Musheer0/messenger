"use client"
import React, { useRef } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { IoSearch } from 'react-icons/io5'
import { GetPublicUserByEmail } from '@/lib/actions/actions'
import { useUserSearch } from '@/hooks/use-user-search'
import Spinner from '../spinner'

const SearchUsers = () => {
    const {setUsers, setIsloading,users, isLoading} = useUserSearch();
    const inputref = useRef<HTMLInputElement>(null)
    const search = async()=>{
        if(inputref.current){
        if(inputref.current.value.includes('@')){
         if(inputref.current.value.split('@')[0].length>1){
            setIsloading(true);
            const response = await GetPublicUserByEmail(inputref.current.value);
            if(response) setUsers(response);
            setIsloading(false);
         }
        }
     }
    }
  return (
    <div
    className='w-full flex items-center justify-between'
    >
        <form
        onSubmit={async(e)=>{
            e.preventDefault();
            if(users?.length!>0){
                if(users[0].email!==inputref.current?.value){
                    await search()
                }
            }
            else await search()
        }}
        className='flex-1 flex items-center gap-2 p-2 border-b'>
            <Input
            onChange={async()=>{
                if(isLoading) return 
                await search()
            }}
            ref={inputref} placeholder='search user by email' required type='email'/>
            <Button disabled={isLoading}>
              {
              isLoading ?
               <Spinner/>:
                <> 
                 <IoSearch/>
                <p className='hidden sm:flex'>
                    Search
                </p>
                </>
                }
            </Button>
        </form>
    </div>
  )
}

export default SearchUsers