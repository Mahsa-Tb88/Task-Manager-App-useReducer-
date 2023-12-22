import Task from "../Task/Task";
import "./Tasklist.scss";
import { useTaskContext } from "../../Context/TasksContext";

export default function Tasklist() {
  const { state } = useTaskContext();

  if (state.tasks.length == 0 && state.page == 1) {
    return <p className="notask">There is no task</p>;
  }

  return (
    <ul className="list-group tasks-list">
      {state.tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </ul>
  );
}
