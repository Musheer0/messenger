// layout.tsx
import DesktopNavigation from '@/components/chat/desktop-navigation';
import MobileNavigation from '@/components/chat/mobile-navigation';
import InitializeUser from '@/components/providers/initialize-user';
import ReactQueryProvider from '@/components/providers/react-query-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import {Toaster}from 'sonner'
import React from 'react';
import ActiveStatus from '@/components/active-status';
const Layout = ({ children }: { children: React.ReactNode }) => {
  return(
    <ThemeProvider>
    <div className='flex flex-col h-screen w-full' suppressHydrationWarning>
      <InitializeUser>
        <ReactQueryProvider>
          <Toaster/>
          <ActiveStatus/>
         <div className='w-full flex-1 flex items-center'>
     <DesktopNavigation/>
   {children }
  </div>
  <MobileNavigation/>
  </ReactQueryProvider>
  </InitializeUser>
    </div>
  </ThemeProvider>  
  );
};

export default Layout;
