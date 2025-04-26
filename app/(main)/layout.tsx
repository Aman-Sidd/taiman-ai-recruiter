"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/services/supabaseClient';
import DashboardProvider from './provider';
import { Spinner } from '@/components/ui/spinner';

interface Props {
  // define your props here
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth'); // Redirect to the auth page if not authenticated
      } else {
        setIsAuthenticated(true); // User is authenticated
      }
    };

    checkAuth();
  }, [router]);

  // Show a loading state while checking authentication
  if (isAuthenticated === null) {
    return <div className="flex justify-center items-center h-screen"><Spinner className="w-8 h-8 text-blue-500 animate-spin"/></div>;
  }

  return (
    <div>
      <DashboardProvider>
        {children}
      </DashboardProvider>
    </div>
  );
}
