import { Facebook, Instagram, MapPinned, PanelTop, Phone } from "lucide-react";
import Image from "next/image";

export const MapInfo = () => {
  return (
    <div className="box pt-4 px-2 w-full flex flex-col gap-5 ">
      <div className="h-full">
        <Image
          className="object-cover rounded-md w-[240px] h-[240px]"
          src={"/google-maps-new-interface1.jpg"}
          alt="map"
          width={240}
          height={240}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <MapPinned className="w-5 h-5" />
          <a
            className="relative text-gray-700 hover:text-cyan-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-cyan-600 after:transition-all after:duration-300"
            href="https://www.google.com/maps"
          >
            han Uul Dvvreg
          </a>
        </div>

        <div className="flex items-center gap-4">
          <PanelTop className="w-5 h-5" />
          <a
            className="relative text-gray-700 hover:text-cyan-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-cyan-600 after:transition-all after:duration-300"
            href="https://chatgpt.com/"
          >
            website.com
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Facebook className="w-5 h-5" />
          <a
            className="relative text-gray-700 hover:text-cyan-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-cyan-600 after:transition-all after:duration-300"
            href="https://www.facebook.com/"
          >
            facebook
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Instagram className="w-5 h-5" />
          <a
            className="relative text-gray-700 hover:text-cyan-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-cyan-600 after:transition-all after:duration-300"
            href="https://www.instagram.com/"
          >
            instagram
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Phone className="w-5 h-5" />
          <p className="relative text-gray-700 hover:text-cyan-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-cyan-600 after:transition-all after:duration-300">
            (+976) 99999999
          </p>
        </div>
      </div>
    </div>
  );
};
