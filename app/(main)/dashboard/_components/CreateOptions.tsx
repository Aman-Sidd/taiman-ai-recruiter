"use client";
import { Button } from '@/components/ui/button';
import { Phone, Video } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function CreateOptions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-5">
        {/* Create Interview Option */}
        <Link
          href={'/dashboard/create-interview'}
          className="bg-gray-100 border border-gray-200 p-5 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
        >
          <Video className="w-10 h-10 p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition-all" />
          <h3 className="text-lg font-bold mt-3">Create a new interview</h3>
          <p className="text-sm text-gray-500">
            Create AI Interviews and schedule them with candidates
          </p>
        </Link>

        {/* Create Phone Screening Call Option */}
        <div
          onClick={() => setIsDialogOpen(true)}
          className="bg-gray-100 border border-gray-200 p-5 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
        >
          <Phone className="w-10 h-10 p-2 rounded-lg bg-green-50 text-green-500 hover:bg-green-100 transition-all" />
          <h3 className="text-lg font-bold mt-3">Create Phone Screening Call</h3>
          <p className="text-sm text-gray-500">
            Schedule phone screening calls with candidates
          </p>
        </div>
      </div>

      {/* Dialog for Coming Soon */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Coming Soon</DialogTitle>
          </DialogHeader>
            <p className="text-gray-600 text-sm leading-relaxed">
            This feature is under development and will be available soon.{' '}
            <span className="font-medium text-gray-800">
              In the meantime, you can create AI interviews and schedule them with candidates.
            </span>
            </p>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
