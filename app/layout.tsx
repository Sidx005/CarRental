import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { Navbar } from "@/Components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Outfit({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        // className={inter.className}
      >
        <SignedIn>
        <Navbar/>

        {children}
        </SignedIn>
        <SignedOut>
          <SignIn/>                                                           
        </SignedOut>
      </body>
    </html>
    </ClerkProvider>
  );
}
