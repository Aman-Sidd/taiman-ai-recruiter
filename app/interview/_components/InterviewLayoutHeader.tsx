"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export function InterviewLayoutHeader() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/ful_logo.png"
                alt="Taiman Logo"
                width={50}
                height={30}
                className="h-auto"
                priority
              />
            </motion.div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Powered by Taiman</span>
          </div>
        </div>
      </div>
    </header>
  );
} 