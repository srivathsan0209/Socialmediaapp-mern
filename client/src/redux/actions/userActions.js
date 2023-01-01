import axios from "axios";
import { toast } from "react-toastify";
import { getFeedPostsByUsername, getlikedPosts } from "./postActions";

export const registerNewUser = (user,navigate) => (dispatch) => {
  dispatch({ type: "USER_REGISTRATION_REQUEST" });
  toast.info("Loading");

  axios
    .post("/api/users/register", user)
    .then((res) => {
      dispatch({ type: "USER_REGISTRATION_SUCCESS" });
      toast.success("Registration Success");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      console.log(res);
    })
    .catch((error) => {
      dispatch({ type: "USER_REGISTRATION_FAILED",payload: error.response.data.message });
      toast.error(error.response.data.message)
      console.log(error);
      console.log(error.response.data);
    });
};

export const loginUser = (user) => (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  toast.info("Loading");
  axios
    .post("/api/users/login", user)
    .then((res) => {
      // dispatch(getFeedPostsByUsername(res.data.following))
      // dispatch(getAllUserDetailsByUsername(res.data.following));
      // dispatch(getlikedPosts(res.data.likedPosts))
      toast.success("Login Success");
      setTimeout(() => {
        dispatch({ type: "USER_LOGIN_SUCCESS" });
        sessionStorage.setItem("currentUser", JSON.stringify(res.data));
      window.location.href = "/";
      }, 1000);
      console.log(res);
    })
    .catch((err) => {
      dispatch({ type: "USER_LOGIN_FAILED", payload: err });
      toast.error("Login Failed");
      console.log(err);
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: "USER_LOGOUT" });
  sessionStorage.clear();
  window.location.href = "/login";
};

export const getUserByUsername = (username) => (dispatch) => {
  dispatch({ type: "USER_PROFILESEARCH_REQUEST" });
  toast.info("Loading...", {
    autoClose: 500,
  })
  axios
    .post("/api/users/getuserbyusername", { username })
    .then((res) => {
      dispatch({ type: "USER_PROFILESEARCH_SUCCESS", payload: res.data });
      console.log(res);
    })
    .catch((error) => {
      dispatch({ type: "USER_PROFILESEARCH_FAILED", payload: error });
      toast.error("Something Went Wrong Please try after Sometime")
      console.log(error);
    });
};

export const getAllUsersByUsername = (username) => (dispatch) => {
  dispatch({ type: "USERS_PROFILESEARCH_REQUEST" });
  // toast.info("Loading", {
  //   autoClose: 1000,
  // })
  axios
    .post("/api/users/getallusersbyusername", { username })
    .then((res) => {
      dispatch({ type: "USERS_PROFILESEARCH_SUCCESS", payload: res.data });
      console.log(res);
    })
    .catch((error) => {
      dispatch({ type: "USERS_PROFILESEARCH_FAILED", payload: error.message });
      toast.error("Serach Failed")
      console.log(error);
    });
};

export const followUser = (currentUser, profile, username) => (dispatch) => {
  dispatch({ type: "FOLLOW_USER_REQUEST" });
  axios
    .post("/api/users/follow", {
      currentUser,
      profile,
      username,
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: "FOLLOW_USER_SUCCESS",
        currentUserUpdated: res.data.currentUserUpdated,
        profileUpdated: res.data.profileUpdated,
      });
      toast.success("Action Success");
    })
    .catch((error) => {
      dispatch({ type: "FOLLOW_USER_FAILED", payload: error.message });
      toast.error("Something Went Wrong");
      console.log(error);
    });
};

export const getAllUserDetailsByUsername = (usernamesList) => (dispatch) => {
  dispatch({ type: "GET_ALLUSERDETAILS_REQUEST" });
  axios
    .post("/api/users/getalluserdetailsbyusername", { usernamesList })
    .then((res) => {
      dispatch({ type: "GET_ALLUSERDETAILS_SUCCESS", payload: res.data });
      console.log(res);
    })
    .catch((error) => {
      dispatch({ type: "GET_ALLUSERDETAILS_FAILED", payload: error.message });
      console.log(error);
    });
};

export const getAllUsers = () => (dispatch) => {
  dispatch({ type: "GET_ALLUSERS_REQUEST" });
  axios
    .post("/api/users/getallusers")
    .then((res) => {
      dispatch({ type: "GET_ALLUSERS_SUCCESS", payload: res.data });
      console.log(res);
    })
    .catch((error) => {
      dispatch({ type: "GET_ALLUSERS_FAILED", payload: error.message });
      console.log(error);
    });
};

export const updateUser = (userid, updateduser,navigate) => (dispatch) => {
  dispatch({ type: "USER_UPDATE_REQUEST" });

  axios
    .post("/api/users/update", { userid, updateduser })
    .then((res) => {
      dispatch({ type: "USER_UPDATE_SUCCESS", payload: res.data });
      sessionStorage.setItem("currentUser", JSON.stringify(res.data));
      toast.success("Updated Successfully");
      navigate("/");
      console.log(res);
    })
    .catch((error) => {
      dispatch({ type: "USER_UPDATE_FAILED" }, error);
      toast.error("Something Went Wrong");
      console.log(error);
    });
};

export const changePassword =
  (userid, oldPassword, newPassword) => (dispatch) => {
    dispatch({ type: "PASSWORD_CHANGE_REQUEST" });
    toast.info("Loading")

    axios
      .post("/api/users/changePassword", { userid, oldPassword, newPassword })
      .then((res) => {
        toast.success("Password Updated Successfully")
        dispatch({ type: "PASSWORD_CHANGE_SUCCESS" });
        console.log(res);
      })
      .catch((error) => {
        toast.error("Wrong Password")
        dispatch({ type: "PASSWORD_CHANGE_FAILED" }, error);
        console.log(error);
      });
  };

export const deleteUser = (userid) => (dispatch) => {
  dispatch({ type: "DELETE_USER_REQUEST" });
  dispatch(logoutUser());
  axios
    .post("/api/users/deleteuser", { userid })
    .then((res) => {
      dispatch({ type: "DELETE_USER_SUCCESS" });
      console.log(res);
    })
    .catch((error) => {
      dispatch({ type: "DELETE_USER_FAILED" }, error);
      console.log(error);
    });
};

export const getSingleUserByUsername = (username) => (dispatch) => {
  dispatch({ type: "GET_SINGLEUSER_REQUEST" });
  axios
    .post("/api/users/getsingleuserdetail", { username })
    .then((res) => {
      dispatch({ type: "GET_SINGLEUSER_SUCCESS", payload: res.data });
      console.log(res);
    })
    .catch((error) => {
      dispatch({ type: "GET_SINGLEUSER_FAILED", payload: error.message });
      console.log(error);
    });
};
