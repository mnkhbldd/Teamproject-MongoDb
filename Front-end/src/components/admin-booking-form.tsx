"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data - replace with actual data from your API
const mockCompanies = [
  { id: "684d3c1135154184ccdcd6b2", name: "Tech Solutions Inc." },
  { id: "684d3c1135154184ccdcd6b3", name: "Digital Marketing Pro" },
  { id: "684d3c1135154184ccdcd6b4", name: "Creative Design Studio" },
];

const mockUsers = [
  {
    id: "user_2yDXdHHp9AN0w9XYA2FktIY8j9Z",
    name: "John Doe",
    email: "john@example.com",
  },
  {
    id: "user_3xEYeIIq0BO1x0ZYB3GluJZ9k0A",
    name: "Jane Smith",
    email: "jane@example.com",
  },
  {
    id: "user_4zFZfJJr1CP2y1AZC4HmvKA0l1B",
    name: "Mike Johnson",
    email: "mike@example.com",
  },
];

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

interface BookingFormData {
  user: string;
  company: string;
  bookingDate: Date | undefined;
  startTime: string;
  endTime: string;
  price: string;
  status: string;
}

export default function AdminBookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    user: "",
    company: "",
    bookingDate: undefined,
    startTime: "",
    endTime: "",
    price: "",
    status: "booked",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (
      !formData.user ||
      !formData.company ||
      !formData.bookingDate ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.price
    ) {
      alert("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Validate time selection
    if (formData.startTime >= formData.endTime) {
      alert("End time must be after start time");
      setIsSubmitting(false);
      return;
    }

    try {
      // Here you would make the API call to create the booking
      const bookingData = {
        user: formData.user,
        company: formData.company,
        bookingDate: formData.bookingDate.toISOString(),
        startTime: formData.startTime,
        endTime: formData.endTime,
        status: formData.status,
        price: formData.price,
      };

      console.log("Creating booking:", bookingData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Booking created successfully!");

      // Reset form
      setFormData({
        user: "",
        company: "",
        bookingDate: undefined,
        startTime: "",
        endTime: "",
        price: "",
        status: "booked",
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Booking
        </CardTitle>
        <CardDescription>
          Create a new booking for a user with a selected company and time slot.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Selection */}
          <div className="space-y-2">
            <Label htmlFor="user">User *</Label>
            <Select
              value={formData.user}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, user: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {mockUsers.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    <div className="flex flex-col">
                      <span>{user.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Company Selection */}
          <div className="space-y-2">
            <Label htmlFor="company">Company *</Label>
            <Select
              value={formData.company}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, company: value || "" }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent>
                {mockCompanies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Booking Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.bookingDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.bookingDate
                    ? format(formData.bookingDate, "PPP")
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.bookingDate}
                  onSelect={(date) =>
                    setFormData((prev) => ({ ...prev, bookingDate: date }))
                  }
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time *</Label>
              <Select
                value={formData.startTime}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, startTime: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Start time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {time}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End Time *</Label>
              <Select
                value={formData.endTime}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, endTime: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="End time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem
                      key={time}
                      value={time}
                      disabled={time <= formData.startTime}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {time}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price *</Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter price (e.g., 75000)"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, price: e.target.value }))
              }
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="booked">Booked</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating Booking..." : "Create Booking"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
