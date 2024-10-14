import React from "react";
import Footer from "../Components/Footer";
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
              <img src="" alt="image indecate the introduction" />
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
            <div className="col-12 col-md-6 col-lg-4 mt-4">
              <div className="card">
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mt-4">
              <div className="card">
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mt-4">
              <div className="card">
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mt-4">
              <div className="card">
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mt-4">
              <div className="card">
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mt-4">
              <div className="card">
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
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
      <Footer/>
    </div>
  );
};

export default About;
