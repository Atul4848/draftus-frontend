import {
  GET_CONVERSATION,
  SEND_MESSAGE,
  GET_MESSAGE,
  SEEN_CHAT,
} from "../../constants/ActionType";

const INITIAL_STATE = {
  loading: false,
  loadedFlag: false,
  isAuth: false,
  get_conversation: [],
  get_message: [],

  errorMessage: "",
  successMessage: "",
};

const Chat = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CONVERSATION:
      const get_conversation = { ...state, ...action.payload };
      return get_conversation;
    case GET_MESSAGE:
      const get_message = { ...state, ...action.payload };
      return get_message;
    case SEND_MESSAGE:
      const message = { ...state, ...action.payload };
      return message;
    case SEEN_CHAT:
      const seen_Chat = { ...state, ...action.payload };
      return seen_Chat;

    default:
      return state;
  }
};

export default Chat;
