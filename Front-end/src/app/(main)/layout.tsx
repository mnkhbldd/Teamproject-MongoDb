"use client";
import { Inter } from "next/font/google";
import { clsx } from "clsx";
import NavBar from "@/components/navbar";
import { useEffect } from "react";
import axiosInstance from "@/utils/axios";
import { useAuth } from "@clerk/nextjs";

const interFont = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      if (!isSignedIn) return;

      const token = await getToken();
      if (!token) return;

      try {
        const res = await axiosInstance.get("/user/get-current-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("User from backend:", res.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [isSignedIn, getToken]);

  return (
    <div
      className={clsx(
        "flex flex-col min-h-screen bg-background text-foreground",
        interFont.className
      )}
    >
      <NavBar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
