import React from "react";
import { match } from "ts-pattern";
import { v4 } from "uuid";

import DateSelectionFilter from "@/components/site/filter/date-selection";
import ProjectSelectionFilter from "@/components/site/filter/projects-select";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Project } from "@/types";
import { IconChevronDown, IconPlus } from "@tabler/icons-react";

interface PropTypes {
  children: React.ReactNode;
}

const quickFilterOptions = ["Pending", "Completed", "On hold", "Progressing"];
const customFilterOption = [
  { type: "project", title: "Project" },
  { type: "person", title: "Creator" },
  { type: "person", title: "Assignee" },
  { type: "date", title: "Due date" },
  { type: "date", title: "Creation date" },
];

type CustomFilterType = {
  id: string;
  type: string;
  fieldName: string;
  value:
    | string
    | {
        from: Date;
        to?: Date;
      };
};

type ActiveFilterState = {
  quickFilter: string;
  customFilter: CustomFilterType[];
};

function Filter({ children }: PropTypes) {
  const [activeFilter, setActiveFilter] = React.useState<ActiveFilterState>({
    quickFilter: "",
    customFilter: [],
  });

  // handle quick filter menu
  const handleQuickFilterMenuItemClick = (i: string) => {
    setActiveFilter((prev) => ({ ...prev, quickFilter: i }));
  };

  // add filter option
  const handleCustomFilter = (option: { type: string; fieldName: string }) => {
    let data: CustomFilterType = { ...option, id: v4(), value: "" };
    // option type is date add value as object with from, to
    if (option.type === "date") {
      data = {
        id: v4(),
        ...option,
        value: { from: new Date(), to: undefined },
      };
    }

    // update state
    setActiveFilter((prev) => ({
      ...prev,
      customFilter: [...prev.customFilter, data],
    }));
  };

  // handle project select
  const handleProjectSelect = (item: CustomFilterType, project: Project) => {
    const customFilter = [...activeFilter.customFilter];
    const modifiedItem = { ...item, value: project.title };
    const data = customFilter.map((i) => (i.id === item.id ? modifiedItem : i));

    setActiveFilter((prev) => ({ ...prev, customFilter: data }));
  };

  // handle date selection
  function handleDateSelection(
    option: CustomFilterType,
    data: {
      from: Date;
      to?: Date;
    }
  ) {
    const customFilter = [...activeFilter.customFilter];
    const modifiedItem = { ...option, value: data };
    const newData = customFilter.map((i) =>
      i.id === option.id ? modifiedItem : i
    );

    setActiveFilter((prev) => ({ ...prev, customFilter: newData }));
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[500px]" align="end">
        <div className="">
          <p className="mb-3 text-xs font-semibold text-base-300">
            Quick filters
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <ul className="flex flex-wrap items-center gap-2.5">
              {quickFilterOptions.map((i) => (
                <li
                  key={i}
                  role="menuitem"
                  tabIndex={-1}
                  data-active={activeFilter.quickFilter === i}
                  onKeyDown={() => handleQuickFilterMenuItemClick(i)}
                  onClick={() => handleQuickFilterMenuItemClick(i)}
                  className="w-fit cursor-pointer rounded-lg border border-base-400 px-2 py-1.5 text-sm text-base-300 hover:bg-base-400 data-[active=true]:bg-base-0/10 data-[active=true]:text-white/90"
                >
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Custom filters */}
        <div className="pt-4">
          <div className="flex flex-col gap-4 text-base-300">
            {activeFilter.customFilter?.map((filter, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={index}>
                {match(filter)
                  .with({ type: "date" }, (option) => (
                    <DateSelectionFilter
                      option={option}
                      onSelect={(data: { from: Date; to?: Date }) =>
                        handleDateSelection(option, data)
                      }
                    />
                  ))
                  .with({ type: "person" }, (f) => (
                    <p className="text-white">{f.fieldName}</p>
                  ))
                  .with({ type: "project" }, (i) => (
                    <ProjectSelectionFilter
                      title={i.value as string}
                      onSelect={(project) => handleProjectSelect(i, project)}
                    />
                  ))
                  .otherwise(() => null)}
              </React.Fragment>
            ))}
          </div>

          <div className="mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm text-base-300"
                >
                  <IconPlus size={15} className="mr-1.5" />
                  <span> Add filter</span>
                  <IconChevronDown size={14} className="ml-2" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                {customFilterOption?.map((item) => (
                  <DropdownMenuItem
                    key={item.title}
                    onClick={() =>
                      handleCustomFilter({
                        type: item.type,
                        fieldName: item.title,
                      })
                    }
                  >
                    {item.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Separator className="my-4" />
        <div className="flex">
          <Button
            onClick={() =>
              setActiveFilter({
                quickFilter: "",
                customFilter: [],
              })
            }
            variant="secondary"
            size="sm"
            className="ml-auto"
          >
            Clear All
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Filter;
