import React, { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import { makeAnyServerRequest } from "../utils/authUtils";
import { ADDNEWTASK, GETALLTASKS } from "../urls";
import { useDispatch, useSelector } from "react-redux";
import { AddTasks } from "../features/tasks/taskSlice";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filteredTasks, setFilteredTasks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [prioritySort, setPrioritySort] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  let Tasks = useSelector((state) => state.tasks).tasks;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await makeAnyServerRequest(GETALLTASKS, "POST");
        dispatch(AddTasks(tasks.allTasks));
        setFilteredTasks(tasks.allTasks);
      } catch (error) {
        // console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [dispatch]);

  useEffect(() => {
    let sortedTasks = [...Tasks];
    if (categoryFilter !== "all") {
      sortedTasks = sortedTasks.filter(
        (task) => task.category === categoryFilter
      );
    }

    if (statusFilter !== "all") {
      sortedTasks = sortedTasks.filter((task) => task.status === statusFilter);
    }

    if (prioritySort !== "all") {
      sortedTasks = sortedTasks.filter(
        (task) => task.priority === prioritySort
      );
    }

    if (searchTerm) {
      sortedTasks = sortedTasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTasks(sortedTasks);
  }, [categoryFilter, statusFilter, prioritySort, searchTerm, Tasks]);

  const totalTasks = Tasks.length;
  const inProgressTasks = Tasks.filter(
    (task) => task.status === "in-progress"
  ).length;
  const completedTasks = Tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const taskInformation = (id) => {
    navigate(`/taskinformation/${id}?md=tasks`);
  };

  const inProgressPercentage = totalTasks
    ? (inProgressTasks / totalTasks) * 100
    : 0;
  const completedPercentage = totalTasks
    ? (completedTasks / totalTasks) * 100
    : 0;

  return (
    <div className="container h-100 position-relative overflow-auto">
      <CreateTask URL={ADDNEWTASK} />
      <div className="row my-4">
        <h3 className="fw-bold">Tasks</h3>
        <div className="col-12 col-md-6">
          <span className="fs-6">
            Manage your tasks with ease. Create, assign, and track progress
            efficiently.
          </span>
        </div>
        <div className="col-12 col-md-6">
          <button
            className="btn btn-success bgBtns text-white fs-5 my-4 my-md-0"
            onClick={() =>
              document
                .querySelector(".main")
                .classList.replace("d-none", "d-flex")
            }
          >
            <i className="fa-solid fa-plus"></i> + Create Task
          </button>
        </div>
      </div>

      <div className="row">
        <h3 className="fw-bold my-5">Task Categories</h3>

        <div className="col">
          <h6 className="text-secondary fw-bold">Total Tasks</h6>
          <div className="mx-auto" style={{ width: 70, height: 70 }}>
            <CircularProgressbar
              value={100}
              text={`${100}%`}
              styles={buildStyles({
                pathColor: "#3b82f6",
                textColor: "#3b82f6",
              })}
            />
          </div>
        </div>

        <div className="col">
          <h6 className="text-secondary fw-bold">In-progress Tasks</h6>
          <div className="mx-auto" style={{ width: 70, height: 70 }}>
            <CircularProgressbar
              value={inProgressPercentage}
              text={`${Math.round(inProgressPercentage)}%`}
              styles={buildStyles({
                pathColor: "#f59e0b",
                textColor: "#f59e0b",
              })}
            />
          </div>
        </div>

        <div className="col">
          <h6 className="text-secondary fw-bold">Completed Tasks</h6>
          <div className="mx-auto" style={{ width: 70, height: 70 }}>
            <CircularProgressbar
              value={completedPercentage}
              text={`${Math.round(completedPercentage)}%`}
              styles={buildStyles({
                pathColor: "#10b981",
                textColor: "#10b981",
              })}
            />
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <h3 className="fw-bold mt-5 mb-3">All Tasks</h3>
        <div className="col-12 col-md-6 col-lg-4 mb-2">
          <input
            className="form-control"
            placeholder="Search Tasks"
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-12 col-md-6">
          <div className="row">
            <div className="col-6 col-md-4">
              <select
                className="form-select"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="study">Study</option>
                <option value="shopping">Shopping</option>
                <option value="fitness">Fitness</option>
                <option value="chores">Chores</option>
                <option value="finance">Finance</option>
                <option value="social">Social</option>
                <option value="travel">travel</option>
              </select>
            </div>
            <div className="col-6 col-md-4">
              <select
                className="form-select"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Progresses</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="col-12 col-md-4 mt-2 mt-md-0">
              <select
                className="form-select"
                onChange={(e) => setPrioritySort(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-evenly show tasks my-4 px-3">
        {filteredTasks && filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              className="col-12 col-md-6 p-3 my-2 shadow border border-2 rounded-3"
              style={{ backgroundColor: "#6b71e036" }}
              key={task._id}
              id={task._id}
            >
              <h5 className="col-12 fw-bold">Title: {task.title}</h5>
              <div className="col-12 mb-2">Status: {task.status}</div>
              <div className="col-12 mb-2">Category: {task.category}</div>
              <div className="col-12 ">
                <button
                  className="btn btn-success fw-bold me-md-4 me-2 mb-2"
                  onClick={() => taskInformation(task._id)}
                >
                  Show task
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
