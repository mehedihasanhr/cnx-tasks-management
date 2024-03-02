import type { Metadata } from "next";
// font
import { Inter as FontSans } from "next/font/google";
// React Grid Layout CSS
import "@/node_modules/react-grid-layout/css/styles.css";
import "@/node_modules/react-resizable/css/styles.css";

// Global css
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Tasks Management System",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-base-500 font-sans text-white antialiased",
          fontSans.variable
        )}
      >
        {children}
        <Toaster />
        <Sonner richColors />
      </body>
    </html>
  );
}
