"use client"
import { useUserDetail } from '@/app/provider';
import Image from 'next/image';
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { LogOut, Settings, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import supabase from '@/services/supabaseClient';

export default function WelcomeContainer() {
    const {user} = useUserDetail();
    const router = useRouter();

    const handleSignOut = async () => {
      await supabase.auth.signOut();
      router.push('/auth');
    };

    return (
      <div className="bg-gray-100 p-5 m-5 rounded-xl flex justify-between items-center">
          <div>
              <h1 className='text-2xl font-bold'>Welcome back, {user?.name}</h1>
              <p className='text-gray-500'>Here's what's happening with your account today</p>
          </div>
          <Menu as="div" className="relative">
            <Menu.Button className="flex">
              {user && (
                <Image 
                  src={user?.picture || ""} 
                  alt="user" 
                  width={50} 
                  height={50} 
                  className='rounded-full hover:ring-2 hover:ring-blue-500 transition-all' 
                />
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => router.push('/profile')}
                        className={`${
                          active ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => router.push('/settings')}
                        className={`${
                          active ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleSignOut}
                        className={`${
                          active ? 'bg-red-50 text-red-600' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
      </div>
    );
};
