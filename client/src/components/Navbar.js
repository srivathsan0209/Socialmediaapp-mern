import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

export default function Navbar() {
  
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const dispatch = useDispatch();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Social Media
          </a>
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
                  <a
                    className="nav-link"
                    href={`/profile/${currentUser.username}/posts`}
                  >
                    Posts
                  </a>
                ) : (
                  <a className="nav-link" href={`/posts`}>
                    Posts
                  </a>
                )}
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/search">
                  Search
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/addpost">
                  Add a Post
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/likedPost">
                  Liked Posts
                </a>
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
                      <a
                        className="dropdown-item"
                        href={`/profile/${currentUser.username}`}
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/settings">
                        Settings
                      </a>
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
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
