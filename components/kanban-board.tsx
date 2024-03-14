"use client";

import * as React from "react";

// dnd kit
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface IKanbanBoard {
  children: React.ReactNode;
  className?: string;
  onDragEnd: (event: DragEndEvent) => void;
  onDragOver: (event: DragOverEvent) => void;
}

interface IKanbanBoardColumn {
  columnId: string;
  items: { id: string | number; [key: string]: unknown }[];
  children: React.ReactNode;
}

interface IKanbanBoardItem {
  children: React.ReactNode;
  id: string;
}

function KanbanBoardItem({ id, children }: IKanbanBoardItem) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id,
  });

  const style = {
    margin: "10px",
    opacity: 1,
    color: "#333",
    background: "white",
    padding: "10px",
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div style={style} ref={setNodeRef} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

// kanban board column
function KanbanBoardColumn({ ...props }: IKanbanBoardColumn) {
  const { setNodeRef } = useDroppable({ id: props.columnId });
  return (
    <SortableContext
      id={props.columnId}
      items={props.items}
      strategy={rectSortingStrategy}
    >
      <div ref={setNodeRef}>{props.children}</div>
    </SortableContext>
  );
}

// Kanban board
function KanbanBoard({ ...props }: IKanbanBoard) {
  // sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={props.onDragEnd}
      onDragOver={props.onDragOver}
    >
      <div className="flex flex-row items-stretch gap-5">{props.children}</div>
    </DndContext>
  );
}

export { KanbanBoard, KanbanBoardColumn, KanbanBoardItem };
