import React, { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import { makeAnyServerRequest } from "../utils/authUtils";
import { ADDNEWTASK, DELETETASK, GETALLTASKS, UPDATETASK } from "../urls";
import { useDispatch, useSelector } from "react-redux";
import { AddTasks } from "../features/tasks/taskSlice";
import UpdateTask from "./updateTask";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const Tasks = useSelector((state) => state.tasks).tasks;
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await makeAnyServerRequest(GETALLTASKS, "POST");
        dispatch(AddTasks(tasks.allTasks));
        // console.log(Tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);
  const handleTask = () => {
    const ele = document.querySelector(".main");
    ele.classList.replace("d-none", "d-flex");
  };

  const handleDelete = async(id) => {
    try {
      await makeAnyServerRequest(DELETETASK, "DELETE", { taskId: id });
      let temp = Tasks.filter((task) => {
        return task._id !== id;
      });
      dispatch(AddTasks(temp));
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();
  const handleUpdate = (id) => {
    navigate(`/updateTasks?taskId=${id}&teamId=0&URL=UPDATETASK`);
  };

  return (
    <div className="container h-100 position-relative overflow-auto">
      <CreateTask URL={ADDNEWTASK} />

      <div className="row my-4">
        <h3 className="fw-bold">Tasks</h3>
        <div className="col">
          <span className="fs-6">
            manage your tasks with ease. create, assign and track progress
            efficiently.
          </span>
        </div>
        <div className="col">
          <button
            className="btn btn-success bgBtns text-white fs-5 my-4 my-md-0"
            onClick={handleTask}
          >
            <i class="fa-solid fa-plus"></i> + Create Task
          </button>
        </div>
      </div>
      <div className="row">
        <h3 className="fw-bold my-5">Task Categories</h3>
        <div className="col">
          <h6 className="text-secondary fw-bold">Design Tasks</h6>
          <p>{/*number of tasks */}</p>
          {/*logo */}
        </div>
        <div className="col">
          <h6 className="text-secondary fw-bold">Design Tasks</h6>
          <p>{/*number of tasks */}</p>
          {/*logo */}
        </div>
        <div className="col">
          <h6 className="text-secondary fw-bold">Design Tasks</h6>
          <p>{/*number of tasks */}</p>
          {/*logo */}
        </div>
      </div>
      <div className="row mb-5">
        <h3 className="fw-bold mt-5 mb-3">All Tasks</h3>
        <div className="col-12 col-md-6 col-lg-4  ">
          <input
            className="form-control"
            placeholder="Search Tasks"
            type="search"
          />
        </div>
        <div className="col-12 col-md-6">
          <div className="row">
            <div className="col">
              <select className="form-select">
                <option value="" disabled selected>
                  Design
                </option>
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
            <div className="col">
              <select className="form-select">
                <option value="" disabled selected>
                  Filter by Status
                </option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="col">
              <select className="form-select">
                <option value="" disabled selected>
                  Sort by
                </option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="heigh">High</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="show tasks my-4 p-0 border rounded-2">
        <div
          className="row border p-2 m-0"
          style={{ backgroundColor: "#f7f7f7" }}
        >
          <div className="col text-center">Title</div>
          <div className="col text-center">Deadline</div>
          <div className="col text-center">Status</div>
          <div className="col text-center">Task Information</div>
          <div className="col text-center">Update Task</div>
          <div className="col text-center">Delete Task</div>
        </div>
        {Tasks && (Tasks.length > 0 )? (
          Tasks.map((task) => {
            return (
              <div className="row p-2 m-0" id={task._id} key={task._id}>
                <div className="col text-center">{task.title}</div>
                <div className="col text-center">
                  {" "}
                  {new Date(task.dueDate).toLocaleString()}
                </div>
                <div className="col text-center">{task.status}</div>
                <div className="col text-center">
                  <button className="btn btn-success fw-bold">Show Task</button>
                </div>
                <div className="col text-center">
                  <button className="btn btn-warning fw-bold"
                  onClick={()=>{
                    handleUpdate(task._id)
                  }}>
                    Update Task
                  </button>
                </div>
                <div className="col text-center">
                  <button
                    className="btn btn-danger fw-bold"
                    onClick={() => {
                      handleDelete(task._id);
                    }}
                  >
                    Delete Task
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
