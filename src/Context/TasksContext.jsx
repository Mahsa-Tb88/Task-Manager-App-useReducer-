import React, {  useContext, useReducer } from "react";
import { getTasks } from "../utils/storage";
import { taskReducer } from "./taskReducer";
const TasksContext = React.createContext();
export default TasksContext;

function TasksContextProvider({ children }) {
  const initialTasks = getTasks(1, 3);
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: initialTasks.tasks,
    totalTasks: initialTasks.totalTasks,
    page: 1,
    status: "all",
    search: "",
    idEdit: null,
    editTitle: "",
    perPage: 3,
  });

  const context = { state, dispatch };
  return (
    <TasksContext.Provider value={context}>{children}</TasksContext.Provider>
  );
}

function useTaskContext() {
  return useContext(TasksContext);
}

export { TasksContextProvider, useTaskContext };
