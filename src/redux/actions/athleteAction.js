import {
  FIND_COACH,
  REQUEST_COACH,
  COACH_DETAIL,
  REQUESTED_COACH,
  MY_COACH,
  ATHLETE_REMOVED_BY_COACH,
  ATHLETE_REJECTED_BY_COACH,
} from "../../constants/ActionType";
import Draftus from "../../api/Draftus";
import { message } from "antd";

export const findCoachs = (data) => async (dispatch, getState) => {
  try {
    const response = await Draftus.get("/find-coach", data);
    if (response.data.success) {
      return dispatch({
        type: FIND_COACH,
        payload: {
          loading: false,
          findCoach: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: FIND_COACH,
        payload: {
          loading: false,
          findCoach: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: FIND_COACH,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const athleteRemoveByCoach = (data) => async (dispatch, getState) => {
  try {
    const response = await Draftus.get("/removed-coachs", data);
    if (response.data.success) {
      return dispatch({
        type: ATHLETE_REMOVED_BY_COACH,
        payload: {
          loading: false,
          athlete_Removed_By_Coach: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: ATHLETE_REMOVED_BY_COACH,
        payload: {
          loading: false,
          athlete_Removed_By_Coach: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: ATHLETE_REMOVED_BY_COACH,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const athleteRejectByCoach = (data) => async (dispatch, getState) => {
  try {
    const response = await Draftus.get("/rejected-coachs", data);
    if (response.data.success) {
      return dispatch({
        type: ATHLETE_REJECTED_BY_COACH,
        payload: {
          loading: false,
          athlete_Rejected_By_Coach: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: ATHLETE_REJECTED_BY_COACH,
        payload: {
          loading: false,
          athlete_Rejected_By_Coach: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: ATHLETE_REJECTED_BY_COACH,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const requestedCoach = (data) => async (dispatch, getState) => {
  try {
    const response = await Draftus.get("/requested-coachs", data);
    if (response.data.success) {
      return dispatch({
        type: REQUESTED_COACH,
        payload: {
          loading: false,
          requested_coach: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: REQUESTED_COACH,
        payload: {
          loading: false,
          requested_coach: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: REQUESTED_COACH,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const myCoach = (data) => async (dispatch, getState) => {
  try {
    const response = await Draftus.get("/my-coachs", data);
    if (response.data.success) {
      return dispatch({
        type: MY_COACH,
        payload: {
          loading: false,
          my_Coach: response.data.data.coach,
          adminInCoach: response.data.data.admin,
          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: MY_COACH,
        payload: {
          loading: false,
          my_Coach: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: MY_COACH,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const findCoach_id = (id) => async (dispatch) => {
  const id_Of_Coach = id;

  if (id_Of_Coach) {
    return dispatch({
      type: FIND_COACH,
      payload: {
        Coach_id: id_Of_Coach,
      },
    });
  } else
    return dispatch({
      type: FIND_COACH,
      payload: {
        Coach_id: {},
      },
    });
};

export const requestCoaches = (id) => async (dispatch, getState) => {
  try {
    const response = await Draftus.post("/request-coach", {
      coach_id: id,
    });
    if (response.data.success) {
      message.success(response.data.message);
      return dispatch({
        type: REQUEST_COACH,
        payload: {
          loading: false,

          successMessage: response.data.message,
        },
      });
    } else {
      message.error(response.data.message);
      return dispatch({
        type: REQUEST_COACH,
        payload: {
          loading: false,

          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: REQUEST_COACH,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const coachDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COACH_DETAIL,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.post("/coach-details", {
      coach_id: id,
    });
    if (response.data.success) {
      return dispatch({
        type: COACH_DETAIL,
        payload: {
          loading: false,
          coach_detail: response.data.data.data,
          coach_detail_skill: response.data.data.skill,
          coach_detail_threads: response.data.data.threads,
          coach_detail_status: response.data.data.request_status,
          coach_deatil_company: response.data.data.company,
          successMessage: response.data.message,
        },
      });
    } else {
      return dispatch({
        type: COACH_DETAIL,
        payload: {
          loading: false,
          coach_detail: {},
          coach_detail_skill: [],
          coach_detail_threads: [],
          coach_deatil_company: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: COACH_DETAIL,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};
