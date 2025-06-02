"use client";
import { FaHiking } from "react-icons/fa";

import React, { useRef } from "react";
import MouseSpotlight from "../components/Mouselight";
import gsap from "gsap";

import { CarouselCat } from "../components/Carousel";

export const page1 = () => {
  const textref = useRef(null);
  React.useEffect(() => {
    gsap.fromTo(
      textref.current,
      { y: 400, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.4,
        scrollTrigger: {
          trigger: textref.current,
          start: "top 10%",
          toggleActions: "play pause resume reset",
        },
      }
    );
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-r from-[#B8CFCE] via-[#7F8CAA]  to-[#333446] overflow-hidden  flex flex-col">
      <div className="w-screen h-screen flex justify-center flex-col items-center">
        <FaHiking className="animate-pulse" size={180} />
        <div
          ref={textref}
          className="pl-17 w-[1000px]  text-[52px] font-extrabold bg-gradient-to-r  from-[#5459AC] via-[#648DB3] to-[#B2D8CE] text-transparent bg-clip-text"
        >
          Welcome to FreelyAgency fpllsa mdfsahuew ndsaj .fdsamkmlwe
        </div>
        <MouseSpotlight />
      </div>
      <div className="w-full h-[20px] bg-gradient-to-b from-[#7F8CAA] to-[#483AA0] outline-none"></div>
      <div className="w-screen flex h-screen bg-gradient-to-r from-[#0E2148] via-[#483AA0] to-[#7965C1]">
        <CarouselCat />
      </div>
    </div>
  );
};
export default page1;
