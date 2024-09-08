import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const MyTasks = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user: any = JSON.parse(localStorage.getItem("user")!);
    if (!user || user.role !== "User") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    fetch(
      `http://localhost:8082/tasks/user/${Number(
        JSON.parse(localStorage.getItem("user")!).id
      )}`
    )
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => setError(error.message));
  }, []);

  const handleMarkDone = (taskId: any) => {
    fetch(`http://localhost:8082/tasks/${Number(taskId)}/finish`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(() => navigate(0))
      .catch((error) => console.error(error));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-800">
          Моите задачи
        </h2>
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-rose-600 font-medium">
          В момента нямаш никакви задачи!
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

              {task.taskState !== "DONE" && (
                <button
                  onClick={() => handleMarkDone(task.id)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mx-auto"
                >
                  Маркирай като готов
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
