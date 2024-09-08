import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Projects = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user: any = JSON.parse(localStorage.getItem("user")!);
    if (!user || user.role !== "Manager") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8082/projects");
        const data = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <div className="text-3xl font-bold text-purple-500">Зареждане...</div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col h-screen justify-center items-center">
        <div className="text-3xl font-bold text-purple-500 mb-5">
          В момента няма проекти!
        </div>

        <Link
          to="/projects/create"
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
        to="/projects/create"
        className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 border-b-4 border-emerald-700 hover:border-emerald-500 rounded"
      >
        Създай нов
      </Link>

      <div className="p-1 flex flex-wrap items-center justify-center">
        {projects.map((project: any) => (
          <div
            key={project.projectId}
            className="flex-shrink-0 m-6 relative overflow-hidden bg-purple-500 rounded-lg max-w-xs shadow-lg"
          >
            <div className="relative pt-10 px-10 flex items-center justify-center">
              <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"></div>
              <img className="relative w-40" src="/project-image.png" alt="" />
            </div>
            <div className="relative text-white px-6 pb-6 mt-6">
              <span className="block opacity-75 -mb-1">
                {new Date(project.startDate).getFullYear()}-
                {String(new Date(project.startDate).getMonth() + 1).padStart(
                  2,
                  "0"
                )}
                -
                {String(new Date(project.startDate).getDate()).padStart(2, "0")}
              </span>
              <div className="flex justify-between">
                <span className="block font-semibold text-xl">
                  <p>{project.name}</p>
                </span>
                <Link
                  to={`/projects/${project.projectId}`}
                  className="bg-white rounded-full text-purple-500 text-xs font-bold px-3 py-2 leading-none flex items-center"
                >
                  Виж
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
