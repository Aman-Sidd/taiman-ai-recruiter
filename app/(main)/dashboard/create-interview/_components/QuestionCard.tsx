import { motion } from 'framer-motion';

interface Question {
  question: string;
  type: string;
}

interface QuestionCardProps {
  question: Question;
  index: number;
}

const questionTypes = {
  Technical: 'bg-blue-100 text-blue-800',
  Behavioral: 'bg-green-100 text-green-800',
  Experience: 'bg-purple-100 text-purple-800',
  'Problem Solving': 'bg-orange-100 text-orange-800',
  Leadership: 'bg-red-100 text-red-800'
};

export function QuestionCard({ question, index }: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-6 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-50 rounded-full">
          <span className="text-blue-600 font-medium">{index + 1}</span>
        </div>
        <div className="flex-grow">
          <p className="text-lg font-medium text-gray-800 mb-2">{question.question}</p>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${questionTypes[question.type as keyof typeof questionTypes] || 'bg-gray-100 text-gray-800'}`}>
            {question.type}
          </span>
        </div>
      </div>
    </motion.div>
  );
} 