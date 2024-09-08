import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateProject = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user: any = JSON.parse(localStorage.getItem("user")!);
    if (!user || user.role !== "Manager") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const projectData = {
      name: projectName,
      description: projectDescription,
      startDate: startDate,
      endDate: endDate,
      status: "В прогрес",
    };

    try {
      await createProject(projectData);
      navigate("/projects", { replace: true });
    } catch (error: any) {
      setError(error.message);
    }
  };

  const createProject = async (projectData: any) => {
    const url = "http://localhost:8082/projects";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify(projectData);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      });
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
          Създаване на проект
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="projectName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Име на проекта
            </label>
            <div className="mt-2">
              <input
                id="projectName"
                name="projectName"
                type="text"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="projectDescription"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Описание на проекта
            </label>
            <div className="mt-2">
              <textarea
                id="projectDescription"
                name="projectDescription"
                required
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Начална дата
            </label>
            <div className="mt-2">
              <input
                id="startDate"
                name="startDate"
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Краен срок
            </label>
            <div className="mt-2">
              <input
                id="endDate"
                name="endDate"
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Създаване на проект
            </button>
          </div>

          {error && <div className="text-red-500">{error}</div>}
        </form>
      </div>
    </div>
  );
};
