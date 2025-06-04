"use client";
import React from "react";
import { AnimatedTooltip } from "./AnimatedToolTip";

const people = [
  {
    id: 1,
    name: "Shining sky",
    designation: "North America",
    image: "/img.jpg",
  },
  {
    id: 2,
    name: "Mother tree",
    designation: "Mongolia",
    image: "/img2.jpg",
  },
  {
    id: 3,
    name: "Khentii mountain",
    designation: "Mongolia",
    image: "/img3.jpg",
  },
  {
    id: 4,
    name: "Skyscaper",
    designation: "Saudi Arabia",
    image: "/img4.jpg",
  },
  {
    id: 5,
    name: "Everest",
    designation: "Republik of America",
    image: "/img5.jpg",
  },
  {
    id: 6,
    name: "One Tree",
    designation: "China",
    image: "img6.jpg",
  },
];

export const Placesdata = () => {
  return (
    <div className="w-full h-full flex justify-center pt-20 pb-20 bg-gradient-to-b from-gray-900 to-gray-700">
      <AnimatedTooltip items={people} />
    </div>
  );
};
