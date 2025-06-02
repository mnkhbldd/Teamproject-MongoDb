"use client";
import { FaHiking } from "react-icons/fa";

import React, { useEffect, useRef } from "react";
import MouseSpotlight from "../components/Mouselight";
import gsap from "gsap";
import { Carousel } from "@/components/ui/carousel";
import { CarouselCat } from "../components/Carousel";
import { Button } from "@/components/ui/button";

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Button } from "./components/Button";
// import { FullCategory } from "./components/Fullcategory";
// import { useEffect, useRef } from "react";
// import { text } from "stream/consumers";

// gsap.registerPlugin(ScrollTrigger);

// export default function Home() {
//   const boxRef = useRef(null);
//   const titleRef = useRef(null);
//   const textRef = useRef(null);

//   useEffect(() => {
//     gsap.fromTo(
//       boxRef.current,
//       { y: 200, opacity: 1 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 1,
//         ease: "sine.inOut",
//         scrollTrigger: {
//           trigger: boxRef.current,
//           start: "top 100%", // when the top of element hits 80% of viewport
//           toggleActions: "play pause resume reset", // play on enter, do nothing on leave, reverse on re-enter
//         },
//       }
//     );

//     gsap.fromTo(
//       titleRef.current,
//       { y: 100, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 1,
//         scrollTrigger: {
//           trigger: titleRef.current,
//           start: "top 80%",
//           toggleActions: "play pause resume reset",
//         },
//       }
//     );
//     gsap.fromTo(
//       textRef.current,
//       { x: 400, opacity: 0 },
//       {
//         x: 0,
//         opacity: 1,
//         duration: 1,
//         scrollTrigger: {
//           trigger: textRef.current,
//           start: "top 20%",
//           toggleActions: "play pause resume reset",
//         },
//       }
//     );
//   }, []);

//   return (
//     <div className="w-full h-full overflow-hidden flex flex-col bg-white">
//       <div className="w-full h-full flex  justify-center items-center flex-col bg-white">
//         <div
//           ref={boxRef}
//           onMouseEnter={() =>
//             gsap.to(boxRef.current, {
//               duration: 0.3,
//               width: 1500,
//             })
//           }
//           onMouseLeave={() =>
//             gsap.to(boxRef.current, { width: 1500, duration: 0.3 })
//           }
//         >
//           <img
//             className="w-[1500px] h-[700px] mb-1 rounded-md"
//             src="https://alpsinsight.com/wp-content/uploads/2019/02/15CL0415.jpg"
//             alt=""
//           />
//         </div>

//         <div
//           ref={titleRef}
//           className="pt-4 w-full text-center flex flex-col items-center"
//         >
//           <h1 className="text-[48px] text-gray-400">
//             Welcome to <span className="text-[#0ea2bd]">Our project</span>
//           </h1>
//           <p className="text-gray-700">
//             Et voluptate esse accusantium accusamus natus reiciendis quidem
//             voluptates similique aut.
//           </p>
//           <div className="flex pt-10">
//             <Button />
//           </div>
//         </div>

//         <div className="pt-10">{/* <FullCategory /> */}</div>
//       </div>
//       <div className="w-screen h-[800px]">
//         <div
//           ref={textRef}
//           className="text-[48px] text-center  items-center flex   justify-center  pt-20"
//         >
//           <div className=" text-black">
//             <p>About us</p>
//             <p className="text-start">
//               Lorem ipsum dolor sit amet consectetur, adipisicing elit.
//               Blanditiis quasi aut commodi porro, eaque voluptatum explicabo
//               nisi pariatur fuga dicta, dolorum magnam, sit nostrum soluta et
//               cupiditate atque laborum. Recusandae! Lorem ipsum dolor sit amet
//               consectetur adipisicing elit. Iste quaerat rerum debitis.
//               Doloremque aperiam ad molestiae tempora eligendi sint mollitia,
//               quaerat, quos autem eum, earum recusandae facere! Sapiente, at
//               veniam!
//             </p>
//           </div>
//         </div>
//       </div>
//       <footer className="w-full h-[500px] bg-">
//         <div>
//           <div>
//             <div className="flex items-center space-x-2">
//               <div className="text-3xl font-extrabold text-teal-600 tracking-tight">
//                 Zg
//               </div>
//               <div className="w-2 h-1 bg-teal-400 rounded-full"></div>
//               <div className="text-3xl font-extrabold text-blue-900 tracking-tight">
//                 ly
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
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
