import { useOtherUser } from '@/hooks/use-other-user'
import { ConversationType } from '@/type/user'
import React from 'react'
import { AvatarIcon } from '../avatar'
import {format} from 'date-fns'
import { useParams, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useUser } from '@/hooks/use-user'
const ChatCard = ({convo}:{convo:ConversationType}) => {
    //@ts-ignore
     const otheruser = useOtherUser(convo.users );
     const params = useParams();
     const {user} = useUser()
     const pathname = usePathname().split('/')[2]
     const isActive =pathname ?  pathname === convo.id: false;
     const message = convo.messages ? convo?.messages[0] : null
     const isSeen = message ? message.seenByIds.includes(user?.id!) : false
  return (
   <Link
   onClick={()=>{
    message?.seenByIds.push(user?.id!)
   }}
   className='w-full ' href={'/chat/'+convo.id}>
    <div className={cn(
        'w-full hover:bg-muted-foreground/10 relative  cursor-pointer border-b py-2 px-1 h-fit  flex items-start gap-1',
        isActive && 'bg-muted-foreground/15'
    )}>
      {!isSeen &&           <div className='w-2 h-2 absolute right-1 top-2/3  -translate-y-1/2 bg-primary rounded-full'/>
      }
      <AvatarIcon url={otheruser[0].image!} fallback={otheruser[0].name!} />
      <div className="info flex flex-col ">
        <p className='text-[14px]'>{otheruser[0].name}</p>
        <p className={cn(
          'text-xs text-muted-foreground  w-full line-clamp-1',
          !isSeen && 'font-bold text-foreground relative '
        )}>
          {message?.body || 'start conversation'}
        </p>
      </div>
      <p className='text-xs text-muted-foreground p-1 rounded-md whitespace-nowrap ml-auto'>{format(new Date(convo.lastMessageAt), 'p')}</p>
    </div>
   </Link>
  )
}

export default ChatCard