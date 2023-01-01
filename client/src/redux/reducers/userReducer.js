export const registerNewUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTRATION_REQUEST":
      return {
        ...state,
        registerLoading: true,
      };
    case "USER_REGISTRATION_SUCCESS":
      return {
        ...state,
        registerLoading: false,
        registersuccess: true,
      };
    case "USER_REGISTRATION_FAILED":
      return {
        ...state,
        registerLoading: false,
        registererror:true,
        registerErrorMsg : action.payload
      };
    default:
      return state;
  }
};

export const loginUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return {
        ...state,
        loginLoading: true,
      };
    case "USER_LOGIN_SUCCESS":
      return {
        ...state,
        loginLoading: false,
        loginSuccess: true,
      };
    case "USER_LOGIN_FAILED":
      return {
        ...state,
        loginLoading: false,
        loginError: action.payload,
      };
    case "USER_LOGOUT":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const getUserByUsernameReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_PROFILESEARCH_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "USER_PROFILESEARCH_SUCCESS":
      return {
        ...state,
        loading: false,
        profile : action.payload,
        error : false
      };
    case "USER_PROFILESEARCH_FAILED":
      return {
        ...state,
        loading: false,
        error:action.payload,
      };
    default:
      return state;
  }
};

export const getAllUsersByUsernameReducer = (state = {}, action) => {
  switch (action.type) {
    case "USERS_PROFILESEARCH_REQUEST":
      return {
        ...state,
        searchAllLoading: true,
      };
    case "USERS_PROFILESEARCH_SUCCESS":
      return {
        ...state,
        searchAllLoading: false,
        profilesList : action.payload,
        searchAllError : false
      };
    case "USERS_PROFILESEARCH_FAILED":
      return {
        ...state,
        searchAllLoading: false,
        searchAllError:action.payload,
      };
    default:
      return state;
  }
};

export const followUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "FOLLOW_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FOLLOW_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        success : true,
        error : false,
        currentUserUpdated : action.currentUserUpdated,
        profileUpdated : action.profileUpdated
      };
    case "FOLLOW_USER_FAILED":
      return {
        ...state,
        loading: false,
        error:action.payload,
      };
    default:
      return state;
  }
};

export const getAllUserDetailsByUsernameReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALLUSERDETAILS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_ALLUSERDETAILS_SUCCESS":
      return {
        ...state,
        loading: false,
        profilesList : action.payload,
        error : false
      };
    case "GET_ALLUSERDETAILS_FAILED":
      return {
        ...state,
        loading: false,
        error:action.payload,
      };
    default:
      return state;
  }
};

export const getAllUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALLUSERS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_ALLUSERS_SUCCESS":
      return {
        ...state,
        loading: false,
        profiles : action.payload
      };
    case "GET_ALLUSERS_FAILED":
      return {
        ...state,
        loading: false,
        error:true,
      };
    default:
      return state;
  }
};

export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_UPDATE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "USER_UPDATE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        updatedProfile : action.payload
      };
    case "USER_UPDATE_FAILED":
      return {
        ...state,
        loading: false,
        error:true,
      };
    default:
      return state;
  }
};

export const changePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case "PASSWORD_CHANGE_REQUEST":
      return {
        ...state,
        changeLoading: true,
      };
    case "PASSWORD_CHANGE_SUCCESS":
      return {
        ...state,
        changeLoading: false,
        changeSuccess : true,
      };
    case "PASSWORD_CHANGE_FAILED":
      return {
        ...state,
        changeLoading: false,
        changeError:true,
      };
    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_USER_REQUEST":
      return {
        ...state,
        deleteLoading: true,
      };
    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess : true,
      };
    case "DELETE_USER_FAILED":
      return {
        ...state,
        deleteLoading: false,
        deleteError:true,
      };
    default:
      return state;
  }
};

export const getSingleUserByUsernameReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_SINGLEUSER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_SINGLEUSER_SUCCESS":
      return {
        ...state,
        loading: false,
        userProfile : action.payload
      };
    case "GET_SINGLEUSER_FAILED":
      return {
        ...state,
        loading: false,
        error:true,
      };
    default:
      return state;
  }
};