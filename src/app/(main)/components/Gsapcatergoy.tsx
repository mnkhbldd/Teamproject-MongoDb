import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Category } from "./Category";

export const GsapCategory = () => {
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      boxRef.current,
      { x: -200, opacity: 0 },
      { x: 0, opacity: 1, duration: 2.5, ease: "rough.inOut" }
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
      <Category
        img="https://t3.ftcdn.net/jpg/01/23/40/90/360_F_123409002_IOTrT0nqPqDtDzHpPMLAgA8dTW5Xdqtl.jpg"
        title="airtravel"
        discription="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
      ></Category>
    </div>
  );
};
