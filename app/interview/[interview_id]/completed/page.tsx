"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, ArrowRight } from "lucide-react";

const CompletedPage: React.FC = () => {
  const router = useRouter();

  const handleGoToDashboard = () => {
    router.push("/dashboard"); // Redirect to the dashboard or another page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 animate-bounce" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Interview Completed!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-6">
          Thank you for completing the interview. Your responses have been
          recorded, and feedback will be shared with you shortly.
        </p>

        {/* Action Button */}
        <button
          onClick={handleGoToDashboard}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md flex items-center justify-center gap-2 transition-all duration-300"
        >
          Go to Dashboard
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CompletedPage;