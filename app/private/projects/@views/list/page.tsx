import { fetchProjects } from "@/actions/projects";
import ProjectTable from "@/components/site/projects/project-table";
import { revalidateTag } from "next/cache";

async function ProjectsListView() {
  revalidateTag("PROJECT_COLLECTION");
  const data = await fetchProjects();
  return <ProjectTable projects={data?.projects} />;
}

export default ProjectsListView;
