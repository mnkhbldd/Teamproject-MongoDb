import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const CompanyName = ({
  avatarURL,
  name,
}: {
  avatarURL: string | undefined;
  name: string | undefined;
}) => {
  return (
    <div className=" px-20 py-3 flex items-center">
      <div className="max-w-[1350px]">
        <div className="flex items-center gap-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={avatarURL} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl font-black">{name}</h1>
        </div>
      </div>
    </div>
  );
};
