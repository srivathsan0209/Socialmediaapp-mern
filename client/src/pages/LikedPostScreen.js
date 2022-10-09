import React, { useEffect } from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { getlikedPosts } from "../redux/actions/postActions";
import { toast } from "react-toastify";

export default function LikedPostScreen() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const likedPosts = [];
  if (!currentUser) {
    window.location.href = "/login";
  }

  const dispatch = useDispatch();

  let totalPosts = [];
  let totalUsers = [];

  useEffect(() => {
    dispatch(getlikedPosts(currentUser.likedPosts));

    if (!likedPosts) {
      dispatch(getlikedPosts(currentUser.likedPosts));
    }
  }, []);

  const likedPostsState = useSelector((state) => state.getlikedPostsReducer);
  let { likedPostsList, likedPostsLoading, likedPostsSuccess } =
    likedPostsState;

  return (
    <div>
      <div style={{ display: "none" }}>
        {!likedPostsSuccess && likedPostsLoading && toast.info("Loading Posts")}
      </div>
      {currentUser.likedPosts.length === 0 ? (
        <h1>No posts Found</h1>
      ) : (
        <div>
          <h1>Liked Posts</h1>
          {likedPostsList &&
            likedPostsList.map((postDetails,index) => {
              return <Post key={postDetails._id} postid = {postDetails._id} totalPosts={totalPosts} index={index} totalUsers={totalUsers}/>
            })}
        </div>
      )}
    </div>
  );
}
