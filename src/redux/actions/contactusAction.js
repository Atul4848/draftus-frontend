import { CONTACT_US } from "../../constants/ActionType";
import Draftus from "../../api/Draftus";
import { message } from "antd";

export const postContactUs = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTACT_US,
      payload: {
        loading: true,
        isContactus: true,
      },
    });
    const response = await Draftus.post("/contact-us", data);
    if (response.data.success) {
      dispatch({
        type: CONTACT_US,
        payload: {
          loading: false,

          isContactus: false,
        },
      });
      message.success(response.data.message);
    } else {
      dispatch({
        type: CONTACT_US,
        payload: {
          loading: false,

          isContactus: false,
          errorMessage: "Error: " + response.data.message,
        },
      });
      message.error(response.data.message);
    }
  } catch (err) {
    dispatch({
      type: CONTACT_US,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
        isContactus: false,
      },
    });
  }
};
