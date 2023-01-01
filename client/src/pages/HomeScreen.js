import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { getFeedPostsByUsername } from "../redux/actions/postActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

let totalPosts = [];
let totalUsers = [];
const LIMIT = 5;
export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postData, setPostData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [visible, setVisible] = useState(LIMIT)
  const [postsListDetails, setPostsListDetails] = useState([])

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

  const postsState = useSelector(
    (state) => state.getFeedPostsByUsernameReducer
  );
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
      {!posts && <Loader />}
      <h1 className="mt-3">Hi {currentUser?.name}</h1>
      <div className="feed">
        {posts && postsListDetails.length === 0 && (
          <h1>Follow Users to see their posts</h1>
        )}
        {postData?.length>0 &&
          <InfiniteScroll
            dataLength={postData.length}
            next={next}
            hasMore={hasMore}
            loader={<h1>Loading...</h1>}
          >
          {postData.map((postDetails, index) => {
            if (postDetails.postedby !== currentUser?.username) {
              return (
                <Post
                  key={postDetails._id}
                  postid={postDetails._id}
                  totalPosts={totalPosts}
                  postIndex={index}
                  totalUsers={totalUsers}
                />
              );
            }
          })}
          </InfiniteScroll>
        }
      </div>
    </div>
  );
}
