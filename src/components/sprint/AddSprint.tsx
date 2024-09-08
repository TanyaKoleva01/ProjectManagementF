import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AddSprint = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [durationInWeeks, setDurationInWeeks] = useState(2);
  const [sprintState, setSprintState] = useState("NOT_STARTED");
  const [error, setError] = useState(null);

  useEffect(() => {
    const user: any = JSON.parse(localStorage.getItem("user")!);
    if (!user || user.role !== "Manager") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const sprintData = {
      name,
      durationInWeeks,
      sprintState,
    };

    try {
      await createSprint(sprintData);
      toast.success("Спринта беше създаден успешно!");
      navigate("/sprints", { replace: true });
    } catch (error: any) {
      setError(error.message);
    }
  };

  const createSprint = async (sprintData: any) => {
    const url = "http://localhost:8082/sprints";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify(sprintData);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      });

      if (!response.ok) {
        throw new Error("Не успяхме да създадем спринта!");
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
          Създаване на спринт
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Име на спринта
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
              htmlFor="durationInWeeks"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Продължителност на спринта (седмици)
            </label>
            <div className="mt-2">
              <input
                id="durationInWeeks"
                name="durationInWeeks"
                type="number"
                required
                value={durationInWeeks}
                onChange={(e) => setDurationInWeeks(e.target.valueAsNumber)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="sprintState"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Състояние на спринта
            </label>
            <div className="mt-2">
              <select
                id="sprintState"
                name="sprintState"
                value={sprintState}
                onChange={(e) => setSprintState(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="NOT_STARTED">Не е започнат</option>
                <option value="RUNNING">В процес</option>
                <option value="FINISHED">Завършен</option>
              </select>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Създай спринт
            </button>
          </div>

          {error && <div className="text-red-500">{error}</div>}
        </form>
      </div>
    </div>
  );
};
