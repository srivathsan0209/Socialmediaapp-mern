import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import { getPostByUsername } from "../redux/actions/postActions";
import { getUserByUsername } from "../redux/actions/userActions";

export default function PostsScreen() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { username } = useParams();
  if (!currentUser) {
    // window.location.href = "/login";
  }

  if(!username && currentUser){
    window.location.href = `/profile/${currentUser.username}/posts`;
  }

  useEffect(() => {
    dispatch(getPostByUsername(username));
    if (!currentUser || (!currentUser.following.includes(username))) {
      dispatch(getUserByUsername(username));
    }
  }, []);

  const dispatch = useDispatch();

  const postsState = useSelector((state) => state.getPostByUsernameReducer);
  let { posts } = postsState;

  let totalPosts = [];
  let totalUsers = [];

  return (
    <div>
      {!username && !currentUser && <h1>Login to See Posts</h1>}
      {username && posts && posts.length === 0 ? (
        <h1>No posts Found</h1>
      ) : (
        username && <h1>{username} Posts</h1>
      )}
      {username &&
        posts &&
        posts.map((postDetails,index) => {
          return (
            <Post key={postDetails._id} postid = {postDetails._id} totalPosts={totalPosts} index={index} totalUsers={totalUsers}/>
          );
        })}
    </div>
  );
}
