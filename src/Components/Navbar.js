import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import { GiFalconMoon } from "react-icons/gi";
import { Badge } from "react-bootstrap";
import { makeAnyServerRequest } from "../utils/authUtils";
import { GETALLNOTIFICATION } from "../urls";
import { setNotifications } from "../features/notifications/notificationsSlice";

const Navigation = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const notifications = useSelector((state) => state.notifications.items);


  const dispatch=useDispatch();
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const nots = await makeAnyServerRequest(GETALLNOTIFICATION, "GET");
        // console.log("notif>>>>>      ", nots.data);
        dispatch(setNotifications(nots.data))
      } catch (error) {
        // console.error("Error fetching tasks:", error);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: "#f7f7f7" }}
      >
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="fw-bold">
            <GiFalconMoon style={{ color: '#6b71e0' }} className="me-2 fs-3" />
            TaskMaster
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {isAuthenticated ? (
              <Nav className="ms-auto">
                <span className="fs-4 mx-lg-4 position-relative">
                  <NavLink to="/notification" className="fs-4 text-end">
                    <i className="fa-regular fa-bell mainColor"></i>
                    { notifications?.length > 0 && (
                      <Badge className="position-absolute top-0 start-100 translate-middle rounded-pill bg-danger" style={{fontSize:"15px",padding:"5px"}}> 
                        {notifications.length}
                      </Badge>
                    )}
                  </NavLink>
                </span>
                <NavLink to="/settings" className="fs-4">
                  <i class="fa-solid fa-circle-user mainColor"></i>
                </NavLink>
              </Nav>
            ) : (
              <Nav className="me-auto">
                <NavLink to="/" className="nav-link fw-bold">
                  Home
                </NavLink>
                <NavLink to="/contact" className="nav-link fw-bold">
                  Contact
                </NavLink>
                <NavLink to="/about" className="nav-link fw-bold">
                  About
                </NavLink>
              </Nav>
            )}

            {isAuthenticated ? (
              false
            ) : (
              <Nav>
                <NavLink
                  to="/signup"
                  className="nav-link fw-bold bg-success text-white rounded-2"
                >
                  Get Started
                </NavLink>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
