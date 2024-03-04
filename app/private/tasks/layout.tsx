import React from "react";
import TabsNavigation from "@/components/site/tabs-navigation";
import TabNavigationItem from "@/components/site/tab-navigation-item";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function TaskPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden pb-0 pt-10">
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
              <TabNavigationItem href="/tasks/board">Board</TabNavigationItem>
            </TabsNavigation>
          </div>
        </div>
      </div>
      <Separator className="-mt-0.5 h-0.5 bg-white/10" />
      {/* Container */}
      <section className="px-10 pb-0 pt-8">{children}</section>
    </div>
  );
}

export default TaskPageLayout;
