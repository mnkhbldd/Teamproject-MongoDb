"use client";
import Image from "next/image";
import { MapPin } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";

interface CategoryData {
  id: number;
  name: string;
  icons: string;
}

interface Company {
  _id: string;
  name: string;
  description: string;
  location: Array<{
    address: string;
    coordinate: [number, number];
  }>;
  phoneNumber: string;
  categoryIds: string[];
  socialMedia: {
    Facebook: string;
    instagram: string;
    website: string;
  };
  images: string[];
  companyLogo: string;
}

export const CompanyDetailCard = ({ company }: { company: Company }) => {
  const [categoryIconsData, setCategoryIconsData] = useState<CategoryData[]>(
    []
  );

  useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await axiosInstance.get("/category/");
        console.log(res.data.data, "category");
        const filteredCategories = res.data.data.filter(
          (category: CategoryData) =>
            company.categoryIds.includes(category.id.toString())
        );
        setCategoryIconsData(filteredCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (company?.categoryIds?.length) {
      FetchData();
    }
  }, [company?.categoryIds]);
  return (
    <div className="w-full">
      <div className="w-full h-fi rounded-[12px] shadow-lg border-2  backdrop-blur-lg bg-[#111827]/30  flex">
        <Carousel className="w-[50%] h-fit">
          <CarouselContent className="w-full h-fit rounded-[12px]">
            {company.images.map((image: string, index: number) => (
              <CarouselItem key={index} className="w-full h-[202px]">
                <div className="w-full h-[202px] relative">
                  <Image
                    src={image}
                    alt="Novel sports hall interior"
                    fill
                    className="object-cover w-full h-full rounded-[12px] "
                    sizes="w-full h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-15 size-5 rounded-[8px]" />
          <CarouselNext className="mr-18 size-5 rounded-[8px]" />
        </Carousel>
        <div className="w-[50%] p-2 flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={company.companyLogo} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-[14px] text-[#e3e8ffe6] font-semibold">
              {company.name}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-[12px] text-[#e3e8ffe6]">
              <span>
                <MapPin className="size-5 inline text-[#e3e8ffe6]" />
              </span>
              {"   "}
              {company.location[0].address}
            </p>
          </div>
          <div className="w-full h-[1px] bg-gray-200">
            <div className="pt-2">
              <p className="text-[12px] text-[#e3e8ffe6]">What included?</p>
              <div
                className="w-full flex gap-2 p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-[#e3e8ffe6] scrollbar-track-transparent"
                style={
                  {
                    scrollbarWidth: "thin",
                    scrollbarColor: "#e3e8ffe6 transparent",
                    msOverflowStyle: "none",
                  } as React.CSSProperties
                }
              >
                {categoryIconsData.length > 0 ? (
                  categoryIconsData.map((value, index) => (
                    <div
                      key={index}
                      className="flex items-center border rounded-full px-2 w-fit"
                    >
                      <span className="text-lg">{value.icons}</span>
                      <span className="text-[#e3e8ffe6] text-[12px] hover:text-black">
                        {value.name}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-[#e3e8ffe6] text-[12px]">
                    No categories found
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
