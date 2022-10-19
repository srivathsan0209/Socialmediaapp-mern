import React, { useEffect } from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { getlikedPosts } from "../redux/actions/postActions";
import { useNavigate } from "react-router-dom";

export default function LikedPostScreen() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let totalPosts = [];
  let totalUsers = [];

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
    else{
      dispatch(getlikedPosts(currentUser?.likedPosts));
    }
  }, []);

  const likedPostsState = useSelector((state) => state.getlikedPostsReducer);
  let { likedPostsList } = likedPostsState;

  return (
    <div>
      {currentUser?.likedPosts?.length === 0 ? (
        <h1>No posts Found</h1>
      ) : (
        <div>
          <h1>Liked Posts</h1>
          {
            likedPostsList?.map((postDetails, index) => {
              return (
                <Post
                  key={postDetails._id}
                  postid={postDetails._id}
                  totalPosts={totalPosts}
                  index={index}
                  totalUsers={totalUsers}
                />
              );
            })}
        </div>
      )}
    </div>
  );
}
