type CategoryProps = {
  img: string;
  title: string;
  discription?: string;
};
export const Category = ({ img, title }: CategoryProps) => {
  return (
    <div>
      <div className="w-[240px] h-[240px] rounded-full  text-center flex flex-col ">
        <img
          className="w-[237px] h-[240px] rounded-md  text-transparent"
          src={img}
        />
        <p className="text-[20px] text-gray-700 ">{title}</p>
      </div>
    </div>
  );
};
