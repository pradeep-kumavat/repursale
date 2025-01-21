"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import {
  BookOpen,
  LogIn,
  UserPlus,
  ChevronRight,
  BarChart2,
  DollarSign,
  Clock,
} from "lucide-react";
import { useEffect } from "react";

export default function HomePage() {
  const { isSignedIn } = useAuth(); 
  const router = useRouter(); 

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      {/* Left side - Hero section */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16">
        <div className="max-w-2xl text-center md:text-left">
          <div className="flex justify-center md:justify-start mb-6">
            <BookOpen className="h-20 w-20 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to Repursale
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your smart platform for tracking purchases and sales
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
              <button className="w-full md:w-auto rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors duration-300 hover:bg-blue-700 flex items-center justify-center">
                <UserPlus className="mr-2 h-5 w-5" />
                Sign Up
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </SignUpButton>
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <button className="w-full md:w-auto rounded-lg bg-gray-700 px-6 py-3 text-gray-200 border border-gray-600 transition-colors duration-300 hover:bg-gray-600 flex items-center justify-center">
                <LogIn className="mr-2 h-5 w-5" />
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </div>

      {/* Right side - Features */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16 bg-gray-800 bg-opacity-50">
        <div className="max-w-md">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Why Choose Repursale?
          </h2>
          <ul className="space-y-6">
            <li className="flex items-start">
              <BarChart2 className="mr-4 h-8 w-8 text-blue-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">
                  Easy Tracking
                </h3>
                <p className="text-gray-300">
                  Effortlessly monitor your purchases and sales with our
                  intuitive interface.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <DollarSign className="mr-4 h-8 w-8 text-blue-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">
                  Financial Insights
                </h3>
                <p className="text-gray-300">
                  Gain valuable insights with our comprehensive financial
                  reports.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <Clock className="mr-4 h-8 w-8 text-blue-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">Time-Saving</h3>
                <p className="text-gray-300">
                  Streamline your record-keeping process and focus on growing
                  your business.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
