"use client";

import axiosInstance from "@/utils/axios";

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
      name: "test company",
      description: "test description",
      location: [
        {
          coordinate: [100.0, 100.0],
          address: "test address",
        },
      ],
      phoneNumber: 1234567890,
      category: "64c76e3d2d5e7f0008f9f9f9",
      socialMedia: [
        {
          instagram: "test",
          Facebook: "test",
          website: "test",
        },
      ],
      images: ["test"],
      companyLogo: "test",
      companyCoverImage: "test",
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
