import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../features/auth/authSlice";
import { LOGINUSER } from "../urls";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for validation errors
  const [errors, setErrors] = useState({ email: "", password: "" });

  const { loading, error } = useSelector((state) => state.auth);
  const Error=error;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // Email validation (simple regex for email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email.";
      isValid = false;
    }

    // Password validation (must not be empty)
    if (!password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLoginEvent = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop if validation fails
    }

    dispatch(loginStart());

    try {
      const response = await axios({
        method: "POST",
        url: LOGINUSER,
        headers: {
          "Content-Type": "application/json",
        },
        data: { email, password },
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
        dispatch(loginFailure(response.data.data.message));
      }
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(loginFailure(error.response.data.message));
    }
  };

  return (
    <div>
      <div className="container LSHight">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-12 col-md-6 col-lg-4 p-5 rounded-5 bg-light text-center">
            <h2 className="mb-5 fw-bold">Log in</h2>
            <form onSubmit={handleLoginEvent}>
              <input
                className="form-control mb-3 border-0 border-bottom border-dark bg-transparent"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="text-danger">{errors.email}</span>

              <input
                className="form-control mb-3 border-0 border-bottom border-dark bg-transparent"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="text-danger">{errors.password}</span>

              <button className="form-control btn btn-success" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>

              {Error && (
                <div className="alert alert-danger" role="alert">
                  {Error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
