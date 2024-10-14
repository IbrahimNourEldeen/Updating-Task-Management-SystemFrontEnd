import { useDispatch, useSelector } from "react-redux";
import CreateTeam from "./CreateTeam";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AddTeams } from "../features/teams/teamSlice";
import { makeAnyServerRequest } from "../utils/authUtils";
import { GETALLTEAMS } from "../urls";

const MyTeams = () => {
  //to handle the apperance of create team popup
  const handleTeam = async () => {
    const ele = document.querySelector(".team-main");
    ele.classList.replace("d-none", "d-flex");
  };

  //save data from database
  const dispatch = useDispatch();
  const Teams = useSelector((state) => state.teams).teams;
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teams = await makeAnyServerRequest(GETALLTEAMS, "GET");
        console.log(teams)
        dispatch(AddTeams(teams.data));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTeams();
  }, []);

  //go to spisific team
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    // console.log(Teams)
    navigate(`/my-teams/${id}`);
  };

  return (
    <div className="container h-100 position-relative overflow-auto">
      <CreateTeam
        handleTeam={() => {
          handleTeam();
        }}
      />
      <div className="row my-4">
        <h3 className="fw-bold">Teams</h3>
        <div className="col">
          <span className="fs-6">
            manage your team with ease. create, assign and track progress
            efficiently.
          </span>
        </div>
        <div className="col">
          <button
            className="btn btn-success bgBtns text-white fs-5 my-4 my-md-0"
            onClick={handleTeam}
          >
            <i class="fa-solid fa-plus"></i> + Create Team
          </button>
        </div>
      </div>
      <h2 className="fw-bold mt-5 mb-4">All Teams</h2>
      {Teams && (Teams.length > 0)
        ? Teams.map((team) => {
            return (
              <div
                className="row p-3 my-2"
                style={{ backgroundColor: "#6b71e036" }}
                key={team._id}
                id={team._id}
              >
                <h5 className="col-12 fw-bold">{team.name}</h5>
                <div className="col-12 mb-2">{team.description}</div>
                <div className="col-12">
                  <button
                    className="btn btn-success fw-bold me-md-4 me-2"
                    onClick={() => handleNavigate(team._id)}
                  >
                    Show Team
                  </button>
                  <button className="btn btn-danger fw-bold">
                    Delete Team
                  </button>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default MyTeams;
