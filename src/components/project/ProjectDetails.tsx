import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectPreview } from "./ProjectPreview";
import toast from "react-hot-toast";

export const ProjectDetails = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user: any = JSON.parse(localStorage.getItem("user")!);
    if (!user || user.role !== "Manager") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `http://localhost:8082/projects/${Number(id)}`
        );
        const data = await response.json();
        setProject(data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const updateProjectStatus = async (projectId: any) => {
    const url = "http://localhost:8082/projects/update-status";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      projectId,
      status: "Завършен",
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      });

      if (!response.ok) {
        throw new Error("Не успяхме да актуализираме статуса на проекта!");
      }

      toast.success("Проекта беше успешно завършен!");

      try {
        const response = await fetch(
          `http://localhost:8082/projects/${Number(id)}`
        );
        const data = await response.json();
        setProject(data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ProjectPreview project={project} updateProject={updateProjectStatus} />
  );
};
