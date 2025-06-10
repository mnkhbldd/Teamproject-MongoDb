"use client";

import type React from "react";

import { useState } from "react";
import { Star, Send, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RatingData {
  stars: number;
  count: number;
  percentage: number;
}

interface SuggestionFormData {
  name: string;
  email: string;
  suggestion: string;
  rating: number;
}

export default function ReviewsPage() {
  const overallRating = 5.0;
  const totalRatings = 127;

  const [formData, setFormData] = useState<SuggestionFormData>({
    name: "",
    email: "",
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

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.suggestion.trim()) {
      errors.suggestion = "Suggestion is required";
    } else if (formData.suggestion.length < 10) {
      errors.suggestion = "Suggestion must be at least 10 characters";
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        suggestion: "",
        rating: 5,
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
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
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-1">{renderStars(5)}</div>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-gray-700">
                      &quot;Excellent bootcamp! The instructors were
                      knowledgeable and the curriculum was comprehensive. Highly
                      recommend for anyone looking to break into tech.&quot;
                    </p>
                    <div className="text-sm text-gray-500 mt-2">- Sarah M.</div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-1">{renderStars(5)}</div>
                      <span className="text-sm text-gray-500">1 week ago</span>
                    </div>
                    <p className="text-gray-700">
                      &quot;Great experience overall. The hands-on projects
                      really helped me understand the concepts. The career
                      support was also fantastic.&quot;
                    </p>
                    <div className="text-sm text-gray-500 mt-2">- James K.</div>
                  </div>
                </div>
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

                <form onSubmit={handleSubmit} className="space-y-4">
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

                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={formErrors.email ? "border-red-500" : ""}
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm">
                          {formErrors.email}
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
