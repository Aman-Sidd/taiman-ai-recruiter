import { FormData } from '@/types/form';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Copy, Share2, MessageCircle, Slack, Mail, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Props {
  interview_id: string;
  formData: FormData;
}

const shareOptions = [
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    color: 'bg-green-500 hover:bg-green-600',
    shareUrl: (url: string) => `https://wa.me/?text=${encodeURIComponent(`Join my interview: ${url}`)}`
  },
  {
    name: 'Slack',
    icon: Slack,
    color: 'bg-purple-500 hover:bg-purple-600',
    shareUrl: (url: string) => `https://slack.com/intl/en-in/help/articles/206870177-Share-links-and-files-in-Slack`
  },
  {
    name: 'Email',
    icon: Mail,
    color: 'bg-blue-500 hover:bg-blue-600',
    shareUrl: (url: string) => `mailto:?subject=Interview Invitation&body=${encodeURIComponent(`Join my interview: ${url}`)}`
  }
];

export default function InterviewLink({ interview_id, formData }: Props) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const interviewUrl = `${process.env.NEXT_PUBLIC_APP_URL}/interview/${interview_id}`; // Placeholder URL

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(interviewUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-lg shadow-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle2 className="w-6 h-6 text-green-500" />
        <h2 className="text-2xl font-semibold text-gray-800">Interview Created Successfully!</h2>
      </div>

      <div className="space-y-6">
        {/* Interview Link Section */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Interview Link</p>
          <div className="flex items-center gap-2">
            <div className="flex-grow p-3 bg-white border rounded-md font-mono text-sm">
              {interviewUrl}
            </div>
            <Button
              onClick={handleCopy}
              variant="outline"
              className="flex items-center gap-2"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Share Options */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Share2 className="w-5 h-5 text-gray-600" />
            <p className="text-sm text-gray-600">Share via</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {shareOptions.map((option) => (
              <Button
                key={option.name}
                onClick={() => handleShare(option.shareUrl(interviewUrl))}
                className={`${option.color} text-white flex items-center gap-2`}
              >
                <option.icon className="w-4 h-4" />
                {option.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Interview Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Job Position</p>
            <p className="text-lg font-medium">{formData.job_position}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Interview Duration</p>
            <p className="text-lg font-medium">{formData.interview_duration}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg md:col-span-2">
            <p className="text-sm text-gray-600 mb-2">Interview Types</p>
            <div className="flex flex-wrap gap-2">
              {formData.interview_types.map((type, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <Button
            onClick={() => router.push('/dashboard/create-interview')}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
          >
            <Plus className="w-4 h-4" />
            Create New Interview
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
