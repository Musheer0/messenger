import { cn } from '@/lib/utils';
import React from 'react'
import { FiLoader } from "react-icons/fi";
const Spinner = ({className}:{className?:string}) => {
  return (
      <FiLoader className={cn('animate-spin', className)}/>
  )
}

export default Spinner