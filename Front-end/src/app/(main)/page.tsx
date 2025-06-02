"use client";

import { useRef } from "react";
import React from "react";
import gsap from "gsap";
import { BackgroundBeamsWithCollision } from "@/components/background-beams-with-collision";

export default function Home() {
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
    <BackgroundBeamsWithCollision>
      <div className="relative z-20">
        <h2 className="text-2xl md:text-4xl lg:text-7xl font-bold text-center text-white dark:text-white font-sans tracking-tight">
          U looking for best activities?
        </h2>
        <div className="relative justify-end mx-auto inline-block w-max mt-4 [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          <div className="absolute text-[45px] right-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <span className="">This website is for you.</span>
          </div>
          <div className="relative text-[45px] bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
            <span className="">This website is for you.</span>
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
