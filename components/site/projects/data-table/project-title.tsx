import { createProject, updateProject } from "@/actions/projects";
import { EditableContent } from "@/components/forms/editable-content";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TaskStatus } from "@/types";
import { IconChevronRight, IconCircleCheck } from "@tabler/icons-react";
import { RocketIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface PropTypes {
  title: string;
  projectId?: number;
  status?: TaskStatus;
  CREATE_NEW?: boolean;
  toggleEditMode?: () => void;
}

function ProjectTitle({
  title,
  projectId,
  status,
  CREATE_NEW,
  toggleEditMode,
}: PropTypes) {
  const [value, setValue] = React.useState(title);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setValue(title);
    setIsLoading(false);
  }, [title, CREATE_NEW]);

  // handle on blur change
  const handleOnBlurChange = async (title: string) => {
    setIsLoading(true);
    setValue(title);
    // if CREATE_NEW === ture? create new project;
    // otherwise update title
    if (CREATE_NEW) {
      if (!title) {
        if (!toggleEditMode) throw Error(`${toggleEditMode} is undefiend`);
        toggleEditMode();
        setIsLoading(false);
      } else {
        await createProject({ data: { title } });
      }
    } else if (title !== value && projectId) {
      await updateProject(projectId, { title: title.toString() });
    }
  };

  // Mark as complete
  const handleMarkAsComplete = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    if (!projectId) return;
    if (status && status.slug !== "COMPLETE") {
      await updateProject(projectId, { statusId: 2 });
      toast.success(
        <div className="flex items-start font-bold">
          <RocketIcon className="mr-2 h-4 w-4" />
          <div>{`Excellent! You've just marked the task as 'Completed'!`}</div>
        </div>
      );
    } else {
      await updateProject(projectId, { statusId: 3 });
      toast.info(
        <div className="flex items-start font-bold">
          <RocketIcon className="mr-2 h-4 w-4" />
          <div>{`You've just marked the task as 'Progressing'!`}</div>
        </div>
      );
    }
  };

  return (
    <div
      className="group flex w-full items-center"
      role="presentation"
      onClick={() => router.push(`/projects/${projectId}`)}
    >
      <div>
        {isLoading ? (
          <Spinner className="ml-0.5" />
        ) : (
          <Button
            variant="link"
            size="icon"
            onClick={handleMarkAsComplete}
            className={`mr-2 h-fit w-fit p-0 ${
              status && status.slug === "COMPLETE"
                ? "text-green-400"
                : "text-base-300"
            }`}
          >
            <IconCircleCheck />
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1">
        <div
          role="presentation"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <EditableContent
            defaultValue={value}
            autoFocus={CREATE_NEW}
            placeholder="Write project title..."
            onBlurChange={handleOnBlurChange}
          />
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>

      {projectId && (
        <div className="invisible group-hover:visible">
          <Button variant="ghost" size="icon-sm" className="h-8 w-8" asChild>
            <Link
              href={`/projects/${projectId}`}
              scroll={false}
              prefetch={false}
              aria-label="open-task"
            >
              <IconChevronRight size={16} />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProjectTitle;
