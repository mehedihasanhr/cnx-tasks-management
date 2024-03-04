import MemberList from "@/components/site/member-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Member } from "@/types";
import { IconChevronDown, IconTrash } from "@tabler/icons-react";
import React from "react";

interface Option {
  id: string;
  type: string;
  fieldName: string;
  value: string | ArgType;
}

interface ArgType {
  from: Date;
  to?: Date;
}

interface PropTypes {
  option: Option;
  onSelect: (value: Member) => void;
  remove: () => void;
}

function MemberSelection({ option, onSelect, remove }: PropTypes) {
  const [open, setOpen] = React.useState(false);

  const handleSelection = (member: Member) => {
    setOpen(false);
    onSelect(member);
  };

  return (
    <div>
      <p className="mb-1 flex items-center text-sm font-medium text-base-300">
        {option.fieldName}
        <Button
          variant="link"
          size="icon-sm"
          onClick={remove}
          className="text-base-300 hover:text-white"
        >
          <IconTrash size={14} />
        </Button>
      </p>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-2/3 text-white" asChild>
          <div>
            <Input
              readOnly
              defaultValue={option.value as string}
              type="text"
              placeholder="Select member"
              className="cursor-default bg-base-300/5"
              icon={<IconChevronDown />}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="border p-0">
          <MemberList
            value={option.value as string}
            onSelect={handleSelection}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default MemberSelection;
