import "./Task.scss";
import { useTaskContext } from "../../Context/TasksContext";
import { deleteTask, getTasks, updateTask } from "../../utils/storage";

export default function Task({ task }) {
  const { state, dispatch } = useTaskContext();
  const idEdit = state.idEdit;
  const editTitle = state.editTitle;

  function onToggle(id) {
    const findTask = state.tasks.find((task) => task.id == id);
    const title = findTask.title;
    const completed = !findTask.completed;
    updateTask(id, title, completed);

    const newTasks = state.tasks.map((task) => {
      if (task.id == id) {
        task.completed = !task.completed;
        return { id, title: task.title, completed: task.completed };
      } else {
        return task;
      }
    });
    dispatch({ type: "updateTasks", payload: newTasks });
  }
  function onEdit(id) {
    const findTask = state.tasks.find((task) => task.id == id);
    dispatch({ type: "setIdEdit", payload: id });
    dispatch({ type: "setEditTitle", payload: findTask.title });
    if (state.idEdit == id) {
      const newTasks = state.tasks.map((task) => {
        if (task.id == id) {
          return { id, title: state.editTitle, completed: task.completed };
        } else {
          return task;
        }
      });
      dispatch({ type: "updateTasks", payload: newTasks });
      dispatch({ type: "setIdEdit", payload: null });

      updateTask(id, state.editTitle, findTask.completed);
    }
  }
  function onDelete(id) {
    const newTasks = state.tasks.filter((task) => task.id !== id);
    deleteTask(id);

    let allTasks;

    if (newTasks.length == 0 && page != 1) {
      allTasks = getTasks(
        state.page - 1,
        state.perPage,
        state.search,
        state.status
      );
      dispatch({ type: "setPage", payload: state.page - 1 });
    } else {
      allTasks = getTasks(
        state.page,
        state.perPage,
        state.search,
        state.status
      );
    }
    dispatch({
      type: "setTasks",
      payload: { tasks: allTasks.tasks, totalTasks: allTasks.totalTasks },
    });
  }
  const statusClasses = [
    "status",
    task.completed ? "bg-success" : "bg-secondary",
  ].join(" ");
  const toggleClasses = [
    "btn",
    task.completed ? "btn-secondary" : "btn-success",
  ].join(" ");
  function handleInput(e) {
    dispatch({ type: "setEditTitle", payload: e.target.value });
  }
  return (
    <li className="list-group-item d-flex flex-column flex-md-row task ">
      <div>
        <span className="title-box">{task.title}</span>
        <span className={statusClasses}>
          {task.completed ? "completed" : "in-Progress"}
        </span>
      </div>
      <div className="actions">
        {idEdit == task.id ? (
          <input
            type="text"
            className="inputEdit"
            value={editTitle}
            onChange={handleInput}
          />
        ) : (
          ""
        )}
        <button className={toggleClasses} onClick={() => onToggle(task.id)}>
          Toggle
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={() => onEdit(task.id)}
        >
          {idEdit == task.id ? "Update" : "Edit"}
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
