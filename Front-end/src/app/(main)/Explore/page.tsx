"use client";

import { SideBarExplore } from "@/app/(main)/Explore/components/SideBarExplore";
import dynamic from 'next/dynamic';

const MapWrapper = dynamic(
  () => import('./components/MapWrapper'),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-100 flex items-center justify-center">Loading map...</div>
  }
);

export default function ExplorePage() {
  return (
    <div>
      <div className="h-screen w-screen flex">
        <div className="w-[35%]">
          <SideBarExplore />
        </div>
        <div className="w-[65%]">
          <MapWrapper />
        </div>
      </div>
    </div>
  );
}
