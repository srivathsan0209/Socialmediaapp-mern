import moment from "moment";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  addComment,
  deletePost,
  getPostAndUserById,
  likePost,
} from "../redux/actions/postActions";
import Comment from "./Comment";

export default function Post({
  postid,
  totalPosts,
  index,
  totalUsers,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostAndUserById(postid));
  }, [postid]);

  const postState = useSelector((state) => state.getPostAndUserByIdReducer);
  let { postDetails, userDetails } = postState;

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  const [userComment, setUserComment] = useState("");
  const [isliked, setIsliked] = useState("");
  const [likedList, setLikedList] = useState([]);
  const [postComments, setPostComments] = useState([]);

  if (postDetails && !totalPosts.includes(postDetails)) {
    totalPosts.push(postDetails);
    totalUsers.push(userDetails);
  }
  
  if(totalPosts[index] && isliked===""){
    setIsliked(totalPosts[index]?.likes?.includes(currentUser?.username));
    setLikedList(totalPosts[index].likes);
    setPostComments(totalPosts[index].comments)
  }

  const likeunLikePost = () => {
    if (!currentUser) {
      Swal.fire({
        icon: "error",
        title: "Login to Like the Post",
      });
    } else {
      sessionStorage.setItem("likedpostid", totalPosts[index]._id);
      dispatch(
        likePost(currentUser.username, totalPosts[index]._id, currentUser._id)
      );
      setIsliked(!isliked);
      if (likedList.includes(currentUser.username)) {
        const usernameIndex = likedList.indexOf(currentUser.username);
        likedList.splice(usernameIndex, 1);
      } else if (!likedList.includes(currentUser.username) ) {
        likedList.push(currentUser.username);
      }
    }
  };

  const commentOnClick = (postid) => {
    if (!currentUser) {
      Swal.fire({
        icon: "error",
        title: "Login to Comment the Post",
      });
    } else if (currentUser.username === totalPosts[index].postedby) {
      Swal.fire({
        icon: "error",
        title: "Sorry! \n You can't comment on your own post",
      });
    } else if (!currentUser.following.includes(totalPosts[index].postedby)) {
      Swal.fire({
        icon: "error",
        title: "Follow User to Comment On their Post",
      });
    } else {
      sessionStorage.setItem("commentedpostid", totalPosts[index]._id);
    }
  };

  const commentAction = (e) => {
    const commentModel = {
      username: currentUser.username,
      comment: userComment,
    };
    postComments.push(commentModel);
    const postid = sessionStorage.getItem("commentedpostid");
    dispatch(addComment(currentUser.username, postid, userComment));
    setUserComment("");
    sessionStorage.removeItem("commentedpostid");
  };

  const DeleteAction = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const postid = sessionStorage.getItem("optionpostid");
        dispatch(deletePost(postid, currentUser.username));
        const userpostsIndex = currentUser.posts.indexOf(postid);
        currentUser.posts.splice(userpostsIndex, 1);
        if (currentUser.likedPosts.includes(postid)) {
          const userlikedpostsIndex = currentUser.likedPosts.indexOf(postid);
          currentUser.likedPosts.splice(userlikedpostsIndex, 1);
        }
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
        window.location.reload();
        sessionStorage.removeItem("optionpostid");
      }
    });
  };

  return (
    <div>
      {totalPosts[index] && (
        <div className="row d-flex justify-content-center mt-3">
          <div className="col-md-4 card mb-3 mt-3 align-items-center row">
            <div className="mb-3 mt-3 row inline-flex">
              <div className="col-md-10 text-start row">
                <img
                  src={totalUsers[index].profilePic}
                  className="card-img-top img-fluid rounded-circle"
                  alt={`${totalUsers[index].name} post`}
                  style={{ width: "70px", height: "40px" }}
                />
                <h5 className="card-title col-md-9 mt-2">
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    href={`/profile/${totalUsers[index].username}`}
                  >
                    <b>{totalUsers[index].name}</b>
                  </a>
                </h5>
              </div>
              {currentUser &&
                currentUser.username === totalPosts[index].postedby && (
                  <div className="col-md-2 mt-2 text-end">
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#OptionsModal"
                      onClick={() =>
                        sessionStorage.setItem(
                          "optionpostid",
                          totalPosts[index]._id
                        )
                      }
                      style={{ backgroundColor: "transparent", border: "none" }}
                    >
                      <svg
                        aria-label="More options"
                        className="_ab6-"
                        color="#262626"
                        fill="#262626"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <circle cx="12" cy="12" r="1.5"></circle>
                        <circle cx="6" cy="12" r="1.5"></circle>
                        <circle cx="18" cy="12" r="1.5"></circle>
                      </svg>
                    </button>
                  </div>
                )}
            </div>
            <div className="justify-content-center me-5">
              <img
                src={totalPosts[index].imageUrl}
                className="card-img-top img-fluid rounded"
                alt={totalPosts[index]._id}
                style={{ width: "400px", height: "400px" }}
              />
            </div>
            <div className="card-body text-start ms-4">
              <div>
                <button
                  onClick={likeunLikePost}
                  style={{ backgroundColor: "transparent", border: "none" }}
                >
                  {isliked ? (
                    <svg
                      aria-label="Unlike"
                      className="_ab6-"
                      color="#ed4956"
                      fill="#ed4956"
                      height="24"
                      role="img"
                      viewBox="0 0 48 48"
                      width="24"
                    >
                      <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                    </svg>
                  ) : (
                    <svg
                      aria-label="Like"
                      className="_ab6-"
                      color="black"
                      fill="black"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
                    </svg>
                  )}
                </button>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target={
                    currentUser &&
                    currentUser.following.includes(totalPosts[index].postedby)
                      ? "#CommentModal"
                      : "null"
                  }
                  style={{ backgroundColor: "transparent", border: "none" }}
                  onClick={() => commentOnClick(totalPosts[index]._id)}
                >
                  <svg
                    aria-label="Comment"
                    className="_ab6-"
                    color="#8e8e8e"
                    fill="#8e8e8e"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path
                      d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
                      fill="none"
                      stroke="black"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="card-text card me-5 mt-2 mb-2">
                <div className="inline-flex ms-1">
                Liked by : <b>{likedList.length}</b> People
                </div>
                {
                  likedList?.map((username, index) => {
                    return (
                      <div key={index} className="mt-1 ms-1">
                        <a
                          style={{ textDecoration: "none", color: "black" }}
                          href={`/profile/${username}`}
                        >
                          <b>{username}</b>
                        </a>
                      </div>
                    );
                  })}
              </div>
              <p className="card-text">
                <b className="fs-5 ms-1 me-1">{totalUsers[index].name}</b>{" "}
                {totalPosts[index].userComment}
              </p>
              {postComments.map((comment, index) => {
                return <Comment key={index} comments={comment} />;
              })}
              <p className="card-text">
                <small className="ms-1 text-muted">
                  {moment(totalPosts[index].createdAt).format("DD-MM-YYYY H:m")}
                </small>
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="modal fade" id="CommentModal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CommentModalLabel">
                Add a Comment
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => {
                  sessionStorage.removeItem("commentedpostid");
                }}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={currentUser ? currentUser.username : ""}
                  disabled
                />
                <textarea
                  required
                  className="form-control mb-3"
                  value={userComment}
                  onChange={(e) => {
                    setUserComment(e.target.value);
                  }}
                  placeholder="Your Comment"
                ></textarea>
              </form>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => commentAction(totalPosts[index]._id)}
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="OptionsModal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => DeleteAction(totalPosts[index]._id)}
              >
                Delete Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
