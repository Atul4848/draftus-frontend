import { SUBSCRIBE_US } from "../../constants/ActionType";
import Draftus from "../../api/Draftus";
import { message } from "antd";

export const subscribeUs = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIBE_US,
      payload: {
        loading: true,
        isSubscribe: true,
      },
    });
    const response = await Draftus.post("/subscribers", data);
    if (response.data.success) {
      dispatch({
        type: SUBSCRIBE_US,
        payload: {
          loading: false,

          isSubscribe: false,
        },
      });
      message.success(response.data.message);
    } else {
      dispatch({
        type: SUBSCRIBE_US,
        payload: {
          loading: false,

          isSubscribe: false,
          errorMessage: "Error: " + response.data.message,
        },
      });
      message.error(response.data.message);
    }
  } catch (err) {
    dispatch({
      type: SUBSCRIBE_US,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
        isSubscribe: false,
      },
    });
  }
};
