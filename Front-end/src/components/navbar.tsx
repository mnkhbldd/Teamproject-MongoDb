"use client";
import { ChevronDown, Rabbit } from "lucide-react";
import { Inter } from "next/font/google";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";

const interFont = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-gray-300 hover:text-white transition-colors relative group"
    >
      <span className="block">{children}</span>
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
    </a>
  );
}

export default function NavBar() {
  const { user, isLoaded } = useUser();
  return (
    <div className="flex justify-between items-center w-screen h-16 bg-black border border-white">
      <div className="flex gap-2 items-center p-4">
        <Rabbit size={45} className="text-purple-500" />
        <p className="text-white font-bold text-2xl">Freely</p>
      </div>
      <div className="flex gap-9">
        <NavLink href="/">
          <span className={`${interFont.className}`}>Home</span>
        </NavLink>
        <NavLink href="/explore">
          <span className={`${interFont.className}`}>Explore</span>
        </NavLink>
        <NavLink href="/recommendations">
          <span className={`${interFont.className}`}>Recommendations</span>
        </NavLink>
        <NavLink href="/about-us">
          <span className={`${interFont.className}`}>About Us</span>
        </NavLink>
      </div>
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton className="text-white" />
          <SignUpButton className="text-white" />
        </SignedOut>
        <SignedIn>
          {isLoaded && user && (
            <div
              className="flex gap-4 items-center cursor-pointer"
              onClick={() => {
                const userButton = document.querySelector(
                  ".cl-userButtonTrigger"
                );
                if (userButton) (userButton as HTMLElement).click();
              }}
            >
              <UserButton
                appearance={{
                  elements: {
                    userButtonTrigger: { display: "none" },
                    popoverContent: {
                      transform: "translateX(-200px)",
                      marginTop: "8px",
                    },
                  },
                }}
              />
              <Image
                src={user.imageUrl}
                alt={user.username || user.firstName || "User"}
                width={32}
                height={32}
                className="rounded-full"
              />
              <p className="font-medium">
                {user.username || user.firstName || "User"}
              </p>
              <ChevronDown className="size-[16px]" />
            </div>
          )}
        </SignedIn>
      </div>
    </div>
  );
}
