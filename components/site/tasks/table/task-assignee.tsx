"use client";

import React from "react";
import useSWR from "swr";
import { config } from "@/config";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { Member, TaskStatus } from "@/types";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updateTask } from "@/actions/tasks";
import { IconUserPlus } from "@tabler/icons-react";
import { toast } from "sonner";
import MemberInviteModal from "@/components/modals/member-invite-modal";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";

// fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// ProjectList
function TaskAssigneeContent({
  taskId,
  onSelect,
  status,
}: {
  taskId: number;
  status: TaskStatus;
  onSelect: (value: Member) => void;
}) {
  const [value, setValue] = React.useState("");

  const { data, isLoading, error } = useSWR(`${config.API}/users`, fetcher);

  // update task on select
  const updateOnSelect = async (user: Member) => {
    if (status === "PENDING") {
      setValue(user.name);
      onSelect(user);
      await updateTask(taskId, { assigneeId: user.id });
    } else {
      toast.error(`Task already in ${status}`, {
        description: "You didn't change assignee yet.",
      });
    }
  };

  if (error) {
    throw new Error(error);
  }

  if (isLoading) {
    return <div className="px-2 py-1.5 text-base-300"> Loading... </div>;
  }

  return (
    <Command>
      <CommandInput placeholder="Search framework..." className="h-9" />
      <CommandEmpty>No framework found.</CommandEmpty>
      <CommandGroup>
        <ScrollArea className="max-h-72">
          {data?.users?.map((user: Member) => (
            <CommandItem
              key={user.id}
              value={user.name}
              onSelect={() => {
                updateOnSelect(user);
              }}
              className="cursor-pointer text-sm text-white/80"
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === user.name ? "opacity-100" : "opacity-0"
                )}
              />
              {user.name}
            </CommandItem>
          ))}

          <CommandSeparator className="mb-1 mt-4" />
          <MemberInviteModal>
            <CommandItem className="pl-5 hover:cursor-pointer">
              <IconUserPlus className="mr-2 h-4 w-4" />
              <span>Invite member</span>
            </CommandItem>
          </MemberInviteModal>
        </ScrollArea>
      </CommandGroup>
    </Command>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
function TaskAssignee({
  assignee,
  taskId,
  status,
}: {
  assignee?: Member;
  taskId: number;
  status: TaskStatus;
}) {
  const [value, setValue] = React.useState<Member | undefined>(assignee);
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="text-left [&>span]:line-clamp-1">
        {value ? (
          <Avatar className="h-7 w-7" title={value.name}>
            <AvatarImage src="https://github.com/shadcn.png" alt="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <span>Select Project</span>
        )}
      </PopoverTrigger>
      <PopoverContent className="p-0" sideOffset={10}>
        <TaskAssigneeContent
          taskId={taskId}
          status={status}
          onSelect={(user: Member) => {
            setValue(user);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export default TaskAssignee;
