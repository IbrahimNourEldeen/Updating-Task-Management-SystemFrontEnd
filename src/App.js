import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import MyTeams from "./Pages/MyTeams";
import Settings from "./Pages/Settings";
import Signup from "./Pages/Signup";
import Navigation from "./Components/Navbar";
import { useSelector } from "react-redux";
import Sidebar from "./Components/Sidebar";
import TeamDetails from "./Pages/TeamDetails";
import Notification from "./Pages/Notification";
import UpdateTask from "./Pages/updateTask";
import TaskInformation from "./Pages/TaskInformation";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <BrowserRouter basename="/Updating-Task-Management-SystemFrontEnd">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {isAuthenticated && (
          <Route path="/" element={<Sidebar/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-teams" element={<MyTeams />} />
            <Route path="/my-teams/:id" element={<TeamDetails/>}/>
            <Route path="/taskinformation/:id" element={<TaskInformation/>}/>
            <Route path="/updateTasks" element={<UpdateTask/>}/>
            <Route path="/settings" element={<Settings />} />
            <Route path="/notification" element={<Notification/>} />
          </Route>
        )}
        <Route path="*" element={"Page Not Found"} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
