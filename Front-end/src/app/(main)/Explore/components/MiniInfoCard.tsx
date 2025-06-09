import React from "react";
import { MapPin } from "lucide-react";

type ListingCardProps = {
  imageUrl: string;
  name: string;
  location: string;
};

export const MiniInfoCard = ({
  imageUrl,
  name,
  location,
}: ListingCardProps) => {
  return (
    <div className=" max-w-md">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-[170px] object-cover rounded-t-md"
      />

      <div>
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>

        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="size-[30px] mr-1 text-orange-500" />
          {location}
        </div>

        <div className="text-sm text-black font-medium flex items-center cursor-pointer hover:underline">
          see more
        </div>
      </div>
    </div>
  );
};
