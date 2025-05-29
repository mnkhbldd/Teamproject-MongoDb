"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "./components/Button";
import { FullCategory } from "./components/Fullcategory";
import { Gsapfront } from "./components/Gsapfront";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import gsap from "gsap";
export default function Home() {
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      boxRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "sine.inOut" }
    );
  }, []);
  return (
    <div className="w-full h-full flex flex-col bg-indigo-400">
      <div className="w-screen h-full flex justify-center items-center flex-col bg-indigo-400">
        <div
          ref={boxRef}
          onMouseEnter={() =>
            gsap.to(boxRef.current, { scale: 1.3, duration: 0.3 })
          }
          onMouseLeave={() =>
            gsap.to(boxRef.current, { scale: 1.0, duration: 0.3 })
          }
        >
          <img
            className="w-[500px] h-[500px] animate-pulse margin-bottom-1"
            src="https://themewagon.github.io/HeroBiz/assets/img/hero-img.svg"
            alt=""
          />
        </div>

        <div className="pt-4 w-full text-center flex flex-col items-center ">
          <h1 className="text-[48px] text-gray-400">
            Welcome to
            <span className="text-[#0ea2bd]"> Our project</span>
          </h1>
          <p className="text-gray-700 ">
            Et voluptate esse accusantium accusamus natus reiciendis quidem
            voluptates similique aut.
          </p>
          <div className="flex pt-10">
            <Button></Button>
          </div>
        </div>
        <div className="pt-10">
          <FullCategory></FullCategory>
        </div>
      </div>
    </div>
  );
}
