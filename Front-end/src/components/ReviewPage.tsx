"use client";

import type React from "react";

import { useEffect, useState, useCallback } from "react";
import { Star, Send, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axiosInstance from "@/utils/axios";
import { useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

interface RatingData {
  stars: number;
  count: number;
  percentage: number;
}

interface SuggestionFormData {
  name: string;

  suggestion: string;
  rating: number;
}

interface Review {
  _id: string;
  name: string;
  comment: string;
  starCount: number;
  createdAt: string;
}

export default function ReviewsPage() {
  const { userId } = useAuth();
  const params = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchReview = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/review/reviews/${params.id}`);
      setReviews(res.data.reviews);
    } catch (error) {
      console.log(error);
    }
  }, [params.id, setReviews]);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  const overallRating = 5.0;
  const totalRatings = 127;

  const [formData, setFormData] = useState<SuggestionFormData>({
    name: "",
    suggestion: "",
    rating: 5,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const ratingsData: RatingData[] = [
    { stars: 5, count: 120, percentage: 94.5 },
    { stars: 4, count: 5, percentage: 3.9 },
    { stars: 3, count: 2, percentage: 1.6 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 },
  ];

  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-6 h-6 ${
          index < rating
            ? "fill-blue-500 text-blue-500"
            : "fill-gray-300 text-gray-300"
        } ${
          interactive
            ? "cursor-pointer hover:scale-110 transition-transform"
            : ""
        }`}
        onClick={interactive ? () => handleRatingChange(index + 1) : undefined}
      />
    ));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.suggestion.trim()) {
      errors.suggestion = "Suggestion is required";
    } else if (formData.suggestion.length < 10) {
      errors.suggestion = "Suggestion must be at least 10 characters";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setIsSubmitting(true);

      if (!userId) {
        window.location.href = "/sign-in";
        return;
      }

      console.log("Making API call to create review");

      const response = await axiosInstance.post("/review/create-review", {
        companyId: params.id,
        name: formData.name.trim(),
        comment: formData.suggestion.trim(),
        starCount: formData.rating,
      });

      console.log("API response:", response.data);

      if (response.data.success) {
        // Refresh reviews list
        fetchReview();
        console.log("Review submitted successfully!");

        // Reset form
        setIsSubmitted(true);
        setFormErrors({});
        setFormData({
          name: "",
          suggestion: "",
          rating: 0,
        });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        console.log("Server response not successful", response.data);
        throw new Error("Failed to create review");
      }
    } catch (error) {
      console.error("Error creating review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="size-fit bg-cover">
      <div className="w-full mx-auto">
        <div className="rounded-lg py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Elevate Bootcamp Glasgow QP Reviews
          </h1>

          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="suggest">Make a Suggestion</TabsTrigger>
            </TabsList>

            <TabsContent value="reviews">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Left side - Overall Rating */}
                <div className="flex-shrink-0">
                  <div className="text-7xl font-bold text-gray-900 mb-2">
                    {overallRating.toFixed(1)}
                  </div>

                  <div className="flex gap-1 mb-3">
                    {renderStars(Math.floor(overallRating))}
                  </div>

                  <div className="text-gray-600 font-medium">
                    {totalRatings}+ ratings
                  </div>
                </div>

                {/* Right side - Rating Distribution */}
                <div className="flex-1 w-full max-w-md">
                  <div className="space-y-3">
                    {ratingsData.map((rating) => (
                      <div
                        key={rating.stars}
                        className="flex items-center gap-3"
                      >
                        <span className="text-sm font-medium text-gray-700 w-2">
                          {rating.stars}
                        </span>

                        <div className="flex-1">
                          <Progress
                            value={rating.percentage}
                            className="h-3 bg-gray-200"
                            style={
                              {
                                "--progress-background":
                                  rating.count > 0 ? "#3b82f6" : "#e5e7eb",
                              } as React.CSSProperties
                            }
                          />
                        </div>

                        <span className="text-xs text-gray-500 w-8 text-right">
                          {rating.count > 0 ? rating.count : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 py-6 border rounded-lg border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      94.5%
                    </div>
                    <div className="text-sm text-gray-600">5-star ratings</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      98.4%
                    </div>
                    <div className="text-sm text-gray-600">Recommend</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      4.8
                    </div>
                    <div className="text-sm text-gray-600">Course Quality</div>
                  </div>
                </div>
              </div>

              {/* Recent Reviews Preview */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Recent Reviews</h3>

                {reviews.length === 0 ? (
                  <div className="text-gray-700 w-full border rounded-lg h-[100px] flex items-center justify-center text-center">
                    No reviews on this company
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review._id}
                      className="border border-gray-200 rounded-lg p-4 mb-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-1">
                          {renderStars(review.starCount)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {`${Math.ceil(
                            (new Date().getTime() -
                              new Date(review.createdAt).getTime()) /
                              (1000 * 60 * 60 * 24)
                          )} days ago`}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                      <div className="text-sm text-gray-500 mt-2">
                        - {review.name}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="suggest">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">
                  Submit Your Suggestion or Request
                </h2>

                {isSubmitted ? (
                  <Alert className="bg-green-50 border-green-200 mb-4">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Thank you for your suggestion! We&apos;ll review it
                      shortly.
                    </AlertDescription>
                  </Alert>
                ) : null}

                <form
                  onSubmit={(e) => {
                    console.log("Form submitted", e);
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={formErrors.name ? "border-red-500" : ""}
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-sm">
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="suggestion">
                      Your Suggestion or Request
                    </Label>
                    <Textarea
                      id="suggestion"
                      name="suggestion"
                      placeholder="Share your suggestion or request for the bootcamp..."
                      rows={5}
                      value={formData.suggestion}
                      onChange={handleInputChange}
                      className={formErrors.suggestion ? "border-red-500" : ""}
                    />
                    {formErrors.suggestion && (
                      <p className="text-red-500 text-sm">
                        {formErrors.suggestion}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Rate Your Experience (Optional)</Label>
                    <div className="flex gap-1">
                      {renderStars(formData.rating, true)}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Suggestion
                      </>
                    )}
                  </Button>
                </form>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="text-lg font-medium text-blue-800 mb-2">
                  Why Submit a Suggestion?
                </h3>
                <p className="text-blue-700">
                  Your feedback helps us improve the bootcamp experience for
                  future students. We review all suggestions and implement
                  changes based on your valuable input.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
