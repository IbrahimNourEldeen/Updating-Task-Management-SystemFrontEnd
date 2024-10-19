import React, { useState } from "react";
import { makeAnyServerRequest } from "../utils/authUtils";
import { UPDATETASK, UPDATETEAMTASK} from "../urls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";


const UpdateTask = () => {
  const Tasks = useSelector((state) => state.tasks).tasks;
  const teamTasks = useSelector((state) => state.tasks).teamTasks;

  
  const [searchParams] = useSearchParams();
  const URL = searchParams.get('URL');

  const taskId=searchParams.get('taskId');
  const teamId=searchParams.get('teamId');

  const dispatch=useDispatch()
  const navigate = useNavigate();
  const exitClick = (e) => {
    e.preventDefault();
    if(URL==="UPDATETASK")
      navigate(`/dashboard`);
    else
      navigate(`/my-teams/${teamId}`)
  };

  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [notificationUnite, setNotificationUnite] = useState("");
  const [notificationTimes, setNotificationTimes] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  
const taskTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(`${URL}`)
    let req;
    if(URL==="UPDATETASK")
      req=UPDATETASK;
    else
      req=UPDATETEAMTASK

    try{
      const response=await makeAnyServerRequest(req, "PATCH", {
        newTitle: taskName,
        newDueDate: deadline,
        newReminderTimes: notificationTimes,
        newReminderUnit: notificationUnite,
        newPriority:priority,
        newCategory:category,
        newDescription: comment,
        newTaskTimeZone:taskTimeZone,
        newStatus:status,
        taskId,
        teamId
      })
        // console.log("update",response)
      exitClick(e)
    }catch(error){
      // console.error("Error updating task:", error);
    }
  };

  return (
    <div
      className="updateed w-100 h-100 d-flex justify-content-center align-items-center overflow-auto"
    >
      <form
        className="col-12 col-md-6 p-5 rounded-2 position-relative  shadow"
        style={{ backgroundColor: "#f7f7f7" }}
        onSubmit={handleSubmit}
      >
        <button
          className="btn position-absolute end-0 top-0 pointer-event"
          onClick={exitClick}
        >
          <i class="fa-solid fa-x fs-4"></i>
        </button>
        <div className="d-flex">
          <i class="fa-solid fa-clipboard-list fs-4 my-auto"></i>
          <input
            type="text"
            className="form-control mx-2"
            placeholder="Name Of Task"
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>

        <div className="d-flex my-4">
          <i class="fa-solid fa-stopwatch fs-4"></i>
          <label for="DL" className="mx-3">
            Deadline:
          </label>
          <input
            id="DL"
            className="form-control w-25"
            type="datetime-local"
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        <div className="d-flex">
          <i class="fa-regular fa-bell fs-4"></i>
          <label for="NFs" className="mx-3">
            Notification:{" "}
          </label>

          <input
            id="NFs"
            type="number"
            className="form-control"
            placeholder="Reminder number of unites"
            onChange={(e) => setNotificationTimes(e.target.value)}
          />
          <select
            className="form-select"
            onChange={(e) => setNotificationUnite(e.target.value)}
          >
            <option value="" selected disabled>
              Time
            </option>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="dayes">Dayes</option>
          </select>
        </div>

        <div className="d-flex my-4">
          <i class="fa-regular fa-flag fs-4"></i>
          <label for="pr" className="mx-3">
            Priority:{" "}
          </label>
          <select
            id="pr"
            className="form-select w-25"
            onChange={(e) => setPriority(e.target.value)}
          >
            <option selected disabled>
              choose
            </option>
            <option value="high">HIGH</option>
            <option value="medium">MEDIUM</option>
            <option value="low">LOW</option>
          </select>
        </div>
        
        
        
        <div className="d-flex my-4">
        <i class="fa-solid fa-bullseye fs-4"></i>
          <label for="st" className="mx-3">
            Status:{" "}
          </label>
          <select
            id="st"
            className="form-select w-25"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option selected disabled>
              choose
            </option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

       
       
       
        <div className="d-flex my-4">
          <i class="fa-solid fa-layer-group fs-4"></i>
          <label for="cgy" className="mx-3">
            Category:{" "}
          </label>
          <select
            id="cgy"
            className="form-select w-25"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" selected disabled>
              choose category
            </option>
            <option value="work">
              WORCK
            </option>
            <option value="personal">PERSONAL</option>
            <option value="study">STUDY</option>
            <option value="shopping">SHOPPING</option>
            <option value="fitness">FITNESS</option>
            <option value="chores">LOW</option>
            <option value="finance">CHORES</option>
            <option value="social">SOCIAL</option>
            <option value="travel">TRAVEL</option>
          </select>
        </div>

        <div className="my-4">
          <label for="cnt" className="fs-3">
            comment:{" "}
          </label>
          <textarea
            id="cnt"
            className="form-control"
            placeholder="input text..."
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-warning bgBtns text-white fs-5 rounded-pill px-4 d-block ms-auto"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
