import { fetchProjects } from "@/actions/projects";
import { ProfileAvatar } from "@/components/profile";
import ProjectTable from "@/components/site/projects/project-table";
import TabNavigationItem from "@/components/site/tab-navigation-item";
import TabsNavigation from "@/components/site/tabs-navigation";
import { Separator } from "@/components/ui/separator";
import { revalidateTag } from "next/cache";

export default async function ProjectsViewDefault() {
  revalidateTag("PROJECT_COLLECTION");
  const data = await fetchProjects();
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
      <ProjectTable projects={data?.projects} />;
    </div>
  );
}
