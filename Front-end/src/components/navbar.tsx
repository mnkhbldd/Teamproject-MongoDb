"use client";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Inter } from "next/font/google";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import LogoIcon from "./LogoIcon";

const twkLausanneFont = {
  fontFamily: '"TWK Lausanne 400", "TWK Lausanne 400 Placeholder", sans-serif',
} as React.CSSProperties;

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
      <span className="block" style={twkLausanneFont}>
        {children}
      </span>
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 transition-all group-hover:w-full" />
    </a>
  );
}

export default function NavBar() {
  const { user, isLoaded } = useUser();
  return (
    <div className="w-full flex justify-center bg-[rgba(13, 13, 18, 0.4)] border-t border-b border-[rgba(255,255,255,0.1)] h-[50px] fixed z-50 ">
      <div className="flex items-center justify-between w-[1080px]">
        <div className="flex items-center gap-[15px]">
          <LogoIcon />

          <p
            className="text-[#B8CFCE] font-semibold text-[15px]"
            style={twkLausanneFont}
          >
            Freely
          </p>
        </div>
        <NavLink href="/">
          <span
            className={`text-[15px] text-[rgba(99,100,117)] hover:text-white`}
            style={twkLausanneFont}
          >
            Home
          </span>
        </NavLink>
        <NavLink href="/Explore">
          <span
            className={`text-[15px] text-[rgba(99,100,117)] hover:text-white`}
            style={twkLausanneFont}
          >
            Explore
          </span>
        </NavLink>
        <NavLink href="/recommendation">
          <span
            className={`text-[15px] text-[rgba(99,100,117)] hover:text-white`}
            style={twkLausanneFont}
          >
            Recommendations
          </span>
        </NavLink>
        <NavLink href="/AboutUs">
          <span
            className={`text-[15px] text-[rgba(99,100,117)] hover:text-white`}
            style={twkLausanneFont}
          >
            About Us
          </span>
        </NavLink>

        <div className="flex items-center gap-4">
          {user ? (
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
                  <p className="font-medium text-white" style={twkLausanneFont}>
                    {user.username || user.firstName || "User"}
                  </p>
                  <ChevronDown className="size-[16px] text-white" />
                </div>
              )}
            </SignedIn>
          ) : (
            <div className="flex items-center gap-[10px] hover:opacity-60 hover:cursor-pointer">
              <p
                className={`text-[#B8CFCE] font-medium`}
                style={twkLausanneFont}
              >
                Try it free
              </p>
              <ArrowRight className="text-black bg-[#B8CFCE] rounded-full size-[14px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
