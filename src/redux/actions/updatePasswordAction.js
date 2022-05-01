import { UPDATEPASSWORD } from "../../constants/ActionType";
import Draftus from "../../api/Draftus";
import { message } from "antd";

export const updatedPassword = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: UPDATEPASSWORD,
        payload: {
          loading: true,
          isPasswordUpdated: false,
        },
      });
      const response = await Draftus.post("/update-password", data);
      if (response.data.success) {
        message.success(response.data.message);
        return dispatch({
          type: UPDATEPASSWORD,
          payload: {
            loading: false,
            isPasswordUpdated: true,
            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        dispatch({
          type: UPDATEPASSWORD,
          payload: {
            loading: false,
            isPasswordUpdated: false,
            errorMessage: "Error: " + response.data.message,
          },
        });
      }
    } else {
      return dispatch({
        type: UPDATEPASSWORD,
        payload: {
          loading: false,
          isPasswordUpdated: false,
          errorMessage: "Please login to update password!",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: UPDATEPASSWORD,
      payload: {
        loading: false,
        isPasswordUpdated: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};
