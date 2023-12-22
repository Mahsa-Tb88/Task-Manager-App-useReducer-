import AddTask from "./Componens/AddTask/AddTask";
import Filter from "./Componens/Filter/Filter";
import Pagination from "./Componens/Pagination/Pagination";
import Tasklist from "./Componens/Tasklist/Tasklist";
import { useTaskContext } from "./Context/TasksContext";

export default function App() {
  const { state, dispatch } = useTaskContext();

  return (
    <div className="container">
      <h1 className="text-center my-4">Text Manager App</h1>
      <AddTask />
      <Filter />
      <Tasklist />
      <Pagination />
    </div>
  );
}
