import React, { useEffect } from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { getFeedPostsByUsername } from "../redux/actions/postActions";

export default function HomeScreen() {
  const dispatch = useDispatch();

  let totalPosts = [];
  let totalUsers = [];

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "/login";
  }

  let followingUsersLists = currentUser.following;

  useEffect(() => {
    dispatch(getFeedPostsByUsername(followingUsersLists));
  }, [dispatch]);

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
      {!posts && <h1>Loading</h1>}
      <h1 className="mt-3">Hi {currentUser.name}</h1>
      <div className="feed">
        {posts && postsListDetails.length === 0 && (
          <h1>Follow Users to see their posts</h1>
        )}
        {postsListDetails.map((postDetails, index) => {
          if (postDetails.postedby !== currentUser.username) {
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
