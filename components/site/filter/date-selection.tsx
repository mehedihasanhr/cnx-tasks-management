import SingleDatePicker from "@/components/single-date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconTrash } from "@tabler/icons-react";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import React from "react";

interface Option {
  id: string;
  type: string;
  fieldName: string;
  value: string | ArgType;
}

interface ArgType {
  from: Date;
  to?: Date;
}

interface PropTypes {
  option: Option;
  onSelect: (value: ArgType) => void;
  remove: () => void;
}

function DateSelectionFilter({ option, onSelect, remove }: PropTypes) {
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    (option.value as ArgType).from
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(
    (option.value as ArgType).to
  );

  // handle start date
  const handleStateDate = (date?: Date) => {
    setStartDate(date);
    if (date) {
      onSelect({ from: date as Date, to: endDate });
    }
  };

  // handle end date
  const handleEndDate = (date?: Date) => {
    setEndDate(date);
    onSelect({ from: startDate as Date, to: date });
  };

  return (
    <div className="w-full">
      <p className="mb-1 flex items-center text-sm font-medium text-base-300">
        {option.fieldName}

        <Button
          variant="link"
          size="icon-sm"
          onClick={remove}
          className="text-base-300 hover:text-white"
        >
          <IconTrash size={14} />
        </Button>
      </p>

      <div className="flex items-center">
        <SingleDatePicker date={startDate} setDate={handleStateDate}>
          <Input
            readOnly
            type="text"
            value={startDate ? format(startDate, "dd/MM/yyyy") : ""}
            placeholder="DD/MM/YYYY"
            className="bg-base-300/5 text-white"
            icon={<Calendar />}
          />
        </SingleDatePicker>
        <span className="block px-4 text-base-300">to</span>
        <SingleDatePicker date={endDate} setDate={handleEndDate}>
          <Input
            readOnly
            type="text"
            value={endDate ? format(endDate, "dd/MM/yyyy") : ""}
            placeholder="DD/MM/YYYY"
            className="bg-base-300/5 text-white"
            icon={<Calendar />}
          />
        </SingleDatePicker>
      </div>
    </div>
  );
}

export default DateSelectionFilter;
