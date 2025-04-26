"use client"
import { useUserDetail } from '@/app/provider';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

interface Props {
  // define your props here
}

export default function WelcomeContainer() {
    const {user} = useUserDetail();
  return (
    <div className="bg-gray-100 p-5 m-5 rounded-xl flex justify-between items-center">
        <div>
            <h1 className='text-2xl font-bold'>Welcome back, {user?.name}</h1>
            <p className='text-gray-500'>Here's what's happening with your account today</p>
        </div>
        <div>
            {user && <Image src={user?.picture || ""} alt="user" width={50} height={50} className='rounded-full' />}
        </div>
    </div>
  );
};
