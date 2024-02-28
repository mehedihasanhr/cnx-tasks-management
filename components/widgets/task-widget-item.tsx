import { IconMessage, IconSubtask, IconCircleCheck } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

// task item
function TaskWidgetItem() {
  return (
    <div className="flex w-full items-center gap-3 border-b border-base-0/5 px-2 py-2.5 hover:bg-base-0/5">
      <IconCircleCheck className="text-base-300" />
      <Link
        href="#tasks"
        className="line-clamp-1 flex-1 text-sm text-base-0/90"
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </Link>
      <div className="flex items-center gap-3">
        <Link
          href="#subtask"
          className="flex items-center gap-1 text-sm text-base-300 hover:text-base-0"
        >
          <IconSubtask size={20} />
          03
        </Link>

        <Link
          href="#message"
          className="flex items-center gap-1 text-sm text-base-300 hover:text-base-0"
        >
          <IconMessage size={20} />
          03
        </Link>
      </div>
    </div>
  );
}

export default TaskWidgetItem;
