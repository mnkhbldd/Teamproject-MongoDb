export const About = ({ description }: { description: string | undefined }) => {
  return (
    <div className="flex flex-col w-full justify-center gap-5 border-b-2 pb-8">
      <p className="text-2xl font-black">ABOUT THIS PLACE</p>
      <h3 className="w-300 text-xl">{description}</h3>
    </div>
  );
};
