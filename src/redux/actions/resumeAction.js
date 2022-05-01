import {
  EDUCATION_RESUME,
  GET_RESUME,
  CREATE_RESUME,
  WORK_RESUME,
  SOCIAL_MEDIA,
  EDUCATION_RESUME_ID,
  EDUCATION_DELETE,
  WORK_DELETE,
  SOCIAL_MEDIA_DELETE,
  GET_RESUME_BY_ID,
} from "../../constants/ActionType";

import Draftus from "../../api/Draftus";
import { message } from "antd";

export const createResume = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: CREATE_RESUME,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/create-resume", data);
      if (response.data.success) {
        message.success(response.data.message);
        return dispatch({
          type: CREATE_RESUME,
          payload: {
            loading: false,

            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        return dispatch({
          type: CREATE_RESUME,
          payload: {
            loading: false,

            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: CREATE_RESUME,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const workResume = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: WORK_RESUME,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/create-work", data);
      if (response.data.success) {
        message.success(response.data.message);
        return dispatch({
          type: WORK_RESUME,
          payload: {
            loading: false,

            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        return dispatch({
          type: WORK_RESUME,
          payload: {
            loading: false,

            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: WORK_RESUME,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const socialResume = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: SOCIAL_MEDIA,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/create-social", data);
      if (response.data.success) {
        message.success(response.data.message);
        return dispatch({
          type: SOCIAL_MEDIA,
          payload: {
            loading: false,

            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        return dispatch({
          type: SOCIAL_MEDIA,
          payload: {
            loading: false,

            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: SOCIAL_MEDIA,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const educationResume = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: EDUCATION_RESUME,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/create-eduction", data);
      if (response.data.success) {
        message.success(response.data.message);
        return dispatch({
          type: EDUCATION_RESUME,
          payload: {
            loading: false,

            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        return dispatch({
          type: EDUCATION_RESUME,
          payload: {
            loading: false,

            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: EDUCATION_RESUME,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const getResume = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: GET_RESUME,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.get("/resume", data);
      if (response.data.success) {
        return dispatch({
          type: GET_RESUME,
          payload: {
            loading: false,
            get_Resume: response.data.data,
            successMessage: response.data.message,
          },
        });
      } else {
        return dispatch({
          type: GET_RESUME,
          payload: {
            loading: false,
            get_Resume: {},
            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: GET_RESUME,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const deleteEducation = (id) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: EDUCATION_DELETE,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/delete-eduction", { id: id });
      if (response.data.success) {
        message.success(response.data.message);
        return dispatch({
          type: EDUCATION_DELETE,
          payload: {
            loading: false,

            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        return dispatch({
          type: EDUCATION_DELETE,
          payload: {
            loading: false,

            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: EDUCATION_DELETE,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const deleteWork = (id) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: WORK_DELETE,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/delete-work", { id: id });
      if (response.data.success) {
        message.success(response.data.message);
        return dispatch({
          type: WORK_DELETE,
          payload: {
            loading: false,

            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        return dispatch({
          type: WORK_DELETE,
          payload: {
            loading: false,

            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: WORK_DELETE,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const deleteSocialMedia = (id) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: SOCIAL_MEDIA_DELETE,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/delete-social", { id: id });
      if (response.data.success) {
        message.success(response.data.message);
        return dispatch({
          type: SOCIAL_MEDIA_DELETE,
          payload: {
            loading: false,

            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        return dispatch({
          type: SOCIAL_MEDIA_DELETE,
          payload: {
            loading: false,

            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: SOCIAL_MEDIA_DELETE,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const getResumeById = (id) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: GET_RESUME_BY_ID,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/resume-by-id", { id: id });
      if (response.data.success) {
        return dispatch({
          type: GET_RESUME_BY_ID,
          payload: {
            loading: false,
            get_Resume_By_Id: response.data.data,
            successMessage: response.data.message,
          },
        });
      } else {
        return dispatch({
          type: GET_RESUME_BY_ID,
          payload: {
            loading: false,
            get_Resume_By_Id: {},
            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: GET_RESUME_BY_ID,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};
