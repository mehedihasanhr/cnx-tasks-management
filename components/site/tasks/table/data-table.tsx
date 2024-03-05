"use client";

import {
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DndContext,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  restrictToHorizontalAxis,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";

import DraggableRow from "@/components/site/tasks/table/dragable-row";
import DraggableHeader from "@/components/site/tasks/table/draggable-header";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  const [data, setData] = React.useState(tasks);

  const [columns] = React.useState<typeof defaultColumns>(() => [
    ...defaultColumns,
  ]);
  const [columnOrder, setColumnOrder] = React.useState<string[]>(() =>
    columns.map((c) => c.id!)
  );

  const [dragMode, setDragMode] = React.useState("");

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const json = JSON.stringify(tasks);
  // default update
  React.useEffect(() => {
    setData(tasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [json]);

  // memorized columns
  const tableColumns = React.useMemo(() => columns, [columns]);
  const tableData = data;

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    state: {
      sorting,
      columnOrder,
    },
    getRowId: (row) => row.id.toString(),
    onColumnOrderChange: setColumnOrder,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    getCoreRowModel: getCoreRowModel(),
  });

  React.useEffect(() => {
    if (editMode) toggleEditMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData]);

  // unique identifier
  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => tableData?.map((d) => d.id.toString()),
    [tableData]
  );

  // handle column drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const activeContainer = active.data.current?.sortable.containerId;
      if (over.id === "task_name") return;
      if (activeContainer === "col") {
        setColumnOrder((columnOrder) => {
          const oldIndex = columnOrder.indexOf(active.id as string);
          const newIndex = columnOrder.indexOf(over.id as string);
          return arrayMove(columnOrder, oldIndex, newIndex);
        });
      } else {
        setData((data) => {
          const oldIndex = dataIds.indexOf(active.id);
          const newIndex = dataIds.indexOf(over.id);
          return arrayMove(data, oldIndex, newIndex);
        });
      }
    }
  };

  // sensors
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    <ScrollArea className="flex">
      <div className="px-10 pb-10">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={
            dragMode === "col"
              ? [restrictToHorizontalAxis]
              : [restrictToVerticalAxis]
          }
          onDragEnd={handleDragEnd}
          onDragStart={({ active }: DragStartEvent) => {
            setDragMode(active.data.current?.sortable.containerId);
          }}
          sensors={sensors}
        >
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  <SortableContext
                    id="col"
                    items={columnOrder}
                    strategy={horizontalListSortingStrategy}
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <DraggableHeader
                          key={header.id}
                          header={header}
                          table={table}
                        />
                      );
                    })}
                  </SortableContext>
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
                <SortableContext
                  id="row"
                  items={dataIds}
                  strategy={verticalListSortingStrategy}
                >
                  {table.getRowModel().rows.map((row) => (
                    <DraggableRow
                      key={row.id}
                      table={table}
                      row={row}
                      columnOrder={columnOrder}
                    />
                  ))}
                </SortableContext>
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
        </DndContext>
      </div>
    </ScrollArea>
  );
}

export default TaskDataTable;
