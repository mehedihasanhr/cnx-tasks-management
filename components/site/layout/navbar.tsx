import LoggedUserDetails from "@/components/site/layout/logged-user-details";
import {
  IconFolder,
  IconHome,
  IconMessage,
  IconReport,
  IconSubtask,
  IconTargetArrow,
  IconUsersGroup,
} from "@tabler/icons-react";
import Image from "next/image";
import { Badge } from "../../ui/badge";
import NavItem from "./nav-item";

function Navbar() {
  return (
    <div className="inset-0 flex w-64 min-w-64 flex-col border-r border-base-0/5">
      <div className="border-b border-base-0/5 bg-base-400/10 px-4 py-2.5 text-2xl font-semibold text-red-500">
        <Image src="/logo.svg" alt="" width={164} height={40} />
      </div>

      <div className="mt-8 flex-1">
        <nav className="flex flex-col gap-1.5 px-2.5">
          <NavItem href="/dashboard">
            <IconHome />
            Dashboard
          </NavItem>
          <NavItem href="/tasks/list">
            <IconSubtask />
            My Tasks
          </NavItem>
          <NavItem href="/projects">
            <IconFolder />
            Projects
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
      <LoggedUserDetails />
    </div>
  );
}

export default Navbar;
