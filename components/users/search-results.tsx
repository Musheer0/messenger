"use client"
import { useUserSearch } from '@/hooks/use-user-search'
import React from 'react'
import UserCard from './user-card'
import Spinner from '../spinner'
import axios from 'axios'
import { useRouter } from 'next/navigation'
const SearchResults = () => {
    const {users, isLoading} = useUserSearch();
    const router = useRouter()
if(!isLoading)
  return (
    <div className='w-full'>
      {users.map((user)=>{
     const    onClick = async()=>{
      axios.post('/api/conversation',{
        userId:user.id
      }).then((res:any)=>{
        if(!res?.error){
            router.push('/chat/'+res.data?.newChat?.id)
        }
        
      })
        }
        return <UserCard onclick={onClick} key={user.email} user={user}/>
      })}
    </div>
  )
  if(isLoading)
    return (
   <div className='w-full flex items-center py-2 justify-center'>
    <Spinner/>
   </div>
    )
}

export default SearchResults