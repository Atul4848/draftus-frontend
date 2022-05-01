import {
  LOGIN,
  REGISTER,
  SOCIALMEDIAAUTH,
  USER_DETAIL,
  REGISTER_BY_COMPANY,
  REGISTER_BY_COMPANY_INVITE,
  REMOVE_PROFILE,
  SOCIALMEDIADIRECTLOGIN,
  CHECKSOCIAL,
  SOCIALLOGIN,
  CHECKSOCIALGOOGLE,
  SOCIALLOGINGOOGLE,
  CHECKSOCIALLINKEDIN,
} from "../../constants/ActionType";

const INITIAL_STATE = {
  loading: false,
  reloadFlag: true,
  loadedFlag: false,
  isAuth: false,
  userDetail: {},
  socialMedia: {},
  errorMessage: "",
  successMessage: "",
  check_social_flag: undefined,
  check_Social_Google_flag: undefined,
  check_Social: "",

  social_LinkedIn: {},
  check_Social_Google: "",
  check_Social_LinkedIn_flag: undefined,
  check_Social_LinkedIn: "",
  linkedInAuthFlag: false,
  linkedInAuthLoadingFlag: false,
};

const User = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      const updatedState = { ...state, ...action.payload };
      return updatedState;
    case REGISTER:
      const newState = { ...state, ...action.payload };
      return newState;
    case REGISTER_BY_COMPANY:
      const register_By_Company = { ...state, ...action.payload };
      return register_By_Company;
    case SOCIALMEDIAAUTH:
      const socialMedia = { ...state, ...action.payload };
      return socialMedia;
    case USER_DETAIL:
      const userDetail = { ...state, ...action.payload };
      return userDetail;
    case REGISTER_BY_COMPANY_INVITE:
      const invited_By_Company = { ...state, ...action.payload };
      return invited_By_Company;
    case REMOVE_PROFILE:
      const remove_Profile = { ...state, ...action.payload };
      return remove_Profile;
    case SOCIALMEDIADIRECTLOGIN:
      const socialMediaLogin = { ...state, ...action.payload };
      return socialMediaLogin;
    case CHECKSOCIAL:
      const check_Social = { ...state, ...action.payload };
      return check_Social;
    case CHECKSOCIALGOOGLE:
      const check_Social_Google = { ...state, ...action.payload };
      return check_Social_Google;
    case SOCIALLOGIN:
      const social_login = { ...state, ...action.payload };
      return social_login;
    case SOCIALLOGINGOOGLE:
      const social_login_Google = { ...state, ...action.payload };
      return social_login_Google;
    case CHECKSOCIALLINKEDIN:
      const check_Social_LinkedIn = { ...state, ...action.payload };
      return check_Social_LinkedIn;
    default:
      return state;
  }
};

export default User;
