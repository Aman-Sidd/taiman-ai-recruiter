import { Clock, MessageCircleQuestionIcon } from "lucide-react";
import moment from "moment";
import React from "react";

export default function InterviewDetailsContainer({ interviewDetails }: any) {
  // Parse interview_types and join with commas
  const interviewTypes =
    interviewDetails?.interview_types &&
    Array.isArray(JSON.parse(interviewDetails?.interview_types))
      ? JSON.parse(interviewDetails?.interview_types).join(", ")
      : interviewDetails?.interview_types;

  return (
    <div className="p-5 bg-white rounded-lg mt-5">
      <h2>{interviewDetails?.job_position}</h2>

      <div className="flex mt-4 items-center justify-between">
        <div>
          <h2 className="text-sm text-gray-500">Duration</h2>
          <h2 className="flex text-md font-bold items-center gap-2">
            <Clock className="h-4 w-4" /> {interviewDetails?.interview_duration}
          </h2>
        </div>
        <div>
          <h2 className="text-sm text-gray-500">Created at</h2>
          <h2 className="flex text-md font-bold items-center gap-2">
            <Clock className="h-4 w-4" />{" "}
            {moment(interviewDetails?.created_at).format("MMM DD, yyyy")}
          </h2>
        </div>
        <div>
          <h2 className="text-sm text-gray-500">Type</h2>
          <h2 className="flex text-md font-bold items-center gap-2">
            <Clock className="h-4 w-4" /> {interviewTypes}
          </h2>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="font-bold">Job Description</h2>
        <p className="text-sm leading-6">{interviewDetails?.job_description}</p>
      </div>
      <div className="mt-5">
        <h2 className="font-bold mb-2">Interview Questions</h2>
        <div className="grid grid-cols-2 gap-3">
            {interviewDetails?.questions_list && interviewDetails?.questions_list.length > 0 ? (
                interviewDetails?.questions_list.map((question: any, index: number) => (
                        <h2 key={index} className="text-xs">{index+1}. {question?.question}</h2>
                ))):null}
        </div>
      </div>
    </div>
  );
}