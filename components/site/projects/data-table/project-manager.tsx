import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Member } from "@/types";

export default function ProjectManager({ manager }: { manager?: Member }) {
  return (
    <div className="text-left [&>span]:line-clamp-1">
      <Avatar className="h-7 w-7" title={manager?.name}>
        <AvatarImage src={manager?.avatar} alt="" />
        <AvatarFallback>{manager?.avatarFallback}</AvatarFallback>
      </Avatar>
    </div>
  );
}
