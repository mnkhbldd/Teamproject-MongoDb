"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

import axiosInstance from "@/utils/axios";
import { MiniInfoCard } from "./MiniInfoCard";

interface Company {
  _id: string;
  name: string;
  description: string;
  location: Array<{
    address: string;
    coordinate: [number, number];
  }>;
  phoneNumber: string;
  category: string[];
  socialMedia: {
    Facebook: string;
    instagram: string;
    website: string;
  };
  images: string[];
  companyLogo: string;
}

const ExploreMap = () => {
  const [data, setData] = useState<Company[]>();

  useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await axiosInstance.get("/company/get-companies");
        setData(res.data.companies);
      } catch (error) {
        console.log("Error fetching companies:", error);
      }
    };

    FetchData();
  }, []);
  console.log(data);

  return (
    <div className="w-full h-full flex rounded-lg">
      <MapContainer
        className=" size-full z-10 "
        center={[47.92, 106.91]}
        zoom={14}
        maxZoom={19}
        minZoom={1}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.jawg.io/5811666f-ea6e-421b-a1a8-c220b61f6b36/{z}/{x}/{y}{r}.png?access-token=uqeYaHBOlPqp13ESsgteE53obi4o78aMNktTHsvSRtv6g2DhywRCEzEIelnC7vhx"
        />
        {data && (
          <>
            {data.map((el: Company) => (
              <Marker
                key={el._id}
                position={[
                  el.location[0].coordinate[0],
                  el.location[0].coordinate[1],
                ]}
                icon={L.icon({
                  iconUrl: `${el.companyLogo}`,
                  iconSize: [60, 60],
                  iconAnchor: [16, 32],
                  popupAnchor: [0, -32],
                  className: " rounded-full object-cover",
                })}
              >
                <MiniInfoCard
                  imageUrl={el.companyLogo}
                  name={el.name}
                  location={el.location[0].address}
                />
              </Marker>
            ))}
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default ExploreMap;
