import Image from "next/image";
import {
  IconFolder,
  IconHome,
  IconMessage,
  IconReport,
  IconSubtask,
  IconUsersGroup,
  IconTargetArrow,
  IconDotsVertical,
  IconLogout,
} from "@tabler/icons-react";
import NavItem from "./nav-item";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import Logout from "../logout";

function Navbar() {
  return (
    <div className="inset-y-0 flex w-64 flex-col border-r border-base-0/5">
      <div className="border-b border-base-0/5 bg-base-400/10 px-4 py-2.5 text-2xl font-semibold text-red-500">
        <Image src="/logo.svg" alt="" width={164} height={40} />
      </div>

      <div className="mt-8 flex-1">
        <nav className="flex flex-col gap-1.5 px-2.5">
          <NavItem href="/dashboard">
            <IconHome />
            Dashboard
          </NavItem>
          <NavItem href="/tasks">
            <IconSubtask />
            My Tasks
          </NavItem>
          <NavItem href="/tasks/invite-member">
            <IconMessage />
            Inbox
            <Badge>03</Badge>
          </NavItem>
        </nav>

        <div className="mt-8">
          <h6 className="mb-4 px-3 text-base-300">Insights</h6>
          <nav className="flex flex-col gap-1.5 px-2.5">
            <NavItem href="#goals">
              <IconTargetArrow />
              Goals
            </NavItem>
            <NavItem href="#projects">
              <IconReport />
              Reporting
            </NavItem>
          </nav>
        </div>

        {/* project list */}
        <div className="mt-8">
          <h6 className="mb-4 px-3 text-base-300">Projects</h6>
          <nav className="flex flex-col gap-1.5 px-2.5">
            <NavItem href="#goals">
              <IconFolder />
              <span>CNX Tasks Management</span>
            </NavItem>
          </nav>
        </div>

        {/* Teams */}
        <div className="mt-10">
          <h6 className="mb-4 px-3 text-base-300">Teams</h6>
          <nav className="flex flex-col gap-1.5 px-2.5">
            <NavItem href="#my-workspace">
              <IconUsersGroup />
              My workspace
            </NavItem>
          </nav>
        </div>
      </div>

      {/* Profile */}
      <div className="flex items-center border-t border-base-0/5 p-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="px-2.5">
          <h3 className="text-sm">MD Mehedi Hasan</h3>
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
    </div>
  );
}

export default Navbar;
