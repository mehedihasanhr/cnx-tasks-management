"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { config } from "@/config";
import { useToast } from "@/components/ui/use-toast";

function Logout({ children }: { children: React.ReactNode }) {
  const route = useRouter();
  const { toast } = useToast();
  const handleLogout = async () => {
    fetch(`${config.API}/auth/logout`, {
      headers: {
        credentials: "includes",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        toast({
          variant: "destructive",
          title: res.message,
        });
        route.push("/dashboard");
      })
      .finally(() => route.push("/login"));
  };

  return (
    <div aria-hidden onClick={handleLogout} className="flex items-center">
      {children}
    </div>
  );
}

export default Logout;
