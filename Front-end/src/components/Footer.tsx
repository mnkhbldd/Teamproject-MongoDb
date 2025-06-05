import { IoAirplaneSharp } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
export const Footer = () => {
  return (
    <div className="w-full h-[400px] text-[14px]  text-white bg-[url(/theme2.avif)] bg-cover bg-no-repeat">
      <div className="flex justify-between px-20  items-center">
        <div className="flex flex-col pt-6">
          <div className="flex gap-4">
            <button className="hover:text-blue-700">Terms & policies</button>
            <button className="hover:text-blue-700">Privacy policy</button>
          </div>
          <div className="flex items-center">
            <IoAirplaneSharp color="white" />1 Freely 2025.All Rights Reserved
          </div>
        </div>
        <div className="flex gap-5">
          <button className="hover:text-blue-700">Careers</button>
          <button className="hover:text-blue-700">Destination</button>
          <button className="hover:text-blue-700">Price</button>
          <button className="hover:text-blue-700">Packages</button>
        </div>
        <div className="flex-col pt-17">
          <button className="hover:text-blue-700">About us</button>
          <div>
            <p>Location : BAYANGOL district 14th khoroo walkingstreet</p>
            <p>Phone : 96190620</p>
            <div className="flex items-center gap-4">
              <FaFacebook size={20} />
              <AiFillInstagram size={25} />
              <FaGithub size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
