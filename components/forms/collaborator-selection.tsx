import * as React from "react";

import useMembers from "@/hooks/useMembers";
import { Member } from "@/types";
import _ from "lodash";
import { IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandItem } from "../ui/command";

type PropTypes = {
  onSelect: (value: Member) => void;
  children: React.ReactElement;
  defaultValue?: Member[];
  className?: string;
  align?: "start" | "center" | "end";
};

function Options({
  value,
  onSelect,
}: {
  value?: Member[];
  onSelect: (value: Member) => void;
}) {
  const { data, error, isLoading } = useMembers();

  if (isLoading) {
    return <CommandItem>Loading... </CommandItem>;
  }

  if (error) throw Error(error);

  return _.map(data?.users, (member) => (
    <CommandItem
      key={member.id}
      value={member.name}
      onSelect={() => {
        onSelect(member);
      }}
    >
      <IconCheck
        size={14}
        className={`mr-2 ${
          _.includes(
            _.map(value, (i) => i.id),
            member.id
          )
            ? "visible"
            : "invisible"
        }`}
      />
      {member.name}
    </CommandItem>
  ));
}

export default function CollaboratorSelection({
  onSelect,
  children,
  className,
  defaultValue,
  align = "start",
}: PropTypes) {
  const [open, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState<Member[]>(defaultValue!);

  const handleSelection = (currentValue: Member) => {
    setValue((prev) => [...prev, currentValue]);
    onSelect(currentValue);
  };

  return (
    <Popover open={open} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className={cn(
          "data-[state=open]:bg-white/30 data-[state=open]:text-white",
          className
        )}
        asChild
      >
        {children}
      </PopoverTrigger>
      <PopoverContent className="p-0" align={align}>
        <Command>
          <Options onSelect={handleSelection} value={value} />
        </Command>
      </PopoverContent>
    </Popover>
  );
}
