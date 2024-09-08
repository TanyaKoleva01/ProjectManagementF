import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export const SprintList = () => {
  const navigate = useNavigate();

  const [sprints, setSprints] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user: any = JSON.parse(localStorage.getItem("user")!);
    if (!user || user.role !== "Manager") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    fetch("http://localhost:8082/sprints")
      .then((response) => response.json())
      .then((data) => setSprints(data))
      .catch((error) => setError(error.message));
  }, []);

  const deleteSprint = async (id: number) => {
    const url = `http://localhost:8082/sprints/${id}`;
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
          throw new Error("Спринта не е намерен!");
        } else {
          throw new Error(
            "Не успяхме да изтрием спринта. Моля опитайте по-късно!"
          );
        }
      }

      toast.success("Спринта беше изтрит успешно!");
      fetch("http://localhost:8082/sprints")
        .then((response) => response.json())
        .then((data) => setSprints(data))
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
          Управление на спринтове
        </h2>
      </div>

      <div className="flex justify-center mt-5 mb-20">
        <Link
          to="/sprints/add"
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 border-b-4 border-emerald-700 hover:border-emerald-500 rounded"
        >
          Добави спринт
        </Link>
      </div>

      {sprints.length === 0 ? (
        <p className="text-center text-rose-600 font-medium">
          В момента няма никакви спринтове!
        </p>
      ) : (
        <ul>
          {sprints.map((sprint: any) => (
            <li key={sprint.id}>
              <div className="border-solid border-2 border-sky-500 flex-col flex justify-center my-5">
                <div className="flex flex-row justify-around py-2 my-5">
                  <p>
                    Спринт: <b>{sprint.name}</b>
                  </p>
                  <p>
                    Статус: <b>{sprint.sprintState}</b>
                  </p>
                </div>

                <button
                  onClick={() => deleteSprint(sprint.id)}
                  className="bg-rose-500 hover:bg-rose-400 text-white font-bold py-2 px-4 border-b-4 border-rose-700 hover:border-rose-500 rounded mx-auto"
                >
                  Изтриване
                </button>

                <div className="mb-5">
                  <p>Задачи към спринта:</p>
                  {sprint.tasks.length === 0 ? (
                    <h1>Няма задачи!</h1>
                  ) : (
                    <ul>
                      {sprint.tasks.map((task: any) => (
                        <li>
                          <b>{task.name}</b> {" -> "} <b>{task.taskState}</b>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
