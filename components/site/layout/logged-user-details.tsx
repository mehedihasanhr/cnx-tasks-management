"use client";

import { ProfileAvatar, ProfileTitle } from "@/components/profile";
import Logout from "@/components/site/logout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical, IconLogout } from "@tabler/icons-react";

function LoggedUserDetails() {
  return (
    <div className="flex items-center border-t border-base-0/5 p-4">
      <ProfileAvatar />
      <div className="px-2.5">
        <h3 className="line-clamp-1 text-sm">
          <ProfileTitle />
        </h3>
        <span className="text-xs leading-3 text-red-500">
          Frontend Developer
        </span>
      </div>

      <div className="ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <IconDotsVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Logout>
                <IconLogout size={18} className="mr-2" />
                Logout
              </Logout>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default LoggedUserDetails;
