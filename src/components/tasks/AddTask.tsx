import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AddTask = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [taskType, setTaskType] = useState("");
  const [sprintName, setSprintName] = useState("");
  const [sprintOptions, setSprintOptions] = useState([]);
  const [userName, setUserName] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user: any = JSON.parse(localStorage.getItem("user")!);
    if (!user || user.role !== "Manager") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    fetch("http://localhost:8082/users")
      .then((response) => response.json())
      .then((data) => setUserOptions(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8082/sprints")
      .then((response) => response.json())
      .then((data) => setSprintOptions(data));
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const taskData = {
      name,
      description,
      taskType,
      sprintName,
      userName,
    };

    try {
      await createTask(taskData);
      toast.success("Задачата беше създадена успешно!");
      navigate("/tasks", { replace: true });
    } catch (error: any) {
      setError(error.message);
    }
  };

  const createTask = async (taskData: any) => {
    const url = "http://localhost:8082/tasks/with-sprint-and-user";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify(taskData);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      });

      if (!response.ok) {
        throw new Error(
          "Не успяхме да създадем задачата. Моля проверете името на спринта или потрбителя!"
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Създаване на задача
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Име на задачата
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Описание на задачата
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="taskType"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Тип на задачата
            </label>
            <div className="mt-2">
              <select
                id="taskType"
                name="taskType"
                value={taskType}
                onChange={(e) => setTaskType(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Изберете тип на задачата</option>
                <option value="EPIC">Епик</option>
                <option value="STORY">История</option>
                <option value="TASK">Задача</option>
                <option value="BUG">Бъг</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="sprintName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Име на спринта
            </label>
            <div className="mt-2">
              <select
                id="sprintName"
                name="sprintName"
                value={sprintName}
                onChange={(e) => setSprintName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Изберете спринт</option>
                {sprintOptions.map((sprint: any) => (
                  <option key={sprint.id} value={sprint.name}>
                    {sprint.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Име на потребителя
            </label>
            <div className="mt-2">
              <select
                id="userName"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Изберете потребител</option>
                {userOptions.map((user: any) => (
                  <option key={user.id} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Създай задача
            </button>
          </div>

          {error && <div className="text-red-500">{error}</div>}
        </form>
      </div>
    </div>
  );
};
