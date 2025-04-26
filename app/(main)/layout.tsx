import React from 'react';
import DashboardProvider from './provider';

interface Props {
  // define your props here
}

export default function Layout({children}:{children: React.ReactNode}) {
  return (
    <div>
    <DashboardProvider>
      {children}
    </DashboardProvider>
    </div>
  );
};
