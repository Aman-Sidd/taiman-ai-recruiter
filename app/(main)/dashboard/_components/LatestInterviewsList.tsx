"use client";
import { useUserDetail } from '@/app/provider';
import { Button } from '@/components/ui/button';
import supabase from '@/services/supabaseClient';
import { PlusCircle, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { InterviewCard } from './InterviewCard';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

interface Props {
  // define your props here
}

export default function LatestInterviewsList() {
    const [interviews, setInterviews] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Add loading state
    const { user } = useUserDetail();
    const router = useRouter();

    const fetchInterviews = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
            let { data: Interviews, error } = await supabase
                .from('Interviews')
                .select('*')
                .eq('userEmail', user?.email)
                .order('id', { ascending: false })
                .limit(6);
            console.log("Interviews:", Interviews);
            if (error) {
                console.error("Error fetching interviews:", error);
                return;
            }
            if (Interviews) {
                setInterviews(Interviews);
            }
        } catch (error) {
            console.error("Error fetching interviews:", error);
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    useEffect(() => {
        user && fetchInterviews();
    }, [user]);

    return (
        <div className='my-5'>
            <h2 className='text-2xl font-bold'>Previously Scheduled Interviews</h2>
            {loading ? (
                <div className='flex justify-center items-center p-5'>
                    <Spinner className="w-8 h-8 text-blue-500 animate-spin" /> {/* Display spinner while loading */}
                </div>
            ) : interviews.length === 0 ? (
                <div className='p-5 flex flex-col gap-3 items-center justify-center'>
                    <Video className="w-16 h-16 p-3 rounded-lg bg-blue-50 text-blue-500" />
                    <p className='text-gray-500'>No interviews scheduled yet</p>
                    <Button onClick={() => router.push('dashboard/create-interview')} className='cursor-pointer'>
                        <PlusCircle className='w-4 h-4 mr-2' />
                        Schedule Interview
                    </Button>
                </div>
            ) : (
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 mt-4'>
                    {interviews.map((interview, index) => (
                        <InterviewCard interview={interview} key={index} viewDetail={false}/>
                    ))}
                </div>
            )}
        </div>
    );
};
