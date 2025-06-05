import Image from "next/image";
import {
  Heart,
  MapPin,
  Star,
  Zap,
  Lightbulb,
  Building,
  Car,
  ArrowUpDown,
  Wifi,
  Target,
  Hand,
  VibrateIcon as Volleyball,
  ShoppingBasketIcon as Basketball,
} from "lucide-react";
import {Button} from "@/components/ui/button";

export const CompanyDetailCard = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="overflow-hidden bg-white rounded-3xl shadow-lg border-2 border-green-200">
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Image section */}
          <div className="relative lg:w-1/2">
            <div className="relative aspect-[4/3] lg:aspect-square">
              <Image
                src="/venue-image.png"
                alt="Novel sports hall interior"
                fill
                className="object-cover"
              />

              {/* Heart icon */}
              <button className="absolute top-4 left-4 p-2 bg-black/20 rounded-full text-white hover:bg-black/30 transition-colors">
                <Heart className="w-5 h-5" />
              </button>

              {/* Price tag */}
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full font-medium">
                Цагийн 175,000₮
              </div>

              {/* Rating and review */}
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl font-bold">2.5</span>
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
                </div>
                <div className="text-sm opacity-90">2 сэтгэгдэл</div>
              </div>

              {/* Special button */}
              <Button className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium">
                ОНЦГОЙ
              </Button>
            </div>
          </div>

          {/* Right side - Details section */}
          <div className="lg:w-1/2 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Novel спорт заал
            </h1>

            {/* Location */}
            <div className="flex items-start gap-3 mb-8">
              <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
              <p className="text-gray-600 leading-relaxed">
                СБД, 3-р сүргүүлийн урд талд зам дагуу Novel оффисын 2-р давхарт
                /гадна тал нь 5 давхар цагаан/
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-700 font-medium">Боломжууд :</span>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Zap className="w-6 h-6 text-orange-500" />
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Lightbulb className="w-6 h-6 text-orange-500" />
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Building className="w-6 h-6 text-orange-500" />
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Car className="w-6 h-6 text-orange-500" />
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <ArrowUpDown className="w-6 h-6 text-orange-500" />
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Wifi className="w-6 h-6 text-orange-500" />
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Target className="w-6 h-6 text-orange-500" />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4 mb-6">
                <button className="p-4 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
                  <Hand className="w-6 h-6 text-gray-600" />
                </button>
                <button className="p-4 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
                  <Volleyball className="w-6 h-6 text-gray-600" />
                </button>
                <button className="p-4 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
                  <Basketball className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Bottom right icons */}
            <div className="flex justify-end gap-3">
              <button className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <MapPin className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Image
                  src="/placeholder.svg?height=20&width=20"
                  alt="Gallery"
                  width={20}
                  height={20}
                  className="opacity-60"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
