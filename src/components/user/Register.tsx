import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("User");
  const [error, setError] = useState(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const userData = {
      name: firstName,
      username: email.split("@")[0],
      password,
      email,
      role,
      firstName,
      lastName,
    };

    try {
      await createUser(userData);
      navigate("/login", { replace: true });
    } catch (error: any) {
      setError(error.message);
    }
  };

  const createUser = async (userData: any) => {
    const url = "http://localhost:8082/users";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify(userData);

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
          Създаване на профил
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Имейл
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Име
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                name="firstName"
                required
                autoComplete="name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Фамилия
            </label>
            <div className="mt-2">
              <input
                id="lastName"
                name="lastName"
                required
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Парола
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Роля
            </label>
            <div className="mt-2">
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="User">Потребител</option>
                <option value="Manager">Мениджър</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Регистриране
            </button>
          </div>

          {error && <div className="text-red-500">{error}</div>}
        </form>
      </div>
    </div>
  );
};
