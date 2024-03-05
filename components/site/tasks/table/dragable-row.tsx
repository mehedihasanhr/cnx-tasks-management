"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Task } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Cell, Row, Table, flexRender } from "@tanstack/react-table";
import { CSSProperties } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DraggableRow({ table, row }: { table: Table<Task>; row: Row<Task> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id.toString(),
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative",
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      data-state={row.getIsSelected() && "selected"}
      className="hover:bg-base-300/5"
    >
      {row.getVisibleCells().map((cell: Cell<Task, unknown>) => (
        <TableCell
          key={cell.id}
          className="relative max-w-[700px] text-xs"
          style={{
            width: `${cell.column.getSize()}px`,
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
          <div
            {...{
              onDoubleClick: () => cell.column.resetSize(),
              className: `absolute top-0 right-0 h-full w-[1px] cursor-col-resize ${
                table.options.columnResizeDirection
              } ${cell.column.getIsResizing() ? "border-r border-red-500 " : ""}`,
              style: {
                transform: cell.column.getIsResizing()
                  ? `translateX(${
                      (table.options.columnResizeDirection === "rtl" ? -1 : 1) *
                      (table.getState().columnSizingInfo.deltaOffset ?? 0)
                    }px)`
                  : "",
              },
            }}
          />
        </TableCell>
      ))}
    </TableRow>
  );
}

export default DraggableRow;
