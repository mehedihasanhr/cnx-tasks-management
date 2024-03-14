"use client";

import TaskBoard from "@/components/site/tasks/board";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DndContext } from "@dnd-kit/core";
import { IconArrowsDownUp, IconPlus } from "@tabler/icons-react";
import { ListFilter } from "lucide-react";

export default function TaskBoardView() {
  return (
    <DndContext>
      <div className="p-8">
        {/* Action Buttons group */}
        <div className="mb-4 flex items-center justify-between gap-4">
          {/* Action group */}
          <div className="flex flex-1 items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="pl-2 text-sm text-base-200"
            >
              <ListFilter size={16} className="mr-2" />
              Filter
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="pl-2 text-sm text-base-200"
            >
              <IconArrowsDownUp size={15} className="mr-1" />
              <span>Sort</span>
            </Button>

            <Separator orientation="vertical" className="mx-4 ml-auto h-8" />

            <Button
              variant="secondary"
              size="sm"
              className="border-2 border-base-400 pl-2 text-sm"
            >
              <IconPlus size={15} className="mr-1" />
              <span>Create</span>
            </Button>
          </div>
        </div>

        {/* Content */}
        <TaskBoard />
      </div>
    </DndContext>
  );
}
