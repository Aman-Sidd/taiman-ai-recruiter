"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, CheckCircle2, AlertCircle, Timer } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import supabase from '@/services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';
import { useInterviewInfo } from '@/app/_hooks/useInterviewInfo';

interface Interviews {
  job_position: string;
  job_description: string;
  interview_types: [string];
  interview_duration: string;
}

export default function JoinInterview() {
  const [fullName, setFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [interviewDetails, setInterviewDetails] = useState<Interviews>({
    job_description: '',
    job_position: '',
    interview_types: [''],
    interview_duration: '',
  });
  const { interviewInfo, setInterviewInfo } = useInterviewInfo();
  const [loading, setLoading] = useState(true);
  const streamRef = useRef<MediaStream | null>(null);
  const { interview_id } = useParams();
  const router = useRouter();

  const getInterviewDetails = async () => {
    try {
      setLoading(true);
      let { data: Interviews, error } = await supabase
        .from('Interviews')
        .select('job_position, job_description, interview_types, interview_duration')
        .eq('interview_id', interview_id);

      if (error || Interviews?.length === 0) throw error;
      if (Interviews && Interviews[0]) setInterviewDetails(Interviews[0]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast('Something went wrong!');
    }
  };

  useEffect(() => {
    interview_id && getInterviewDetails();
  }, [interview_id]);

  const handleTestAudio = async () => {
    setIsTesting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      streamRef.current = stream;

      toast.success('Audio device is working correctly!');
    } catch (err) {
      toast.error('Failed to access audio device');
      console.error('Error accessing audio device:', err);
    } finally {
      setIsTesting(false);
    }
  };

  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setAudioEnabled(audioTrack.enabled);
    }
  };

  const handleJoinInterview = async () => {
    if (!fullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }

    let { data: Interviews, error } = await supabase
      .from('Interviews')
      .select('*')
      .eq('interview_id', interview_id);

    if (error || Interviews?.length === 0) throw error;
    if (Interviews && Interviews[0]) setInterviewInfo(Interviews[0]);
    router.push(
      `/interview/${interview_id}/start?fullName=${encodeURIComponent(fullName)}&userEmail=${encodeURIComponent(userEmail)}`
    );

    toast.success('Joining interview...');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center mt-3 justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
        >
          {/* Title */}
          <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-2">TAiman</h2>

          {/* Logo */}
          <div className="flex justify-center mb-5">
            <Image
              src="/cover-image.jpg"
              alt="Taiman Logo"
              width={200}
              height={100}
              className="rounded-2xl"
              priority
            />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-1">
            {interviewDetails.job_position}
          </h1>
          <div className="flex justify-center items-center gap-1 mb-3">
            <Timer size={18} />
            <h4>{interviewDetails.interview_duration}</h4>
          </div>

          {/* Pre-login Instructions */}
          <div className="mb-5 text-sm text-gray-600 space-y-1 px-1">
            <p className="flex items-start gap-2">
              <span className="font-semibold">Before you login:</span>
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Ensure you have a stable internet connection</li>
              <li>Test your microphone</li>
              <li>Find a quiet place for the interview</li>
            </ul>
          </div>

          {/* Name Input */}
          <div className="mb-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your full name
            </label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your email
            </label>
            <Input
              id="userEmail"
              type="email"
              placeholder="john@gmail.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              onClick={handleTestAudio}
              disabled={isTesting}
              className="w-full"
            >
              {isTesting ? (
                <>
                  <AlertCircle className="w-4 h-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Test Audio
                </>
              )}
            </Button>
            <Button
              onClick={handleJoinInterview}
              disabled={loading || !fullName}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Join Interview
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
