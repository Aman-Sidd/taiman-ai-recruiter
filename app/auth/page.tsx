"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import supabase from '@/services/supabaseClient';
import { useRouter } from 'next/navigation';

interface Props {
  // define your props here
}

const Login: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard'); // Redirect to dashboard if already logged in
      } else {
        setLoading(false); // Stop loading if no session is found
      }
    };

    checkSession();
  }, [router]);

  const signInWithGoogle = async () => {
    setLoading(true); // Start loading during sign-in
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`, // Redirect to /dashboard after sign-in
      },
    });
    if (error) {
      console.log(error);
      setLoading(false); // Stop loading if there's an error
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center border rounded-2xl p-8'>
        <div>
          <Image src={"/full_logo_png.png"} alt="logo" width={400} height={100} className='w-[180px]' />
        </div>
        <div>
          <Image src={"/cover-image.jpg"} alt="logo" width={600} height={400} className='w-[400px] h-[250px] rounded-2xl' />
          <h2 className='text-2xl font-bold text-center'>Welcome to TAiman</h2>
          <p className='text-gray-500 text-center'>Sign In with Google Authentication</p>
          <Button className='mt-7 w-full' onClick={signInWithGoogle}>Sign In with Google</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;