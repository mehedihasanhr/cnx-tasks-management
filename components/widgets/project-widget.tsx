"use client";

import { IconPlus } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import ProjectWidgetItem from "./project-widget-item";
import { ScrollArea } from "../ui/scroll-area";

function ProjectWidget() {
  return (
    <div className="flex h-full flex-col rounded-lg border border-base-0/5 bg-gradient-service-card p-6">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xl">Projects</h3>
        <Button
          onMouseDown={(e) => e.stopPropagation()}
          variant="secondary"
          size="sm"
          className="border border-base-0/5 text-sm text-base-300"
        >
          <IconPlus size={16} />
          <span className="ml-2 block">Create Project</span>
        </Button>
      </div>

      <Separator className="h-0.5 bg-base-0/5" />

      <ScrollArea className="w-full flex-1">
        <div
          aria-hidden
          onMouseDown={(e) => e.stopPropagation()}
          className="flex flex-wrap gap-4 py-8"
        >
          {[1, 2, 3, 4, 5].map((item) => (
            <ProjectWidgetItem key={item} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default ProjectWidget;
