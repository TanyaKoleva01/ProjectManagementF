import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export const Teams = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user: any = JSON.parse(localStorage.getItem("user")!);
    if (!user || user.role !== "Manager") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("http://localhost:8082/teams");
        const data = await response.json();
        setTeams(
          data.filter((team: any, index: any, self: any) => {
            return index === self.findIndex((t: any) => t.name === team.name);
          })
        );
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  const deleteTeam = async (id: number) => {
    toast.success("Очаквай скоро!");
  };

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <div className="text-3xl font-bold text-purple-500">Зареждане...</div>
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="flex flex-col h-screen justify-center items-center">
        <div className="text-3xl font-bold text-purple-500 mb-5">
          В момента няма отбори!
        </div>

        <Link
          to="/teams/create"
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 border-b-4 border-emerald-700 hover:border-emerald-500 rounded"
        >
          Създай нов
        </Link>
      </div>
    );
  }

  return (
    <div className="p-1 flex flex-col flex-wrap items-center justify-center my-8">
      <Link
        to="/teams/create"
        className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 border-b-4 border-emerald-700 hover:border-emerald-500 rounded"
      >
        Създай нов
      </Link>

      <div className="p-1 flex flex-wrap items-center justify-center">
        {teams.map((team: any) => (
          <div
            key={team.id}
            className="flex-shrink-0 m-6 relative overflow-hidden bg-purple-500 rounded-lg max-w-xs shadow-lg"
          >
            <div className="relative pt-10 px-10 flex items-center justify-center">
              <img
                className="w-48 md:w-64 lg:w-80 h-auto object-cover rounded-lg"
                src="/team-image.png"
                alt=""
              />
            </div>
            <div className="relative text-white px-6 pb-6 mt-6">
              <h3 className="text-lg font-medium mb-2">Отбор: {team.name}</h3>
              <p className="text-gray-800 text-sm mb-4">
                Проект: {team.project.name}
              </p>
              <div className="flex items-center justify-between">
                <Link
                  to={`/teams/${team.id}`}
                  className="bg-white rounded-full text-indigo-500 text-xs font-bold px-3 py-2 leading-none flex items-center"
                >
                  Виж
                </Link>

                <button
                  onClick={() => deleteTeam(team.id)}
                  className="bg-white rounded-full text-red-500 text-xs font-bold px-3 py-2 leading-none flex items-center"
                >
                  Изтрий
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
