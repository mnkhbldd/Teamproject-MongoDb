import { Category } from "./Category";
import { GsapCategory } from "./Gsapcatergoy";

export const FullCategory = () => {
  return (
    <div className="flex pt-10  px-4 gap-9 flex-wrap h-full  ">
      <GsapCategory></GsapCategory>
      <GsapCategory></GsapCategory>
      <GsapCategory></GsapCategory>
      <GsapCategory></GsapCategory>
      <GsapCategory></GsapCategory>
    </div>
  );
};
