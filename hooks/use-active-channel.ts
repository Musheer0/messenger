import React, { useEffect, useState } from 'react';
import usePresence from './user-pusher-presence';
import { Channel, Members } from 'pusher-js';
import { pusherClient } from '@/lib/pusher/pusher';

const UserActiveChannel = () => {
  const { setItems, addItem, removeItem, items } = usePresence();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    const channel = pusherClient.subscribe('presence-messenger');
    setActiveChannel(channel);
    channel.bind('pusher:subscription_succeeded', (members: Members) => {
      const initialMembers: string[] = [];
      members.each((member: Record<string, any>) => initialMembers.push(member.id));
      setItems(initialMembers);
      console.log('Members after subscription:', initialMembers);
    });

    channel.bind('pusher:member_added', (member: Record<string, any>) => {
      addItem(member.id);
      console.log('Member added:', member.id);
      console.log('Current items:', items);
    });
pusherClient.connection.bind('error', (err:any) => {
    console.error('Pusher connection error:', err);
  });
    channel.bind('pusher:member_removed', (member: Record<string, any>) => {
      removeItem(member.id);
      console.log('Member removed:', member.id);
      console.log('Current items after removal:', items);
    });

    return () => {
      pusherClient.unsubscribe('presence-messenger');
      setActiveChannel(null);
      console.log('Unsubscribed from presence-messenger');
    };
  }, [setItems, addItem, removeItem]); // Removed activeChannel from dependencies

  return null; // Or return your JSX here
};

export default UserActiveChannel;
