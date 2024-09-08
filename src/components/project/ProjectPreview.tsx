export const ProjectPreview = ({ project, updateProject }: any) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm">
        <div className="relative flex justify-center">
          <img
            className="w-48 md:w-64 h-auto object-cover rounded-lg"
            src="/project-image.png"
            alt="Product Image"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-2 text-center">
            {project.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 text-center">
            {project.description}
          </p>
          <div className="flex items-center justify-center mb-5">
            <span className="font-bold text-lg">
              {" "}
              {new Date(project.startDate).getFullYear()}-
              {String(new Date(project.startDate).getMonth() + 1).padStart(
                2,
                "0"
              )}
              -{String(new Date(project.startDate).getDate()).padStart(2, "0")}
              {" / "}
              {new Date(project.endDate).getFullYear()}-
              {String(new Date(project.endDate).getMonth() + 1).padStart(
                2,
                "0"
              )}
              -{String(new Date(project.endDate).getDate()).padStart(2, "0")}
            </span>
          </div>

          <p className="text-gray-800 text-sm mb-4 text-center">
            Статус:{" "}
            <span className="font-bold text-black">{project.status}</span>
          </p>

          <div className="flex justify-center items-center">
            <button
              onClick={() => updateProject(project.projectId)}
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 border-b-4 border-emerald-700 hover:border-emerald-500 rounded cursor-pointer"
            >
              Маркирай като завършен
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
