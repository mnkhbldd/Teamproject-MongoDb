import Image from "next/image";
import {
  MapPin,
  Star,
  VibrateIcon as Volleyball,
  ShoppingBasketIcon as Basketball,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Dribbble,
  Snail,
} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const CompanyDetailCard = () => {
  return (
    <div className="pt-40 pl-10">
      <div className="w-[700px] bg-white rounded-3xl shadow-lg border-2 border-blue-400 flex p-5 gap-3">
        {/* Left side - Image section */}
        <div className="w-[50%] h-fit flex-col flex gap-3">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <Image
                  src="/Gzaal.png"
                  alt="Novel sports hall interior"
                  width={300}
                  height={50}
                  className="object-cover rounded-3xl shadow-lg"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/Gzaal.png"
                  alt="Novel sports hall interior"
                  width={300}
                  height={50}
                  className="object-cover rounded-3xl shadow-lg"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/Gzaal.png"
                  alt="Novel sports hall interior"
                  width={300}
                  height={50}
                  className="object-cover rounded-3xl shadow-lg"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="ml-15 size-5" />
            <CarouselNext className="mr-20 size-5" />
          </Carousel>

          {/* Rating and review */}
          <div className="w-full flex gap-2 items-center absolute mt-50 ml-20">
            <span className="font-mono text-gray-600">2.5</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= 2
                      ? "fill-orange-400 text-orange-400"
                      : star === 3
                      ? "fill-orange-400 text-orange-400"
                      : "text-gray-400"
                  }`}
                />
              ))}
            </div>
            <span className="font-[6px] text-gray-600">2 сэтгэгдэл</span>
          </div>
        </div>
        {/* Right side - Details section */}
        <div className="w-[50%] h-fit flex-col items-center justify-center gap-2 flex">
          <div className="flex gap-1 justify-center items-center">
            <Snail className="size-13" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Novel спорт заал
              </h1>
              <h1 className="text-[12px] text-gray-800 mb-2">
                "We provide awesome services."
              </h1>
            </div>
          </div>

          {/* Location */}
          <div className="flex gap-3 flex-col">
            <div className="flex gap-1">
              <MapPin className="size-5 text-blue-500" />
              <p className="text-gray-600 text-[12px]">
                СБД, 3-р сүргүүлийн урд талд зам дагуу Novel оффисын 2-р давхарт
                /гадна тал нь 5 давхар цагаан/
              </p>
            </div>

            {/* Phone number, Social media info */}
            <div className="flex flex-col">
              <div className="flex gap-5">
                <div className="flex gap-1">
                  <Phone className="size-3 text-blue-500" />
                  <p className="text-gray-600 text-[12px]">9999-9999</p>
                </div>
                <div className="flex gap-1">
                  <Facebook className="size-3 text-blue-500" />
                  <p className="text-gray-600 text-[12px]">www.facebook.com</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex gap-1">
                  <Instagram className="size-3 text-blue-500" />
                  <p className="text-gray-600 text-[12px]">
                    www.instagramm.com
                  </p>
                </div>
                <div className="flex gap-1">
                  <Dribbble className="size-3 text-blue-500" />
                  <p className="text-gray-600 text-[12px]">www.freely.com</p>
                </div>
              </div>
            </div>

            {/* Available sports info */}
            <div className="flex flex-col items-center">
              <p className="text-gray-500 text-[12px]">Available Sports:</p>
              <div className="flex gap-3 text-gray-500">
                <Dribbble /> <Dribbble /> <Dribbble /> <Dribbble />
                <Dribbble />
                <Dribbble />
                <Dribbble />
                <Dribbble />
              </div>
            </div>
          </div>

          <div className="flex">
            <button className="text-[16px] rounded-3xl shadow-lg border-2 bg-blue-400 border-blue-600 w-[200px] h-fit">
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
