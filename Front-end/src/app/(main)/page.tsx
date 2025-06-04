"use client";

import React from "react";

import { BackgroundBeamsWithCollision } from "@/components/background-beams-with-collision";
import { TextGenerateEffect } from "@/components/text-generate-effect";
import Image from "next/image";

export default function Home() {
  const words =
    "With Freely, businesses can showcase their activities and start getting bookings in minutes—so every adventure stays exciting and effortless, no matter how big your audience grows.";

  return (
    <div className="w-full">
      <BackgroundBeamsWithCollision>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-[rgba(227,232,255,0.9)] dark:text-white font-sans tracking-tight">
            U looking for best activity site?{" "}
            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
              <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                <span className="">Freely is for you</span>
              </div>
              <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                <span className="">Freely is for you</span>
              </div>
            </div>
          </h2>
          <TextGenerateEffect
            words={words}
            className=" text-center max-w-2xl  "
          />

          <div className="flex gap-6 pt-6">
            <button className="min-w-[100px] relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Join us
              </span>
            </button>
            <button className="min-w-[100px] relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Learn More
              </span>
            </button>
          </div>
        </div>
      </BackgroundBeamsWithCollision>

      <div className="w-full h-[80px] bg-gray-900 flex items-center justify-center">
        <div className="flex items-center justify-center w-full gap-30">
          <div className="flex gap-[30px] items-center">
            <p className="text-[13px] font-bold text-[rgba(227,232,255,0.21)]">
              Trusted <br /> by
            </p>
            <div className="h-[35px] w-[1px] bg-[rgba(227,232,255,0.21)]"></div>
          </div>

          <div className="flex gap-[100px]">
            {" "}
            <Image
              src="/logo1.png"
              width={40}
              height={40}
              alt=""
              className="w-10"
              style={{
                maskImage: "linear-gradient(to left, black, transparent)",
                WebkitMaskImage: "linear-gradient(to left, black, transparent)",
              }}
            />
            <Image
              width={40}
              height={40}
              src="/logo2.png"
              alt=""
              className="w-10"
            />
            <Image
              width={40}
              height={40}
              src="/logo3.png"
              alt=""
              className="w-10"
            />
            <Image
              width={40}
              height={40}
              src="/logo4.png"
              alt=""
              className="w-10"
            />
            <Image
              width={40}
              height={40}
              src="/logo5.png"
              alt=""
              className="w-10"
              style={{
                maskImage: "linear-gradient(to right, black, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, black, transparent)",
              }}
            />
          </div>
        </div>
      </div>

      {/* <div className="fixed bottom-4 right-4 p-4 bg-gray-900/80 backdrop-blur-lg rounded-lg border border-gray-800">
        {loading && <p className="text-white">Loading user data...</p>}
        {error && <p className="text-red-400">Error: {error.message}</p>}
        {user && (
          <div>
            <p className="text-white">Welcome, {user.firstName || "User"}</p>
            <p className="text-gray-400">Email: {user.email}</p>
          </div>
        )}
      </div> */}
    </div>
  );
}
