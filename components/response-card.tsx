import { cn } from '@/lib/utils'
import React from 'react'
import { CiWarning } from "react-icons/ci";
import { FaRegCircleCheck } from "react-icons/fa6";
export enum ResponseType{
    error ="error",
    success= "success",
    warning="warning",
    normal="normal"
}
interface ResponseCardProps{
    type :ResponseType,
    message:string,
    className?:string,
    description?:string
}
const ResponseCard:React.FC<ResponseCardProps> = ({type, message, className, description}) => {
  if(message)
    return (
    <>
    {type===ResponseType.error && 
    <>
    <div className={cn(className, 'w-full py-2   flex flex-col text-red-500')}>
        <p className='font-semibold text-red-500 flex items-center gap-1'> <CiWarning />{message}</p>
        <p className='text-xs text-red-500/80'>{description}</p>
    </div>
    </>
    }
    {type===ResponseType.success && 
    <>
    <div className={cn(className, 'w-full py-2   flex flex-col text-green-500')}>
        <p className='font-semibold text-green-500 flex items-center gap-1'> <FaRegCircleCheck />{message}</p>
        <p className='text-xs text-green-500/80'>{description}</p>
    </div>
    </>
    }
    </>
  )
  else
  return null
}

export default ResponseCard