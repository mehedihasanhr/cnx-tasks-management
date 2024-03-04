"use client";

import React from "react";

// type
import { Task } from "@/types";
// components
import AddTaskButtonWithDropdown from "@/components/button/add-task-button-with-dropdown";
import Filter from "@/components/site/filter/filter";
import TaskDataTable from "@/components/site/tasks/table/data-table";
import SortTable from "@/components/site/tasks/table/sort";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ListCollapse, ListFilter } from "lucide-react";

// components
function TaskTable({ tasks }: { tasks: Task[] }) {
  const [editMode, setEditMode] = React.useState(false);

  const toggleEditMode = () => setEditMode((mode) => !mode); // toggle edit mode for insert a new task

  return (
    <>
      <div className="flex items-center">
        <AddTaskButtonWithDropdown toggleEditMode={toggleEditMode} />
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
      <TaskDataTable
        tasks={tasks}
        editMode={editMode}
        toggleEditMode={toggleEditMode}
      />
    </>
  );
}

export default TaskTable;
