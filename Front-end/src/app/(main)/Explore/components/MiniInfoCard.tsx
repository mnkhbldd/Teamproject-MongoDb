import React from "react";

import { Popup } from "react-leaflet";

type ListingCardProps = {
  imageUrl: string;
  name: string;
  location: string;
};

export const MiniInfoCard = ({ name, location }: ListingCardProps) => {
  return (
    <Popup className=" max-w-md">
      <div>
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>

        <div className="flex items-center text-xs text-gray-600">
          {location}
        </div>

        <div className="text-sm text-blue-600 font-medium flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-blue-600">${"100"}</span>
            <span className="text-sm text-gray-500">/hour</span>
          </div>
          see more
        </div>
      </div>
    </Popup>
  );
};
