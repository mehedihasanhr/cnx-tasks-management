import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import useMembers from "@/hooks/useMembers";
import { cn } from "@/lib/utils";
import { Member } from "@/types";
import { Check } from "lucide-react";

type MemberListProps = {
  value: string;
  onSelect: (value: Member) => void;
  footer?: React.ReactNode;
};

function MemberList({ value, onSelect, footer }: MemberListProps) {
  const { data, error, isLoading } = useMembers();

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
              onSelect={() => onSelect(user)}
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
        </ScrollArea>
      </CommandGroup>
      {footer}
    </Command>
  );
}

export default MemberList;
