import {
  ADD_COACH,
  ADD_ATHLETE,
  INVITED_ATHLETE_COACH,
} from "../../constants/ActionType";

const INITIAL_STATE = {
  loading: false,
  add_coach: false,
  add_athlete: false,
  invited: [],
};

const addCoach = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_COACH:
      const newCoach = { ...state, ...action.payload };
      return newCoach;
    case ADD_ATHLETE:
      const newAthlete = { ...state, ...action.payload };
      return newAthlete;
    case INVITED_ATHLETE_COACH:
      const invited = { ...state, ...action.payload };
      return invited;

    default:
      return state;
  }
};

export default addCoach;
