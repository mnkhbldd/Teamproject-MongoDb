import { ExploreMap } from "@/app/admin/company/components/ExploreMap";

const ExplorePage = () => {
  return (
    <div>
      <div className="bg-black h-[50px]"></div>
      <div className="w-screen h-screen flex">
        <div className="w-[25%] h-full bg-red-500">hello</div>
        <div className="w-[75%] h-full bg-blue-500">hello1</div>
      </div>
    <div className="h-screen w-screen flex pt-12">
      <div className="w-[25%] bg-red-500">hello</div>
      <div className="w-[75%] bg-blue-500">
        <ExploreMap />
      </div>
    </div>
  );
};

export default ExplorePage;
