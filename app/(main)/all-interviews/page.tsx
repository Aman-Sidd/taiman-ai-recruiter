"use client";
import { useState, useEffect } from "react";
import { useUserDetail } from "@/app/provider";
import { Button } from "@/components/ui/button";
import supabase from "@/services/supabaseClient";
import { InterviewCard } from "../dashboard/_components/InterviewCard";
import { toast } from "sonner";

export default function AllInterviewsPage() {
  const [interviews, setInterviews] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useUserDetail();
  const interviewsPerPage = 6; // Number of interviews per page

  const fetchInterviews = async (page: number) => {
    try {
      const from = (page - 1) * interviewsPerPage;
      const to = from + interviewsPerPage - 1;

      let { data: Interviews, error, count } = await supabase
        .from("Interviews")
        .select("*", { count: "exact" })
        .eq("userEmail", user?.email)
        .order("id", { ascending: false })
        .range(from, to);

      if (error) {
        console.error("Error fetching interviews:", error);
        toast.error("Failed to fetch interviews. Please try again.");
        return;
      }

      if (Interviews) {
        setInterviews(Interviews);
        setTotalPages(Math.ceil((count || 0) / interviewsPerPage));
      }
    } catch (error) {
      console.error("Error fetching interviews:", error);
      toast.error("Failed to fetch interviews. Please try again.");
    }
  };

  useEffect(() => {
    if (user) {
      fetchInterviews(currentPage);
    }
  }, [user, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="my-5 p-5">
      <h2 className="text-2xl font-bold">All Scheduled Interviews</h2>
      {interviews.length === 0 && (
        <div className="p-5 flex flex-col gap-3 items-center justify-center">
          <p className="text-gray-500">No interviews scheduled yet</p>
        </div>
      )}
      {interviews.length > 0 && (
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
            {interviews.map((interview, index) => (
              <InterviewCard interview={interview} key={index} />
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-3 mt-5">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}