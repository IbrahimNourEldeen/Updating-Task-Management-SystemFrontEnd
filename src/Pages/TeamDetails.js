import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AddMember from "./AddMember";
import CreateTask from "./CreateTask";
import {
  ADDNEWTASKINTEAM,
  DELETETEAMMEMBER,
  DELETETEAMTASK,
  GETALLTEAMTASKS,
  TEAMTASKSSSE,
} from "../urls";
import { makeAnyServerRequest } from "../utils/authUtils";
import { useEffect, useState } from "react";
import { AddTeamTasks, pushTaskToTeam, removeTaskFromTeam, updateteamTask } from "../features/tasks/taskSlice";

const TeamDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const Teams = useSelector((state) => state.teams).teams;
  const Tasks = useSelector((state) => state.tasks).teamTasks;
  const URL = ADDNEWTASKINTEAM;

  // Use state for Members
  const [Members, setMembers] = useState(
    Teams.filter((team) => team._id === id)[0]?.members || []
  );

  // console.log("tttt", Teams.filter((team) => team._id === id)[0]);

  const handleMember = () => {
    const ele = document.querySelector(".mem");
    ele.classList.replace("d-none", "d-flex");
  };

  const handleTask = () => {
    const ele = document.querySelector(".main");
    ele.classList.replace("d-none", "d-flex");
  };

  useEffect(() => {
    const fetchTeamTasks = async () => {
      try {
        const tasks = await makeAnyServerRequest(GETALLTEAMTASKS, "POST", {
          teamId: id,
        });
        dispatch(AddTeamTasks(tasks.allTasks));
        // console.log("a>>>>>>>>>>>>>>>>>>>>>>>             ", tasks.allTasks);
      } catch (error) {
        // console.error("Error fetching tasks:", error);
      }
    };
    fetchTeamTasks();
  }, []);

  const [Loading, setLoading] = useState(false);

  const handleDelete = async (tId) => {
    try {
      setLoading(true);
      await makeAnyServerRequest(DELETETEAMTASK, "DELETE", {
        taskId: tId,
        teamId: id,
      });
      let temp = Tasks.filter((task) => task._id !== tId);
      setLoading(false);
      dispatch(AddTeamTasks(temp));
    } catch (error) {
      // console.error(error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await makeAnyServerRequest(DELETETEAMMEMBER, "DELETE", {
        userId,
        teamId: id,
      });
      // Filter out the deleted member
      let temp = Members.filter((mem) => mem.ID._id !== userId);
      setMembers(temp); // Update the state
      navigate("/my-teams");
    } catch (error) {
      // console.error(error);
    }
  };

  const handleUpdate = (taskId) => {
    navigate(`/updateTasks?taskId=${taskId}&teamId=${id}&URL=UPDATETEAMTASK`);
  };

  const taskInformation = (id) => {
    navigate(`/taskinformation/${id}?md=teamTasks`);
  };

  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    // console.log("use effect", accessToken);
    let eventSource = new EventSource(
      `${TEAMTASKSSSE}?accessToken=${accessToken}`
    );

    eventSource.addEventListener("insert", (event) => {
      // console.log("insert...............", event.data);
      const newTask = JSON.parse(event.data);
      if (newTask.collName === "tasks") {
        // console.log(newTask.collData);
        dispatch(pushTaskToTeam(newTask.collData));
      }
    });

    eventSource.addEventListener("update", (event) => {
      const updatedTask = JSON.parse(event.data);
      if (updatedTask.collName === "tasks") {
        dispatch(updateteamTask(updatedTask.collData));
      } else if (updatedTask.collName === "teams") {
        setMembers(updatedTask.collData.members);
      }
    });

    eventSource.addEventListener("delete", (event) => {
      const deletedTaskId = JSON.parse(event.data);
      dispatch(removeTaskFromTeam(deletedTaskId.collData));
    });

    eventSource.onerror = async (error) => {
      // console.log("error", error);
    };

    return () => {
      eventSource.close();
    };
  }, [dispatch, accessToken]);

  return (
    <div className="container h-100 position-relative overflow-auto">
      <AddMember teamID={id} />
      <CreateTask URL={URL} teamID={id} />
      <div
        className="p-2 rounded-3 text-white"
        style={{ backgroundColor: "rgb(107 113 224 / 90%)" }}
      >
        <h2 className="fw-bold">{Teams.filter((team) => team._id === id)[0]?.name} Team</h2>
        <p className="fs-5 fw-bold ">
          {Teams.filter((team) => team._id === id)[0]?.description}
        </p>
      </div>
      <div className="row my-4">
        <div className="col-12 col-md-6">
          <h3 className="fw-bold">Team Members</h3>
        </div>
        <div className="col-12 col-md-6">
          <button
            className="btn btn-success bgBtns text-white fs-5 my-4 my-md-0"
            onClick={handleMember}
          >
            <i className="fa-solid fa-plus"></i> + Add Member
          </button>
        </div>
      </div>

      <div className="row my-4">
        {/* <div
          className="row border p-2 m-0"
          style={{ backgroundColor: "#f7f7f7" }}
        >
          <div className="col text-center">Member Name</div>
          <div className="col text-center">Role</div>
          <div className="col text-center">Delete</div>
        </div> */}
        {Members && Members.length > 0 ? (
          Members.map((team) => {
            return (
              // <div className="row p-2 m-0" id={team.ID._id} key={team.ID._id}>
              //   <div className="col text-center">{team.ID.fullName}</div>
              //   <div className="col text-center">{team.role}</div>
              //   <div className="col text-center">
              //     <button
              //       className="btn btn-danger fw-bold"
              //       onClick={() => {
              //         handleDeleteUser(team.ID._id);
              //       }}
              //     >
              //       Delete User
              //     </button>
              //   </div>
              // </div>
              <div
                className="col-12 col-md-6 p-3 my-2 shadow"
                id={team.ID._id} key={team.ID._id}
              >
                <h5 className="col-12 fw-bold">{team.ID.fullName}</h5>
                <div className="col-12 mb-2">{team.role}</div>
                <div className="col-12 ">
                <button
                    className="btn btn-danger fw-bold"
                    onClick={() => {
                      handleDeleteUser(team.ID._id);
                    }}
                  >
                    Delete User
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No member available</p>
        )}
      </div>

      <div className="row my-4 pt-5">
        <div className="col-12 col-md-6">
          <h3 className="fw-bold">Team Tasks</h3>
        </div>
        <div className="col-12 col-md-6">
          <button
            className="btn btn-success bgBtns text-white fs-5 my-4 my-md-0"
            onClick={handleTask}
          >
            <i className="fa-solid fa-plus"></i> + Create Task
          </button>
        </div>
      </div>

      <div className="row my-4">
        {/* <div
          className="row border p-2 m-0"
          style={{ backgroundColor: "#f7f7f7" }}
        >
          <div className="col text-center">Title</div>
          <div className="col text-center">Status</div>
          <div className="col text-center">Category</div>
          <div className="col text-center">Priority</div>
          <div className="col text-center">Task Information</div>
        </div> */}
        {Tasks.length > 0
          ? Tasks.map((task) => {
              return (
                // <div className="row p-2 m-0" id={task._id} key={task._id}>
                //   <div className="col text-center text-nowrap text-truncate overflow-hidden">{task.title}</div>
                //   <div className="col text-center">{task.status}</div>
                //   <div className="col text-center">{task.category}</div>
                //   <div className="col text-center">{task.priority}</div>
                //   <div className="col text-center">
                //     <button
                //       className="btn btn-success fw-bold"
                //       onClick={() => {
                //         taskInformation(task._id);
                //       }}
                //     >
                //       Show Task
                //     </button>
                //   </div>
                // </div>
                <div
                className="col-12 col-md-6 p-3 my-2 shadow border border-2 rounded-3"
                style={{ backgroundColor: "#6b71e036" }}
                key={task._id}
                id={task._id}
              >
                <h5 className="col-12 fw-bold text-nowrap text-truncate overflow-hidden">Title: {task.title}</h5>
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
              );
            })
          : "No Tasks"}
      </div>
    </div>
  );
};

export default TeamDetails;
