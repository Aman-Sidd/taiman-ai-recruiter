import { Button } from "@/components/ui/button";
import moment from "moment";
import React from "react";
import CandidateFeedbackDetail from "./CandidateFeedbackDialog";

export default function CandidatesList({candidatesList}: any) {

    const calculateAverageRating = (feedback: any) => {
        if (!feedback) return 0;
        const ratings = [
            feedback?.rating?.technicalSkills || 0, feedback?.rating?.communication || 0,
            feedback?.rating?.problemSolving || 0, feedback?.rating?.experience || 0];
        const total = ratings.reduce((acc: number, rating: number) => acc + rating, 0);
        return (total / ratings.length).toFixed(0); // Return average rating with one decimal place
    }

    return (
        <div>
            <h2 className="font-bold my-5">Candidates ({candidatesList?.length})</h2>
            {candidatesList?.length > 0 && (
                candidatesList.map((candidate: any, index: number) => (
                    <div key={index} className="p-5 flex gap-3 justify-between items-center bg-white rounded-lg">
                        <div className="flex items-center gap-5 ">
                        <h2 className="bg-primary p-3 px-4.5 font-bold text-white rounded-full">{candidate.user_name[0]}</h2>
                       <div>
                            <h2 className="font-bold">{candidate?.user_name}</h2>
                            <h2 className="text-sm text-gray-500">Completed on: {moment(candidate?.created_at).format("MMM DD, yyyy")}</h2>
                       </div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <h2 className="text-green-800">{calculateAverageRating(candidate?.feedback)}/10</h2>
                            <CandidateFeedbackDetail candidate={candidate}/>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}