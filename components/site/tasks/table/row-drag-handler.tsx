import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { IconGripVertical } from "@tabler/icons-react";

function RowDragHandler({ taskId }: { taskId: number }) {
  const { attributes, listeners } = useSortable({ id: taskId.toString() });
  return (
    <Button
      variant="link"
      size="icon-sm"
      className="absolute -left-4 z-50 h-full w-fit cursor-move text-base-300/50"
      {...attributes}
      {...listeners}
    >
      <IconGripVertical size={14} />
    </Button>
  );
}

export default RowDragHandler;
