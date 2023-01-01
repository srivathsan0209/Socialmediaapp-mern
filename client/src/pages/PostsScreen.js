import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../components/Post";
import { getPostByUsername } from "../redux/actions/postActions";
import { getUserByUsername } from "../redux/actions/userActions";
import InfiniteScroll from "react-infinite-scroll-component";

let totalPosts = [];
let totalUsers = [];
const LIMIT = 5;
export default function PostsScreen() {

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const { username } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [postData, setPostData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [visible, setVisible] = useState(LIMIT)
  const [postsListDetails, setPostsListDetails] = useState([])

  useEffect(() => {
    if(!username && currentUser){
      navigate(`/profile/${currentUser.username}/posts`);
    }
    else{
      dispatch(getPostByUsername(username));
      if (!currentUser || (!currentUser.following.includes(username))) {
        dispatch(getUserByUsername(username));
      }
    }
  }, []);

  const postsState = useSelector((state) => state.getPostByUsernameReducer);
  const { posts } = postsState;

  if (posts?.length>0 && postsListDetails.length===0 && postData.length===0) {
    setPostsListDetails(posts);
    postsListDetails.sort(function (x, y) {
      if (x.createdAt > y.createdAt) {
        return -1;
      }
      if (x.createdAt < y.createdAt) {
        return 1;
      }
      return 0;
    });
    setPostData(posts.slice(0,LIMIT));
  }

  const next = () =>{
    const newLimit = visible+LIMIT;
    const dataToAdd = postsListDetails.slice(visible,newLimit);

    if(postsListDetails.length > postData.length){
      setPostData([...postData].concat(dataToAdd));
      setVisible(newLimit);
    }else{
      setHasMore(false);
    }
  }

  return (
    <div>
      {!username && !currentUser && <h1>Login to See Posts</h1>}
      {username && posts?.length === 0 ? (
        <h1>No posts Found</h1>
      ) : (
        username && <h1>{username} Posts</h1>
      )}
      {postData?.length > 0 && (
        <InfiniteScroll
          dataLength={postData.length}
          next={next}
          hasMore={hasMore}
          loader={<h1>Loading...</h1>}
        >
          {postData.map((postDetails, index) => {
            return (
              <Post
                key={postDetails._id}
                postid={postDetails._id}
                totalPosts={totalPosts}
                postIndex={index}
                totalUsers={totalUsers}
              />
            );
          })}
        </InfiniteScroll>
      )}
    </div>
  );
}
