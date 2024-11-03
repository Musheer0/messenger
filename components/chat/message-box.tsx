"use client"
import { useUser } from '@/hooks/use-user'
import { cn } from '@/lib/utils'
import { FullMessage } from '@/type/chat'
import React, { ForwardedRef } from 'react'
import { AvatarIcon } from '../avatar'
import { format } from 'date-fns'

const MessageBox = ({message, ref}:{message:FullMessage,ref?:ForwardedRef<HTMLDivElement>}) => {
  const session = useUser();
  const isSendByUser = session.user?.email===message.sender.email 
  return (
    <div
    ref={ref}
    className={cn(isSendByUser&& ' ml-auto flex-row-reverse', 'flex items-start gap-1 justify-start')}
    >
     <AvatarIcon url={message.sender.image!} fallback={message.sender.name!}/>
     <div className={cn("info flex flex-col ", isSendByUser? 'items-end': 'items-start')}>
        <div className={cn(
            'header flex items-center justify-center gap-2'  ,
        )}>
            <p className='text-xs font-semibold'>{message.sender.name}</p>
            <p className='text-xs text-muted-foreground'>{format(new Date(message.createdAt),'p')}</p>
        </div>
        <p className={cn(
            'p-2 whitespace-break-spaces bg-primary rounded-md ',
            isSendByUser? 'bg-primary text-background': 'bg-muted-foreground/15'
        )}>{message.body}</p>
     </div>
    </div>
  )
}

export default MessageBox