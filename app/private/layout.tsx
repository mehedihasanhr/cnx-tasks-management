import React from "react";
import Navbar from "@/components/site/layout/navbar";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="inset-y-0 flex h-screen w-screen">
      <Navbar />
      {children}
    </div>
  );
}

export default PrivateLayout;
