import {
  FIND_COACH,
  REQUEST_COACH,
  COACH_DETAIL,
  REQUESTED_COACH,
  MY_COACH,
  ATHLETE_REMOVED_BY_COACH,
  ATHLETE_REJECTED_BY_COACH,
} from "../../constants/ActionType";

const INITIAL_STATE = {
  loading: false,
  findCoach: [],
  Coach_id: {},
  coach_detail: {},
  my_Coach: [],
  requested_coach: [],
  coach_detail_skill: [],
  athlete_Removed_By_Coach: [],
  athlete_Rejected_By_Coach: [],
  coach_deatil_company: [],
};

const Athlete = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FIND_COACH:
      const findCoach = { ...state, ...action.payload };
      return findCoach;
    case REQUEST_COACH:
      const request_Coach = { ...state, ...action.payload };
      return request_Coach;
    case COACH_DETAIL:
      const coach_detail = { ...state, ...action.payload };
      return coach_detail;
    case REQUESTED_COACH:
      const requested_coach = { ...state, ...action.payload };
      return requested_coach;
    case MY_COACH:
      const my_Coach = { ...state, ...action.payload };
      return my_Coach;
    case ATHLETE_REMOVED_BY_COACH:
      const athlete_Removed_By_Coach = { ...state, ...action.payload };
      return athlete_Removed_By_Coach;
    case ATHLETE_REJECTED_BY_COACH:
      const athlete_Rejected_By_Coach = { ...state, ...action.payload };
      return athlete_Rejected_By_Coach;

    default:
      return state;
  }
};

export default Athlete;
