"use client"

import { GetChat } from '@/lib/actions/actions'
import { ChatWithMessags } from '@/type/chat'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ChatHeader from './chat-header'
import Spinner from '../spinner'
import ChatBody from './chat-body'
import SendMessage from './send-message'

const Chat = ({id}:{id:string}) => {
    const query = useQuery<ChatWithMessags|null>({
        queryKey: ['chat', `chat-${id}`],
        queryFn: async()=> await GetChat(id)
    });
    if(query.data )
  return (
    <div  className='w-full h-full max-h-screen flex flex-col'>
      <ChatHeader chat={query.data}/>
      <ChatBody id={id}/>
      <SendMessage id={query.data.id}/>
    </div>
  )
if(query.isLoading) return <Spinner className='mx-auto '/>
}

export default Chat