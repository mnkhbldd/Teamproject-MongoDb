"use client";

import dynamic from "next/dynamic";

interface Company {
  _id: string;
  name: string;
  description: string;
  location: Array<{
    address: string;
    coordinate: [number, number];
  }>;
  phoneNumber: string;
  category: [
    {
      icon: string;
      name: string;
    }
  ];
  socialMedia: {
    Facebook: string;
    instagram: string;
    website: string;
  };
  images: string[];
  companyLogo: string;
  pricing: number;
}

const ExploreMap = dynamic(
  () => import("@/app/(main)/Explore/components/ExploreMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        Loading map...
      </div>
    ),
  }
);

const MapWrapper = ({ data }: { data: Company[] }) => {
  return (
    <div className="w-full h-full">
      <ExploreMap data={data} />
    </div>
  );
};

export default MapWrapper;
