"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";

function DatePicker({
  children,
  date,
  onDateSelect,
}: {
  children: React.ReactNode;
  date?: Date;
  onDateSelect: (date: Date) => void;
}) {
  const [open, setOpen] = React.useState(false);

  function onSubmit(date: Date) {
    onDateSelect(date);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          defaultMonth={date}
          selected={date}
          onSelect={(d) => d && onSubmit(d)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
