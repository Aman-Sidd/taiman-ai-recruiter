import { Button } from '@/components/ui/button';
import { Phone, Video } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
  // define your props here
}

export default function CreateOptions() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Link href={'/dashboard/create-interview'} className="bg-gray-100 border border-gray-200 p-5 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
        <Video className="w-10 h-10 p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition-all" />
        <h3 className="text-lg font-bold mt-3">Create a new interview</h3>
        <p className="text-sm text-gray-500">Create AI Interviews and schedule then with candidates</p>
      </Link>
      <div className="bg-gray-100 border border-gray-200 p-5 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
        <Phone className="w-10 h-10 p-2 rounded-lg bg-green-50 text-green-500 hover:bg-green-100 transition-all" />
        <h3 className="text-lg font-bold mt-3">Create Phone Screening Call</h3>
        <p className="text-sm text-gray-500">Schedule phone screening calls with candidates</p>
      </div>
    </div>
  );
};
