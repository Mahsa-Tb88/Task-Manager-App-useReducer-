function getAllTasks() {
  try {
    return JSON.parse(localStorage.tasks);
  } catch (e) {
    return [];
  }
}

function saveTasks(tasks) {
  if (tasks instanceof Array) {
    localStorage.tasks = JSON.stringify(tasks);
    return true;
  }
  return false;
}

function getTasks(page = 1, perPage = 4, search = "", status = "all") {
  const tasks = getAllTasks();
  let filteredTasks = tasks.filter((task) => {
    return task.title.toLowerCase().includes(search.toLowerCase());
  });

  if (status == "completed") {
    filteredTasks = filteredTasks.filter((task) => task.completed);
  } else if (status == "in-progress") {
    filteredTasks = filteredTasks.filter((task) => !task.completed);
  } else {
    filteredTasks = filteredTasks;
  }
  const start = (page - 1) * perPage;
  const currentPageTasks = filteredTasks.slice(start, start + perPage);

  return {
    tasks: currentPageTasks,
    totalTasks: {
      all: tasks.length,
      filterd: filteredTasks.length,
    },
  };
}

function deleteTask(id) {
  const tasks = getAllTasks();
  const taskFiltered = tasks.filter((task) => task.id != id);
  saveTasks(taskFiltered);
}

function addTask(title, completed) {
  const tasks = getAllTasks();
  let id;
  if (tasks.length) {
    id = tasks[tasks.length - 1].id + 1;
  } else {
    id = 1;
  }
  const newTask = {
    id,
    title,
    completed,
  };
  tasks.push(newTask);
  saveTasks(tasks);
  return;
}

function updateTask(id, title, completed) {
  let tasks = getAllTasks();
  tasks = tasks.map((task) => {
    if (task.id == id) {
      return { id, title, completed };
    } else {
      return task;
    }
  });

  saveTasks(tasks);
}

export { getAllTasks, saveTasks, getTasks, deleteTask, addTask, updateTask };
