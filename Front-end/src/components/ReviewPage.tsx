"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  comment: string;
  author: string;
  timeAgo: string;
}

const initialReviews: Review[] = [];

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState<"reviews" | "suggestion">(
    "reviews"
  );
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
    author: "",
  });

  // Calculate rating statistics
  const totalReviews = reviews.length + 125; // Adding base count to match "127+ ratings"
  const ratingCounts = {
    5: reviews.filter((r) => r.rating === 5).length + 120,
    4: reviews.filter((r) => r.rating === 4).length + 5,
    3: reviews.filter((r) => r.rating === 3).length + 2,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  const averageRating = 5.0;
  const fiveStarPercentage = ((ratingCounts[5] / totalReviews) * 100).toFixed(
    1
  );
  const recommendPercentage = 98.4;
  const courseQuality = 4.8;

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (diffInMinutes < 10080) {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else {
      const weeks = Math.floor(diffInMinutes / 10080);
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newReview.comment.trim() || !newReview.author.trim()) {
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      rating: newReview.rating,
      comment: newReview.comment.trim(),
      author: newReview.author.trim(),
      timeAgo: "Just now",
    };

    setReviews((prev) => [review, ...prev]);
    setNewReview({ rating: 5, comment: "", author: "" });
    setActiveTab("reviews");
  };

  const renderStars = (rating: number, size: "sm" | "lg" = "sm") => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size === "lg" ? "w-6 h-6" : "w-4 h-4"} ${
              star <= rating
                ? "fill-blue-500 text-blue-500"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  const renderRatingBar = (rating: number) => {
    const count = ratingCounts[rating as keyof typeof ratingCounts];
    const percentage = (count / totalReviews) * 100;

    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="w-2">{rating}</span>
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-gray-800 h-2 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="w-8 text-right text-gray-600">{count}</span>
      </div>
    );
  };

  return (
    <div className="max-w-full py-20 flex flex-col items-start">
      <h1 className="text-3xl font-bold mb-8">
        Elevate Bootcamp Glasgow QP Reviews
      </h1>

      {/* Tab Navigation */}
      <div className="flex gap-8 mb-8 border-b">
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-2 px-1 font-medium ${
            activeTab === "reviews"
              ? "text-black border-b-2 border-black"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Reviews
        </button>
        <button
          onClick={() => setActiveTab("suggestion")}
          className={`pb-2 px-1 font-medium ${
            activeTab === "suggestion"
              ? "text-black border-b-2 border-black"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Make a Suggestion
        </button>
      </div>

      {activeTab === "reviews" ? (
        <div>
          {/* Rating Summary */}
          <div className="flex gap-12 mb-8">
            <div className="flex flex-col items-center">
              <div className="text-6xl font-bold mb-2">{averageRating}</div>
              {renderStars(5, "lg")}
              <div className="text-gray-600 mt-1">{totalReviews}+ ratings</div>
            </div>

            <div className="flex-1 space-y-1">
              {[5, 4, 3, 2, 1].map((rating) => renderRatingBar(rating))}
            </div>
          </div>

          {/* Statistics */}
          <div className="flex gap-12 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500">
                {fiveStarPercentage}%
              </div>
              <div className="text-gray-600">5-star ratings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">
                {recommendPercentage}%
              </div>
              <div className="text-gray-600">Recommend</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500">
                {courseQuality}
              </div>
              <div className="text-gray-600">Course Quality</div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Recent Reviews</h2>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-100 pb-6 last:border-b-0"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-800 mb-2">"{review.comment}"</p>
                  <p className="text-gray-600">- {review.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-6">Make a Suggestion</h2>
          <form onSubmit={handleSubmitReview} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <Input
                value={newReview.author}
                onChange={(e) =>
                  setNewReview((prev) => ({ ...prev, author: e.target.value }))
                }
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setNewReview((prev) => ({ ...prev, rating: star }))
                    }
                    className="p-1"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= newReview.rating
                          ? "fill-blue-500 text-blue-500"
                          : "fill-gray-200 text-gray-200 hover:fill-blue-300 hover:text-blue-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Your Review
              </label>
              <Textarea
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview((prev) => ({ ...prev, comment: e.target.value }))
                }
                placeholder="Share your experience with the bootcamp..."
                rows={4}
                required
              />
            </div>

            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Submit Review
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
