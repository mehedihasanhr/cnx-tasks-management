"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IconCopy, IconRocket } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function MemberInviteModal({ children }: { children: React.ReactNode }) {
  const [permission, setPermission] = React.useState("Can view");
  const [linkPermission, setLinkPermission] = React.useState("Can view");
  const [email, setEmail] = React.useState("");

  return (
    <Popover>
      <PopoverTrigger className="w-full">{children}</PopoverTrigger>

      <PopoverContent
        side="left"
        align="start"
        sideOffset={10}
        className="w-full max-w-[500px] border-2"
      >
        <div className="text-white">
          <h3 className="text-xl">Members</h3>
          <p className="text-sm text-base-300">
            Manage who has access to this workspace
          </p>
        </div>
        <Separator className="my-2.5" />
        {/* Showing alert for upgrade plan */}
        <Alert className="mb-2.5 border-base-400 bg-base-300/5 text-base-300">
          <AlertTitle className="flex space-x-2 text-white">
            <IconRocket className="h-4 w-4 fill-white" />
            <span>Manage members</span>
          </AlertTitle>
          <AlertDescription className="flex pl-5 text-sm">
            <span className="block pl-1">
              To manage administrators, upgrade to the Business Plan.
            </span>
            <Button
              variant="secondary"
              size="sm"
              className="border-2 border-white/5 text-xs"
            >
              Upgrade plan
            </Button>
          </AlertDescription>
        </Alert>
        <div className="flex items-center gap-4">
          <div className="relative flex flex-1 items-center rounded-lg border-2 border-base-400 bg-base-400/10 pr-1">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:ring-o border-0 bg-transparent text-sm text-white ring-offset-white/0 focus-visible:ring-0"
              />
            </div>

            <Select value={permission} onValueChange={setPermission}>
              <SelectTrigger className="h-8 w-fit border-0 bg-base-400/0 px-2.5 text-xs text-base-300 ring-0 ring-offset-white/0 focus:text-white focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Can view">Can view</SelectItem>
                  <SelectItem value="Can edit">Can edit</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button className="h-10 text-sm">Send invite</Button>
        </div>
        {/* members */}
        <div className="mt-3">
          <h4 className="text-xs font-bold text-base-300">Manage members</h4>
          <ScrollArea className="h-[200px]">
            <div>
              <MemberItem />
              <MemberItem />
              <MemberItem />
              <MemberItem />
              <MemberItem />
              <MemberItem />
            </div>
          </ScrollArea>
        </div>

        {/* footer */}
        <Separator className="mb-3 mt-4" />
        <div className="flex items-center gap-4">
          <Select value={linkPermission} onValueChange={setLinkPermission}>
            <SelectTrigger className="w-fit border-2 border-base-400 bg-base-400/0 px-2.5 text-xs text-base-200 ring-0 ring-offset-white/0 focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Can view">
                  Anyone with the link can view
                </SelectItem>
                <SelectItem value="Can edit">
                  Anyone with the link can edit
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            variant="secondary"
            size="sm"
            className="ml-auto text-xs text-base-300"
          >
            <IconCopy size={16} className="mr-2" />
            Copy Link
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default MemberInviteModal;

// Member Item
function MemberItem() {
  const [permission, setPermission] = React.useState("Can view");
  return (
    <div className="mt-2 flex items-start gap-4 border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
      <div className="flex flex-1 items-center gap-4">
        <Avatar className="h-7 w-7">
          <AvatarImage src="https://github.com/shadcn.png" alt="" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div>
          <h6 className="text-sm text-base-100">Md Mehedi Hasan</h6>
          <p className="text-xs text-base-300/80">dev@example.com</p>
        </div>
      </div>
      <Select value={permission} onValueChange={setPermission}>
        <SelectTrigger className="h-8 w-fit border-0 bg-base-400/0 px-2.5 text-xs text-base-200 ring-0 ring-offset-white/0 focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Can view">Can view</SelectItem>
            <SelectItem value="Can edit">Can edit</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
