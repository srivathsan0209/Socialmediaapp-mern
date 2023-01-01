import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/actions/userActions";

export default function Navbar() {
  
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const dispatch = useDispatch();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Social Media
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {currentUser ? (
                  <Link
                    className="nav-link"
                    to={`/profile/${currentUser.username}/posts`}
                  >
                    Posts
                  </Link>
                ) : (
                  <Link className="nav-link" to={`/posts`}>
                    Posts
                  </Link>
                )}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/search">
                  Search
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addpost">
                  Add a Post
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/likedPost">
                  Liked Posts
                </Link>
              </li>
            </ul>
            {currentUser ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      justifyContent: "center",
                    }}
                  >
                    {currentUser.name}
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/profile/${currentUser.username}`}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/settings">
                        Settings
                      </Link>
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => {
                        dispatch(logoutUser())
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
