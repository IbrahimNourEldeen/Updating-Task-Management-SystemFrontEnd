import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from '../Components/Footer'
import Img4 from "./Images/img4.png";
import Img5 from "./Images/img5.png";
import Img3 from "./Images/img3.png";

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  const handleClick = () => {
    navigate('/signup');
  };

  return (
    <>
      <div>
        <div className="main-master d-flex justify-content-center align-items-center text-center ">
          <div className="">
            <h5 className="card-title text-white display-1 fw-bolder  mx-3">
              Master Your Tasks Effortlessly
            </h5>
            <p className="card-text text-white fs-2 fw-bold mx-3">
              Streamline your workflow and boost productivity with our intuitive
              task management tool
            </p>
            <button
              className="btn text-white fs-2 my-5 "
              style={{ backgroundColor: "#6b71e0" }}
              onClick={handleClick}
            >
              Get Started For Free
            </button>
          </div>
        </div>

        <h2 className="mb-5  display-3 fw-bolder text-center my-5">Features</h2>
        <div className="m-5 ">
          <div className="row m-3 ">
            <div className="col-md">
              <div className="card border border-white shadow-sm ">
                <div className="m-5 w-25">
                  <img
                    src={Img5}
                    className="card-img-top mx-auto"
                    alt="..."
                  ></img>
                </div>
                <h5 className=" card-title fs-4 fw-bold">Task Scheduler</h5>
                <div className="card-body">
                  <small style={{ color: "gray" }}>Productivity</small>
                  <p className="card-text fs-4 my-3">
                    Effortlessly organize and prioritize your daily tasks with
                    our intuitive scheduler.
                  </p>

                  <button
                    className="fa-solid  fs-1 rounded-circle border-0 "
                    style={{ color: "#6b71e0" }}
                  >
                    <i
                      className="fa-solid fs-2 fa-arrow-left "
                      style={{ color: "#6b71e0" }}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card border border-white shadow-sm">
                <div className="m-5 w-25">
                  <img src={Img3} className="card-img-top" alt="..."></img>
                </div>
                <h5 className=" card-title fs-4 fw-bold">Collaboration Hub</h5>
                <div className="card-body">
                  <small style={{ color: "gray" }}>Teamwork</small>
                  <p className="card-text  fs-4 my-3">
                    Enhance team collaboration with shared task lists and
                    real-time updates.
                  </p>

                  <button
                    className="fa-solid  fs-1 rounded-circle border-0 "
                    style={{ color: "#6b71e0" }}
                  >
                    <i
                      className="fa-solid fs-2 fa-arrow-left "
                      style={{ color: "#6b71e0" }}
                    ></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card border border-white shadow-sm">
                <div className="m-5 w-25">
                  <img src={Img4} className="card-img-top" alt="..."></img>
                </div>
                <h5 className=" card-title fs-4 fw-bold">Progress Tracker</h5>
                <div className="card-body">
                  <small style={{ color: "gray" }}>Analytics</small>
                  <p className="card-text fs-4 my-3">
                    Track your progress with detailed analytics and performance
                    insights.{" "}
                  </p>

                  <button
                    className="fa-solid  fs-1 rounded-circle border-0 "
                    style={{ color: "#6b71e0" }}
                  >
                    <i
                      className="fa-solid fs-2 fa-arrow-left "
                      style={{ color: "#6b71e0" }}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="  col d-flex justify-content-center m-5">
          <button
            className="btn text-white fs-2 "
            style={{ backgroundColor: "#6b71e0" }}
          >
            Explore features
          </button>
        </div>
      </div>
      <div className="text-center" style={{ backgroundColor: "#f7f7f7" }}>
        <h3 className="fs-2 fw-bold pt-5" style={{ color: "#6b71e0" }}>
          stay warm in style
        </h3>
        <p className="my-3 fs-4 d-block  ">
          {" "}
          Streamline your workflow and boost productivity with our intuitive
          task management tool
        </p>
        <p className=" fs-4">Streamline your workflow</p>
        <button
          className="m-5 btn fs-4 text-white"
          style={{ backgroundColor: "#6b71e0" }}
        >
          Get Started For Free
        </button>
      </div>
      <Footer/>
    </>
  );
};

export default Home;
