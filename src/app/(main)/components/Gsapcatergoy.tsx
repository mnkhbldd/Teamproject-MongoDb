"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Category } from "./Category";

export const GsapCategory = ({ src, title }: any) => {
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      boxRef.current,
      { x: 0, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 2.5,
        ease: "rough.inOut",
      }
    );
  }, []);
  return (
    <div
      ref={boxRef}
      onMouseEnter={() =>
        gsap.to(boxRef.current, { scale: 1.1, duration: 0.3 })
      }
      onMouseLeave={() =>
        gsap.to(boxRef.current, { scale: 1.0, duration: 0.3 })
      }
      className="w-[240px] h-[240px] bg-white rounded-lg shadow-md border-2"
    >
      <Category img={src} title={title}></Category>
    </div>
  );
};
