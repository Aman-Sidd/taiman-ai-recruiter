"use client";
import { useUserDetail } from "@/app/provider";
import { Button } from "@/components/ui/button";
import supabase from "@/services/supabaseClient";
import React, { useEffect } from "react";
import { InterviewCard } from "../dashboard/_components/InterviewCard";

export default function ScheduledInterviews() {
    const {user} = useUserDetail(); 
    const [interviews, setInterviews] = React.useState<any[]>([]);
    const getInterviewsList = async()=>{
        const {data, error} = await supabase.from('Interviews')
        .select('job_position,interview_types,interview_id,job_description, interview_duration, interview_feedback(user_email)')
        .eq('userEmail', user?.email)
        .order('id', { ascending: false })
        
        if(error) {
            console.error("Error fetching interviews:", error);
            return;
        }
        console.log("Interviews:",data)
        setInterviews(data);
    }
    useEffect(()=>{
        user && getInterviewsList();
    },[user])
  return (
    <div className="p-5">
      <h2 className="my-3 text-2xl font-bold">Interview List with Candidates Feedback</h2>
      {interviews.length === 0 && (
        <div className="p-5 flex flex-col gap-3 items-center justify-center">
          <p className="text-gray-500">No interviews scheduled yet</p>
        </div>
      )}
      {interviews.length > 0 && (
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
            {interviews.map((interview, index) => (
              <InterviewCard interview={interview} key={index} viewDetail={true} />
            ))}
          </div>
          {/* Pagination Controls */}
          {/* <div className="flex justify-center items-center gap-3 mt-5">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div> */}
        </div>
      )}
    </div>

  );
}