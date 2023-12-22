import { useTaskContext } from "../../Context/TasksContext";
import { getTasks } from "../../utils/storage";
import "./Filter.scss";

export default function Filter({}) {
  const { state, dispatch } = useTaskContext();
  function changeStatus(newStatus) {
    dispatch({ type: "setStatus", payload: newStatus });

    const newTasks = getTasks(1, state.perPage, state.search, newStatus);
    dispatch({
      type: "setTasks",
      payload: { tasks: newTasks.tasks, totalTasks: newTasks.totalTasks },
    });
  }
  function changeSearch(e) {
    dispatch({ type: "setSearch", payload: e.target.value });
    // setSearch(e.target.value);
    const newSearch = e.target.value;
    // dispatch({ type: "setPage", payload: 1 });
    // setPage(1);
    const newTasks = getTasks(1, state.perPage, newSearch, state.status);
    dispatch({
      type: "setTasks",
      payload: { tasks: newTasks.tasks, totalTasks: newTasks.totalTasks },
    });
    // setTasks(newTasks.tasks);
    // setTotalTasks(newTasks.totalTasks);
  }
  const currentStatus = state.status;
  const search = state.search;
  return (
    <div className="filter flex-column flex-md-row align-items-md-center ">
      <div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="status"
            id="all-tasks"
            onChange={() => changeStatus("all")}
            checked={currentStatus == "all"}
          />
          <label className="form-check-label" htmlFor="all-tasks">
            All Tasks
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="status"
            id="completed-task"
            value="completed"
            onChange={() => changeStatus("completed")}
            checked={currentStatus == "completed"}
          />
          <label className="form-check-label" htmlFor="completed-task">
            completed
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="status"
            id="in-progress-task"
            onChange={() => changeStatus("in-progress")}
            checked={currentStatus == "in-progress"}
          />
          <label className="form-check-label" htmlFor="in-progress-task">
            In progress
          </label>
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="serach..."
          className="form-control"
          onChange={changeSearch}
          value={search}
        />
      </div>
    </div>
  );
}
