"use client"
import { useOtherUser } from '@/hooks/use-other-user';
import { ChatWithMessags } from '@/type/chat';
import React from 'react'
import { AvatarIcon } from '../avatar';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { FaChevronLeft } from 'react-icons/fa6';

const ChatHeader = ({chat}:{chat:ChatWithMessags}) => {
    const otherusers = useOtherUser(chat.users);
    const router = useRouter();
  return (
    <div className='w-full border-b px-1 py-2 flex items-center justify-between'>
    <div className="left flex items-center gap-2">
      <Button variant={'ghost'} className='px-2' onClick={()=>{router.back()}}>
        <FaChevronLeft/>
      </Button>
    <AvatarIcon url={otherusers[0].image!} fallback={otherusers[0].name!}/>
        <div className="info">
            <p className='font-semibold'>{otherusers[0].name!}</p>
            <p className='text-xs text-muted-foreground leading-none'>active</p>
        </div>
    </div>
    <Button variant={'ghost'}>
    <IoEllipsisHorizontal/>
    </Button>
    </div>
  )
}

export default ChatHeader