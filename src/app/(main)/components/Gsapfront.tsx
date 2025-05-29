import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Category } from "./Category";

gsap.registerPlugin(MotionPathPlugin, ScrollToPlugin, TextPlugin);

export const Gsapfront = () => {
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      boxRef.current,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 2.5,
        ease: "elastic.out(1, 0.3)",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
          scrub: true,
          pin: true,
        },
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
      className="w-[240px] h-[240px] bg-white rounded-lg shadow-md mx-auto mt-[100vh]"
    >
      {/* Та агуулгаа энд нэмнэ */}
    </div>
  );
};
