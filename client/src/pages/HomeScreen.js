import React, { useEffect } from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { getFeedPostsByUsername } from "../redux/actions/postActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  let followingUsersLists = currentUser?.following;
  
  useEffect(() => {
    if(!currentUser){
      toast.warning("Login to continue");
      navigate("/login");
    }
    else{
      dispatch(getFeedPostsByUsername(followingUsersLists));
    }
  }, []);

  let totalPosts = [];
  let totalUsers = [];
  let postsListDetails = [];

  const postsState = useSelector(
    (state) => state.getFeedPostsByUsernameReducer
  );
  const { posts } = postsState;

  if (posts) {
    postsListDetails = posts;
    postsListDetails.sort(function (x, y) {
      if (x.createdAt > y.createdAt) {
        return -1;
      }
      if (x.createdAt < y.createdAt) {
        return 1;
      }
      return 0;
    });
  }

  return (
    <div>
      {!posts && <Loader />}
      <h1 className="mt-3">Hi {currentUser?.name}</h1>
      <div className="feed">
        {posts && postsListDetails.length === 0 && (
          <h1>Follow Users to see their posts</h1>
        )}
        {postsListDetails.map((postDetails, index) => {
          if (postDetails.postedby !== currentUser?.username) {
            return (
              <Post
                key={postDetails._id}
                postid={postDetails._id}
                totalPosts={totalPosts}
                index={index}
                totalUsers={totalUsers}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
