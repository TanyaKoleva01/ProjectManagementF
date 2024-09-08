import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TeamPreview } from "./TeamPreview";

export const TeamDetails = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user: any = JSON.parse(localStorage.getItem("user")!);
    if (!user || user.role !== "Manager") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(
          `http://localhost:8082/teams/${Number(id)}`
        );
        const data = await response.json();
        if (!response.ok) {
          navigate("/", { replace: true });
        }

        setTeam(data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };
    fetchTeam();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <TeamPreview team={team} />;
};
