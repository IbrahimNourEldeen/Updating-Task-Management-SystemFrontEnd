import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AddMember from "./AddMember";
import CreateTask from "./CreateTask";
import { ADDNEWTASKINTEAM, DELETETEAMMEMBER, DELETETEAMTASK, GETALLTEAMTASKS} from "../urls";
import { makeAnyServerRequest } from "../utils/authUtils";
import { useEffect } from "react";
import { AddTeamTasks } from "../features/tasks/taskSlice";

const TeamDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  
  const dispatch = useDispatch();
  
  const Teams = useSelector((state) => state.teams).teams;
  const Tasks = useSelector((state) => state.tasks).teamTasks;
  const URL = ADDNEWTASKINTEAM;


  let team = Teams.filter((team) => {
    return team._id === id;
  });
  const Members = team[0].members;
  console.log("tttt",team[0]);

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
        const tasks = await makeAnyServerRequest(GETALLTEAMTASKS, "POST",{teamId:id});
        dispatch(AddTeamTasks(tasks.allTasks));
        console.log("a>>>>>>>>>>>>>>>>>>>>>>>             ",tasks.allTasks)
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTeamTasks();
  }, []);


  const handleDelete = (tId) => {
    try {
      makeAnyServerRequest(DELETETEAMTASK, "DELETE", { taskId: tId,teamId:id });
      let temp = Tasks.filter((task) => {
        return task._id !== tId;
      });
      dispatch(AddTeamTasks(temp));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async(userId) => {
    try {
      await makeAnyServerRequest(DELETETEAMMEMBER, "DELETE", { userId, teamId: id });
      let temp = Members.filter((mem) => {
        return mem.ID._id !== userId;
      });
      navigate("/my-teams");
    } catch (error) {
      console.error(error);
    }
  };


  const handleUpdate = (taskId) => {
    navigate(`/updateTasks?taskId=${taskId}&teamId=${id}&URL=UPDATETEAMTASK`);
  };

  const taskInformation = (id) => {
    navigate(`/taskinformation/${id}?md=teamTasks`);
  };

  return (
    <div className="container h-100 position-relative overflow-auto">
      <AddMember teamID={id} />
      <CreateTask URL={URL} teamID={id} />
      <div className="p-2 rounded-3 text-white" style={{backgroundColor:"rgb(107 113 224 / 90%)"}}>
        <h2 className="fw-bold">{team[0].name} Team</h2>
        <p className="fs-5 fw-bold ">{team[0].description}</p>
      </div>
      <div className="row my-4">
        <div className="col">
          <h3 className="fw-bold">Team Members</h3>
        </div>
        <div className="col">
          <button
            className="btn btn-success bgBtns text-white fs-5 my-4 my-md-0"
            onClick={handleMember}
          >
            <i class="fa-solid fa-plus"></i> + Add Member
          </button>
        </div>
      </div>

      <div className="show tasks my-4 p-0 border rounded-2">
        <div
          className="row border p-2 m-0"
          style={{ backgroundColor: "#f7f7f7" }}
        >
          <div className="col text-center">Member Name</div>
          <div className="col text-center">Role</div>
          <div className="col text-center">Delete</div>
        </div>
        {Members&&Members.length > 0 ? (
          Members.map((team) => {
            return (
              <div className="row p-2 m-0" id={team.ID._id} key={team.ID._id}>
                <div className="col text-center">{team.ID.fullName}</div>
                <div className="col text-center">{team.role}</div>
                <div className="col text-center">
                  <button className="btn btn-danger fw-bold" onClick={()=>{
                    handleDeleteUser(team.ID._id)
                  }}>
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
        <div className="col">
          <h3 className="fw-bold">Team Tasks</h3>
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
        {Tasks.length > 0
          ? Tasks.map((task) => {
              return (
                <div className="row p-2 m-0" id={task._id} key={task._id}>
                  <div className="col text-center">{task.title}</div>
                  <div className="col text-center">
                    {" "}
                    {new Date(task.dueDate).toLocaleString()}
                  </div>
                  <div className="col text-center">{task.status}</div>
                  <div className="col text-center">
                    <button className="btn btn-success fw-bold"
                    onClick={()=>{
                      taskInformation(task._id)
                    }}
                    >
                      Show Task
                    </button>
                  </div>
                  <div className="col text-center">
                    <button className="btn btn-warning fw-bold" onClick={()=>{
                      handleUpdate(task._id)
                    }}>
                      Update Task
                    </button>
                  </div>
                  <div className="col text-center">
                    <button className="btn btn-danger fw-bold" onClick={()=>{
                      handleDelete(task._id)
                    }}>
                      Delete Task
                    </button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default TeamDetails;
