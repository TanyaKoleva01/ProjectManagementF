import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export const TaskList = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user: any = JSON.parse(localStorage.getItem("user")!);
    if (!user || user.role !== "Manager") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    fetch("http://localhost:8082/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => setError(error.message));
  }, []);

  const deleteTask = async (id: number) => {
    const url = `http://localhost:8082/tasks/${id}`;
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers,
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Задачата не е намерена!");
        } else {
          throw new Error(
            "Не успяхме да изтрием задачата. Моля опитайте по-късно!"
          );
        }
      }

      toast.success("Задачата беше изтрита успешно!");
      fetch("http://localhost:8082/tasks")
        .then((response) => response.json())
        .then((data) => setTasks(data))
        .catch((error) => setError(error.message));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-800">
          Управление на задачи
        </h2>
      </div>

      <div className="flex justify-center mt-5 mb-20">
        <Link
          to="/tasks/add"
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 border-b-4 border-emerald-700 hover:border-emerald-500 rounded"
        >
          Добави задача
        </Link>
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-rose-600 font-medium">
          В момента няма никакви задачи!
        </p>
      ) : (
        <ul>
          {tasks.map((task: any) => (
            <li
              key={task.id}
              className="border-solid border-2 border-sky-500 flex flex-col justify-around py-2 my-5"
            >
              <p>
                Име: <b>{task.name}</b>
              </p>
              <p>
                Описание: <b>{task.description}</b>
              </p>
              <p>
                Тип: <b>{task.taskType}</b>
              </p>
              <p>
                Състояние: <b>{task.taskState.replace("_", " ")}</b>
              </p>

              <button
                onClick={() => deleteTask(task.id)}
                className="bg-rose-500 hover:bg-rose-400 text-white font-bold py-2 px-4 border-b-4 border-rose-700 hover:border-rose-500 rounded mx-auto"
              >
                Изтриване
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
