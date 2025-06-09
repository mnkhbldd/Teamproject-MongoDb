import Image from "next/image";
import { StarRating } from "./StarRating";

export const CompanyReview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border-b border-gray-100 last:border-b-0 bg-white">
      {/* Students & Courses Column */}
      <div className="flex items-start gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <Image
            src={"/logo1.png"}
            alt={"user"}
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 text-lg">User</h3>
          <p className="text-gray-600 text-sm">
            Course - <span className="font-medium">software engineer</span>
          </p>
        </div>
      </div>

      {/* Ratings & Reviews Column */}
      <div className="space-y-3">
        <StarRating rating={5} />
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
          This is wanderful course for bigenar. It&apos;s great for Light photo be
          very high professional.
        </p>
      </div>

      {/* Posted Date Column */}
      <div className="flex justify-start md:justify-end">
        <div className="text-gray-600 text-sm font-medium">2025/06/06</div>
      </div>
    </div>
  );
};
