import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getUserByUsername } from "../redux/actions/userActions";
import Swal from "sweetalert2";

export default function ProfileScreen() {
  const { username } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let userLogged = false;
  let editProfile = false;
  const [buttonName, setButtonName] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser")) || {};

    if (currentUser.username !== username) {
      dispatch(getUserByUsername(username));
    }
  }, [username]);

  if (sessionStorage.getItem("currentUser")) {
    userLogged = true;
  }

  const profileState = useSelector((state) => state.getUserByUsernameReducer);
  let { profile, error, loading } = profileState;

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser")) || {};

  if (buttonName==="") {
    setButtonName(currentUser?.following?.includes(username)? "unfollow" : "follow")
  }

  if (currentUser?.username === username) {
    editProfile = true;
  }

  if (currentUser?.username === username) {
    profile = currentUser;
  }

  const followUserState = useSelector((state) => state.followUserReducer);
  const { currentUserUpdated, profileUpdated } = followUserState;

  if (currentUserUpdated) {
    sessionStorage.setItem("currentUser", JSON.stringify(currentUserUpdated));
  }


  const follow = (e) => {
    if (userLogged) {
      dispatch(followUser(currentUser, profile, username));
      setButtonName(buttonName==="follow"?"unfollow" : "follow")
    } else {
      Swal.fire({
        icon: "error",
        title: "Login to follow User",
      });
    }
  };

  const editUserProfile = () => {
    navigate("/updateUser");
  };

  return (
    <div>
      <div className="card mt-5 me-5 ms-5">
        {profile && (
          <div className="mt-5 row">
            <div className="col-md-4 text-end mt-2">
              <img
                className=""
                src={profile.profilePic}
                alt="profile pic"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
            <div className="col-md-8 row text-start">
              <h2>
                <b>{profile.username}</b>
              </h2>
              <div className="col-md-2">
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href={`/profile/${username}/posts`}
                >
                  <p>{profile.posts.length} Posts</p>
                </a>
              </div>
              <div className="col-md-2">
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#FollowersModal"
                  style={{ backgroundColor: "transparent", border: "none" }}
                >
                  <p>{profile.followers.length} followers</p>
                </button>
              </div>
              <div className="col-md-2">
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#FollowingModal"
                  style={{ backgroundColor: "transparent", border: "none" }}
                >
                  <p>{profile.following.length} following</p>
                </button>
              </div>
              <h4>
                <b>{profile.name}</b>
              </h4>
              <p>{profile.bio}</p>
            </div>
          </div>
        )}
        <div className="text-center mb-3">
          {editProfile ? (
            <button className="btn btn-primary" onClick={editUserProfile}>
              Edit profile
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={(e) => {
                follow(e);
              }}
            >
              {buttonName}
            </button>
          )}
        </div>
      </div>
      {profile && (
        <div>
          <div className="modal fade" id="FollowersModal" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Followers List</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  {profile.followers.map((username, index) => {
                    return (
                      <div key={index} className="mb-3 d-flex">
                        <h4 style={{ color: "black !important" }}>
                          {username}
                        </h4>
                        <button
                          className="ms-auto btn btn-primary"
                          style={{ fontSize: "15px" }}
                          data-bs-dismiss="modal"
                        >
                          <a
                            style={{ textDecoration: "none", color: "white" }}
                            href={`/profile/${username}`}
                          >
                            View profile
                          </a>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="FollowingModal" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Following List</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  {profile.following.map((username, index) => {
                    return (
                      <div key={index} className="mb-3 d-flex">
                        <h4 style={{ color: "black !important" }}>
                          {username}
                        </h4>
                        <button
                          className="ms-auto btn btn-primary"
                          style={{ fontSize: "15px" }}
                          data-bs-dismiss="modal"
                        >
                          <a
                            style={{ textDecoration: "none", color: "white" }}
                            href={`/profile/${username}`}
                          >
                            View profile
                          </a>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
