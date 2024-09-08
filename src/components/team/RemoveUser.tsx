import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export const RemoveUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const user: any = JSON.parse(localStorage.getItem("user")!);
    if (!user || user.role !== "Manager") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8082/users");
        const data = await response.json();
        setUsers(data);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleSelectUser = (event: any) => {
    setSelectedUser(event.target.value);
  };

  const handleAddUser = async (event: any) => {
    event.preventDefault();

    if (selectedUser) {
      try {
        const url = `http://localhost:8082/teams/removeuser`;
        const headers = {
          "Content-Type": "application/json",
        };
        const body = JSON.stringify({ teamId: id, userId: selectedUser });

        const response = await fetch(url, {
          method: "POST",
          headers,
          body,
        });

        if (!response.ok) {
          throw new Error("Неуспешно добавяне на потребител!");
        }

        toast.success("Потребителя беше премахнат успешно!");
        navigate(`/teams/${id}`, { replace: true });
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Премахване на потребители
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form>
          <div>
            <label
              htmlFor="userSelect"
              className="block text-sm font-medium leading-6 text-gray-900 text-center"
            >
              Изберете потребител
            </label>
            <div className="my-2">
              <select
                id="userSelect"
                value={selectedUser}
                onChange={handleSelectUser}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                {users.map((user: any) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <button
              onClick={handleAddUser}
              className="flex w-full justify-center rounded-md bg-rose-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
            >
              Премахни потребител
            </button>
          </div>

          {error && <div className="text-red-500">{error}</div>}
        </form>
      </div>
    </div>
  );
};
