type CategoryProps = {
  img: string;
  title: string;
  discription?: string;
};
export const Category = ({ img, title, discription }: CategoryProps) => {
  return (
    <div className="flex pt-10">
      <div className="px-3  py-2 w-[240px] h-[240px] bg-white flex flex-col rounded-md ">
        <img
          className="w-[60px] h-[50px] opacity-10 text-transparent"
          src={img}
        />
        <p className="text-[20px] text-gray-700 ">{title}</p>
        <p className="text-[16px] text-gray-500">{discription}</p>
      </div>
    </div>
  );
};
