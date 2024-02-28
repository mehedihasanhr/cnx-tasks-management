"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import TaskWidgetItem from "./task-widget-item";

// Tasks
function TaskWidget() {
  return (
    <div className="flex h-full flex-col rounded-lg border border-base-0/5 bg-gradient-service-card p-6">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xl">Tasks</h3>

        <Button
          onMouseDown={(e) => e.stopPropagation()}
          variant="secondary"
          size="sm"
          className="border border-base-0/5 text-sm text-base-300"
        >
          <IconPlus size={16} />
          <span className="ml-2 block">Create Task</span>
        </Button>
      </div>

      {/* Tab */}
      <Tabs
        defaultValue="upcoming"
        onMouseDown={(e) => e.stopPropagation()}
        className="flex flex-1 flex-col items-start overflow-hidden"
      >
        {/* Tab List */}
        <TabsList className="gap-4">
          <TabsTrigger className="px-0" value="upcoming">
            Upcoming
          </TabsTrigger>
          <TabsTrigger className="px-0" value="over-due">
            Over due
          </TabsTrigger>
          <TabsTrigger className="px-0" value="completed">
            Completed
          </TabsTrigger>
        </TabsList>

        <Separator className="-mt-1.5 h-0.5 bg-base-0/5" />

        {/* Tab content */}
        <ScrollArea className="w-full flex-1">
          <div className="w-full flex-1 overflow-hidden">
            <TabsContent value="upcoming">
              {[1, 2, 3, 4, 5].map((i) => (
                <TaskWidgetItem key={i} />
              ))}
            </TabsContent>
            <TabsContent value="over-due">
              {[1, 2].map((i) => (
                <TaskWidgetItem key={i} />
              ))}
            </TabsContent>
            <TabsContent value="completed">
              {[1, 2, 3].map((i) => (
                <TaskWidgetItem key={i} />
              ))}
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}

export default TaskWidget;
