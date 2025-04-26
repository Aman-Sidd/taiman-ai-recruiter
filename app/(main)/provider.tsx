import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';
import { AppSidebar } from './_components/AppSidebar';
import WelcomeContainer from './dashboard/_components/WelcomeContainer';

interface Props {
  // define your props here
}

export default function DashboardProvider ({children}:{children: React.ReactNode}){
  return (
    <SidebarProvider>
    <AppSidebar />  
    <div className="w-full">
      <SidebarTrigger />
      <WelcomeContainer />
      {children}
    </div>
  </SidebarProvider>
  );
};
