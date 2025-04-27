"use client"
import React, { useState } from 'react';
import { InterviewLayoutHeader } from './_components/InterviewLayoutHeader';
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { InterviewInfo} from '@/types/user';

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

