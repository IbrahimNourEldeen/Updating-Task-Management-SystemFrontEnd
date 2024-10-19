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
  
  // State for validation errors
  const [errors, setErrors] = useState({
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

  const validateForm = () => {
    let isValid = true;
    const newErrors = { fullName: "", username: "", email: "", password: "" };

    // Full Name validation
    if (!user.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
      isValid = false;
    }

    // Username validation
    if (!user.username.trim()) {
      newErrors.username = "Username is required.";
      isValid = false;
    }

    // Email validation (simple regex for email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(user.email)) {
      newErrors.email = "Please enter a valid email.";
      isValid = false;
    }

    // Password validation (must be at least 6 characters long)
    if (!user.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // If validation fails, stop form submission
    }

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
      } else {
        dispatch(loginFailure(response.data));
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.data.status === "FAIL") {
        dispatch(loginFailure(error.response.data.message));
      }
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
              <span className="text-danger">{errors.fullName}</span>
              
              <input
                className="form-control mb-3 border-0 border-bottom border-dark bg-transparent"
                type="text"
                name="username"
                placeholder="User name"
                onChange={handleChange}
                value={user.username}
              />
              <span className="text-danger">{errors.username}</span>

              <input
                className="form-control mb-3 border-0 border-bottom border-dark bg-transparent"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={user.email}
              />
              <span className="text-danger">{errors.email}</span>

              <input
                className="form-control mb-3 border-0 border-bottom border-dark bg-transparent"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={user.password}
              />
              <span className="text-danger">{errors.password}</span>

              <button className="form-control btn btn-success" type="submit" disabled={loading}>
                {loading ? "Creating Account..." : "Create Your Account"}
              </button>
              <span className="text-danger">{error}</span>
            </form>
            <button
              className="mt-5 text-decoration-none btn fw-bold"
              onClick={() =>{ navigate("/login")}}
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
