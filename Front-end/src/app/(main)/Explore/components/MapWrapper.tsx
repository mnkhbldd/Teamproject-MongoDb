"use client";

import dynamic from 'next/dynamic';

const ExploreMap = dynamic(
  () => import('./ExploreMap'),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-100 flex items-center justify-center">Loading map...</div>
  }
);

const MapWrapper = () => {
  return (
    <div className="w-full h-full">
      <ExploreMap />
    </div>
  );
};

export default MapWrapper;
