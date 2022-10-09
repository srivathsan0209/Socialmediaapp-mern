import React, { useState } from "react";
// import { UserMock } from "../mocks/UserMock";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../redux/actions/userActions";
import { toast } from "react-toastify";

export default function LoginScreen() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginState = useSelector((state) => state.loginUserReducer);
  const { loginSuccess, loginError, loginLoading } = loginState;

  // if (localStorage.getItem("currentUser")) {
    // toast.success("Login Success");
    // window.location.href = "/";
  // }

  const validateCredentials = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(loginUser(user));
  };

  return (
    <div className="row d-flex justify-content-center">
      <div style={{ display: "none" }}>
        {loginError && toast.error("Login Failed")}
        {loginLoading && toast.info("Loading")}
      </div>
      <h1 className="mb-5 mt-5">Social Media App</h1>
      <form
        className="card shadow p-3 bg-body rounded col-md-3"
        onSubmit={(e) => validateCredentials(e)}
      >
        <h2 className="mb-4">Login</h2>
        <div className="form-outline mb-4">
          <input
            required
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-outline mb-4">
          <input
            required
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="align-items-center mt-2">
          <button type="submit" className="btn btn-success me-2 mb-4">
            Log In
          </button>
          <Link
            to="/register"
            role="button"
            className="btn btn-success ms-2 mb-4"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
