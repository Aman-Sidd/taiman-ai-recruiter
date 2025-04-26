import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';
import { AppSidebar } from '../_components/AppSidebar';
import WelcomeContainer from './_components/WelcomeContainer';
import CreateOptions from './_components/CreateOptions';
import LatestInterviewsList from './_components/LatestInterviewsList';
interface Props {
  // define your props here
}

export default function DashboardPage() {
  return (
    <div className='p-5'>
      <h2 className='my-3 text-2xl font-bold'>Dashboard</h2>
      <CreateOptions />
      <LatestInterviewsList />
    </div>
  );
};
