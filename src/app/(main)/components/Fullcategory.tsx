"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { url } from "inspector";
import { GsapCategory } from "./Gsapcatergoy";

export const FullCategory = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.fromTo(
      boxRef.current,
      { x: 500, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 2.5,
        ease: "circ.inOut",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse", // play on enter, do nothing on leave, reverse on re-enter
        },
      }
    );
  }, []);
  return (
    <div
      ref={boxRef}
      className="flex pt-10  px-4 gap-9 flex-wrap h-full w-full   "
    >
      <GsapCategory
        src={
          "https://swimstars.co/wp-content/uploads/2022/08/natation-adulte-swim-stars.jpeg"
        }
        title={"Swimming"}
      />
      <GsapCategory
        src={
          "https://img.redbull.com/images/c_limit,w_1500,h_1000/f_auto,q_auto/redbullcom/2014/04/10/P-20140410-00079/sam-sunderland-in-desert-action"
        }
        title={"Motorcycling"}
      />
      <GsapCategory
        src={
          "https://www.teamsportsplanet.com/wp-content/uploads/1663271661037.jpg"
        }
        title={"Ball sports"}
      />
      <GsapCategory
        src={
          "https://cdn.britannica.com/94/125794-050-FB09B3F4/Hikers-Gore-Range-Mountains-Denver.jpg"
        }
        title={"Hiking"}
      />
      <GsapCategory
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZHhVjcREnR-DDx98gapsrN0RuVEGtjP34Sg&s"
        }
        title={"Dating"}
      />
    </div>
  );
};
