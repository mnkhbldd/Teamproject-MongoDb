import { ExploreMap } from "@/app/admin/company/components/ExploreMap";

const ExplorePage = () => {
  return (
    <div>
      <div className="bg-black h-[50px]"></div>
      <div className="h-screen w-screen flex ">
        <div className="w-[25%] bg-red-500">hello</div>
        <div className="w-[75%] bg-blue-500">
          <ExploreMap />
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
