import { CONTACT_US } from "../../constants/ActionType";

const INITIAL_STATE = {
  loading: false,

  isContactus: false,
  errorMessage: "",
  successMessage: "",
  isPasswordReset: false,
};

const Contact_us = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONTACT_US:
      const contact_us = { ...state, ...action.payload };
      return contact_us;

    default:
      return state;
  }
};

export default Contact_us;
