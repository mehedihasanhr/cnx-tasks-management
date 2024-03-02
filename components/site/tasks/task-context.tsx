"use client";

import * as React from "react";

type Task = { [key: string]: unknown };

type ContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

// task context
export const TaskContext = React.createContext<ContextType | null>(null);

// task context hook
export const useTaskContext = (tasks: Task[]) => {
  const context = React.useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskContextProvider");
  }
  const { setTasks } = context;
  React.useEffect(() => {
    setTasks(tasks);
  }, []);
  return context;
};

// task context provider
export default function TaskContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const contextValue = React.useMemo(
    () => ({
      tasks,
      setTasks,
    }),
    [tasks, setTasks]
  );

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
}
