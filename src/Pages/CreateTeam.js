import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { makeAnyServerRequest } from "../utils/authUtils";
import { pushTeam } from "../features/teams/teamSlice";
import { ADDNEWTEAM } from "../urls";

const CreateTeam = () => {
  const dispatch = useDispatch();

  const exitClick = (e) => {
    e.preventDefault();
    const ele = document.querySelector(".team-main");
    ele.classList.replace("d-flex", "d-none");
  };

  const [name, setTeamName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response=await makeAnyServerRequest(ADDNEWTEAM, "POST", {
      name,
      description
    });
    console.log(response.data.createdTeam)
    await dispatch(pushTeam(response.data.createdTeam))
    await exitClick(e)
  };

  return (
    <div
      className="team-main d-none w-100 h-100 justify-content-center align-items-center position-absolute"
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
        <div className="">
          <i class="fa-solid fa-clipboard-list fs-4 my-auto"></i>
          <label for="NM" className="mx-3 mb-1">
            Name:
          </label>
          <input
            id="NM"
            type="text"
            className="form-control"
            placeholder="Name Of Team"
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>

        <div className="my-4">
          <i class="fa-solid fa-stopwatch fs-4"></i>
          <label for="DL" className="mx-2 mb-1">
            Description:
          </label>
          <textarea
            id="DL"
            className="form-control"
            placeholder="input team description..."
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-success bgBtns text-white fs-5 rounded-pill px-4"
        >
          Create Team
        </button>
      </form>
    </div>
  );
};

export default CreateTeam;
