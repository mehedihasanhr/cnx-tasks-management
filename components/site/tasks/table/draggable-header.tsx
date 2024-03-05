"use client";

import { TableHead } from "@/components/ui/table";
import { Task } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Header, Table, flexRender } from "@tanstack/react-table";
import { CSSProperties } from "react";

function DraggableHeader({
  table,
  header,
}: {
  table: Table<Task>;
  header: Header<Task, unknown>;
}) {
  const {
    attributes,
    isDragging,
    isOver,
    over,
    active,
    listeners,
    setNodeRef,
    transform,
  } = useSortable({
    id: header.column.id.toString(),
    disabled: {
      draggable: header.column.id === "task_name",
      droppable: header.column.id === "task_name",
    },
  });

  const style: CSSProperties = {
    opacity: isDragging ? 1 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    width: header.column.getSize(),
    zIndex: isDragging ? 100 : 0,
    borderRight:
      isOver && over && over.id !== active?.id ? `1px solid red` : "",
  };

  return (
    <TableHead
      ref={setNodeRef}
      key={header.id}
      className="relative py-0 text-xs"
      style={{
        width: `${header.getSize()}px`,
        ...style,
      }}
      {...attributes}
      {...listeners}
      aria-describedby={`DndDescribedBy-${header.id}`}
    >
      <div>
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}

        <div
          role="button"
          tabIndex={0}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div
            {...{
              onMouseDown: header.getResizeHandler(),
              onTouchStart: header.getResizeHandler(),
              className: `absolute top-0 right-0 z-10 h-full w-[5px] hover:border-r-2 border-red-500 cursor-col-resize ${
                table.options.columnResizeDirection
              } ${header.column.getIsResizing() ? "border-r border-red-500" : ""}`,
              style: {
                transform: header.column.getIsResizing()
                  ? `translateX(${
                      (table.options.columnResizeDirection === "rtl" ? -1 : 1) *
                      (table.getState().columnSizingInfo.deltaOffset ?? 0)
                    }px)`
                  : "",
              },
            }}
          />
        </div>
      </div>
    </TableHead>
  );
}

export default DraggableHeader;
