import Image from 'next/image';
import { motion } from 'framer-motion';

export function InterviewHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full py-6 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center">
          <Image
            src="/cover-image.jpg"
            alt="Company Logo"
            width={200}
            height={60}
            className="h-auto"
            priority
          />
        </div>
      </div>
    </motion.div>
  );
}
