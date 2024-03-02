"use client";

import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { Task } from "@/types";
import { columns as defaultColumns } from "./columns";

import TaskTitle from "./task-title";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TaskDataTable({
  tasks,
  editMode,
  toggleEditMode,
}: {
  tasks: Task[];
  editMode?: boolean;
  toggleEditMode: () => void;
}) {
  const [columns] = React.useState<typeof defaultColumns>(() => [
    ...defaultColumns,
  ]);

  // memorized columns
  const tableColumns = React.useMemo(() => columns, [columns]);
  const tableData = React.useMemo(
    () => tasks.sort((a, b) => b.id - a.id),
    [tasks]
  );

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    getCoreRowModel: getCoreRowModel(),
  });

  React.useEffect(() => {
    if (editMode) toggleEditMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData]);

  return (
    <ScrollArea className="mt-8 flex-1">
      <div className="group pb-3">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="relative text-xs"
                      style={{
                        width: `${header.getSize()}px`,
                      }}
                    >
                      <>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}

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
                                    (table.options.columnResizeDirection ===
                                    "rtl"
                                      ? -1
                                      : 1) *
                                    (table.getState().columnSizingInfo
                                      .deltaOffset ?? 0)
                                  }px)`
                                : "",
                            },
                          }}
                        />
                      </>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {/* Render empty row */}
            {editMode && (
              <TableRow data-state="selected">
                <TableCell className="text-xs">
                  <TaskTitle
                    title=""
                    CREATE_NEW
                    toggleEditMode={toggleEditMode}
                  />
                </TableCell>
              </TableRow>
            )}

            {/* Render Table Data */}
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-base-300/5"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="relative max-w-[700px] text-xs"
                      style={{
                        width: `${cell.column.getSize()}px`,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      <div
                        {...{
                          onDoubleClick: () => cell.column.resetSize(),
                          className: `absolute top-0 right-0 h-full w-[1px] cursor-col-resize ${
                            table.options.columnResizeDirection
                          } ${cell.column.getIsResizing() ? "border-r border-red-500 " : ""}`,
                          style: {
                            transform: cell.column.getIsResizing()
                              ? `translateX(${
                                  (table.options.columnResizeDirection === "rtl"
                                    ? -1
                                    : 1) *
                                  (table.getState().columnSizingInfo
                                    .deltaOffset ?? 0)
                                }px)`
                              : "",
                          },
                        }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default TaskDataTable;
