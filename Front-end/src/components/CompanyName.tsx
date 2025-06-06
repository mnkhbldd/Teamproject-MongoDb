import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const CompanyName = () => {
  return (
    <div className=" w-full flex items-center gap-6">
      <Avatar className="w-10 h-10">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h1 className="text-4xl font-black">Company Name</h1>
    </div>
  );
};
