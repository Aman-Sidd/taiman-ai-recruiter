import { InterviewDataContext } from "@/context/InterviewDataContext";
import { InterviewInfoContextType } from "@/types/user";
import { useContext } from "react";

export function useInterviewInfo(): InterviewInfoContextType {
    const context = useContext(InterviewDataContext) as InterviewInfoContextType;
    if (!context) {
        throw new Error('useInterviewInfo must be used within a interviewInfoProvider');
    }
    return context;
  }
  