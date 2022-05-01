import {
  ADD_COACH,
  ADD_ATHLETE,
  INVITED_ATHLETE_COACH,
} from "../../constants/ActionType";
import Draftus from "../../api/Draftus";
import { message } from "antd";

export const inviteCoach = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: ADD_COACH,
        payload: {
          loading: true,
          add_coach: false,
        },
      });
      const response = await Draftus.post("/invite-coach", data);
      if (response.data.success) {
        message.success(response.data.message);
        return dispatch({
          type: ADD_COACH,
          payload: {
            loading: false,
            add_coach: true,
            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        dispatch({
          type: ADD_COACH,
          payload: {
            loading: false,
            add_coach: false,
            errorMessage: "Error: " + response.data.message,
          },
        });
      }
    } else {
      return dispatch({
        type: ADD_COACH,
        payload: {
          loading: false,
          add_coach: false,
          errorMessage: "Please login to add Coach!",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: ADD_COACH,
      payload: {
        loading: false,
        add_coach: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const inviteAthlete = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: ADD_ATHLETE,
        payload: {
          loading: true,
          add_athlete: false,
        },
      });
      const response = await Draftus.post("/invite-coach", data);
      if (response.data.success) {
        message.success(response.data.message);
        return dispatch({
          type: ADD_ATHLETE,
          payload: {
            loading: false,
            add_athlete: true,
            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        dispatch({
          type: ADD_ATHLETE,
          payload: {
            loading: false,
            add_athlete: false,
            errorMessage: "Error: " + response.data.message,
          },
        });
      }
    } else {
      return dispatch({
        type: ADD_ATHLETE,
        payload: {
          loading: false,
          add_athlete: false,
          errorMessage: "Please login to add athlete!",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: ADD_COACH,
      payload: {
        loading: false,
        add_coach: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const invitedAthleteCoach = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INVITED_ATHLETE_COACH,
      payload: {
        loading: true,
      },
    });
    const response = await Draftus.get("/invited-people", data);
    if (response.data.success) {
      dispatch({
        type: INVITED_ATHLETE_COACH,
        payload: {
          loading: false,
          invited: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      dispatch({
        type: INVITED_ATHLETE_COACH,
        payload: {
          loading: false,
          invited: [],
          errorMessage: "Error: " + response.data.message,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: INVITED_ATHLETE_COACH,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};
