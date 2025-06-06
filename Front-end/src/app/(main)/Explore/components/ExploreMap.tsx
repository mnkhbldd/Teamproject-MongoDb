"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import type { Marker as LeafletMarker } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import ReactDOMServer from "react-dom/server";
import axiosInstance from "@/utils/axios";

const customIcon = L.icon({
  iconUrl:
    "https://hips.hearstapps.com/hmg-prod/images/cristiano-ronaldo-of-portugal-reacts-as-he-looks-on-during-news-photo-1725633476.jpg?crop=0.666xw:1.00xh;0.180xw,0&resize=640:*",
  iconSize: [60, 60],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: " rounded-full",
});

const customIcon2 = L.icon({
  iconUrl:
    "https://imageio.forbes.com/specials-images/imageserve/663e595b4509f97fdafb95f5/0x0.jpg?format=jpg&crop=383,383,x1045,y23,safe&height=416&width=416&fit=bounds",
  iconSize: [60, 60],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: " rounded-full",
});

const MarkerIcon = new L.DivIcon({
  className: "custom-div-icon",
  html: ReactDOMServer.renderToString(
    <MapPin className=" hidden text-red-400" />
  ),
});

const initialData = [
  {
    latLng: [47.9222, 106.95],
    title: "messi",
    icon: customIcon,
  },
  {
    latLng: [47.9223, 106.918],
    title: "ronaldo",
    icon: customIcon2,
  },
];

const MarkerWithPopup = ({
  position,
  icon,
  title,
}: {
  position: [number, number];
  icon: L.Icon;
  title: string;
}) => {
  const map = useMap();

  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{
        click: () => {
          map.flyTo(position, 16, {
            duration: 1,
            animate: true,
          });
        },
      }}
    >
      <Popup>{title}</Popup>
    </Marker>
  );
};

interface Company {
  _id: string;
  name: string;
  description: string;
  location: {
    type: string;
    coordinate: string[];
  }[];
  companyLogo: string;
}

const ExploreMap = () => {
  const [clicked, setClicked] = useState<number[]>([0, 0]);
  const [, setAddress] = useState("");
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await axiosInstance.get("/company/get-companies");
        const companies = Array.isArray(res.data)
          ? res.data
          : res.data.companies || [];

        if (!Array.isArray(companies)) {
          console.error("Expected an array but got:", companies);
          return;
        }


        const formatted = companies
          .filter(
            (company: Company) =>
              company.location?.[0]?.coordinate?.length === 2 &&
              company.companyLogo
          )
          .map((company: Company) => ({
            latLng: [
              Number(company.location[0].coordinate[0]),
              Number(company.location[0].coordinate[1]),
            ],
            title: company.name,
            icon: L.icon({
              iconUrl: company.companyLogo,
              iconSize: [60, 60],
              iconAnchor: [30, 60],
              popupAnchor: [0, -60],
              className: "rounded-full border shadow-md",
            }),
          }));

        setData([...initialData, ...formatted]);
      } catch (error) {
        console.log("Error fetching companies:", error);
      }
    };

    FetchData();
  }, []);

  const markerRef = useRef<LeafletMarker>(null);
  useEffect(() => {
    if (markerRef!.current) {
      markerRef.current.openPopup();
    }
  }, [clicked]);

  const ChangeZoomControlPosition = () => {
    const map = useMap();
    useEffect(() => {
      map.zoomControl.setPosition("bottomright");
    }, [map]);
    return null;
  };

  function ClickHandler({
    setClicked,
  }: {
    setClicked: Dispatch<SetStateAction<number[]>>;
  }) {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setClicked([lat, lng]);
        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        )
          .then((res) => res.json())
          .then((data) => {
            setAddress(data.display_name);
          })
          .catch((err) => console.error("Geocoding error:", err));
      },
    });

    return null;
  }

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
        <ClickHandler setClicked={setClicked} />
        <ChangeZoomControlPosition />
        {clicked && (
          <Marker
            icon={MarkerIcon}
            ref={markerRef}
            position={[clicked[0], clicked[1]]}
          ></Marker>
        )}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.jawg.io/5811666f-ea6e-421b-a1a8-c220b61f6b36/{z}/{x}/{y}{r}.png?access-token=uqeYaHBOlPqp13ESsgteE53obi4o78aMNktTHsvSRtv6g2DhywRCEzEIelnC7vhx"
        />
        {data.map((el, index) => (
          <MarkerWithPopup
            key={index}
            position={[el.latLng[0], el.latLng[1]]}
            icon={el.icon}
            title={el.title}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default ExploreMap;
