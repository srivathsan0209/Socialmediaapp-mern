import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewPost } from "../redux/actions/postActions";
import { useNavigate } from "react-router-dom";

export default function AddPostScreen() {
  const [imageUrl, setImageUrl] = useState("");
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "/login";
  }

  const addpostState = useSelector((state) => state.addNewPostReducer);
  const { profile, error, loading, } = addpostState;

  if(profile){
    localStorage.setItem("currentUser",JSON.stringify(profile)); 
    // navigate("/posts") 
    window.location.href="/posts"
  }

  const addPost = (e) => {
    e.preventDefault();
    const postDetails = {
      imageUrl: imageUrl,
      userComment: comment,
      postedby: currentUser.username,
      _id:currentUser._id,
      posts:currentUser.posts
    };
    dispatch(addNewPost(postDetails));
  };

  return (
    <div className="row d-flex justify-content-center mt-5">
      <form
        className="card shadow p-3 bg-body rounded col-md-3"
        onSubmit={(e) => addPost(e)}
      >
        <h2 className="mb-4">
          Add a Post
        </h2>
        <div className="form-outline mb-4">
          <input
            required
            type="url"
            placeholder="Url of the image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-outline mb-4">
          <textarea
            required
            type="text"
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="align-items-center mt-2">
          <button type="submit" className="btn btn-success mb-4">
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
}
