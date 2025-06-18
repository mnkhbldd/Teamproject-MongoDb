"use client";
import { BookingDashboard } from "@/components/booking-dashboard";
import { Toaster } from "@/components/toaster";

export default function Home() {
  return (
    <div className="w-full  max-h-full">
      <div className="flex bg-slate-700 pt-20 min-h-screen h-full">
        <BookingDashboard />
        <Toaster />
      </div>
    </div>
  );
}
