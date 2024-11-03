"use client"
import React, { useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FaPaperPlane } from 'react-icons/fa6'
import { IoImages } from 'react-icons/io5'
import axios from 'axios'
import Spinner from '../spinner'
const SendMessage = ({id}:{id:string}) => {
  const inputRef = useRef<HTMLInputElement|null>(null);
  const [isLoading, setIsloading] = useState(false)
  const handlesubmit = async()=>{
    if(inputRef.current){
      if(inputRef.current.value.length>0){
        setIsloading(true)
        const response = await axios.post('/api/conversation/send-message',{
          message:inputRef.current.value,
          id:id
        });
        setIsloading(false);
        inputRef.current.value =''
        console.log(response)
      }
    }
  }
  return (
    <div className='flex items-center p-1 justify-between gap-2'>
      <form  onSubmit={async(e)=>{
        e.preventDefault()
        await handlesubmit()
      }} className='flex-1 flex items-center gap-1'>
      <Input className='flex-1 rounded-sm' placeholder='enter message' ref={inputRef}/>
      <Button disabled={isLoading} variant={'outline'}>
        {isLoading ? <Spinner/> :<FaPaperPlane/>}
      </Button>
      </form>
    </div>
  )
}

export default SendMessage