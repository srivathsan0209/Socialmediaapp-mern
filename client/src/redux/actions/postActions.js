import axios from "axios";

export const addNewPost = (postDetails) => (dispatch) => {
  dispatch({ type: "ADD_POST_REQUEST" });

  axios
    .post("/api/posts/addpost", postDetails)
    .then((res) => {
      dispatch({ type: "ADD_POST_SUCCESS", payload: res.data });
      console.log(res);
    })
    .catch((error) => {
      dispatch({ type: "ADD_POST_FAILED" }, error);
      console.log(error);
    });
};

export const getPostAndUserById = (postid) => (dispatch) => {
  dispatch({ type: "GET_POSTANDUSERBYID_REQUEST" });

  axios
    .post("/api/posts/getpostanduserbyid", { postid })
    .then((res) => {
      dispatch({ type: "GET_POSTANDUSERBYID_SUCCESS", payload: res.data });
      console.log(res);
    })
    .catch((error) => {
      dispatch({ type: "GET_POSTANDUSERBYID_FAILED" }, error);
      console.log(error);
    });
};

export const getPostByUsername = (username) => (dispatch) => {
  dispatch({ type: "GET_POSTBYUSERNAME_REQUEST" });

  axios
    .post("/api/posts/getpostsbyusername", { username })
    .then((res) => {
      dispatch({ type: "GET_POSTBYUSERNAME_SUCCESS", payload: res.data });
      console.log(res);
    })
    .catch((error) => {
      dispatch({ type: "GET_POSTBYUSERNAME_FAILED" }, error);
      console.log(error);
    });
};

export const getFeedPostsByUsername = (username) => (dispatch) => {
  dispatch({ type: "GET_FEEDPOSTSBYUSERNAME_REQUEST" });

  axios
    .post("/api/posts/getfeedpostsbyusername", { username })
    .then((res) => {
      dispatch({ type: "GET_FEEDPOSTSBYUSERNAME_SUCCESS", payload: res.data });
      console.log(res);
    })
    .catch((error) => {
      dispatch({ type: "GET_FEEDPOSTSBYUSERNAME_FAILED" }, error);
      console.log(error);
    });
};

export const addComment = (username, postid, comment) => (dispatch) => {
  dispatch({ type: "ADD_COMMENT_REQUEST" });

  axios
    .post("/api/posts/addcomment", { username, postid, comment })
    .then((res) => {
      dispatch({ type: "ADD_COMMENT_SUCCESS", payload: res.data });
      console.log(res);
    })
    .catch((error) => {
      dispatch({ type: "ADD_COMMENT_FAILED" }, error);
      console.log(error);
    });
};

export const likePost = (username, postid, userid) => (dispatch) => {
  dispatch({ type: "LIKE_POST_REQUEST" });

  axios
    .post("/api/posts/likepost", { username, postid, userid })
    .then((res) => {
      dispatch({
        type: "LIKE_POST_SUCCESS",
        post: res.data.post,
        user: res.data.user,
      });
      // dispatch(getUserByUsername(username));
      console.log(res.data.post);
    })
    .catch((error) => {
      dispatch({ type: "LIKE_POST_FAILED" }, error);
      console.log(error);
    });
};

export const getlikedPosts = (likedPostsList) => (dispatch) => {
  dispatch({ type: "GET_LIKEDPOSTS_REQUEST" });

  axios
    .post("/api/posts/getuserlikedposts", { likedPostsList })
    .then((res) => {
      dispatch({ type: "GET_LIKEDPOSTS_SUCCESS", postsList: res.data });
    })
    .catch((error) => {
      dispatch({ type: "GET_LIKEDPOSTS_FAILED" }, error);
      console.log(error);
    });
};

export const deletePost = (postid, username) => (dispatch) => {
  dispatch({ type: "DELETE_POST_REQUEST" });
  axios
    .post("/api/posts/deletepost", { postid, username })
    .then((res) => {
      dispatch({ type: "DELETE_POST_SUCCESS" });
      console.log(res);
    })
    .catch((error) => {
      dispatch({ type: "DELETE_POST_FAILED" }, error);
      console.log(error);
    });
};

// export const getAllPost = (username) => (dispatch) => {
//   dispatch({ type: "GET_ALLPOST_REQUEST" });

//   axios
//     .post("/api/posts/getallposts", username)
//     .then((res) => {
//       dispatch({ type: "GET_ALLPOST_SUCCESS", payload: res.data });
//       console.log(res);
//     })
//     .catch((error) => {
//       dispatch({ type: "GET_ALLPOST_FAILED" }, error);
//       console.log(error);
//     });
// };
