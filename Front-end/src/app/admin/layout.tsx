"use client";
import { Button } from "@/components/ui/button";
import { Rabbit, Star } from "lucide-react";

import { LayoutDashboard, BarChart3, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="h-full w-full flex bg-black">
      <div className="w-64">
        <div className="flex gap-2 items-center py-5 px-12 border border-gray-500">
          <Rabbit size={45} className="text-purple-500" />
          <p className="text-purple-500 font-bold text-2xl">Freely</p>
        </div>
        <nav className="border border-gray-500 h-screen pt-[20px] flex flex-col gap-4">
          <Button
            onClick={() => router.push("/admin/dashboard")}
            className="w-full justify-start gap-2 bg-black hover:bg-gray-500"
          >
            <LayoutDashboard className="h-4 w-4 text-white" />
            <p className="text-white">Dashboard</p>
          </Button>
          <Button
            onClick={() => router.push("/admin/company")}
            className="w-full justify-start gap-2 bg-black hover:bg-gray-500"
          >
            <BarChart3 className="h-4 w-4 text-white" />
            <p className="text-white">Company</p>
          </Button>
          <Button
            onClick={() => router.push("/admin/reviews")}
            className="w-full justify-start gap-2 bg-black hover:bg-gray-500"
          >
            <Star className="h-4 w-4 text-white" />
            <p className="text-white">Reviews</p>
          </Button>
          <Button
            onClick={() => router.push("/admin/settings")}
            className="w-full justify-start gap-2 bg-black hover:bg-gray-500"
          >
            <Settings className="h-4 w-4 text-white" />
            <p className="text-white">Settings</p>
          </Button>
        </nav>
      </div>
      <div>{children}</div>
    </div>
  );
}
