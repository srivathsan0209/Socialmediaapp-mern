import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { getlikedPosts } from "../redux/actions/postActions";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

let totalPosts = [];
let totalUsers = [];
const LIMIT = 5;
export default function LikedPostScreen() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postData, setPostData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [visible, setVisible] = useState(LIMIT)
  const [postsListDetails, setPostsListDetails] = useState([])

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
    else{
      dispatch(getlikedPosts(currentUser?.likedPosts));
    }
  }, []);

  const likedPostsState = useSelector((state) => state.getlikedPostsReducer);
  const { likedPostsList:posts } = likedPostsState;

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
      {currentUser?.likedPosts?.length === 0 ? (
        <h1>No posts Found</h1>
      ) : (
        <div>
          <h1>Liked Posts</h1>
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
      )}
    </div>
  );
}
