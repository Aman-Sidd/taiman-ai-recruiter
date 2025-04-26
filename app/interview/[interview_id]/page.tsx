"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, Video, VideoOff, CheckCircle2, AlertCircle, Loader2, Timer, Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import supabase from '@/services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';
import { useInterviewInfo } from '../layout';

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
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [interviewDetails, setInterviewDetails] = useState<Interviews>({
    job_description:'',
    job_position:'',
    interview_types:[''],
    interview_duration:''
  });
  const {interviewInfo, setInterviewInfo} = useInterviewInfo();
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const {interview_id} = useParams();
  const router = useRouter();
  console.log('interview_id:', interview_id);
  const getInterviewDetails = async ()=>{
    try{
      setLoading(true);
      let { data: Interviews, error } = await supabase
      .from('Interviews')
      .select('job_position, job_description, interview_types, interview_duration')
      .eq('interview_id', interview_id);
      
      console.log("INTERVIEW details:", Interviews)
      if(error || Interviews?.length===0) throw error;
      if(Interviews && Interviews[0])
      setInterviewDetails(Interviews[0]);
    setLoading(false);
    }
    catch(err){
      console.log(err);
      toast('Something went wrong!')
    }
  }


  useEffect(()=>{
    interview_id && getInterviewDetails();
  }, [interview_id])

  const handleTestDevices = async () => {
    setIsTesting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      toast.success('Audio and video devices working correctly!');
    } catch (err) {
      toast.error('Failed to access audio/video devices');
      console.error('Error accessing media devices:', err);
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

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setVideoEnabled(videoTrack.enabled);
    }
  };

  const handleJoinInterview = async () => {
    if (!fullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    // TODO: Implement join interview logic
    let { data: Interviews, error } = await supabase
    .from('Interviews')
    .select('*')
    .eq('interview_id', interview_id);
    
    console.log("INTERVIEW details:", Interviews)
    if(error || Interviews?.length===0) throw error;
    if(Interviews && Interviews[0])
    setInterviewInfo(Interviews[0]);
    router.push(
      `/interview/${interview_id}/start?fullName=${encodeURIComponent(fullName)}&userEmail=${encodeURIComponent(userEmail)}`
    );
    
    toast.success('Joining interview...');
  };

  return  (
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
          <div className='flex justify-center items-center gap-1 mb-3'>
          <Timer size={18}/>
          <h4>{interviewDetails.interview_duration}</h4>
          </div>

          {/* Pre-login Instructions */}
          <div className="mb-5 text-sm text-gray-600 space-y-1 px-1">
            <p className="flex items-start gap-2">
              <span className="font-semibold">Before you login:</span>
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Ensure you have a stable internet connection</li>
              <li>Test your camera and microphone</li>
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

          {/* Video Preview */}
          <div className="mb-6 flex justify-center">
            <div className="relative aspect-video h-[150px] bg-gray-100 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <Button
                  size="icon"
                  variant={audioEnabled ? "default" : "destructive"}
                  onClick={toggleAudio}
                  className="rounded-full"
                >
                  {audioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </Button>
                <Button
                  size="icon"
                  variant={videoEnabled ? "default" : "destructive"}
                  onClick={toggleVideo}
                  className="rounded-full"
                >
                  {videoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              onClick={handleTestDevices}
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
                  Test Audio & Video
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
