import {  InterviewInfoContextType } from "@/types/user";
import { createContext } from "react";

export const InterviewDataContext = createContext<InterviewInfoContextType>({
    interviewInfo:null,
    setInterviewInfo: ()=>{}
});