import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import "bootstrap/js/dist/dropdown";
import { useSelector } from "react-redux";
import { logoutUser } from "../utils/authUtils";

const Sidebar = () => {
  const refreshToken=useSelector(state=>state.auth)
  const navigate = useNavigate();
  
  const handleLogout=async()=>{
    await logoutUser(refreshToken)
    navigate('/', { replace: true })
  }
  const {user}=useSelector(state=>state.auth)
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-auto col-md-2 ViewPort d-flex justify-content-between flex-column"
          style={{ backgroundColor: "#f7f7f7" }}>
          <div>
            <ul className="nav nav-pills flex-column">
              <li className="nav-item fs-4 my-1 py-2 py-sm-0">
                <NavLink
                  className="text-secondary fs-5 nav-link"
                  aria-current="page"
                  to="/dashboard"
                >
                  <i className="fa-solid fa-user-clock text-dark"></i>
                  <span className="ms-3 d-none d-sm-inline">Dashboard</span>
                </NavLink>
              </li>
              <li className="nav-item text-secondary fs-4 my-1 py-2 py-sm-0">
                <NavLink
                  className="text-secondary fs-5 nav-link"
                  aria-current="page"
                  to="/my-teams"
                >
                  <i class="fa-solid fa-people-group text-dark"></i>
                  <span className="ms-3 d-none d-sm-inline">My Teams</span>
                </NavLink>
              </li>
              <li className="nav-item text-secondary fs-4 my-1 py-2 py-sm-0">
                <NavLink
                  className="text-secondary fs-5 nav-link"
                  aria-current="page"
                  to="/settings"
                >
                  <i className="fa-solid fa-gear text-dark"></i>
                  <span className="ms-3 d-none d-sm-inline">Settings</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="dropup open">
            <a
              className="btn btn-secondary  text-white dropdown-toggle px-3"
              type="button"
              id="triggerId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa-solid fa-circle-user"></i>
              <span className="mx-2 d-none d-sm-inline">{user.fullName}</span>
            </a>
            <div
              className="dropdown-menu text-center"
              aria-labelledby="triggerId"
            >
              <button className="btn text-danger" onClick={handleLogout}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="col ViewPort">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
