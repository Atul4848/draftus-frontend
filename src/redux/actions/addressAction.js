import { COUNTRY, COUNTY, CITY } from "../../constants/ActionType";
import Draftus from "../../api/Draftus";
import { message } from "antd";

export const getCountries = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: COUNTRY,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.get("/get-country", data);
      if (response.data.success) {
        return dispatch({
          type: COUNTRY,
          payload: {
            loading: false,
            country: response.data.data,
            successMessage: response.data.message,
          },
        });
      } else {
        return dispatch({
          type: COUNTRY,
          payload: {
            loading: false,
            country: [],
            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: COUNTRY,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const getCounty = (id) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: COUNTY,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/get-state", { country_id: id });
      if (response.data.success) {
        return dispatch({
          type: COUNTY,
          payload: {
            loading: false,
            county: response.data.data,
            successMessage: response.data.message,
          },
        });
      } else {
        return dispatch({
          type: COUNTY,
          payload: {
            loading: false,
            county: [],
            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: COUNTY,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const getCity = (id) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: CITY,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/get-city", { state_id: id });
      if (response.data.success) {
        return dispatch({
          type: CITY,
          payload: {
            loading: false,
            city: response.data.data,
            successMessage: response.data.message,
          },
        });
      } else {
        return dispatch({
          type: CITY,
          payload: {
            loading: false,
            city: [],
            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: CITY,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};
