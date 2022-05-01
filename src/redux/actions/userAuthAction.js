import {
  LOGIN,
  REGISTER,
  SOCIALMEDIAAUTH,
  USER_DETAIL,
  REGISTER_BY_COMPANY,
  REGISTER_BY_COMPANY_INVITE,
  REMOVE_PROFILE,
  SOCIALMEDIADIRECTLOGIN,
  CHECKSOCIAL,
  SOCIALLOGIN,
  CHECKSOCIALGOOGLE,
  SOCIALLOGINGOOGLE,
  CHECKSOCIALLINKEDIN,
} from "../../constants/ActionType";
import Draftus from "../../api/Draftus";
import linkedIn from "../../api/linkedIn";
import { message } from "antd";

export const login = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOGIN,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.post("/login", data);
    if (response.data.success) {
      await localStorage.setItem("token", response.data.data);
      dispatch({
        type: LOGIN,
        payload: {
          loading: false,
          isAuth: true,
          successMessage: response.data.message,
        },
      });
      message.success(response.data.message);
    } else {
      dispatch({
        type: LOGIN,
        payload: {
          loading: false,
          isAuth: false,
          errorMessage: "Error: " + response.data.message,
        },
      });
      message.error(response.data.message);
    }
  } catch (err) {
    dispatch({
      type: LOGIN,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const invitedCoachAthlete = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REGISTER_BY_COMPANY_INVITE,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.post("/register-by-invite", data);
    if (response.data.success) {
      await localStorage.setItem("token", response.data.data);
      dispatch({
        type: REGISTER_BY_COMPANY_INVITE,
        payload: {
          loading: false,
          isAuth: true,
          successMessage: response.data.message,
        },
      });
      message.success(response.data.message);
    } else {
      dispatch({
        type: REGISTER_BY_COMPANY_INVITE,
        payload: {
          loading: false,
          isAuth: false,
          errorMessage: "Error: " + response.data.message,
        },
      });
      message.error(response.data.message);
    }
  } catch (err) {
    dispatch({
      type: REGISTER_BY_COMPANY_INVITE,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const companyRegister = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REGISTER_BY_COMPANY,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.post("/register-by-company", data);
    if (response.data.success) {
      await localStorage.setItem("token", response.data.data);
      dispatch({
        type: REGISTER_BY_COMPANY,
        payload: {
          loading: false,
          isAuth: true,
          successMessage: response.data.message,
        },
      });
      message.success(response.data.message);
    } else {
      dispatch({
        type: REGISTER_BY_COMPANY,
        payload: {
          loading: false,
          isAuth: false,
          errorMessage: "Error: " + response.data.message,
        },
      });
      message.error(response.data.message);
    }
  } catch (err) {
    dispatch({
      type: REGISTER_BY_COMPANY,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const tryLocalSignIn = () => async (dispatch) => {
  const token = await localStorage.getItem("token");
  if (token) {
    return dispatch({
      type: LOGIN,
      payload: {
        reloadFlag: false,
        isAuth: true,
        loading: false,
      },
    });
  }
};

export const logout = () => async (dispatch) => {
  await localStorage.removeItem("token");
  dispatch({
    type: LOGIN,
    payload: {
      isAuth: false,
      userDetail: {},
      socialMedia: {},
      successMessage: "",
      errorMessage: "",
      check_Social_Google_flag: undefined,
      check_social_flag: undefined,
    },
  });
  message.success("You have successfully Logged out!");
};

export const register = (data) => async (dispatch, getState) => {
  try {
    const response = await Draftus.post("/register", data);
    if (response.data.success) {
      await localStorage.setItem("token", response.data.data);
      dispatch({
        type: REGISTER,
        payload: {
          isAuth: true,
          successMessage: response.data.message,
        },
      });
      message.success(response.data.message);
    } else {
      dispatch({
        type: REGISTER,
        payload: {
          isAuth: false,
          errorMessage: "Error: " + response.data.message,
        },
      });
      message.error(response.data.message);
    }
  } catch (err) {
    dispatch({
      type: REGISTER,
      payload: {
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const SocialMediaAuth = (data) => async (dispatch) => {
  if (data) {
    dispatch({
      type: SOCIALMEDIAAUTH,
      payload: {
        loading: false,
        socialMedia: data,
      },
    });
  } else {
    dispatch({
      type: SOCIALMEDIAAUTH,
      payload: {
        loading: false,
        socialMedia: {},
      },
    });
  }
};

export const UserProfile = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: USER_DETAIL,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.get("/get-user", data);

      if (response.data.success) {
        // await localStorage.setItem("token", response.data.data);
        return dispatch({
          type: USER_DETAIL,
          payload: {
            loading: false,
            userDetail: response.data.data,
            successMessage: response.data.message,
          },
        });
      }
    } else {
      return dispatch({
        type: USER_DETAIL,
        payload: {
          loading: false,
          userDetail: {},
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: USER_DETAIL,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const UpdateProfile = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: USER_DETAIL,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/update-profile", data);
      if (response.data.success) {
        //await localStorage.setItem("token", response.data.data);
        message.success(response.data.message);
        return dispatch({
          type: USER_DETAIL,
          payload: {
            loading: false,
            userDetail: response.data.data,
            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        return dispatch({
          type: USER_DETAIL,
          payload: {
            loading: false,
            userDetail: {},
            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: USER_DETAIL,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const removeProfile = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: REMOVE_PROFILE,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.get("/remove-avatar", data);
      if (response.data.success) {
        message.success(response.data.message);
        return dispatch({
          type: REMOVE_PROFILE,
          payload: {
            loading: false,

            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        dispatch({
          type: REMOVE_PROFILE,
          payload: {
            loading: false,

            errorMessage: "Error: " + response.data.message,
          },
        });
      }
    } else {
      return dispatch({
        type: REMOVE_PROFILE,
        payload: {
          loading: false,

          errorMessage: "Please login to remove profile!",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: REMOVE_PROFILE,
      payload: {
        loading: false,
        isPasswordUpdated: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const socialMediaDirectLogin = (data) => async (dispatch, getState) => {
  try {
    const response = await Draftus.post("/userdata_register-social", data);
    if (response.data.success) {
      await localStorage.setItem("token", response.data.data);
      dispatch({
        type: SOCIALMEDIADIRECTLOGIN,
        payload: {
          isAuth: true,
          successMessage: response.data.message,
        },
      });
      message.success(response.data.message);
    } else {
      dispatch({
        type: SOCIALMEDIADIRECTLOGIN,
        payload: {
          isAuth: false,
          errorMessage: "Error: " + response.data.message,
        },
      });
      message.error(response.data.message);
    }
  } catch (err) {
    dispatch({
      type: SOCIALMEDIADIRECTLOGIN,
      payload: {
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const checkSocialFacebook = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHECKSOCIAL,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.post("/check-social", data);
    if (response.data.success) {
      //await localStorage.setItem("token", response.data.data);
      dispatch({
        type: CHECKSOCIAL,
        payload: {
          loading: false,
          check_social_flag: true,
          successMessage: response.data.message,
          check_Social: response.data.success,
        },
      });
    } else {
      dispatch({
        type: CHECKSOCIAL,
        payload: {
          loading: false,
          check_social_flag: false,
          errorMessage: "Error: " + response.data.message,
          check_Social: response.data.success,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: CHECKSOCIAL,
      payload: {
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const checkSocialLinkedIn = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHECKSOCIALLINKEDIN,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.post("/check-social", data);
    if (response.data.success) {
      //await localStorage.setItem("token", response.data.data);
      dispatch({
        type: CHECKSOCIALLINKEDIN,
        payload: {
          loading: false,
          check_Social_LinkedIn_flag: true,
          successMessage: response.data.message,
          check_Social_LinkedIn: response.data.success,
        },
      });
    } else {
      dispatch({
        type: CHECKSOCIALLINKEDIN,
        payload: {
          loading: false,
          check_Social_LinkedIn_flag: false,
          errorMessage: "Error: " + response.data.message,
          check_Social_LinkedIn: response.data.success,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: CHECKSOCIALLINKEDIN,
      payload: {
        errorMessage: "Error: " + err,
      },
    });
  }
};
export const checkSocialGoogle = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHECKSOCIALGOOGLE,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.post("/check-social", data);
    if (response.data.success) {
      //await localStorage.setItem("token", response.data.data);
      dispatch({
        type: CHECKSOCIALGOOGLE,
        payload: {
          loading: false,
          check_Social_Google_flag: true,
          successMessage: response.data.message,
          check_Social_Google: response.data.success,
        },
      });
    } else {
      dispatch({
        type: CHECKSOCIALGOOGLE,
        payload: {
          loading: false,
          check_Social_Google_flag: false,
          errorMessage: "Error: " + response.data.message,
          check_Social_Google: response.data.success,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: CHECKSOCIALGOOGLE,
      payload: {
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const socialLogin = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SOCIALLOGIN,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.post("/login-social", data);
    if (response.data.success) {
      await localStorage.setItem("token", response.data.data);
      dispatch({
        type: SOCIALLOGIN,
        payload: {
          loading: false,
          isAuth: true,
          successMessage: response.data.message,
        },
      });
      message.success(response.data.message);
    } else {
      dispatch({
        type: SOCIALLOGIN,
        payload: {
          loading: false,
          isAuth: false,
          errorMessage: "Error: " + response.data.message,
        },
      });
      message.error(response.data.message);
    }
  } catch (err) {
    dispatch({
      type: SOCIALLOGIN,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const socialLoginGoogle = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SOCIALLOGINGOOGLE,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.post("/login-social", data);
    if (response.data.success) {
      await localStorage.setItem("token", response.data.data);
      dispatch({
        type: SOCIALLOGINGOOGLE,
        payload: {
          loading: false,
          isAuth: true,
          successMessage: response.data.message,
        },
      });
      message.success(response.data.message);
    } else {
      dispatch({
        type: SOCIALLOGINGOOGLE,
        payload: {
          loading: false,
          isAuth: false,
          errorMessage: "Error: " + response.data.message,
        },
      });
      message.error(response.data.message);
    }
  } catch (err) {
    dispatch({
      type: SOCIALLOGINGOOGLE,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const generateLinkedInAccessToken = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CHECKSOCIALLINKEDIN,
      payload: {
        linkedInAuthLoadingFlag: true,
      },
    });
    const response = await Draftus.post("/linkedin-auth-code", data);
    if (response.data.success) {
      dispatch({
        type: CHECKSOCIALLINKEDIN,
        payload: {
          linkedInAuthFlag: true,
          social_LinkedIn: response.data.data,
          linkedInAuthLoadingFlag: false,
        },
      });
    } else {
      dispatch({
        type: CHECKSOCIALLINKEDIN,
        payload: {
          linkedInAuthLoadingFlag: false,
        },
      });
      message.error(response.data.message);
    }
  } catch (err) {
    dispatch({
      type: CHECKSOCIALLINKEDIN,
      payload: {
        loading: false,
        social_LinkedIn: {},
        errorMessage: "Error: " + err,
        linkedInAuthLoadingFlag: false,
      },
    });
  }
};

export const getLinkedinLiteProfile = (data) => async (dispatch) => {
  try {
    const response = await linkedIn.post("/me", data);
    if (Object.keys(response.data).length > 0) {
      console.log(response.data, "authenticated user data");
    } else {
      message.error(response.data.message);
    }
  } catch (err) {
    dispatch({
      type: SOCIALLOGINGOOGLE,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};
