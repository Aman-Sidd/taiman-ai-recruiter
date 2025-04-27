"use client";
import { useUserDetail } from "@/app/provider";
import supabase from "@/services/supabaseClient";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import InterviewDetailsContainer from "../_components/InterviewDetailsContainer";
import CandidatesList from "../_components/CandidatesList";

export default function CandidateFeedbackDetail() {
  const { interview_id } = useParams();
  const { user } = useUserDetail();
  const [interviewDetails, setInterviewDetails] = React.useState<any>(null);

  useEffect(() => {
    user && getInterviewDetails();
  }, [user]);

  const getInterviewDetails = async () => {
    const { data, error } = await supabase
      .from("Interviews")
      .select(
        "job_position,questions_list,interview_types,created_at,job_description, interview_duration, interview_feedback(user_email, user_name, feedback, created_at)"
      )
      .eq("userEmail", user?.email)
      .eq("interview_id", interview_id);

    if (error) {
      console.error("Error fetching interviews:", error);
      return;
    }
    console.log("Interviews from detail page:", data);
    setInterviewDetails(data[0]);
  };

  return (
    <div className="p-5 max-w-5xl mx-auto">
      {/* Page Title */}
      <h2 className="my-3 text-2xl font-bold text-center sm:text-left">
        Interview Details
      </h2>

      {/* Interview Details Container */}
      <InterviewDetailsContainer interviewDetails={interviewDetails} />

      {/* Candidates List */}
      <CandidatesList candidatesList={interviewDetails?.["interview_feedback"]} />
    </div>
  );
}