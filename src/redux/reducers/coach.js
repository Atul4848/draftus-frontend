import {
  GET_REQUESTED_ATHLETE,
  REJECT_ATHLETE,
  ACCEPT_ATHLETE,
  ATHLETE_DETAIL,
  GET_ATHLETE,
  REMOVE_ATHLETE,
  POTENTIAL_ATHLETE,
  COACH_TEAM,
  REQUESTED_TEAM,
  REJECT_TEAM,
  ACCEPT_TEAM,
  TEAM_DETAIL,
  FILTER_BY_COMPANY_ID,
  ASSIGN_COACH,
  LIST_OF_COACH,
} from "../../constants/ActionType";

const INITIAL_STATE = {
  loading: false,
  getRequestedAthlete: [],
  Athlete_id: {},
  athlete_detail: {},
  acceptedAthlete: [],
  athlete_status: {},
  athlete_skill: [],
  acceptRejectFlag: false,
  potential_Athlete: [],
  adminInAthlete: [],
  coach_Team: [],
  team_Detail: {},
  list_Of_Coach: [],
  filterloading: false,
};

const Coach = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_REQUESTED_ATHLETE:
      const getRequestedAthlete = { ...state, ...action.payload };
      return getRequestedAthlete;
    case REJECT_ATHLETE:
      const reject_Athlete = { ...state, ...action.payload };
      return reject_Athlete;
    case ACCEPT_ATHLETE:
      const accept_Athlete = { ...state, ...action.payload };
      return accept_Athlete;
    case ATHLETE_DETAIL:
      const athlete_detail = { ...state, ...action.payload };
      return athlete_detail;
    case GET_ATHLETE:
      const acceptedAthlete = { ...state, ...action.payload };
      return acceptedAthlete;
    case REMOVE_ATHLETE:
      const remove_Athlete = { ...state, ...action.payload };
      return remove_Athlete;
    case POTENTIAL_ATHLETE:
      const potential_Athlete = { ...state, ...action.payload };
      return potential_Athlete;
    case COACH_TEAM:
      const coach_Team = { ...state, ...action.payload };
      return coach_Team;
    case REQUESTED_TEAM:
      const requested_Team = { ...state, ...action.payload };
      return requested_Team;
    case REJECT_TEAM:
      const reject_Team = { ...state, ...action.payload };
      return reject_Team;
    case ACCEPT_TEAM:
      const accept_Team = { ...state, ...action.payload };
      return accept_Team;
    case TEAM_DETAIL:
      const team_Detail = { ...state, ...action.payload };
      return team_Detail;
    case FILTER_BY_COMPANY_ID:
      const filter_By_Company_Id = { ...state, ...action.payload };
      return filter_By_Company_Id;
    case ASSIGN_COACH:
      const assign_Coach = { ...state, ...action.payload };
      return assign_Coach;
    case LIST_OF_COACH:
      const list_Of_Coach = { ...state, ...action.payload };
      return list_Of_Coach;

    default:
      return state;
  }
};

export default Coach;
