import Chat from '@/components/chat/chat'
import ChatHeader from '@/components/chat/chat-header'
import React from 'react'

const page = ({params}:{params:{id:string}}) => {
  return (
    <div className='flex-1 h-full w-full flex flex-col justify-between'>
        <Chat id={params.id}/>
    </div>
  )
}

export default page