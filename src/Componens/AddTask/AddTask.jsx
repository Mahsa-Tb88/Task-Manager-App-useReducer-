import { useState } from "react";
import "./AddTask.scss";
import { addTask, getAllTasks, getTasks } from "../../utils/storage";
import { useTaskContext } from "../../Context/TasksContext";
export default function AddTask() {
  // const { handleAddTask } = useTaskContext();
  const { state, dispatch } = useTaskContext();
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  function onAddTask(e) {
    e.preventDefault();
    if (!title) {
      return;
    }
    const totalPage = Math.ceil(
      getTasks(state.page, state.perPage, state.search, state.status).totalTasks
        .filterd / state.perPage
    );
    // handleAddTask(title, completed);
    // function handleAddTask(title, completed) {
    addTask(title, completed);
    const lastPage =
      getAllTasks().length > totalPage * state.perPage
        ? totalPage + 1
        : totalPage;

    // setPage(lastPage);
    // dispatch({ type: "setPage", payload: lastPage });

    const allTasks = getTasks(lastPage, state.perPage);
    // setTasks(allTasks.tasks);
    // setTotalTasks(allTasks.totalTasks);
    // dispatch({
    //   type: "setTasks",
    //   payload: { tasks: allTasks.tasks, totalTasks: allTasks.totalTasks },
    // });
    // setSearch("");
    // setStatus("all");
    // dispatch({ type: "setSearch", payload: "" });
    // dispatch({ type: "setStatus", payload: "all" });

    dispatch({
      type: "addTask",
      payload: {
        lastPage,
        tasks: allTasks.tasks,
        totalTasks: allTasks.totalTasks,
      },
    });
    // }
    setTitle("");
    setCompleted(false);
  }
  return (
    <div>
      <form className="add-task-form" onSubmit={onAddTask}>
        <div className="input-group input-group-lg">
          <input
            type="text"
            placeholder="Add a New Task..."
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </div>
        <div className="mt-2 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="completed-check"
            onChange={(e) => setCompleted(e.target.checked)}
            checked={completed}
          />
          <label className="form-check-label" htmlFor="completed-check">
            Is Completed?
          </label>
        </div>
      </form>
    </div>
  );
}
