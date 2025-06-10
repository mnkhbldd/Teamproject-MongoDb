"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const CarouselImage = ({
  imageSrc,
}: {
  imageSrc: string[] | undefined;
}) => {
  const carouselItems = imageSrc;
  console.log(carouselItems);

  const [currentIndex, setCurrentIndex] = useState(2); // Start with middle item
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % carouselItems!.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev - 1 + carouselItems!.length) % carouselItems!.length
    );
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const absIndex = Math.abs(diff);

    if (absIndex === 0) {
      // Center card
      return {
        transform: "translateX(0) translateZ(0) rotateY(0deg) scale(1)",
        zIndex: 10,
        opacity: 1,
      };
    } else if (absIndex === 1) {
      // Adjacent cards
      const direction = diff > 0 ? 1 : -1;
      return {
        transform: `translateX(${
          direction * 200
        }px) translateZ(-300px) rotateY(${-direction * 25}deg) scale(0.85)`,
        zIndex: 5,
        opacity: 0.8,
      };
    } else if (absIndex === 2) {
      // Second level cards
      const direction = diff > 0 ? 1 : -1;
      return {
        transform: `translateX(${
          direction * 200
        }px) translateZ(-200px) rotateY(${-direction * 45}deg) scale(0.7)`,
        zIndex: 3,
        opacity: 0.6,
      };
    } else {
      // Hidden cards
      const direction = diff > 0 ? 1 : -1;
      return {
        transform: `translateX(${
          direction * 280
        }px) translateZ(-300px) rotateY(${-direction * 60}deg) scale(0.5)`,
        zIndex: 1,
        opacity: 0.3,
      };
    }
  };

  return (
    <div className="box w-full h-[500px] flex items-center justify-center px-2">
      <div className="w-full">
        <div className="relative">
          {/* Carousel Container */}
          <div
            className="relative flex items-center justify-center"
            style={{ perspective: "1000px" }}
          >
            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 z-20  hover:bg-white shadow-lg rounded-full w-12 h-12 transition-all duration-300 hover:scale-110"
              onClick={prevSlide}
              disabled={isAnimating}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 z-20 hover:bg-white shadow-lg rounded-full w-12 h-12 transition-all duration-300 hover:scale-110"
              onClick={nextSlide}
              disabled={isAnimating}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Cards */}
            <div className="relative w-full h-full flex items-center justify-center">
              {carouselItems?.map((item: string, index: number) => {
                const style = getCardStyle(index);
                return (
                  <div
                    key={index}
                    className="absolute w-150 h-100 rounded-2xl shadow-2xl cursor-pointer transition-all duration-500 ease-out overflow-hidden bg-white"
                    style={style}
                    onClick={() => goToSlide(index)}
                  >
                    {/* Image */}
                    <div className="relative w-full h-full">
                      <Image
                        src={item || "/placeholder.svg"}
                        alt="image"
                        fill
                        className="object-cover rounded-2xl"
                        sizes="(max-width: 768px) 100vw, 256px"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
