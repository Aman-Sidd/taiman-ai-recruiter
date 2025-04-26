import { Dispatch, SetStateAction, useState } from 'react';
import { FormData } from '@/types/form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import supabase from '@/services/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { useUserDetail } from '@/app/provider';

interface Question {
  question: string;
  type: string;
}

export function useInterview(formData: FormData, userEmail: string | undefined, goToNextStep:()=>void, setInterviewId:Dispatch<SetStateAction<string>>) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);
  const {user} = useUserDetail();

  const generateQuestions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai-model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }

      const data = await response.json();
      setQuestions(data.questions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const saveInterview = async () => {
    setSaving(true);
    try {
      const interview_id = uuidv4();
      console.log('Generated interview_id:', interview_id);
      
      const { data, error } = await supabase
        .from('Interviews')
        .insert([
          {
            ...formData,
            questions_list: questions,
            userEmail,
            interview_id
          }
        ])
        .select();

      if (error) throw error;

      const userUpdate = await supabase
        .from('Users')
        .update({credits: Number(user?.credits) - 1})
        .eq('email', user?.email)
        .select();
      if (userUpdate.error) throw userUpdate.error;
      console.log("User credits updated:", userUpdate.data);
      console.log('Setting interview_id in parent:', interview_id);
      setInterviewId(interview_id);
      
      toast.success('Interview created successfully!');
      goToNextStep();
    } catch (err) {
      toast.error('Failed to save interview');
      console.error('Error saving interview:', err);
    } finally {
      setSaving(false);
    }
  };

  return {
    loading,
    saving,
    questions,
    error,
    generateQuestions,
    saveInterview
  };
} 