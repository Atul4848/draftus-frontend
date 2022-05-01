import {
  COMPANYCOACH,
  COMPANYATHLETE,
  COACH_ATHLETE_DETAILS,
  INVITED_USER_DATA,
  UPDATE_COACH_SKILL,
  ASSIGN_COACH_TO_ATHLETE,
  ALL_COACH,
  COMPANY_REQUEST_COACH,
  COMPANY_REQUEST_LIST,
  GET_COACHES_TO_ASSIGN_ATHLETE,
} from "../../constants/ActionType";

const INITIAL_STATE = {
  loading: false,
  company_Athlete: [],
  invited_user: {},
  adminInCompanyCoach: [],
  all_Coach: [],
  company_Request_List: [],
  get_Coach_To_Assign_Athlete: [],
};

const company = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMPANYATHLETE:
      const company_Athlete = { ...state, ...action.payload };
      return company_Athlete;
    case COMPANYCOACH:
      const company_Coach = { ...state, ...action.payload };
      return company_Coach;
    case COACH_ATHLETE_DETAILS:
      const coach_Athlete_details = { ...state, ...action.payload };
      return coach_Athlete_details;
    case INVITED_USER_DATA:
      const invited_user = { ...state, ...action.payload };
      return invited_user;
    case UPDATE_COACH_SKILL:
      const update_Coach_Skill = { ...state, ...action.payload };
      return update_Coach_Skill;
    case ASSIGN_COACH_TO_ATHLETE:
      const assign_Coach_To_Athlete = { ...state, ...action.payload };
      return assign_Coach_To_Athlete;
    case ALL_COACH:
      const all_Coach = { ...state, ...action.payload };
      return all_Coach;
    case COMPANY_REQUEST_COACH:
      const company_Request_Coach = { ...state, ...action.payload };
      return company_Request_Coach;
    case COMPANY_REQUEST_LIST:
      const company_Request_List = { ...state, ...action.payload };
      return company_Request_List;
    case GET_COACHES_TO_ASSIGN_ATHLETE:
      const get_Coach_To_Assign_Athlete = { ...state, ...action.payload };
      return get_Coach_To_Assign_Athlete;

    default:
      return state;
  }
};

export default company;
