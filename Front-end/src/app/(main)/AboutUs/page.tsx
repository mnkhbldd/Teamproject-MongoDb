"use client";

import React from "react";
import {SparklesCore} from "@/components/sparkles";
import {ColourfulText} from "@/components/colourful-text";
import {FocusCards} from "@/components/focus-cards";
import dynamic from "next/dynamic";
import {StarRating} from "@/components/StarRating";
import {StarRatingComponent} from "@/components/StarRatingComponent";

const AnimatedTestimonials = dynamic(
  () => import("@/components/animated-tesimonials"), // Adjust the path to where your component lives
  {ssr: false}
);

const AboutUs = () => {
  const testimonials = [
    {
      quote: "Кодыг гараараа бичдэг юм шүү.",
      name: "Munkhbold.Ts",
      designation: "Team leader, fullstack developer",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Bat-Ochir.G",
      designation: "Fullstack developer",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Tumen-Ulzii",
      designation: "Fullstack developer",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "Bayarjavkhlan",
      designation: "Front-end developer",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Oyunbayar.B",
      designation: "Front-end developer",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const cards = [
    {
      title: "Connect People Through Sports",
      src: "https://t3.ftcdn.net/jpg/05/45/10/00/360_F_545100005_7OAaPMqdOyDxxaCBXmg1Foun1wLJDN02.jpg",
    },
    {
      title: "Discover Local Sports Events",
      src: "https://media.istockphoto.com/id/1972315370/photo/happy-black-family-cheering-from-the-stands-during-sports-match-at-the-stadium.jpg?s=612x612&w=0&k=20&c=zf8JcAsKjkWUvXy1asJlnWyof4Obs-VD9KY1fpBL8pM=",
    },
    {
      title: "Promote Clubs and Activities",
      src: "https://www.heathermitts.com/wp-content/uploads/2024/08/Major-Event-Community-Engagement-09113-03_thumb.jpeg",
    },
    {
      title: "Organize and Manage Events",
      src: "https://e7v7eoh5g4s.exactdn.com/wp-content/uploads/2022/12/organizzazione-eventi-sport.jpg",
    },
    {
      title: "Encourage a Healthy Lifestyle",
      src: "https://doy-community.sites.uu.nl/wp-content/uploads/sites/918/2022/12/thriving-nieuw-2048x1367.jpg",
    },
    {
      title: "Build a Sports Community",
      src: "https://i0.wp.com/www.hiveclass.co/wp-content/uploads/2023/06/Edited-Images-2.png?w=1538&ssl=1",
    },
  ];

  return (
    <div className="">
      <div className="h-fit w-full bg-black flex flex-col items-center  overflow-hidden rounded-md gap-10">
        <div className="w-full bg-black pt-[7rem] flex flex-col items-center justify-center overflow-hidden rounded-md">
          <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
            Doing sports is the
            <ColourfulText text=" main" />
            <br /> <ColourfulText text="purpose " />
            of your life.
          </h1>
          <div className="w-[40rem] h-40 relative">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            {/* Core component */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />

            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>
        <AnimatedTestimonials testimonials={testimonials} />;
        <h1 className="text-6xl text-neutral-700 font-sans">What We Do</h1>
        <FocusCards cards={cards} />
        <div className="w-full h-[50px]"></div>
      </div>
    </div>
  );
};

export default AboutUs;
