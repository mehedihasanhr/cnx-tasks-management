import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function SingleDatePicker({
  date,
  setDate,
  children,
}: {
  date?: Date;
  setDate: (date?: Date) => void;
  children?: React.ReactElement;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="min-w-fit">
        <Calendar
          mode="single"
          defaultMonth={date}
          selected={date}
          onSelect={(date) => setDate(date)}
        />
      </PopoverContent>
    </Popover>
  );
}

export default SingleDatePicker;
