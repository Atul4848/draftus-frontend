import { FORGET_PASSWORD, RESET_PASSWORD } from "../../constants/ActionType";
import Draftus from "../../api/Draftus";
import { message } from "antd";

export const forgetPassword = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FORGET_PASSWORD,
      payload: {
        loading: true,
        isPasswordForgot: true,
      },
    });
    const response = await Draftus.post("/forgot-password", data);
    if (response.data.success) {
      dispatch({
        type: FORGET_PASSWORD,
        payload: {
          loading: false,

          isPasswordForgot: false,
        },
      });
      message.success(response.data.message);
    } else {
      dispatch({
        type: FORGET_PASSWORD,
        payload: {
          loading: false,

          isPasswordForgot: false,
          errorMessage: "Error: " + response.data.message,
        },
      });
      message.error(response.data.message);
    }
  } catch (err) {
    dispatch({
      type: FORGET_PASSWORD,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
        isPasswordForgot: false,
      },
    });
  }
};

export const resetPassword = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESET_PASSWORD,
      payload: {
        loading: true,
        isPasswordReset: true,
      },
    });
    const response = await Draftus.post("/reset-password", data);
    if (response.data.success) {
      dispatch({
        type: RESET_PASSWORD,
        payload: {
          loading: false,

          isPasswordReset: false,
        },
      });
      message.success(response.data.message);
    } else {
      dispatch({
        type: RESET_PASSWORD,
        payload: {
          loading: false,

          isPasswordReset: false,
          errorMessage: "Error: " + response.data.message,
        },
      });
      message.error(response.data.message);
    }
  } catch (err) {
    dispatch({
      type: RESET_PASSWORD,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
        isPasswordReset: false,
      },
    });
  }
};
