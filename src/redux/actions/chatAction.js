import {
  GET_CONVERSATION,
  SEND_MESSAGE,
  GET_MESSAGE,
  SEEN_CHAT,
} from "../../constants/ActionType";
import Draftus from "../../api/Draftus";

export const getConversation = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CONVERSATION,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.get("/conversation", data);
    if (response.data.success) {
      return dispatch({
        type: GET_CONVERSATION,
        payload: {
          loading: false,
          get_conversation: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: GET_CONVERSATION,
        payload: {
          loading: false,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: GET_CONVERSATION,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const getMessage = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_MESSAGE,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.post("/conversation-by-id", {
      receiver_id: id,
    });
    if (response.data.success) {
      return dispatch({
        type: GET_MESSAGE,
        payload: {
          loading: false,
          get_message: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: GET_MESSAGE,
        payload: {
          loading: false,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: GET_MESSAGE,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const seenChat = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEEN_CHAT,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.post("/seen-message", {
      c_id: id,
    });
    if (response.data.success) {
      return dispatch({
        type: SEEN_CHAT,
        payload: {
          loading: false,

          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: SEEN_CHAT,
        payload: {
          loading: false,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: SEEN_CHAT,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const sendMessage = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEND_MESSAGE,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.post("/conversation-send", data);
    if (response.data.success) {
      return dispatch({
        type: SEND_MESSAGE,
        payload: {
          loading: false,
        },
      });
    } else {
      return dispatch({
        type: SEND_MESSAGE,
        payload: {
          loading: false,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: SEND_MESSAGE,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};
