import { FORGET_PASSWORD, RESET_PASSWORD } from "../../constants/ActionType";

const INITIAL_STATE = {
  loading: false,

  isPasswordForgot: false,
  errorMessage: "",
  successMessage: "",
  isPasswordReset: false,
};

const ForgetPassword = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FORGET_PASSWORD:
      const forget_Password = { ...state, ...action.payload };
      return forget_Password;
    case RESET_PASSWORD:
      const reset_password = { ...state, ...action.payload };
      return reset_password;

    default:
      return state;
  }
};

export default ForgetPassword;
