export interface UserMetadata {
    name?: string;
    picture?: string;
}

export interface SupabaseUser {
    email?: string;
    user_metadata?: UserMetadata;
}

export interface UserDetail {
    id: string;
    created_at: string;
    email: string;
    name: string | null;
    picture: string | null;
    credits: number;
}

export interface UserContextType {
    user: UserDetail | null;
    setUser: React.Dispatch<React.SetStateAction<UserDetail | null>>;
} 
export interface QuestionType{
    question: string;
    type: string;
}
export interface InterviewInfo{
  job_position: string;
  job_description: string;
  interview_types: [string];
  interview_duration: string;
  questions_list:[QuestionType];
}
export interface InterviewInfoContextType{
    interviewInfo: InterviewInfo|null;
    setInterviewInfo: React.Dispatch<React.SetStateAction<InterviewInfo | null>>;
}