import { CompanyReview } from "@/components/CompanyReview";
import { HeaderReview } from "@/components/HeaderReview";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Reviews() {
  return (
    <div className="w-screen bg-gray-200 h-screen rounded-lg">
      <div className="mb-6 flex items-center justify-between px-4 pt-4">
        <div>
          <h1 className="text-3xl font-medium text-gray-700">Reviews</h1>
          <p className="text-gray-500">Welcome to angular application</p>
        </div>
      </div>
      <div className="w-[96.5%] h-screen px-30">
        <ScrollArea className="h-[1000px]">
          <HeaderReview />
          <CompanyReview />
          <CompanyReview />
          <CompanyReview />
          <CompanyReview />
          <CompanyReview />
          <CompanyReview />
          <CompanyReview />
          <CompanyReview />
          <CompanyReview />
          <CompanyReview />
          <CompanyReview />
        </ScrollArea>
      </div>
    </div>
  );
}
