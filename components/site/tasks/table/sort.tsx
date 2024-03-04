import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ArrowDownUp } from "lucide-react";

function SortTable() {
  return (
    <Select defaultValue="none">
      <SelectTrigger className="font-base h-9 rounded-md border-transparent bg-transparent px-3 text-xs text-base-200 hover:bg-base-300/10 hover:text-base-0 [&>svg]:hidden">
        <div className="flex select-none items-center">
          <ArrowDownUp size={16} className="mr-2" />
          Sort
        </div>
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="none">None</SelectItem>
        <SelectItem value="start date">Start date</SelectItem>
        <SelectItem value="due date">Due date</SelectItem>
        <SelectItem value="created by">Created by</SelectItem>
        <SelectItem value="created on">Created on</SelectItem>
        <SelectItem value="last modified on">Last modified on</SelectItem>
        <SelectItem value="completed on">Completed on</SelectItem>
        <SelectItem value="likes">Likes</SelectItem>
        <SelectItem value="alphabetical">Alphabetical</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default SortTable;
