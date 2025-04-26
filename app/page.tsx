"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black via-blue-900 to-blue-600 text-white py-20 px-8">
        <div className="container mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6 animate-fade-in-down">
            <Image
              src="/full_logo_white_theme.png"
              alt="TAiman Logo"
              width={200}
              height={50}
              className="w-[200px] h-auto"
            />
          </div>
          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-4 animate-fade-in-down">
            Revolutionize Your Hiring Process
          </h1>
          {/* Slogan */}
          <p className="text-lg sm:text-2xl mb-8 text-gray-300 animate-fade-in-up">
            The Superpower Behind Smart Hiring
          </p>
          {/* Call-to-Action Buttons */}
          <div className="flex justify-center gap-4 animate-fade-in">
            <Button
              className="bg-blue-600 text-white hover:bg-blue-500 px-8 py-4 rounded-lg font-bold shadow-lg transition-transform transform hover:scale-105"
              onClick={() => window.location.href = "/auth"}
            >
              Get Started
            </Button>
            <Button
              className="bg-transparent border border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-bold shadow-lg transition-transform transform hover:scale-105"
              onClick={() => window.location.href = "/settings"}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-blue-500 animate-fade-in-down">
            Why Choose TAiman?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800 shadow-lg rounded-lg hover:shadow-xl transition-shadow animate-zoom-in">
              <Image
                src="/ai-insight.jpg"
                alt="AI-Powered"
                width={80}
                height={80}
                className="mx-auto rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-white">AI-Powered Insights</h3>
              <p className="text-gray-400">
                Use advanced AI algorithms to match candidates with job roles.
              </p>
            </div>
            <div className="p-6 bg-gray-800 shadow-lg rounded-lg hover:shadow-xl transition-shadow animate-zoom-in delay-200">
              <Image
                src="/save-time.jpg"
                alt="Time-Saving"
                width={80}
                height={60}
                className="mx-auto rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-white">Save Time</h3>
              <p className="text-gray-400">
                Automate scheduling, screening, and follow-ups to focus on what matters.
              </p>
            </div>
            <div className="p-6 bg-gray-800 shadow-lg rounded-lg hover:shadow-xl transition-shadow animate-zoom-in delay-400">
              <Image
                src="/secured.jpg"
                alt="Secure"
                width={80}
                height={80}
                className="mx-auto rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-white">Secure & Reliable</h3>
              <p className="text-gray-400">
                Your data is safe with our enterprise-grade security measures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-r from-blue-900 to-black py-20 px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-white animate-fade-in-down">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800 shadow-lg rounded-lg hover:shadow-xl transition-shadow animate-fade-in-up">
              <p className="text-gray-400 italic mb-4">
                "TAiman has completely transformed our hiring process. We found the perfect candidates in no time!"
              </p>
              <h4 className="text-lg font-semibold text-white">- John Doe, HR Manager</h4>
            </div>
            <div className="p-6 bg-gray-800 shadow-lg rounded-lg hover:shadow-xl transition-shadow animate-fade-in-up delay-200">
              <p className="text-gray-400 italic mb-4">
                "The AI recommendations are spot-on. It saved us countless hours of manual work."
              </p>
              <h4 className="text-lg font-semibold text-white">- Jane Smith, Recruiter</h4>
            </div>
            <div className="p-6 bg-gray-800 shadow-lg rounded-lg hover:shadow-xl transition-shadow animate-fade-in-up delay-400">
              <p className="text-gray-400 italic mb-4">
                "Highly recommend TAiman for any company looking to streamline their recruitment process."
              </p>
              <h4 className="text-lg font-semibold text-white">- Alex Johnson, CEO</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-800 to-black text-white py-20 px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl sm:text-6xl font-extrabold mb-6 animate-fade-in-down">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-2xl mb-8 text-gray-300 animate-fade-in-up">
            Join hundreds of companies already using TAiman to hire smarter.
          </p>
          <div className="flex justify-center gap-4 animate-fade-in">
            <Button
              className="bg-white text-blue-600 hover:bg-gray-200 px-8 py-4 rounded-lg font-bold shadow-lg transition-transform transform hover:scale-105"
              onClick={() => window.location.href = "/auth"}
            >
              Sign Up Now
            </Button>
            <Button
              className="bg-transparent border border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-bold shadow-lg transition-transform transform hover:scale-105"
              onClick={() => window.location.href = "/settings"}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
