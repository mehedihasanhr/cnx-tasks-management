import { ProfileAvatar } from "@/components/profile";
import TabNavigationItem from "@/components/site/tab-navigation-item";
import TabsNavigation from "@/components/site/tabs-navigation";
import { Separator } from "@/components/ui/separator";
import * as React from "react";

export default function ProjectsViewParallelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="pt-3">
        <div className="flex gap-4 px-10">
          {/* Avatar */}
          <ProfileAvatar />
          <div>
            <h3 className="text-xl">Projects</h3>
            {/* navigation tab */}
            <div className="mt-1">
              <TabsNavigation>
                <TabNavigationItem href="list" basePath="/projects">
                  List
                </TabNavigationItem>
                <TabNavigationItem href="list/232" basePath="/projects">
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
    </div>
  );
}
