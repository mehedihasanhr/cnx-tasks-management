import TabNavigationItem from "@/components/site/tab-navigation-item";
import TabsNavigation from "@/components/site/tabs-navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { revalidatePath } from "next/cache";
import React from "react";

function TaskPageLayout({
  children,
  view,
  task,
}: {
  children: React.ReactNode;
  view: React.ReactNode;
  task: React.ReactNode;
}) {
  revalidatePath("/tasks", "layout");
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="pt-8">
          <div className="flex gap-4 px-10">
            {/* Avatar */}
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl">My Tasks</h3>
              {/* navigation tab */}
              <div className="mt-1">
                <TabsNavigation>
                  <TabNavigationItem href="/tasks/list">List</TabNavigationItem>
                  <TabNavigationItem href="/tasks/list/232">
                    Board
                  </TabNavigationItem>
                </TabsNavigation>
              </div>
            </div>
          </div>
          <Separator className="-mt-0.5 h-0.5 bg-white/10" />
        </div>
        {/* Container */}
        {children}
        {view}
      </div>
      {task}
    </>
  );
}

export default TaskPageLayout;
