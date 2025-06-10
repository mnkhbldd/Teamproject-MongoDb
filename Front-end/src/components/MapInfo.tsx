import {
  Facebook,
  Instagram,
  MapPin,
  MapPinned,
  PanelTop,
  Phone,
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
const MarkerIcon = new L.DivIcon({
  className: "custom-div-icon",
  html: ReactDOMServer.renderToString(<MapPin className=" text-red-400" />),
});
export const MapInfo = ({
  facebook,
  address,
  instagram,
  website,
  number,
  position,
}: {
  facebook: string;
  address: string;
  instagram: string;
  website: string;
  number: string;
  position: number[];
}) => {
  return (
    <div className="box pt-4 px-2 w-full flex flex-col gap-5 ">
      <div className="w-[250px] h-[250px] rounded overflow-hidden">
        {position && (
          <MapContainer
            center={[position[0], position[1]]}
            zoom={15}
            scrollWheelZoom={false}
            dragging={false}
            doubleClickZoom={false}
            zoomControl={false}
            style={{ width: "100%", height: "100%" }}
            attributionControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker icon={MarkerIcon} position={[position[0], position[1]]} />
          </MapContainer>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <MapPinned className="w-5 h-5" />
          <a
            className="relative text-gray-700 hover:text-cyan-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-cyan-600 after:transition-all after:duration-300"
            href="https://www.google.com/maps"
          >
            {address}
          </a>
        </div>

        <div className="flex items-center gap-4">
          <PanelTop className="w-5 h-5" />
          <a
            className="relative text-gray-700 hover:text-cyan-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-cyan-600 after:transition-all after:duration-300"
            href="https://chatgpt.com/"
          >
            {website}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Facebook className="w-5 h-5" />
          <a
            className="relative text-gray-700 hover:text-cyan-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-cyan-600 after:transition-all after:duration-300"
            href="https://www.facebook.com/"
          >
            {facebook}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Instagram className="w-5 h-5" />
          <a
            className="relative text-gray-700 hover:text-cyan-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-cyan-600 after:transition-all after:duration-300"
            href="https://www.instagram.com/"
          >
            {instagram}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Phone className="w-5 h-5" />
          <p className="relative text-gray-700 hover:text-cyan-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-cyan-600 after:transition-all after:duration-300">
            (+976) {number}
          </p>
        </div>
      </div>
    </div>
  );
};
