import { UPDATEPASSWORD } from "../../constants/ActionType";

const INITIAL_STATE = {
  loading: false,
  isPasswordUpdated: false,
};

const updatePassword = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATEPASSWORD:
      const updatedPassword = { ...state, ...action.payload };
      return updatedPassword;

    default:
      return state;
  }
};

export default updatePassword;
