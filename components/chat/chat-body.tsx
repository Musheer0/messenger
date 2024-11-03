"use client"
import { FullMessage, FullMessagePage } from '@/type/chat';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Spinner from '../spinner';
import MessageBox from './message-box';
import { Button } from '../ui/button';
import { pusherClient } from '@/lib/pusher/pusher';
import { find } from 'lodash';

const ChatBody = ({id}:{id:string}) => {
  const bottomRef = useRef<HTMLDivElement|null>(null);
  const [messages, setMessages] = useState<FullMessage[]>([])
  const query = useInfiniteQuery<FullMessagePage>({
    queryKey: ['msg-'+id],
    queryFn: async({pageParam})=> ((await axios.get('/api/conversation/get-messages/'+id+`${pageParam? '?cursor='+pageParam: ''}`)).data),
    initialPageParam: null as string|null,
    getNextPageParam:(lastpage)=>lastpage.nextCursor
  });
  const fectNextPage = ()=>{
    if(query.hasNextPage){
      query.fetchNextPage()
    }
  };
  bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  useEffect(()=>{
    const temp =  query.data?.pages.flatMap((page)=>page.message)||[]
    setMessages(temp)
  },[query.data?.pages])
  useEffect(()=>{
    pusherClient.subscribe(id);
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    pusherClient.bind('message:new',async(data:FullMessage)=>{
      const temp = messages;
      if(find(temp, {id: data.id})){
      }
      else{
        setMessages((prev)=>[...prev,data])
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
      }
     });
    return()=>{
      pusherClient.unsubscribe(id);
      pusherClient.unbind('message:new');
    }
  },[id])

  return (
    <div className='flex-1 w-full h-full overflow-auto flex flex-col gap-2 p-2'>
      <Button onClick={fectNextPage}>Loadmore</Button>
     {messages?.map((message, i)=>{
      return <MessageBox key={message.id } message={message}/>

     })}
      {query.isFetching&& <Spinner/>}
      {messages.length>0 && <div className='w-5 h-5 bg-red-400 mb-10 opacity-0' ref={bottomRef}>q</div>}
    </div>
  )
}

export default ChatBody