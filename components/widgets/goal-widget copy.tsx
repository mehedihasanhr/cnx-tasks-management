"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "../ui/scroll-area";

// goals
function GoalWidget() {
  return (
    <div className="flex h-full flex-col rounded-lg border border-base-0/5 bg-gradient-service-card p-6">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xl">Goals</h3>

        <Button
          onMouseDown={(e) => e.stopPropagation()}
          variant="secondary"
          size="sm"
          className="border border-white/5 text-sm text-base-300"
        >
          <IconPlus size={16} />
          <span className="ml-2 block">Add Goal</span>
        </Button>
      </div>

      {/* Tab */}
      <Tabs
        defaultValue="my_goal"
        onMouseDown={(e) => e.stopPropagation()}
        className="flex flex-1 flex-col items-start overflow-hidden"
      >
        {/* Tab List */}
        <TabsList className="gap-4">
          <TabsTrigger className="px-0" value="my_goal">
            My goals
          </TabsTrigger>
          <TabsTrigger className="px-0" value="team_goal">
            Team goals
          </TabsTrigger>
        </TabsList>

        <Separator className="-mt-1.5 h-0.5 bg-base-0/5" />

        {/* Tab content */}
        <ScrollArea className="w-full flex-1">
          <div className="w-full flex-1 overflow-hidden">
            <TabsContent value="my_goal">
              <div className="rounded-lg bg-base-300/5 p-4">
                <p>You don’t won any goals yet.</p>
                <p className="mb-3 text-xs text-base-300">
                  Add a goal so your team knows what you plan to achieve.
                </p>

                <Button
                  size="sm"
                  variant="secondary"
                  className="border border-white/5 text-sm"
                >
                  <IconPlus />
                  Add Goal
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="team_goal">
              <div className="rounded-lg bg-base-300/5 p-4">
                <p>You don’t won any goals yet.</p>
                <p className="mb-3 text-xs text-base-300">
                  Add a goal so your team knows what you plan to achieve.
                </p>

                <Button
                  size="sm"
                  variant="secondary"
                  className="border border-white/5 text-sm"
                >
                  <IconPlus />
                  Add Goal
                </Button>
              </div>
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}

export default GoalWidget;
