"use client";
import { useUserDetail } from "@/app/provider";
import { Button } from "@/components/ui/button";
import supabase from "@/services/supabaseClient";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

interface ProfileFormData {
  name: string;
  email: string;
}

export default function ProfilePage() {
  const { user } = useUserDetail();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("Users")
        .update({
          name: formData.name,
        })
        .eq("email", user?.email);

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <p className="text-gray-500">Manage your account settings and profile information</p>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center space-x-4">
            <Image
              src={user?.picture || "/default-avatar.png"}
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h3 className="font-medium">Profile Picture</h3>
              <p className="text-sm text-gray-500">
                Your Google account profile picture is used
              </p>
            </div>
          </div>

          {/* Credits Display */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-700">Available Credits</h3>
            <p className="text-2xl font-bold text-blue-600">{user?.credits || 0}</p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}