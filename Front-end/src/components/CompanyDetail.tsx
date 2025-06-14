"use client";

import gsap from "gsap";

import { useEffect, useState, useCallback } from "react";
import ReviewsPage from "./ReviewPage";
import { CompanyName } from "./CompanyName";
import { CarouselImage } from "./CarouselImage";
import { MapInfo } from "./MapInfo";
import { About } from "./About";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookingDate } from "@/app/admin/company/components/BookingDate";
import axiosInstance from "@/utils/axios";
import { useParams } from "next/navigation";

interface Company {
  _id: string;
  name: string;
  description: string;
  location: Array<{
    address: string;
    coordinate: [number, number];
  }>;
  phoneNumber: string;
  category: string[];
  socialMedia: [
    {
      Facebook: string;
      instagram: string;
      website: string;
    }
  ];
  images: string[];
  companyLogo: string;
}

export const CompanyDetail = () => {
  const [data, setData] = useState<Company>();
  useEffect(() => {
    gsap.fromTo(
      ".box",
      { x: -500, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5 }
    );
  }, []);
  const { id } = useParams();

  const getCompanyId = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/company/get-company/${id}`);
      setData(res.data.company);
    } catch (error) {
      console.log(error);
    }
  }, [id, setData]);

  useEffect(() => {
    getCompanyId();
  }, [getCompanyId]);

  console.log(data, "data");

  return (
    <div className="bg-white h-screen overflow-hidden">
      <div className="flex flex-col px-8 gap-8">
        <div className="flex w-full justify-around pt-12">
          <ScrollArea className="h-screen scrollbar-hide ">
            <div className="px-4 pt-8 pb-[200px] flex flex-col">
              <CompanyName avatarURL={data?.companyLogo} name={data?.name} />
              <CarouselImage imageSrc={data?.images} />
              <About description={data?.description} />
              <ReviewsPage />
              <BookingDate />
            </div>
          </ScrollArea>

          <div className="pt-25">
            {data?.location?.[0] && (
              <MapInfo
                position={data.location[0].coordinate}
                facebook={data.socialMedia[0].Facebook}
                instagram={data.socialMedia[0].instagram}
                website={data.socialMedia[0].website}
                address={data.location[0].address}
                number={data.phoneNumber}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
