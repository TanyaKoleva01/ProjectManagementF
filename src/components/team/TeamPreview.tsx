import { Link } from "react-router-dom";

export const TeamPreview = ({ team }: any) => {
  return (
    <>
      <div className="p-4">
        <div className="flex justify-center">
          <img
            className="w-16 md:w-32 lg:w-48 h-auto object-cover rounded-lg"
            src="/team-image.png"
            alt=""
          />
        </div>

        <h3 className="text-center mt-4 text-violet-500 font-medium text-2xl">
          Екип: {team.name}
        </h3>

        <p className="text-center font-medium text-violet-600">
          Проект: {team.projectName}
        </p>

        <p className="text-center font-medium text-violet-500">
          Мениджър: {team.managerName}
        </p>

        <div className="flex items-center justify-center mt-2 mb-5">
          <span className="font-bold text-lg mx-2">
            {" "}
            {new Date(team.projectStartDate).getFullYear()}-
            {String(new Date(team.projectStartDate).getMonth() + 1).padStart(
              2,
              "0"
            )}
            -
            {String(new Date(team.projectStartDate).getDate()).padStart(2, "0")}
          </span>
          <span className="font-bold text-lg">{"->"}</span>
          <span className="font-bold text-lg mx-2">
            {new Date(team.projectEndDate).getFullYear()}-
            {String(new Date(team.projectEndDate).getMonth() + 1).padStart(
              2,
              "0"
            )}
            -{String(new Date(team.projectEndDate).getDate()).padStart(2, "0")}
          </span>
        </div>

        <hr />

        <h2 className="mt-5 text-violet-500 font-medium text-lg">
          Екипи включени в проекта{" "}
          <span className="text-violet-800 font-bold">
            "{team.projectName}"
          </span>
          :
        </h2>

        <ul className="mb-5">
          {team.projectTeams.map((projTeam: any) => (
            <li
              className="font-medium text-violet-700 text-md"
              key={projTeam.id}
            >
              - {projTeam.name}
            </li>
          ))}
        </ul>

        <hr />

        <h2 className="mt-5 text-violet-500 font-medium text-lg">
          Потребители включени в проекта{" "}
          <span className="text-violet-800 font-bold">
            "{team.projectName}"
          </span>
          :
        </h2>

        <ul className="mb-5">
          {team.users.map((usr: any) => (
            <li className="font-medium text-violet-700 text-md" key={usr.id}>
              - {usr.username}
            </li>
          ))}
        </ul>

        <hr />

        <div className="flex justify-center mt-10">
          <Link
            to="/tasks"
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mx-2"
          >
            Управление на задачи
          </Link>

          <Link
            to="/sprints"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-2"
          >
            Управление на спринтове
          </Link>

          <Link
            to={`/teams/adduser/${team.id}`}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded mx-2"
          >
            Добави потребител
          </Link>

          <Link
            to={`/teams/removeuser/${team.id}`}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded mx-2"
          >
            Премахни потребител
          </Link>
        </div>
      </div>
    </>
  );
};
