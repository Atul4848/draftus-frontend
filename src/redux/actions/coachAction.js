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
import Draftus from "../../api/Draftus";
import { message } from "antd";

export const athleteSeenByCoach = (id) => async (dispatch, getState) => {
  try {
    const response = await Draftus.post("/seen-athlete-profile", {
      athlete_id: id,
    });
    if (response.data.success) {
      return dispatch({
        type: ATHLETE_DETAIL,
        payload: {
          loading: false,

          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: ATHLETE_DETAIL,
        payload: {
          loading: false,

          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: ATHLETE_DETAIL,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const listOfCoach = (id) => async (dispatch, getState) => {
  try {
    const response = await Draftus.post("/team-associated-coach", {
      team_id: id,
    });
    if (response.data.success) {
      return dispatch({
        type: ASSIGN_COACH,
        payload: {
          loading: false,
          list_Of_Coach: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: ASSIGN_COACH,
        payload: {
          loading: false,
          list_Of_Coach: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: ASSIGN_COACH,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const coachAssign = (data) => async (dispatch, getState) => {
  try {
    const response = await Draftus.post("/coach-assign", data);
    if (response.data.success) {
      message.success(response.data.message);
      return dispatch({
        type: LIST_OF_COACH,
        payload: {
          loading: false,

          successMessage: response.data.message,
        },
      });
    } else {
      message.error(response.data.message);
      return dispatch({
        type: LIST_OF_COACH,
        payload: {
          loading: false,

          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: LIST_OF_COACH,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const filterByCompanyId = (id) => async (dispatch, getState) => {
  try {
    console.log(id);
    const response = await Draftus.post("/athlete-by-team", {
      company_id: id,
    });
    if (response.data.success) {
      return dispatch({
        type: FILTER_BY_COMPANY_ID,
        payload: {
          loading: false,
          filter_By_Company_Id: response.data.data,
          filterloading: false,
          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: FILTER_BY_COMPANY_ID,
        payload: {
          loading: false,
          athlete_detail: {},
          /*  athlete_skill: [], */
          errorMessage: "Error: ",
          filterloading: false,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: FILTER_BY_COMPANY_ID,
      payload: {
        loading: false,
        filterloading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const teamDetail = (id) => async (dispatch, getState) => {
  try {
    console.log(id);
    const response = await Draftus.post("/my-teams-details", {
      company_id: id,
    });
    if (response.data.success) {
      return dispatch({
        type: TEAM_DETAIL,
        payload: {
          loading: false,
          team_Detail: response.data.data,

          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: TEAM_DETAIL,
        payload: {
          loading: false,
          athlete_detail: {},
          /*  athlete_skill: [], */
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: TEAM_DETAIL,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const rejectTeam = (data) => async (dispatch, getState) => {
  try {
    const response = await Draftus.post("/reject-team", data);
    if (response.data.success) {
      message.success(response.data.message);
      return dispatch({
        type: REJECT_TEAM,
        payload: {
          loading: false,

          successMessage: response.data.message,
        },
      });
    } else {
      message.error(response.data.message);
      return dispatch({
        type: REJECT_TEAM,
        payload: {
          loading: false,

          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: REJECT_TEAM,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const acceptTeam = (id) => async (dispatch, getState) => {
  try {
    const response = await Draftus.post("/accept-team", {
      request_id: id,
    });
    if (response.data.success) {
      message.success(response.data.message);
      return dispatch({
        type: ACCEPT_TEAM,
        payload: {
          loading: false,

          successMessage: response.data.message,
        },
      });
    } else {
      message.error(response.data.message);
      return dispatch({
        type: ACCEPT_TEAM,
        payload: {
          loading: false,

          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: ACCEPT_TEAM,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const getRequestedTeam = (data) => async (dispatch, getState) => {
  try {
    const response = await Draftus.get("/requested-team", data);
    if (response.data.success) {
      return dispatch({
        type: REQUESTED_TEAM,
        payload: {
          loading: false,
          requested_Team: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: REQUESTED_TEAM,
        payload: {
          loading: false,
          requested_Team: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: REQUESTED_TEAM,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const get_Requested_Athlete = (data) => async (dispatch, getState) => {
  try {
    const response = await Draftus.get("/get-requested-athlete", data);
    if (response.data.success) {
      return dispatch({
        type: GET_REQUESTED_ATHLETE,
        payload: {
          loading: false,
          getRequestedAthlete: response.data.data,
          successMessage: response.data.message,
          filterloading: false,
        },
      });
    } else {
      return dispatch({
        type: GET_REQUESTED_ATHLETE,
        payload: {
          loading: false,
          filterloading: false,
          getRequestedAthlete: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: GET_REQUESTED_ATHLETE,
      payload: {
        loading: false,
        filterloading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const rejectAthlete = (data) => async (dispatch, getState) => {
  try {
    const response = await Draftus.post("/reject-athlete", data);
    if (response.data.success) {
      message.success(response.data.message);
      return dispatch({
        type: REJECT_ATHLETE,
        payload: {
          loading: false,

          successMessage: response.data.message,
        },
      });
    } else {
      message.error(response.data.message);
      return dispatch({
        type: REJECT_ATHLETE,
        payload: {
          loading: false,

          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: REJECT_ATHLETE,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const acceptAthlete = (id) => async (dispatch, getState) => {
  try {
    const response = await Draftus.post("/accept-athlete", {
      request_id: id,
    });
    if (response.data.success) {
      message.success(response.data.message);
      return dispatch({
        type: ACCEPT_ATHLETE,
        payload: {
          loading: false,

          successMessage: response.data.message,
        },
      });
    } else {
      message.error(response.data.message);
      return dispatch({
        type: ACCEPT_ATHLETE,
        payload: {
          loading: false,

          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: ACCEPT_ATHLETE,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const findAthlete_id = (id) => async (dispatch) => {
  const id_Of_Athlete = id;

  if (id_Of_Athlete) {
    return dispatch({
      type: GET_REQUESTED_ATHLETE,
      payload: {
        Athlete_id: id_Of_Athlete,
      },
    });
  }
};

export const athleteDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ATHLETE_DETAIL,
      payload: {
        loading: true,
      },
    });
    console.log(id);
    const response = await Draftus.post("/get-athlete-details", {
      athlete_id: id,
    });
    if (response.data.success) {
      return dispatch({
        type: ATHLETE_DETAIL,
        payload: {
          loading: false,
          athlete_detail: response.data.data.data,
          athlete_skill: response.data.data.skill,
          athlete_status: response.data.data.request_status,
          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: ATHLETE_DETAIL,
        payload: {
          loading: false,
          athlete_detail: {},
          athlete_skill: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: ATHLETE_DETAIL,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const get_Athlete = (data) => async (dispatch, getState) => {
  try {
    const response = await Draftus.get("/get-athlete", data);
    if (response.data.success) {
      return dispatch({
        type: GET_ATHLETE,
        payload: {
          loading: false,
          acceptedAthlete: response.data.data.athlete,
          adminInAthlete: response.data.data.admin,
          successMessage: response.data.message,
          filterloading: false,
        },
      });
    } else {
      return dispatch({
        type: GET_ATHLETE,
        payload: {
          loading: false,
          acceptedAthlete: [],
          adminInAthlete: [],
          errorMessage: "Error: ",
          filterloading: false,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: GET_ATHLETE,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
        filterloading: false,
      },
    });
  }
};

export const removeAthlete = (data) => async (dispatch, getState) => {
  try {
    const response = await Draftus.post("/remove-athlete", data);
    if (response.data.success) {
      message.success(response.data.message);
      return dispatch({
        type: REMOVE_ATHLETE,
        payload: {
          loading: false,

          successMessage: response.data.message,
        },
      });
    } else {
      message.error(response.data.message);
      return dispatch({
        type: REMOVE_ATHLETE,
        payload: {
          loading: false,

          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: REMOVE_ATHLETE,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const getPotentialAthlete = (data) => async (dispatch, getState) => {
  try {
    const response = await Draftus.get("/potential-athlete", data);
    if (response.data.success) {
      return dispatch({
        type: POTENTIAL_ATHLETE,
        payload: {
          loading: false,
          potential_Athlete: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: POTENTIAL_ATHLETE,
        payload: {
          loading: false,
          potential_Athlete: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: POTENTIAL_ATHLETE,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const getTeam = (data) => async (dispatch, getState) => {
  try {
    const response = await Draftus.get("/my-teams", data);
    if (response.data.success) {
      return dispatch({
        type: COACH_TEAM,
        payload: {
          loading: false,
          coach_Team: response.data.data,
          filterloading: false,
          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: COACH_TEAM,
        payload: {
          loading: false,
          coach_Team: [],
          filterloading: false,
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: COACH_TEAM,
      payload: {
        loading: false,
        filterloading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};
