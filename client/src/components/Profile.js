import React from "react";
import { Link } from "react-router-dom";

export default function Profile({ profile }) {
  return (
    <Link
      to={`/profile/${profile.username}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div
        className="card mb-3 shadow p-3 mb-5 bg-body rounded"
        style={{ Width: "400px", height: "150px" }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={profile.profilePic}
              alt="profile pic"
              className="img-fluid rounded-start p-1"
              style={{ Width: "150px", height: "100px" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{profile.name}</h5>
              <p className="card-text">
                <small className="text-muted">{profile.username}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
