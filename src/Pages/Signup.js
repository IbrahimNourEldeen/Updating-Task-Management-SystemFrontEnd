import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess } from "../features/auth/authSlice";
import axios from "axios";
import { SIGNUPUSER } from "../urls";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginStart());

    try {
      const response = await axios({
        method: "POST",
        url: SIGNUPUSER,
        headers: {
          "Content-Type": "application/json",
        },
        data: user,
      });
      
      if (response.status === 200) {
        dispatch(
          loginSuccess({
            user: response.data.data.userInfo,
            accessToken: response.data.data.tokens.accessToken,
            refreshToken: response.data.data.tokens.refreshToken,
          })
        );
        navigate("/", { replace: true });
      }else{
        dispatch(loginFailure(response.data))
      }
    } catch (error) {
      console.log(error.response)
      if(error.response.data.status==="FAIL")
      dispatch(loginFailure(error.response.data.message))
    }
  };

  return (
    <div>
      <div className="container LSHight">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-12 col-md-8 col-lg-5 p-5 rounded-5 bg-light text-center">
            <h2 className="mb-5 fw-bold">Sign up</h2>
            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-3 border-0 border-bottom border-dark bg-transparent"
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                value={user.fullName}
              />
              <input
                className="form-control mb-3 border-0 border-bottom border-dark bg-transparent"
                type="text"
                name="username"
                placeholder="User name"
                onChange={handleChange}
                value={user.username}
              />
              <input
                className="form-control mb-3 border-0 border-bottom border-dark bg-transparent"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={user.email}
              />
              <input
                className="form-control mb-3 border-0 border-bottom border-dark bg-transparent"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={user.password}
              />
              <button className="form-control btn btn-success" type="submit">
                Create Your Account
              </button>
              <span className="text-danger">{error}</span>
            </form>
            <button
              className="mt-5 text-decoration-none btn fw-bold"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
