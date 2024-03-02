"client side";

import React from "react";
import dayjs from "dayjs";
import { IconCalendarMonth } from "@tabler/icons-react";
import { updateTask } from "@/actions/tasks";
import DatePicker from "../../date-picker";

function DueDate({
  taskId,
  createdAt,
  dueDate,
}: {
  taskId: number;
  createdAt?: Date;
  dueDate?: Date;
}) {
  const [date, setDate] = React.useState<Date | undefined>(dueDate);

  const onDateSelect = async (date: Date) => {
    setDate(date);
    await updateTask(taskId, { dueDate: date });
  };

  return (
    <DatePicker
      date={date ? new Date(date) : undefined}
      onDateSelect={onDateSelect}
    >
      <div className="flex h-fit w-full items-center space-x-1 px-0 py-0 text-left hover:cursor-pointer hover:bg-transparent">
        <IconCalendarMonth
          size={16}
          className={date ? "text-white" : "text-base-300"}
        />
        <span>
          {date ? (
            `${dayjs(createdAt).format("MMM DD")} - ${dayjs(date).format("MMM DD")}`
          ) : (
            <span className="text-base-300">Select Date</span>
          )}
        </span>
      </div>
    </DatePicker>
  );
}

export default DueDate;
