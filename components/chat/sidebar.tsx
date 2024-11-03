"use client"
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { GetChats } from '@/lib/actions/actions'
import { ConversationType } from '@/type/user'
import { useOtherUser } from '@/hooks/use-other-user'
import ChatCard from './chat-card'
import Spinner from '../spinner'
import { pusherClient } from '@/lib/pusher/pusher'
import { useUser } from '@/hooks/use-user'
import { FullMessage } from '@/type/chat'
import { toast } from 'sonner'

const SideBar = () => {
    const pathname = usePathname();
    const {user} = useUser()
    const [isMounted, setIsMounted] = useState(false);
    const  isActive = !!pathname.split('/').find((path)=>path==='chat') ? pathname.split('/')[2]  : true
    const query = useQuery<ConversationType[]|undefined|null>({
      queryKey: ['chats', 'chat-sidebar'],
      queryFn:async()=>await GetChats()
    });
    const client = useQueryClient();
    const updateSidebar = (data: FullMessage) => {
      client.setQueryData(['chats', 'chat-sidebar'], (cache: ConversationType[] | undefined) => {
        if (cache) {
          const updatedData = cache.map((convo) => {
            if (data.conversationId === convo.id) {
              // Return a new object with updated messages array
              return { ...convo, messages: [data] };
            }
            return convo;
          });
          return updatedData;
        }
        return cache;
      });
    };
  
    useEffect(()=>{
setIsMounted(true)
    },[]);
    useEffect(()=>{
        pusherClient.subscribe(user?.id!);
        pusherClient.bind('convo:lastmsg',(data:FullMessage)=>{
          updateSidebar(data);
          if(pathname.split('/').find((path)=>path==='chat') ? pathname.split('/')[2]!==data.conversationId:!isActive) toast(`${data.sender.name}: ${data.body}`,{position: 'top-center'})
        })
        return()=>{
          pusherClient.unsubscribe(user?.id!);
          pusherClient.unbind('convo:lastmsg')
        }
    }),[pathname]

if(isMounted)
  return (
    <div
    suppressHydrationWarning
    className={cn(' h-full border-r md:max-w-[250px] w-full ove flex-col py-4   flex' , pathname!=='/chat'&& 'hidden md:flex' )}
    >
      <h1 className='text-xl font-semibold px-2 py-2'>Chats</h1>
      {query.isLoading && !query.data ? 
    < p className='text-center w-full'><Spinner/></p>  :
    <>
    {query?.data?.length!>0?
  <>
 {query.data?.map((convo)=>{
      return <ChatCard convo={convo} key={convo.id}/>
     })}
  </>
  :
  <>
  <p className='text-xs text-muted-foreground'>Start a conversation</p>
  </>  
  }
    </>
    }
        </div>
  )
}

export default SideBar