"use client";

import SubTaskRow from "@/components/site/tasks/subtask-row";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import _ from "lodash";

import React from "react";

function SubtaskList({ taskIds }: { taskIds: number[] }) {
  const [sortedIds, setSortedIds] = React.useState(taskIds);

  // sensors
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  // unique identifier
  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => sortedIds.map((id) => id.toString()),
    [sortedIds]
  );

  // handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      setSortedIds((ids) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(ids, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      {_.map(sortedIds, (taskId) => (
        <SortableContext
          items={dataIds}
          key={taskId}
          strategy={verticalListSortingStrategy}
        >
          <SubTaskRow taskId={taskId} />
        </SortableContext>
      ))}
    </DndContext>
  );
}

export default SubtaskList;
