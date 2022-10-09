import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  changePasswordReducer,
  followUserReducer,
  getAllUserDetailsByUsernameReducer,
  getAllUsersByUsernameReducer,
  getAllUsersReducer,
  getSingleUserByUsernameReducer,
  getUserByUsernameReducer,
  loginUserReducer,
  registerNewUserReducer,
  updateUserReducer,
} from "./reducers/userReducer";
import thunk from "redux-thunk";
import {
  addCommentReducer,
  addNewPostReducer,
  deletePostReducer,
  getFeedPostsByUsernameReducer,
  getlikedPostsReducer,
  getPostAndUserByIdReducer,
  getPostByUsernameReducer,
  likePostReducer,
} from "./reducers/postReducer";

const finalReducers = combineReducers({
  registerNewUserReducer: registerNewUserReducer,
  loginUserReducer: loginUserReducer,
  getUserByUsernameReducer: getUserByUsernameReducer,
  getAllUsersByUsernameReducer: getAllUsersByUsernameReducer,
  followUserReducer: followUserReducer,
  addNewPostReducer: addNewPostReducer,
  getPostByUsernameReducer: getPostByUsernameReducer,
  getFeedPostsByUsernameReducer: getFeedPostsByUsernameReducer,
  getAllUserDetailsByUsernameReducer: getAllUserDetailsByUsernameReducer,
  getAllUsersReducer: getAllUsersReducer,
  updateUserReducer: updateUserReducer,
  addCommentReducer: addCommentReducer,
  likePostReducer: likePostReducer,
  getlikedPostsReducer: getlikedPostsReducer,
  changePasswordReducer: changePasswordReducer,
  deletePostReducer: deletePostReducer,
  getPostAndUserByIdReducer: getPostAndUserByIdReducer,
  getSingleUserByUsernameReducer: getSingleUserByUsernameReducer,
});
const store = configureStore({
  reducer: finalReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
