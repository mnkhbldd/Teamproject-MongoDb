"use client";
import { ExploreMap } from "@/app/admin/company/components/ExploreMap";
import { SideBarExplore } from "@/app/admin/company/components/SideBarExplore";

type CategoryData = {
  id: number;
  name: string;
  icon: string;
};
const ExplorePage = () => {
  return (
    <div>
      <div className="h-screen w-screen flex ">
        <div className="w-[35%]">
          <SideBarExplore />
        </div>
        <div className="w-[65%]">
          <ExploreMap />
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
