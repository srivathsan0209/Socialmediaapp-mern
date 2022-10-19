import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewPost } from "../redux/actions/postActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddPostScreen() {
  const [imageUrl, setImageUrl] = useState("");
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  useEffect(() => {
    if(!currentUser){
      toast.warn("Login to continue");
      navigate("/login");
    }
  }, [])

  const addPost = (e) => {
    e.preventDefault();
    const postDetails = {
      imageUrl: imageUrl,
      userComment: comment,
      postedby: currentUser.username,
      _id:currentUser._id,
      posts:currentUser.posts
    };
    dispatch(addNewPost(postDetails,navigate));
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
