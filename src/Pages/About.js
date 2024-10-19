import React from "react";
import Footer from "../Components/Footer";
import TMImage from './Images/TM.png';
const About = () => {
  return (
    <div>
      <div className="main-about-sheet d-flex justify-content-center align-items-center">
        <div className="main-text text-center position-relative z-1">
          <h2 className="text-white display-1 fw-bolder ">About US</h2>
          <p className="text-white fs-3 fw-bold">Where to meet us</p>
          <button className="btn bgBtns text-white fw-bold fs-5 p-3">
            View Our Services
          </button>
        </div>
      </div>
      <div className="intro-sheet my-5">
        <div className="container">
          <div className="row text-center">
            <h2 className="fs-1 fw-bold my-4">Introduction</h2>
            <div className="col-12 col-md-6">
              <img src={TMImage} className="card-img-top" alt="..." />
            </div>
            <div className="col-12 col-md-6 text-start">
              <h3 className="fw-bold ">Task master</h3>
              <p className=" fs-5">
                Task Master is a task management website designed to help users
                efficiently organize and manage their daily tasks. It offers
                features such as user login, task creation, and progress
                tracking, streamlining the task management process to enhance
                productivity and time management.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="ourTeam-sheet py-5">
        <div className="container my-5">
          <h2 className="fs-1 fw-bold my-4 text-center">Meet Our Team</h2>
          <div className="row">
            <div className="col-12 col-md-6 mt-4">
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">Abdelrahman Nabil</h5>
                  <p className="card-text">
                    Student at Shoubra Faculty of Engineering, Benha University,
                    and Full Stack developer
                  </p>
                  <a href="https://www.linkedin.com/in/abdelrahman-nabil-4869ab2a4/" className="me-3" target="_blank">
                    <i className="fa-brands fa-linkedin fs-3"></i>
                  </a>
                  <a href="https://github.com/abdelrahman-nabil32"  target="_blank">
                    <i class="fa-brands fa-github fs-3"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 mt-4">
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">Ibrahim Nour Eldeen</h5>
                  <p className="card-text">
                    Student at the Faculty of Science, Benha University, and
                    Full Stack developer
                  </p>
                  <a href="https://www.linkedin.com/in/ibrahim-nour-eldeen-67232a2b7/" className="me-3"  target="_blank">
                    <i className="fa-brands fa-linkedin fs-3"></i>
                  </a>
                  <a href="https://github.com/IbrahimNourEldeen"  target="_blank">
                    <i class="fa-brands fa-github fs-3"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 mt-4">
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">Nader Osama</h5>
                  <p className="card-text">
                    Graduate of the Faculty of Computer Science and Artificial
                    Intelligence, Benha University
                  </p>
                  <a href=".." className="me-3">
                    <i className="fa-brands fa-linkedin fs-3"></i>
                  </a>
                  <a href="...">
                    <i class="fa-brands fa-github fs-3"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 mt-4">
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">Ebrahim Abdelhalem</h5>
                  <p className="card-text">
                    Student at the Faculty of Computer Science and Artificial
                    Intelligence, zqaziq University
                  </p>
                  <a href=".." className="me-3">
                    <i className="fa-brands fa-linkedin fs-3"></i>
                  </a>
                  <a href="...">
                    <i class="fa-brands fa-github fs-3"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="reachOut-sheet mt-5 mb-2 text-center py-5"
        style={{ backgroundColor: "#f7f7f7" }}
      >
        <h2 className="mainColor fs-1 fw-bold mt-5">Reach Out Today</h2>
        <p className="fs-5 my-4">
          Have Quistions or need assistance? We're here to help you, contact us
          for maoe informaion.
        </p>
        <button className="btn bgBtns text-white fw-bold fs-5 mb-5">
          Get In Touch
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default About;
