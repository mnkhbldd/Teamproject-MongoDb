import React from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { Popup } from "react-leaflet";

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
    <Popup className=" max-w-md">
      <Image
        src={imageUrl}
        alt={name}
        width={500}
        height={500}
        className="w-full h-[170px] object-cover rounded-md"
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
    </Popup>
  );
};
