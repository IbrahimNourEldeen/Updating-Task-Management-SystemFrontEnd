import React, { useState } from "react";
import { makeAnyServerRequest } from "../utils/authUtils";
import { ADDNEWTASK, ADDNEWTASKINTEAM} from "../urls";
import { useDispatch } from "react-redux";
import { pushTask, pushTaskToTeam } from "../features/tasks/taskSlice";
// import { pushTask, pushTaskToTeam } from "../features/tasks/taskSlice";

const CreateTask = ({URL,teamID}) => {
  const dispatch=useDispatch()
  const exitClick = (e) => {
    e.preventDefault();
    const ele = document.querySelector(".main");
    ele.classList.replace("d-flex", "d-none");
    setError("")
  };

  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [notificationUnite, setNotificationUnite] = useState("");
  const [notificationTimes, setNotificationTimes] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");

  const [error,setError]=useState("");
  
const taskTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response=await makeAnyServerRequest(URL, "POST", {
        title: taskName,
        dueDate: deadline,
        reminderTimes: notificationTimes,
        reminderUnit: notificationUnite,
        priority,
        category,
        description: comment,
        taskTimeZone,
        teamID
      });
      if(response.status==="FAIL"){
        setError(response.message)
      }
      if(URL===ADDNEWTASK){
        dispatch(pushTask(response.data.createdTask))
      }
      else if(URL===ADDNEWTASKINTEAM){
        console.log("team task>>>>>>>>>       ",response)
        dispatch(pushTaskToTeam(response.data.createdTask))
      }
      exitClick(e)
    }catch(error){
      console.log(error)
    }
  };

  return (
    <div
      className="main d-none w-100 h-100 justify-content-center align-items-center position-absolute"
      style={{ backgroundColor: "rgba(1,1,1,0.2)" }}
    >
      <form
        className="col-12 col-md-6 p-5 rounded-2 position-relative"
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
        <p className="text-danger">{error}</p>
        <button
          type="submit"
          className="btn btn-success bgBtns text-white fs-5 rounded-pill px-4 d-block ms-auto"
        >
          Create Task
        </button>
        
      </form>
    </div>
  );
};

export default CreateTask;
