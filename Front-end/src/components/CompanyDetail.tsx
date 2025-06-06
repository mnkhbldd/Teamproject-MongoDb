"use client";

import gsap from "gsap";

import { useEffect } from "react";
import ReviewsPage from "./ReviewPage";
import { CompanyName } from "./CompanyName";
import { CarouselImage } from "./CarouselImage";
import { MapInfo } from "./MapInfo";
import { About } from "./About";
import { ScrollArea } from "@/components/ui/scroll-area";

export const CompanyDetail = () => {
  useEffect(() => {
    gsap.fromTo(
      ".box",
      { x: -500, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5 }
    );
  }, []);

  return (
    <div className="bg-white h-screen [url(/bgImage.avif)] bg-cover overflow-hidden">
      <div className="flex flex-col px-8 gap-8">
        <div className="flex w-full justify-around pt-12">
          <ScrollArea className="h-screen scrollbar-hide ">
            <div className="px-4 pt-8">
              <CompanyName />
              <CarouselImage />
              <About />
              <ReviewsPage />
            </div>
          </ScrollArea>
          <div className="pt-25">
            <MapInfo />
          </div>
        </div>
      </div>
    </div>
  );
};
