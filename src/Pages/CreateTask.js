import React, { useState } from "react";
import { makeAnyServerRequest } from "../utils/authUtils";
import { ADDNEWTASK, ADDNEWTASKINTEAM } from "../urls";
import { useDispatch } from "react-redux";
import { pushTask, pushTaskToTeam } from "../features/tasks/taskSlice";

const CreateTask = ({ URL, teamID }) => {
  const dispatch = useDispatch();

  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [notificationUnite, setNotificationUnite] = useState("");
  const [notificationTimes, setNotificationTimes] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");

  
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);

  const taskTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;


  // Frontend validation
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!taskName.trim()) {
      formErrors.taskName = "Task name is required.";
      isValid = false;
    }
    if (!deadline) {
      formErrors.deadline = "Deadline is required.";
      isValid = false;
    }
    if (!notificationTimes || !notificationUnite) {
      formErrors.notification = "Notification time and unit are required.";
      isValid = false;
    }
    if (!priority) {
      formErrors.priority = "Priority is required.";
      isValid = false;
    }
    if (!category) {
      formErrors.category = "Category is required.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    try {
      setLoading(true)
      const response = await makeAnyServerRequest(URL, "POST", {
        title: taskName,
        dueDate: deadline,
        reminderTimes: notificationTimes,
        reminderUnit: notificationUnite,
        priority,
        category,
        description: comment,
        taskTimeZone,
        teamID,
      });

      if (response.status === "FAIL") {
        setError(response.message);
      }
      if (URL === ADDNEWTASK) {
        dispatch(pushTask(response.data.createdTask));
      } else if (URL === ADDNEWTASKINTEAM) {
        dispatch(pushTaskToTeam(response.data.createdTask));
      }
      setLoading(false)

      exitClick(e);
    } catch (error) {
      console.log(error);
    }
  };

  const exitClick = (e) => {
    e.preventDefault();
    const ele = document.querySelector(".main");
    ele.classList.replace("d-flex", "d-none");
    setError("");
    setErrors({})
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
          <i className="fa-solid fa-x fs-4"></i>
        </button>

        <div className="d-flex">
          <i className="fa-solid fa-clipboard-list fs-4 my-auto"></i>
          <input
            type="text"
            className="form-control mx-2"
            placeholder="Name Of Task"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>
        {errors.taskName && <span className="text-danger">{errors.taskName}</span>}

        <div className="d-flex my-3">
          <i className="fa-solid fa-stopwatch fs-4"></i>
          <label htmlFor="DL" className="mx-3">
            Deadline:
          </label>
          <input
            id="DL"
            className="form-control w-25"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        {errors.deadline && <span className="text-danger">{errors.deadline}</span>}

        <div className="d-flex">
          <i className="fa-regular fa-bell fs-4"></i>
          <label htmlFor="NFs" className="mx-3">
            Notification:
          </label>
          <input
            id="NFs"
            type="number"
            className="form-control"
            placeholder="Reminder number of units"
            value={notificationTimes}
            onChange={(e) => setNotificationTimes(e.target.value)}
          />
          <select
            className="form-select"
            value={notificationUnite}
            onChange={(e) => setNotificationUnite(e.target.value)}
          >
            <option value="" disabled>
              Time
            </option>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </div>
        {errors.notification && (
          <span className="text-danger">{errors.notification}</span>
        )}

        <div className="d-flex mt-3">
          <i className="fa-regular fa-flag fs-4"></i>
          <label htmlFor="pr" className="mx-3">
            Priority:
          </label>
          <select
            id="pr"
            className="form-select w-25"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="" disabled>
              Choose
            </option>
            <option value="high">HIGH</option>
            <option value="medium">MEDIUM</option>
            <option value="low">LOW</option>
          </select>
        </div>
        {errors.priority && <span className="text-danger">{errors.priority}</span>}

        <div className="d-flex mt-3">
          <i className="fa-solid fa-layer-group fs-4"></i>
          <label htmlFor="cgy" className="mx-3">
            Category:
          </label>
          <select
            id="cgy"
            className="form-select w-25"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Choose category
            </option>
            <option value="work">WORK</option>
            <option value="personal">PERSONAL</option>
            <option value="study">STUDY</option>
            <option value="shopping">SHOPPING</option>
            <option value="fitness">FITNESS</option>
            <option value="chores">CHORES</option>
            <option value="finance">FINANCE</option>
            <option value="social">SOCIAL</option>
            <option value="travel">TRAVEL</option>
          </select>
        </div>
        {errors.category && <span className="text-danger">{errors.category}</span>}

        <div className="my-3">
          <label htmlFor="cnt" className="fs-3">
            Comment:
          </label>
          <textarea
            id="cnt"
            className="form-control"
            placeholder="Input text..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        <p className="text-danger">{error}</p>

        <button
          type="submit"
          className="btn btn-success bgBtns text-white fs-5 rounded-pill px-4 d-block ms-auto"
        >
          {Loading?"Creating ...":"Create Task"}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
