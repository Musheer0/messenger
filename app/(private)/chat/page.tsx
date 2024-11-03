"use client"
import SideBar from '@/components/chat/sidebar'
import usePresence from '@/hooks/user-pusher-presence'
import React from 'react'

const page = () => {
  const {items}= usePresence()
  return (
    <>
    {JSON.stringify(items)}
    </>
  )
}

export default page