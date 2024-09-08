import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateTeam = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user: any = JSON.parse(localStorage.getItem("user")!);
    if (!user || user.role !== "Manager") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const [teamName, setTeamName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState(null);
  const [blockButton, setBlockButton] = useState(false);

  const handleSubmit = async (event: any) => {
    setBlockButton(true);
    event.preventDefault();

    let userData = JSON.parse(localStorage.getItem("user")!);

    const teamData = {
      teamName: teamName,
      projectName: projectName,
      userId: userData.id,
    };

    try {
      await createTeam(teamData);
      navigate("/teams", { replace: true });
      setBlockButton(false);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const createTeam = async (teamData: any) => {
    const url = "http://localhost:8082/teams";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify(teamData);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      });
      if (!response.ok) {
        throw new Error("Неуспешно създаване на екип!");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Създаване на екип
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="teamName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Име на екип
            </label>
            <div className="mt-2">
              <input
                id="teamName"
                name="teamName"
                type="text"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

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
            <button
              disabled={blockButton}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Създаване на екип
            </button>
          </div>

          {error && <div className="text-red-500">{error}</div>}
        </form>
      </div>
    </div>
  );
};
