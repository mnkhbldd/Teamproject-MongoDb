// "use client";

import axiosInstance from "@/utils/axios";

// import gsap from "gsap";
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
//           start: "top 80%", // when the top of element hits 80% of viewport
//           toggleActions: "play pause resume reset", // play on enter, do nothing on leave, reverse on re-enter
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
//           start: "bottom 90%",
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

//         <div className="pt-10">
//           <FullCategory />
//         </div>
//       </div>
//       <div className="w-screen h-[800px]">
//         <p
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
//         </p>
//       </div>
//     </div>
//   );
// }

export default function Home() {
  const handleClick = async () => {
    const response = await axiosInstance.post("/company/create-company", {
      name: "test",
      description: "test",
      logo: "test",
      website: "test",
      category: "test",
      location: "test",
      phoneNumber: "test",
      email: "test",
    });
    console.log(response.data);
  };
  return (
    <div>
      Hello
      <button onClick={handleClick}>Click here</button>
    </div>
  );
}
