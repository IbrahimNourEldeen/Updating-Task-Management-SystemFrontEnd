import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";
import { MdOutlineNotifications } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { GiFalconMoon } from "react-icons/gi";

const Navigation = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: "#f7f7f7" }}
      >
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="fw-bold">
            <GiFalconMoon />
            TaskMaster
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {isAuthenticated ? (
              <Nav className="ms-auto">
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-control"
                />
                <span className="fs-4 mx-lg-3">
                  <NavLink to="/notification"  className="text-dark fs-4">
                  <MdOutlineNotifications />
                  </NavLink>
                </span>
                <NavLink to="/account" className="text-dark fs-4">
                  <FaRegUserCircle />
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

            {isAuthenticated ? false : (
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
