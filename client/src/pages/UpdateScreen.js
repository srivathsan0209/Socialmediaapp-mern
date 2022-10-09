import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerNewUser, updateUser } from "../redux/actions/userActions";
import { Navigate } from "react-router-dom";
import moment from "moment";

export default function UpdateScreen() {
  if (!localStorage.getItem("currentUser")) {
    window.location.href = "/";
  }

  const dispatch = useDispatch();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [username, setUsername] = useState(currentUser.username);
  const [profilePic, setProfilePic] = useState(currentUser.profilePic);
  const [dob, setDob] = useState(moment(currentUser.dob).format("YYYY-MM-DD"));
  const [bio, setBio] = useState(currentUser.bio);

  const updateState = useSelector((state) => state.updateUserReducer);

  const { loading, error, success } = updateState;

  const RegisterUser = (e) => {
    e.preventDefault();
    const updateduser = {
      name: name,
      email: email,
      username: username,
      profilePic: profilePic,
      dob: dob,
      bio: bio,
    };
    dispatch(updateUser(currentUser._id, updateduser));
  };

  return (
    <div className="row d-flex justify-content-center mt-4">
      {error && <h1>Something went Wrong</h1>}
      {loading && <h1>Loading...</h1>}
      {success && (window.location.href = "/")}
      <form
        onSubmit={(e) => RegisterUser(e)}
        className="card shadow p-3 bg-body rounded col-md-3"
      >
        <h2 className="mb-4">
          Update Details
        </h2>
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
        <div className="align-items-center mt-2">
          <button type="submit" className="btn btn-success me-2 mb-2">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
