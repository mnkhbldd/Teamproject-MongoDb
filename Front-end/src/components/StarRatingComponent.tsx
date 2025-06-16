"use client";

import type React from "react";
import {useState} from "react";
import {Star} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";

export const StarRatingComponent = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  const handleMouseOver = (index: number) => {
    setHoveredRating(index);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClick = (index: number) => {
    setRating(index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({rating, review});
    alert(`Thank you for your ${rating}-star review!`);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Rate Your Experience
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4, 5].map((index) => (
            <Star
              key={index}
              size={36}
              onClick={() => handleClick(index)}
              onMouseOver={() => handleMouseOver(index)}
              onMouseLeave={handleMouseLeave}
              fill={(hoveredRating || rating) >= index ? "#FFD700" : "#E5E7EB"}
              stroke={
                (hoveredRating || rating) >= index ? "#FFD700" : "#9CA3AF"
              }
              className="cursor-pointer transition-colors duration-200"
              data-testid={`star-${index}`}
            />
          ))}
        </div>

        <div className="mb-4">
          <Label htmlFor="review" className="block mb-2 text-sm font-medium">
            Your Review
          </Label>
          <Textarea
            id="review"
            placeholder="Tell us about your experience..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <Button type="submit" className="w-full" disabled={rating === 0}>
          Submit Review
        </Button>
      </form>
    </div>
  );
};
