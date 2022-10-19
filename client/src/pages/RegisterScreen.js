import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerNewUser } from "../redux/actions/userActions";
import { Link,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";

export default function RegisterScreen() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!(sessionStorage.getItem("currentUser"))) {
      navigate("/");
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [dob, setDob] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const registerstate = useSelector((state) => state.registerNewUserReducer);

  const RegisterUser = (e) => {
    e.preventDefault();
    if (cpassword === password) {
      const user = {
        name: name,
        email: email,
        username: username,
        profilePic: profilePic,
        dob: dob,
        bio: bio,
        password: password,
      };
      dispatch(registerNewUser(user,navigate));
    } else {
      Swal.fire({
        icon: "error",
        title: "Passwords do not Match",
      });
    }
  };

  return (
    <div className="row d-flex justify-content-center mt-4">
      <form
        onSubmit={(e) => RegisterUser(e)}
        className="card shadow p-3 bg-body rounded col-md-3"
      >
        <h2 className="mb-4">Sign Up</h2>
        <div className="form-outline mb-4">
          <input
            required
            type="text"
            className="form-control"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            required
            type="email"
            className="form-control"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            required
            type="text"
            className="form-control"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            required
            type="url"
            className="form-control"
            placeholder="Profile Pic Url"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            required
            type="date"
            className="form-control"
            placeholder="Date of birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            max={moment().format("YYYY-MM-DD")}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            required
            type="text"
            className="form-control"
            placeholder="Short Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            required
            type="password"
            className="form-control"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            required
            type="password"
            className="form-control"
            placeholder="Confirm password"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
          />
        </div>
        <div className="align-items-center mt-2">
          <button type="submit" className="btn btn-success me-2 mb-2">
            Sign Up
          </button>
          <Link to="/login" role="button" className="btn btn-success ms-2 mb-2">
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
}
