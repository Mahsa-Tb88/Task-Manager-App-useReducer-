import "./Pagination.scss";
import { useTaskContext } from "../../Context/TasksContext";
import { getTasks } from "../../utils/storage";

export default function Pagination({}) {
  const { state, dispatch } = useTaskContext();
  const currentPage = state.page;
  const tasks = state.tasks;
  const page = state.page;
  const totalPage = Math.ceil(
    getTasks(state.page, state.perPage, state.search, state.status).totalTasks
      .filterd / state.perPage
  );
  function handlePage(i) {
    dispatch({ type: "setPage", payload: i });
    const newTasks = getTasks(i, state.perPage, state.search, state.status);

    dispatch({
      type: "setTasks",
      payload: { tasks: newTasks.tasks, totalTasks: newTasks.totalTasks },
    });
  }

  const prevClasses = ["page-item", currentPage == 1 ? "disabled" : ""].join(
    " "
  );
  const nextClasses = [
    "page-item",
    currentPage == totalPage ? "disabled" : "",
  ].join(" ");

  let pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(
      <li className="page-item" key={i}>
        <span
          className={"page-link " + (currentPage == i ? "active" : "")}
          onClick={() => handlePage(i)}
        >
          {i}
        </span>
      </li>
    );
  }

  if (tasks.length == 0 && page == 1) {
    return;
  }
  function handleSelectPage(e) {
    let numPage = e.target.value;
    if (0 < numPage && numPage <= totalPage) {
      numPage = parseInt(numPage);
      handlePage(numPage);
    } else {
      return;
    }
  }
  if (totalPage == 1) {
    return;
  }
  return (
    <ul className="pagination paginate">
      {totalPage > 4 ? (
        <li className={prevClasses}>
          <span className="page-link" aria-label="Next">
            <span aria-hidden="true" onClick={() => handlePage(1)}>
              First
            </span>
          </span>
        </li>
      ) : (
        ""
      )}
      <li className={prevClasses}>
        <span
          className="page-link"
          aria-label="Previous"
          onClick={() => handlePage(currentPage - 1)}
        >
          <span aria-hidden="true">&laquo;</span>
        </span>
      </li>
      {totalPage < 5 ? (
        pages
      ) : (
        <div>
          <span>
            <input
              className=" numberOfPage"
              value={page}
              onChange={handleSelectPage}
            />
          </span>
          <span className="totalNumberOfPage">of {totalPage}</span>
        </div>
      )}
      <li className={nextClasses}>
        <span
          className="page-link"
          aria-label="Next"
          onClick={() => handlePage(currentPage + 1)}
        >
          <span aria-hidden="true">&raquo;</span>
        </span>
      </li>
      {totalPage > 4 ? (
        <li className={nextClasses}>
          <span
            className="page-link"
            aria-label="Next"
            onClick={() => handlePage(totalPage)}
          >
            <span aria-hidden="true">Last</span>
          </span>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
}
