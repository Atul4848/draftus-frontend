import {
  CURRICULUM,
  SKILL,
  VIEW_CURRICULUM,
  ADD_CURRICULUM,
  EDIT_CURRICULUM,
  DELETE_CURRICULUM,
  GET_ASSIGNED_CURRICULUM,
  COACH_ASSIGN_CURRICULUM,
} from "../../constants/ActionType";
import Draftus from "../../api/Draftus";
import { message } from "antd";

export const getCurriculum = () => async (dispatch, getState) => {
  try {
    const response = await Draftus.get(
      "/curriculum-view"
    ); /* "/get-curriculum" */
    response.data.success
      ? dispatch({
          type: CURRICULUM,
          payload: {
            curriculum: response.data.data.data,
            curriculumLoadMoreURL: response.data.data.next_page_url,
          },
        })
      : dispatch({
          type: CURRICULUM,
          payload: {
            errorMessage: "Error: " + response.data.message,
          },
        });
  } catch (err) {
    dispatch({
      type: CURRICULUM,
      payload: {
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const loadMoreCurriculum = (url) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CURRICULUM,
      payload: {
        loading: true,
      },
    });
    const endPoint = url.split("/");
    const response = await Draftus.get(endPoint[endPoint.length - 1]);
    if (response.data.success) {
      const oldCurriculum = getState().curriculum_detail.curriculum;
      const newCurriculum = oldCurriculum.concat(response.data.data.data);
      dispatch({
        type: CURRICULUM,
        payload: {
          loading: false,
          get_Assigned_Curriculum: newCurriculum,
          curriculumLoadMoreURL: response.data.data.next_page_url,
        },
      });
    } else {
      dispatch({
        type: CURRICULUM,
        payload: {
          loading: false,
          errorMessage: "Error: " + response.data.message,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: CURRICULUM,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const getSkill = () => async (dispatch, getState) => {
  try {
    const response = await Draftus.get("/get-skills");
    response.data.success
      ? dispatch({
          type: SKILL,
          payload: {
            skill: response.data.data,
          },
        })
      : dispatch({
          type: SKILL,
          payload: {
            errorMessage: "Error: " + response.data.message,
          },
        });
  } catch (err) {
    dispatch({
      type: SKILL,
      payload: {
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const addCurriculum = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: ADD_CURRICULUM,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/curriculum-create", data);
      if (response.data.success) {
        message.success(response.data.message);
        return dispatch({
          type: ADD_CURRICULUM,
          payload: {
            loading: false,

            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        return dispatch({
          type: ADD_CURRICULUM,
          payload: {
            loading: false,

            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: ADD_CURRICULUM,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const updateCurriculum = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: EDIT_CURRICULUM,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/curriculum-update", data);
      if (response.data.success) {
        message.success(response.data.message);
        return dispatch({
          type: EDIT_CURRICULUM,
          payload: {
            loading: false,

            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        return dispatch({
          type: EDIT_CURRICULUM,
          payload: {
            loading: false,

            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: EDIT_CURRICULUM,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const deleteCurriculum = (id) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: DELETE_CURRICULUM,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/curriculum-delete", {
        curriculum_id: id,
      });
      if (response.data.success) {
        message.success(response.data.message);
        return dispatch({
          type: DELETE_CURRICULUM,
          payload: {
            loading: false,

            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        return dispatch({
          type: DELETE_CURRICULUM,
          payload: {
            loading: false,

            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: DELETE_CURRICULUM,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

/* export const coachViewCurriculum = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: VIEW_CURRICULUM,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.get("/get-threads", data);
      if (response.data.success) {
        return dispatch({
          type: VIEW_CURRICULUM,
          payload: {
            loading: false,
            coach_View_Forum: response.data.data,
            coachLoadMoreURL: response.data.data.next_page_url,
            successMessage: response.data.message,
          },
        });
      }
    } else {
      return dispatch({
        type: VIEW_CURRICULUM,
        payload: {
          loading: false,
          coach_View_Forum: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: VIEW_CURRICULUM,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};
 */
export const getAssignedCurriculum = () => async (dispatch, getState) => {
  try {
    const response = await Draftus.get("/athlete-assign-curriculum");
    response.data.success
      ? dispatch({
          type: GET_ASSIGNED_CURRICULUM,
          payload: {
            get_Assigned_Curriculum: response.data.data.data,
            assignedCurriculumLoadMoreURL: response.data.data.next_page_url,
          },
        })
      : dispatch({
          type: GET_ASSIGNED_CURRICULUM,
          payload: {
            errorMessage: "Error: " + response.data.message,
          },
        });
  } catch (err) {
    dispatch({
      type: GET_ASSIGNED_CURRICULUM,
      payload: {
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const loadMoreAssignedCurriculum =
  (url) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_ASSIGNED_CURRICULUM,
        payload: {
          loading: true,
        },
      });
      const endPoint = url.split("/");
      const response = await Draftus.get(endPoint[endPoint.length - 1]);
      if (response.data.success) {
        const oldAssignedCurriculum =
          getState().curriculum_detail.get_Assigned_Curriculum;
        const newAssignedCurriculum = oldAssignedCurriculum.concat(
          response.data.data.data
        );
        dispatch({
          type: GET_ASSIGNED_CURRICULUM,
          payload: {
            loading: false,
            get_Assigned_Curriculum: newAssignedCurriculum,
            assignedCurriculumLoadMoreURL: response.data.data.next_page_url,
          },
        });
      } else {
        dispatch({
          type: GET_ASSIGNED_CURRICULUM,
          payload: {
            loading: false,
            errorMessage: "Error: " + response.data.message,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: GET_ASSIGNED_CURRICULUM,
        payload: {
          loading: false,
          errorMessage: "Error: " + err,
        },
      });
    }
  };

export const assignCurriculum = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: COACH_ASSIGN_CURRICULUM,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/curriculum-assign", data);
      if (response.data.success) {
        message.success(response.data.message);
        return dispatch({
          type: COACH_ASSIGN_CURRICULUM,
          payload: {
            loading: false,

            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        return dispatch({
          type: COACH_ASSIGN_CURRICULUM,
          payload: {
            loading: false,

            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: COACH_ASSIGN_CURRICULUM,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};
