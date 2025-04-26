"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import supabase from '@/services/supabaseClient';

interface Props {
  // define your props here
}

const Login: React.FC<Props> = ({}) => {
    const signInWithGoogle = async () => {

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
        if (error) {
            console.log(error)
        } else {
            console.log(data)
        }
    }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
    <div className='flex flex-col items-center border rounded-2xl p-8'>
      <div>
        <Image src={"/full_logo_png.png"} alt="logo" width={400} height={100} className='w-[180px]'/>
      </div>
      <div>
        <Image src={"/cover-image.jpg"} alt="logo" width={600} height={400} className='w-[400px] h-[250px] rounded-2xl'/>
        <h2 className='text-2xl font-bold text-center'>Welcome to TAiman</h2>
        <p className='text-gray-500 text-center'>Sign In with Google Authentication</p>
        <Button className='mt-7 w-full' onClick={signInWithGoogle}>Sign In with Google</Button>
      </div>
    </div>
    </div>
  );
};

export default Login;