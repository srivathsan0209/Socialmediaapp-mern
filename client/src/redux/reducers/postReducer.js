export const addNewPostReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_POST_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ADD_POST_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        profile: action.payload,
      };
    case "ADD_POST_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export const getPostAndUserByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_POSTANDUSERBYID_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_POSTANDUSERBYID_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        postDetails: action.payload.post,
        userDetails: action.payload.user,
      };
    case "GET_POSTANDUSERBYID_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export const getPostByUsernameReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_POSTBYUSERNAME_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_POSTBYUSERNAME_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        posts: action.payload,
      };
    case "GET_POSTBYUSERNAME_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export const getFeedPostsByUsernameReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_FEEDPOSTSBYUSERNAME_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_FEEDPOSTSBYUSERNAME_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        posts: action.payload,
      };
    case "GET_FEEDPOSTSBYUSERNAME_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export const addCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_COMMENT_REQUEST":
      return {
        ...state,
        addCommentLoading: true,
      };
    case "ADD_COMMENT_SUCCESS":
      return {
        ...state,
        addCommentLoading: false,
        addCommentSuccess: true,
        // post : action.payload
      };
    case "ADD_COMMENT_FAILED":
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: true,
      };
    default:
      return state;
  }
};

export const likePostReducer = (state = {}, action) => {
  switch (action.type) {
    case "LIKE_POST_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "LIKE_POST_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        post: action.post,
        userProfile: action.user,
      };
    case "LIKE_POST_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export const getlikedPostsReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_LIKEDPOSTS_REQUEST":
      return {
        ...state,
        likedPostsLoading: true,
      };
    case "GET_LIKEDPOSTS_SUCCESS":
      return {
        ...state,
        likedPostsLoading: false,
        likedPostsSuccess: true,
        likedPostsList: action.postsList,
      };
    case "GET_LIKEDPOSTS_FAILED":
      return {
        ...state,
        likedPostsLoading: false,
        likedPostsError: true,
      };
    default:
      return state;
  }
};

export const deletePostReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_POST_REQUEST":
      return {
        ...state,
        deleteLoading: true,
      };
    case "DELETE_POST_SUCCESS":
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
      };
    case "DELETE_POST_FAILED":
      return {
        ...state,
        deleteLoading: false,
        deleteError: true,
      };
    default:
      return state;
  }
};

// export const getAllPostsReducer = (state = {}, action) => {
//   switch (action.type) {
//     case "GET_ALLPOST_REQUEST":
//       return {
//         ...state,
//         loading: true,
//       };
//     case "GET_ALLPOST_SUCCESS":
//       return {
//         ...state,
//         loading: false,
//         success: true,
//         posts : action.payload
//       };
//     case "GET_ALLPOST_FAILED":
//       return {
//         ...state,
//         loading: false,
//         error: true,
//       };
//     default:
//       return state;
//   }
// };
