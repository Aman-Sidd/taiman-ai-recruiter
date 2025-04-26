import React, { useState } from "react";
import moment from "moment";
import { ArrowRight, Copy, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

export function InterviewCard({ interview, viewDetail=false}: { interview: any, viewDetail:boolean }) {
  const [isEmailInputVisible, setIsEmailInputVisible] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");

  const copyLink = () => {
    const link = `${process.env.NEXT_PUBLIC_APP_URL}/interview/${interview.interview_id}`;
    navigator.clipboard.writeText(link);
    toast("Link copied to clipboard!");
  };

  const sendEmail = async () => {
    if (!recipientEmail.trim()) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: recipientEmail,
          subject: `Interview Invitation for ${interview.job_position}`,
          message: "You have been invited to an interview.",
          jobPosition: interview.job_position,
          interviewLink: `${process.env.NEXT_PUBLIC_APP_URL}/interview/${interview.interview_id}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      toast.success("Email sent successfully!");
      setIsEmailInputVisible(false); // Hide the input field after sending the email
      setRecipientEmail(""); // Clear the input field
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
    }
  };

  return (
    <div className="p-5 bg-white rounded-lg border">
      <div className="flex items-center justify-between">
        <div className="h-[40px] w-[40px] bg-primary rounded-full"></div>
        <h2 className="text-sm">{moment(interview.created_at).format("DD MMM yyyy")}</h2>
      </div>
      <h2 className="mt-3 font-bold text-lg">{interview?.job_position}</h2>
      { viewDetail && <h2 className="mt-2 flex justify-between text-gray-500">{interview?.interview_duration}<span className="text-green-800"> {interview['interview_feedback']?.length} Candidates</span></h2>}

      {!viewDetail?<div className="flex w-full mt-5 items-center gap-3 justify-center">
        <Button className='cursor-pointer' variant="outline" onClick={copyLink}>
          <Copy />
          Copy Link
        </Button>
        <div className="px-3 bg-blue-500 rounded-sm">
          <Button className='cursor-pointer bg-blue-500' onClick={() => setIsEmailInputVisible(!isEmailInputVisible)}>
            <Send />
            Send
          </Button>
        </div>
      </div>:
      <Link href={'/scheduled-interviews/'+interview?.interview_id+'/details'} className="flex w-full mt-5 items-center gap-3 justify-center">
      <Button disabled={!interview?.interview_id} variant='outline' className="mt-5 w-full">View Details <ArrowRight/></Button>
      </Link>
      }

      {/* Email Input Field */}
      {isEmailInputVisible && (
        <div className="mt-4">
          <input
            type="email"
            placeholder="Enter recipient's email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <div className="flex justify-end mt-2">
            <Button onClick={sendEmail} className="bg-blue-500 text-white">
              Send Email
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}