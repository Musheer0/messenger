"use client"
import React, { PropsWithChildren, useState } from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
interface ReactQueyProviderProp extends PropsWithChildren{

}
const ReactQueryProvider:React.FC<ReactQueyProviderProp> = ({children}) => {
    const [client] = useState(new QueryClient())
  return (
    <QueryClientProvider client={client} >
        {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider