"use client"
import React, { useContext, useState } from 'react';
import { InterviewLayoutHeader } from './_components/InterviewLayoutHeader';
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { InterviewInfo, InterviewInfoContextType } from '@/types/user';

export default function InterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [interviewInfo, setInterviewInfo] = useState<InterviewInfo | null>(null);
  return (
    <InterviewDataContext.Provider value={{interviewInfo, setInterviewInfo}}>
    <div className="min-h-screen bg-gray-50">
      <InterviewLayoutHeader />
      <main>{children}</main>
    </div>
    </InterviewDataContext.Provider>
  );
}

export function useInterviewInfo(): InterviewInfoContextType {
  const context = useContext(InterviewDataContext) as InterviewInfoContextType;
  if (!context) {
      throw new Error('useInterviewInfo must be used within a interviewInfoProvider');
  }
  return context;
}
