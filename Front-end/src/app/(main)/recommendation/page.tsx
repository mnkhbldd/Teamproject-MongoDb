"use client";
import React from "react";

export default function Recommendation() {
  const mockdata = [
    {
      id: "test-1",
      time: new Date(Date.now()).toString(),
      Status: "pending",
      price: "72000",
      isSale: " true",
    },
    {
      id: "test-2",
      time: new Date(Date.now()).toString(),
      Status: "pending",
      price: "7500",
      isSale: " true",
    },
    {
      id: "test-3",
      time: new Date(Date.now()).toString(),
      Status: "pending",
      price: "7500",
      isSale: " true",
    },
    {
      id: "test-4",
      time: new Date(Date.now()).toString(),
      Status: "pending",
      price: "7500",
      isSale: " true",
    },
    {
      id: "test-5",
      time: new Date(Date.now()).toString(),
      Status: "pending",
      price: "7500",
      isSale: " true",
    },
    {
      id: "test-6",
      time: new Date(Date.now()).toString(),
      Status: "pending",
      price: "7500",
      isSale: " true",
    },
    {
      id: "test-7",
      time: new Date(Date.now()).toString(),
      Status: "pending",
      price: "7500",
      isSale: " true",
    },
    {
      id: "test-8",
      time: new Date(Date.now()).toString(),
      Status: "pending",
      price: "7500",
      isSale: " true",
    },
    {
      id: "test-9",
      time: new Date(Date.now()).toString(),
      Status: "pending",
      price: "7500",
      isSale: " true",
    },
  ];

  return (
    <div className="w-screen h-screen bg-black">
      <div className="w-full h-[50px] text-black flex flex-col  gap-10 pt-20 ">
        {mockdata.map((el) => (
          <div
            key={el.id}
            className=" border-1 rounded-lg p-[2px] bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-size-200 animate-gradient-x  text-black border-black px-10 flex items-center justify-between"
          >
            <p>{el.id}</p>
            <p>{el.time}</p>
            <p>{el.Status}</p>
            <p>{el.price}</p>
            <p>{el.isSale}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
