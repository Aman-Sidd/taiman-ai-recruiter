import { FormData } from '@/types/form';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useUserDetail } from '@/app/provider';
import { QuestionCard } from './QuestionCard';
import { LoadingState } from './LoadingState';
import { useInterview } from '../_hooks/useInterview';

interface Props {
  formData: FormData;
  goToNextStep: ()=>void;
  setInterviewId: Dispatch<SetStateAction<string>>;
}

export default function QuestionsList({ formData, goToNextStep, setInterviewId }: Props) {
  const { user } = useUserDetail();
  const {
    loading,
    saving,
    questions,
    error,
    generateQuestions,
    saveInterview
  } = useInterview(formData, user?.email, goToNextStep, setInterviewId);

  useEffect(() => {
    generateQuestions();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Generated Questions</h2>
        {loading && <LoadingState message="Generating questions..." />}
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-4 mb-6 bg-red-50 border border-red-200 rounded-lg"
          >
            <span className="text-red-700">{error}</span>
          </motion.div>
        )}

        {questions.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {questions.map((question, index) => (
              <QuestionCard
                key={index}
                question={question}
                index={index}
              />
            ))}
          </motion.div>
        )}

        {!loading && !error && questions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500">No questions generated yet.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end mt-6">
        <Button
          onClick={saveInterview}
          disabled={saving || loading}
          className="cursor-pointer min-w-[120px]"
        >
          {saving ? (
            <LoadingState message="Saving..." />
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Finish
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
