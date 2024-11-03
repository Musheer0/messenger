"use client"
import UserActiveChannel from '@/hooks/use-active-channel'

const ActiveStatus = () => {
  UserActiveChannel();
  return <p>acti</p>
}

export default ActiveStatus