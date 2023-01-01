import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Profile from "../components/Profile";
import { getAllUsersByUsername } from "../redux/actions/userActions";

export default function SearchScreen() {

  const [username, setusername] = useState("");

  const dispatch = useDispatch();
  const profileState = useSelector(
    (state) => state.getAllUsersByUsernameReducer
  );
  const { profilesList, searchAllError, searchAllLoading } = profileState;

  const searchFunction = (e) => {
    e.preventDefault();
    dispatch(getAllUsersByUsername(username));
  };
  return (
    <div>
      {searchAllLoading && <Loader />}
      <h1 className="mt-4">Search User</h1>
      <div
        className="row d-flex justify-content-center"
        style={{ justifyContent: "center" }}
      >
        <div className="col-md-3">
          {/* <h2 className="mt-2 mb-4">Search User</h2> */}
          <br />
          <br />
          <input
            type="text"
            value={username}
            className="form-control"
            onChange={(e) => {
              setusername(e.target.value);
            }}
            placeholder="Enter the Username"
          />
          <br />
          <br />
          <button
            type="submit"
            className="btn btn-primary mb-2"
            onClick={(e) => {
              searchFunction(e);
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div className="row justify-content-center mt-5 ms-2 me-2">
        {profilesList &&
          profilesList.map((profile, index) => {
            return (
              <div className="col-md-3 m-2 p-2" key={index}>
                <Profile profile={profile} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
