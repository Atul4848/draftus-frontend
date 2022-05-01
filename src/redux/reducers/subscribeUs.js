import { SUBSCRIBE_US } from "../../constants/ActionType";

const INITIAL_STATE = {
  loading: false,

  isSubscribe: false,
  errorMessage: "",
  successMessage: "",
  isPasswordReset: false,
};

const SubscribeUs = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUBSCRIBE_US:
      const contact_us = { ...state, ...action.payload };
      return contact_us;

    default:
      return state;
  }
};

export default SubscribeUs;
