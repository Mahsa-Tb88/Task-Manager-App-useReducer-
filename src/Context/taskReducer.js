export function taskReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "setPage":
      return { ...state, page: payload };
    case "setTasks":
      return { ...state, tasks: payload.tasks, totalTasks: payload.totalTasks };
    case "setSearch":
      return { ...state, search: payload, page: 1 };
    case "setStatus":
      return { ...state, status: payload, page: 1 };
    case "updateTasks":
      return { ...state, tasks: payload };
    case "setIdEdit":
      return { ...state, idEdit: payload };
    case "setEditTitle":
      return { ...state, editTitle: payload };
    case "addTask":
      return {
        ...state,
        search: "",
        status: "all",
        page: payload.lastPage,
        tasks: payload.tasks,
        totalTasks: payload.totalTasks,
      };
  }
  throw new Error("There is an error");
}
