"use client";

import { updateProject } from "@/actions/projects";
import CollaboratorSelection from "@/components/forms/collaborator-selection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Member } from "@/types";
import { IconUserPlus } from "@tabler/icons-react";
import _ from "lodash";

export default function ProjectCollaborators({
  collaborators,
  projectId,
}: {
  collaborators?: Member[];
  projectId?: number;
}) {
  const length = _.size(collaborators);

  const members = length > 4 ? _.slice(collaborators, 0, 3) : collaborators;

  // handle collaborator selection
  const handleCollaborator = async (collaborator: Member) => {
    try {
      if (projectId) {
        await updateProject(projectId, {
          collaborators: {
            connect: [{ id: collaborator.id }],
          },
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw Error(error.message);
    }
  };

  return (
    <div className="group flex items-center hover:space-x-1">
      {_.map(members, (collaborator) => (
        <Button
          key={collaborator.id}
          title={collaborator.name}
          className="relative -ml-3 h-fit w-fit min-w-fit rounded-full border-none bg-transparent p-0 transition-all duration-75 first:ml-0 group-hover:ml-0"
        >
          <Avatar className="h-7 w-7">
            <AvatarImage src={collaborator.avatar} alt="" />
            <AvatarFallback> {collaborator.avatarFallback} </AvatarFallback>
          </Avatar>
        </Button>
      ))}
      {length > 3 ? (
        <Button className="relative -left-3 h-fit w-fit min-w-fit rounded-full border-none bg-transparent p-0 first:left-0 group-hover:left-0">
          <Avatar className="h-7 w-7">
            <AvatarImage src="" alt="" />
            <AvatarFallback> +{length - 3} </AvatarFallback>
          </Avatar>
        </Button>
      ) : null}

      <CollaboratorSelection
        defaultValue={collaborators}
        onSelect={handleCollaborator}
        className={
          length
            ? "invisible group-hover:visible data-[state=open]:visible"
            : "visible"
        }
        align="end"
      >
        <Button
          variant="secondary"
          size="icon"
          title="Add collaborator"
          className="h-7 w-7 rounded-full border-2 border-white/5 p-1 text-base-300/70"
        >
          <IconUserPlus size={18} />
        </Button>
      </CollaboratorSelection>
    </div>
  );
}
