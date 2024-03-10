"use client";

import * as React from "react";

import { Project } from "@/types";

// components
import Filter from "@/components/site/filter/filter";
import SortTable from "@/components/site/tasks/table/sort";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ListCollapse, ListFilter } from "lucide-react";
import { IconPlus } from "@tabler/icons-react";
import DataTable from "./data-table";

export default function ProjectTable({ projects }: { projects: Project[] }) {
  const [isEditModeEnabled, setIsEditModeEnabled] = React.useState(false);

  const toggleEditMode = () => setIsEditModeEnabled((prev) => !prev);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center px-10 pb-6 pt-8">
        {/* Add Project */}
        <Button
          variant="secondary"
          size="sm"
          onClick={toggleEditMode}
          className="border border-white/10 text-sm font-normal"
        >
          <IconPlus size={16} className="mr-1.5" />
          Add Project
        </Button>

        <div className="ml-auto flex items-center gap-x-5">
          {/* Filter */}
          <Filter>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-normal text-base-200"
            >
              <ListFilter size={16} className="mr-2" />
              Filter
            </Button>
          </Filter>

          {/* Group by section */}
          <Select defaultValue="none">
            <SelectTrigger className="font-base h-9 rounded-md border-transparent bg-transparent px-3 text-xs text-base-200 hover:bg-base-300/10 hover:text-base-0 [&>svg]:hidden">
              <div className="flex select-none items-center whitespace-nowrap">
                <ListCollapse size={16} className="mr-2" />
                Group by: Custom sections
              </div>
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="due date">Due date</SelectItem>
              <SelectItem value="created by">Created by</SelectItem>
              <SelectItem value="project">Project</SelectItem>
              <SelectItem value="custom sections">Custom sections</SelectItem>
            </SelectContent>
          </Select>

          {/* sort by */}
          <SortTable />
        </div>
      </div>
      <DataTable
        projects={projects}
        editMode={isEditModeEnabled}
        toggleEditMode={toggleEditMode}
      />
    </div>
  );
}
