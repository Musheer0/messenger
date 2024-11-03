// layout.tsx
import SideBar from '@/components/chat/sidebar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return(
    <div className='flex h-full  flex-1 w-full'>
        <SideBar/>
   {children }
    </div>
  );
};

export default Layout;
