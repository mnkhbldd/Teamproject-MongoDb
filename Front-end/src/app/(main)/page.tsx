"use client";

import React from "react";

import {BackgroundBeamsWithCollision} from "@/components/background-beams-with-collision";
import {TextGenerateEffect} from "@/components/text-generate-effect";
import Image from "next/image";
import {AnimatedFooter} from "@/components/NextFooter";
import {InfiniteMovingCards} from "@/components/infinite-moving-cards";
import {StickyScroll} from "@/components/ui/sticky-scroll-reveal";

export default function Home() {
  const words =
    "With Freely, businesses can showcase their activities and start getting bookings in minutes—so every adventure stays exciting and effortless, no matter how big your audience grows.";

  const testimonials = [
    {
      quote:
        "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
      name: "Charles Dickens",
      title: "A Tale of Two Cities",
    },
    {
      quote:
        "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
      name: "William Shakespeare",
      title: "Hamlet",
    },
    {
      quote: "All that we see or seem is but a dream within a dream.",
      name: "Edgar Allan Poe",
      title: "A Dream Within a Dream",
    },
    {
      quote:
        "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
      name: "Jane Austen",
      title: "Pride and Prejudice",
    },
    {
      quote:
        "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
      name: "Herman Melville",
      title: "Moby-Dick",
    },
  ];
  const scrollContent = [
    {
      title: "Physical Health",
      description:
        "To provide an easy-to-use platform that helps users find and book sports activities, venues, and services in one place.",
      content: (
        <div className="flex h-full w-full items-center justify-center">
          <img
            src="./scroll1.jpg"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      title: "Mental Well-being",
      description:
        "To simplify the way people discover and join sports events, classes, and venues through a clear and accessible online system.",
      content: (
        <div className="flex h-full w-full items-center justify-center">
          <img
            src="./scroll2.jpg"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      title: "Social Connection",
      description:
        "To make it effortless for users to explore, reserve, and enjoy sports and fitness options via a streamlined digital platform.",
      content: (
        <div className="flex h-full w-full items-center justify-center">
          <img
            src="./scroll3.jpg"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      title: "Personal Growth",
      description:
        "To bring people and sports together by offering a smart, simple, and convenient online booking experience.",
      content: (
        <div className="flex h-full w-full items-center justify-center">
          <img
            src="./scroll4.jpg"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      title: "Life Balance and Recreation",
      description:
        "To create a centralized hub where users can easily access and book sports opportunities, locations, and services.",
      content: (
        <div className="flex h-full w-full items-center justify-center">
          <img
            src="./scroll5.jpg"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      title: "Cultural and Educational Impact",
      description:
        "To connect individuals with local sports and recreational services through a modern, efficient, and user-focused website.",
      content: (
        <div className="flex h-full w-full items-center justify-center">
          <img
            src="./scroll6.jpg"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
  ];

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

      {/* <div className="w-full h-[80px] bg-gray-900 flex items-center justify-center">
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
      </div> */}
      <StickyScroll content={scrollContent} />
      <div className="h-[40rem] w-full rounded-md flex flex-col antialiased bg-gray-900 dark:bg-black dark:bg-grid-white/[0.05]  justify-center relative overflow-hidden">
        <p className="text-[30px] font-bold text-[rgba(227,232,255,0.9)] pl-40">
          What they tell about us{" "}
        </p>
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
      <AnimatedFooter />
    </div>
  );
}
