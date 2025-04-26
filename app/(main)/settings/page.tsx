"use client";
import { Button } from '@/components/ui/button';
import React from 'react';
import supabase from '@/services/supabaseClient';
import { useRouter } from 'next/navigation';

const Settings: React.FC = () => {
    const router = useRouter();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error logging out:", error);
        } else {
            router.push('/auth'); // Redirect to the login page after logout
        }
    };

    return (
        <div className="flex flex-col items-center mt-10 h-screen">
            <div className="flex flex-col items-center border rounded-2xl p-8">
                <h2 className="text-2xl font-bold">Settings</h2>
                <p className="text-gray-500">Manage your account settings</p>
                <Button className="mt-5 w-full" onClick={handleLogout}>
                    Log Out
                </Button>
            </div>
        </div>
    );
};

export default Settings;