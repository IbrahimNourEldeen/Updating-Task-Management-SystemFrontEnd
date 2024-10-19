import React, { useState } from "react";
import { makeAnyServerRequest } from "../utils/authUtils";
import { ADDMEMBER } from "../urls";

const AddMember = ({ teamID }) => {
  const [err, setError] = useState("");
  const exitClick = (e) => {
    e.preventDefault();
    const ele = document.querySelector(".mem");
    ele.classList.replace("d-flex", "d-none");
    setError("");
  };

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [Loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await makeAnyServerRequest(ADDMEMBER, "POST", {
      recipientEmail: email,
      recipientRole: role,
      teamID,
    });
    // console.log(response.status);
    if (response.status === "SUCCESS") {
      exitClick(e);
    } else {
      // console.log(response.message);
      setError(response.message);
    }
    setLoading(false);
  };

  return (
    <div
      className="mem d-none w-100 h-100 justify-content-center align-items-center position-absolute"
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
          <label for="123">Email: </label>
          <input
            id="123"
            type="email"
            className="form-control mx-2"
            placeholder="member email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="my-3">
          <label for="12">Role: </label>
          <select
            id="12"
            className="form-select"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="minutes" disabled selected>
              Chose Role
            </option>
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <p className="text-danger">{err}</p>
        <button
          type="submit"
          className="btn btn-success bgBtns text-white fs-5 rounded-pill px-4 d-block ms-auto"
        >
          {Loading ? "adding ..." : "Add Member"}
        </button>
      </form>
    </div>
  );
};

export default AddMember;
