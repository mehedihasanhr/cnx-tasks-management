"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { config } from "@/config";
import { useToast } from "@/components/ui/use-toast";

function Logout() {
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

  return <Button onClick={handleLogout}> Logout </Button>;
}

export default Logout;
