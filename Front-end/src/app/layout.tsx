"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { dark } from "@clerk/themes";
import { CategoryProvider } from "./context/CategoryContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useEffect(() => {
  //   const response = axiosInstance.get("/user/get-current-user", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Clerk-Backend-Api-Key": process.env.NEXT_PUBLIC_CLERK_SECRET_KEY,
  //     },
  //   });
  //   console.log(response);
  // });
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#111827" },
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <CategoryProvider>{children}</CategoryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

export default RootLayout;
