import Navbar from "@/components/site/layout/navbar";
import React from "react";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="inset-y-0 flex h-screen w-screen overflow-hidden">
      <Navbar />
      {children}
    </div>
  );
}

export default PrivateLayout;
