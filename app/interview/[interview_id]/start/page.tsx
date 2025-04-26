"use client";
import React, { useEffect, useState } from "react";
import { useInterviewInfo } from "../../layout";
import { Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import { useUserDetail } from "@/app/provider";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import supabase from "@/services/supabaseClient";

interface Props {
  interview_id: string;
}

export default function Start() {
  const searchParams = useSearchParams();
  const { interview_id } = useParams(); // Extract interview_id from the URL
  
  const fullName = searchParams.get("fullName");  
  const userEmail = searchParams.get("userEmail");
  const { interviewInfo } = useInterviewInfo();
  const { user } = useUserDetail();
  const [activeUser, setActiveUser] = useState<boolean>(false);
  const [conversation, setConversation] = useState<any[]>([]); // Initialize as an array
  const vapi = new Vapi(
    process.env.NEXT_PUBLIC_VAPI_API_KEY
      ? process.env.NEXT_PUBLIC_VAPI_API_KEY
      : ""
  );
  const router = useRouter();

  console.log("interviewInfo in start page:", interviewInfo);

  useEffect(() => {
    try {
      if (interviewInfo) {
        startCall();
      }
    } catch (error) {
      console.error("Error starting the call:", error);
      toast.error("Failed to start the call. Please try again.");
    }
  }, [interviewInfo]);

  const startCall = () => {
    try {
      let questionsList: string = "";
      interviewInfo?.questions_list.map(
        (item, index) => (questionsList = item.question + "," + questionsList)
      );
      console.log("questionsList:", questionsList);

      const assistantOptions = {
        name: "AI Recruiter",
        firstMessage: `Hi ${fullName}, how are you? Ready for your interview on ${interviewInfo?.job_position}?`,
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US",
        },
        voice: {
          provider: "playht",
          voiceId: "jennifer",
        },
        model: {
          provider: "openai",
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `
  You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ${interviewInfo?.job_position} interview. Let’s get started with a few questions!"
Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
Questions: ${questionsList}
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That’s a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
✅ Be friendly, engaging, and witty 🎤
✅ Keep responses short and natural, like a real conversation
✅ Adapt based on the candidate’s confidence level
✅ Ensure the interview remains focused on React
`.trim(),
            },
          ],
        },
      };
      vapi.start(assistantOptions);
    } catch (error) {
      console.error("Error starting the assistant:", error);
      toast.error("Failed to start the assistant. Please try again.");
    }
  };

  useEffect(() => {
    const handleMessage = (message: any) => {
      try {
        console.log("MESSAGE:", message);
        if (message?.conversation) {
          setConversation((prev) => [...prev, message.conversation]); // Append new messages to the conversation array
        }
      } catch (error) {
        console.error("Error handling message:", error);
        toast.error("Failed to process the message.");
      }
    };

    vapi.on("message", handleMessage);

    vapi.on("call-start", () => {
      console.log("Call has started.");
      toast("Call Connected...");
    });

    vapi.on("speech-start", () => {
      console.log("Assistance speech has started.");
      setActiveUser(false);
    });

    vapi.on("speech-end", () => {
      console.log("Assistance speech has ended.");
      setActiveUser(true);
    });

    vapi.on("call-end", () => {
      console.log("Call has ended.");
      toast("Interview has been ended.");
      generateFeedback();
    });

    return () => {
      vapi.off("message", handleMessage);
      vapi.off("call-start", () => {
        console.log("END");
      });
      vapi.off("call-end", () => {
        console.log("END");
      });
      vapi.off("speech-start", () => {
        console.log("END");
      });
      vapi.off("speech-end", () => {
        console.log("END");
      });
    };
  }, []);

  const generateFeedback = async () => {
    try {
      if (!conversation || conversation.length === 0) {
        throw new Error("No conversation data available");
      }

      const response = await fetch("/api/ai-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ conversation }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate feedback");
      }

      const { feedback } = await response.json();
      console.log("Feedback:", feedback);

      const FINAL_FEEDBACK = feedback.feedback ?? feedback.rawFeedback;
      console.log("FINAL FEEDBACK:", FINAL_FEEDBACK);
      toast.success("Feedback generated successfully!");
      console.log("INTERVIEW ID:", interview_id);
      const { data, error } = await supabase
        .from("interview_feedback")
        .insert([
          {
            user_name: fullName,
            user_email: userEmail,
            interview_id:interview_id,
            feedback: FINAL_FEEDBACK,
            recommended: feedback.recommendation === "yes",
          },
        ])
        .select();

      if (error) {
        console.error("Supabase insert error:", error);
        throw error;
      }

      console.log("Saved Data:", data);
      router.push("/interview/" + interview_id + "/completed");
    } catch (error) {
      console.error("Error generating feedback:", error);
      toast.error("Failed to generate feedback. Please try again.");
    }
  };

  const stopInterview = () => {
    try {
      vapi.stop();
      console.log("Call has stopped.");
      toast("Call Disconnected...");
      generateFeedback();
    } catch (error) {
      console.error("Error stopping the interview:", error);
      toast.error("Failed to stop the interview. Please try again.");
    }
  };

  return (
    <div className="p-2 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Session
        <span className="flex gap-2 items-center">
          <Timer />
          00:00:00
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        <div className="bg-white flex-col h-[400px] rounded-lg border flex items-center justify-center">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <Image
              src={"/full_logo.png"}
              alt="ai"
              width={100}
              height={100}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
          </div>
          <h2>AI Recruiter</h2>
        </div>
        <div className="bg-white flex-col h-[400px] rounded-lg border flex items-center justify-center">
          <div className="relative">
            {activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <h2 className="text-2xl bg-primary text-white p-3 rounded-full px-5">
              {fullName && fullName[0]}
            </h2>
          </div>
          <h2>{fullName}</h2>
        </div>
      </div>
      <div className="flex gap-4 items-center justify-center mt-7">
        <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer" />
        <AlertConfirmation stopCall={stopInterview}>
          <Phone className="h-12 w-12 px-3 bg-red-500 text-white rounded-full cursor-pointer" />
        </AlertConfirmation>
      </div>
      <h2 className="text-sm text-gray-400 text-center mt-5">
        Interview in Progress...
      </h2>
    </div>
  );
}
