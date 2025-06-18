"use client";
import { CompanyReview } from "@/components/CompanyReview";
import { HeaderReview } from "@/components/HeaderReview";
import { ScrollArea } from "@/components/ui/scroll-area";
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(
          "/review/user-company-reviews"
        );
        const data = await response.data;
        setReviews(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="w-screen bg-gray-200 h-screen rounded-lg">
      <div className="mb-6 flex items-center justify-between px-4 pt-4">
        <div>
          <h1 className="text-3xl font-medium text-gray-700">Reviews</h1>
          <p className="text-gray-500">Welcome to angular application</p>
        </div>
      </div>
      <div className="w-[96.5%] h-screen px-30">
        <ScrollArea className="h-[1000px]">
          <HeaderReview />
          {reviews.map((review: any) => (
            <CompanyReview key={review._id} review={review} />
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
