import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const CompanyName = () => {
  return (
    <div className="pt-8 w-full flex items-center gap-6">
      <Avatar className="w-15 h-15">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h1 className="text-6xl font-black">Company Name</h1>
    </div>
  );
};
