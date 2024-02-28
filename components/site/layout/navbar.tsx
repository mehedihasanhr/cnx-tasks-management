import React from "react";
import Image from "next/image";
import {
  IconChecklist,
  IconFolder,
  IconHome,
  IconMessage,
  IconUsersGroup,
} from "@tabler/icons-react";
import NavItem from "./nav-item";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

function Navbar() {
  return (
    <div className="inset-y-0 flex w-64 flex-col border-r border-base-0/5">
      <div className="border-b border-base-0/5 bg-base-400/10 px-4 py-2.5 text-2xl font-semibold text-red-500">
        <Image src="/logo.svg" alt="" width={164} height={40} />
      </div>

      <div className="mt-8 flex-1">
        <nav className="flex flex-col gap-2 px-2.5">
          <NavItem href="/dashboard">
            <IconHome />
            Dashboard
          </NavItem>
          <NavItem href="/tasks">
            <IconChecklist />
            My Tasks
          </NavItem>
          <NavItem href="#inbox">
            <IconMessage />
            Inbox
            <Badge>03</Badge>
          </NavItem>
        </nav>

        <div className="mt-8">
          <h6 className="mb-4 px-3 text-base-300">Insights</h6>
          <nav className="flex flex-col gap-2 px-2.5">
            <NavItem href="#goals">
              <IconHome />
              Goals
            </NavItem>
            <NavItem href="#projects">
              <IconFolder />
              Reporting
            </NavItem>
          </nav>
        </div>

        {/* project list */}
        <div className="mt-8">
          <h6 className="mb-4 px-3 text-base-300">Projects</h6>
          <nav className="flex flex-col gap-2 px-2.5">
            <NavItem href="#goals">
              <IconHome />
              <span>CNX Tasks Management</span>
            </NavItem>
          </nav>
        </div>

        {/* Teams */}
        <div className="mt-10">
          <h6 className="mb-4 px-3 text-base-300">Teams</h6>
          <nav className="flex flex-col gap-2 px-2.5">
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
          <h3 className="">MD Mehedi Hasan</h3>
          <span className="text-xs leading-3 text-red-500">
            Frontend Developer
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
