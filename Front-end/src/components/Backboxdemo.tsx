"use client";
import React from "react";
import { Boxes } from "@/components/ui/backgroundboxes";

import { BookingDashboard } from "./booking-dashboard";

export function BackgroundBoxesDemo() {
  return (
    <div className="h-full relative pt-20 w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full  bg-slate-900 z-90 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <BookingDashboard />
    </div>
  );
}
