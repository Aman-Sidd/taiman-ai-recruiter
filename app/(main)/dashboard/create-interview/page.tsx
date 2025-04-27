"use client";
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import FormContainer from './_components/FormContainer';
import { FormData } from '@/types/form';
import QuestionsList from './_components/QuestionsList';
import { toast } from 'sonner';
import InterviewLink from './_components/InterviewLink';
import { useUserDetail } from '@/app/provider';

export default function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    job_position: '',
    job_description: '',
    interview_duration: '',
    interview_types: []
  });
  const [interview_id, setInterviewId] = useState<string>('');
  const { user } = useUserDetail();

  const onHandleInputChange = (key: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const goToNextStep = () => {
    if (!user || user?.credits <= 0) {
      toast('You have no credits left! Please purchase credits to continue.');
      return;
    }
    if (!formData?.interview_duration || !formData?.interview_types || !formData?.job_description || !formData?.job_position) {
      toast('Make sure to fill in all required fields!');
      return;
    }
    setStep(prev => prev + 1);
  };

  return (
    <div className="mt-10 px-5 sm:px-10 md:px-24 lg:px-44 xl:px-56">
      <div className="flex gap-5 items-center">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2 className="font-bold text-xl sm:text-2xl">Create New Interview</h2>
      </div>
      <Progress value={step * 33.33} className="my-5 transition-all" />

      {step === 1 && (
        <FormContainer
          formData={formData}
          onHandleInputChange={onHandleInputChange}
          goToNextStep={goToNextStep}
        />
      )}

      {step === 2 && (
        <QuestionsList
          formData={formData}
          goToNextStep={goToNextStep}
          setInterviewId={setInterviewId}
        />
      )}

      {step === 3 && interview_id && (
        <InterviewLink
          interview_id={interview_id}
          formData={formData}
        />
      )}
    </div>
  );
}

