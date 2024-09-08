import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";
import { Register } from "./components/user/Register";
import { Login } from "./components/user/Login";
import { NotFound } from "./components/NotFound";
import { Teams } from "./components/team/Teams";
import { Projects } from "./components/project/Projects";
import { CreateProject } from "./components/project/CreateProject";
import { ProjectDetails } from "./components/project/ProjectDetails";
import { CreateTeam } from "./components/team/CreateTeam";
import { TeamDetails } from "./components/team/TeamDetails";
import { AddUsers } from "./components/team/AddUser";
import { RemoveUser } from "./components/team/RemoveUser";
import { TaskList } from "./components/tasks/TaskList";
import { AddTask } from "./components/tasks/AddTask";
import { AddSprint } from "./components/sprint/AddSprint";
import { SprintList } from "./components/sprint/SprintList";
import { MyTasks } from "./components/tasks/MyTasks";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Toaster />

      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/create" element={<CreateTeam />} />
        <Route path="/teams/:id" element={<TeamDetails />} />
        <Route path="/teams/adduser/:id" element={<AddUsers />} />
        <Route path="/teams/removeuser/:id" element={<RemoveUser />} />

        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/create" element={<CreateProject />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />

        <Route path="/my-tasks" element={<MyTasks />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/add" element={<AddTask />} />

        <Route path="/sprints" element={<SprintList />} />
        <Route path="/sprints/add" element={<AddSprint />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
