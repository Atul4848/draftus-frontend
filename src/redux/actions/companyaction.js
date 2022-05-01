import {
  COMPANYATHLETE,
  COMPANYCOACH,
  COACH_ATHLETE_DETAILS,
  INVITED_USER_DATA,
  UPDATE_COACH_SKILL,
  ASSIGN_COACH_TO_ATHLETE,
  ALL_COACH,
  COMPANY_REQUEST_COACH,
  COMPANY_REQUEST_LIST,
  GET_COACHES_TO_ASSIGN_ATHLETE,
} from "../../constants/ActionType";
import Draftus from "../../api/Draftus";
import { message } from "antd";

export const getCoachToAssignAthlete = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_COACHES_TO_ASSIGN_ATHLETE,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.post("/new-coach-for-athlete", {
      athlete_id: id,
    });
    if (response.data.success) {
      return dispatch({
        type: GET_COACHES_TO_ASSIGN_ATHLETE,
        payload: {
          loading: false,
          get_Coach_To_Assign_Athlete: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: GET_COACHES_TO_ASSIGN_ATHLETE,
        payload: {
          loading: false,
          get_Coach_To_Assign_Athlete: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: GET_COACHES_TO_ASSIGN_ATHLETE,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const getCompanyRequestList = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPANY_REQUEST_LIST,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.get("/team-requested-coach", data);
    if (response.data.success) {
      return dispatch({
        type: COMPANY_REQUEST_LIST,
        payload: {
          loading: false,
          company_Request_List: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: COMPANY_REQUEST_LIST,
        payload: {
          loading: false,
          company_Request_List: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: COMPANY_REQUEST_LIST,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const companyRequestCoach = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPANY_REQUEST_COACH,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.post("/team-request-coach", {
      coach_id: id,
    });
    if (response.data.success) {
      message.success(response.data.message);
      return dispatch({
        type: COMPANY_REQUEST_COACH,
        payload: {
          loading: false,

          successMessage: response.data.message,
        },
      });
    } else {
      message.error(response.data.message);
      return dispatch({
        type: COMPANY_REQUEST_COACH,
        payload: {
          loading: false,

          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: COMPANY_REQUEST_COACH,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const getAllCoach = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_COACH,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.get("/all-coach", data);
    if (response.data.success) {
      return dispatch({
        type: ALL_COACH,
        payload: {
          loading: false,
          all_Coach: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: ALL_COACH,
        payload: {
          loading: false,
          all_Coach: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: ALL_COACH,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const companyAthlete = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPANYATHLETE,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.get("/company-athlete", data);
    if (response.data.success) {
      return dispatch({
        type: COMPANYATHLETE,
        payload: {
          loading: false,
          company_Athlete: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: COMPANYATHLETE,
        payload: {
          loading: false,
          company_Athlete: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: COMPANYATHLETE,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const companyCoach = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPANYCOACH,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.get("/company-coach", data);
    if (response.data.success) {
      return dispatch({
        type: COMPANYCOACH,
        payload: {
          loading: false,
          company_Coach: response.data.data.coach,
          adminInCompanyCoach: response.data.data.admin,
          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: COMPANYCOACH,
        payload: {
          loading: false,
          company_Coach: [],
          adminInCompanyCoach: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: COMPANYCOACH,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const athleteCoachDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COACH_ATHLETE_DETAILS,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.get("/company-user/" + id);
    if (response.data.success) {
      return dispatch({
        type: COACH_ATHLETE_DETAILS,
        payload: {
          loading: false,
          rating: response.data.data.rating,
          coach_Athlete_details: response.data.data.details,
          coach_Athlete_skill: response.data.data.skill,
          company_View_Coach_Of_Athlete: response.data.data.coach,
          company_View_Athlete_Of_Coach: response.data.data.athlete,
          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: COACH_ATHLETE_DETAILS,
        payload: {
          loading: false,
          coach_Athlete_details: {},
          coach_Athlete_skill: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: COACH_ATHLETE_DETAILS,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const invitedUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INVITED_USER_DATA,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.post("/get-user-data", { invite_id: id });
    if (response.data.success) {
      dispatch({
        type: INVITED_USER_DATA,
        payload: {
          loading: false,
          invited_user: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      dispatch({
        type: INVITED_USER_DATA,
        payload: {
          loading: false,
          invited_user: {},
          errorMessage: "Error: " + response.data.message,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: INVITED_USER_DATA,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const updateCoachSkill = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_COACH_SKILL,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.post("/update-coach-skill", data);
    if (response.data.success) {
      dispatch({
        type: UPDATE_COACH_SKILL,
        payload: {
          loading: false,

          successMessage: response.data.message,
        },
      });
    } else {
      dispatch({
        type: UPDATE_COACH_SKILL,
        payload: {
          loading: false,

          errorMessage: "Error: " + response.data.message,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: UPDATE_COACH_SKILL,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const assignCoachToAthlete = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ASSIGN_COACH_TO_ATHLETE,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.post("/assing-coach-athlete", data);
    if (response.data.success) {
      message.success(response.data.message);
      return dispatch({
        type: ASSIGN_COACH_TO_ATHLETE,
        payload: {
          loading: false,

          successMessage: response.data.message,
        },
      });
    } else {
      message.error(response.data.message);
      return dispatch({
        type: ASSIGN_COACH_TO_ATHLETE,
        payload: {
          loading: false,

          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: ASSIGN_COACH_TO_ATHLETE,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};
