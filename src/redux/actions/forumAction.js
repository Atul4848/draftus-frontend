import {
  ADD_FORUM,
  COACH_VIEW_FORUM,
  ATHLETE_VIEW_FORUM,
  COMPANY_VIEW_FORUM,
  COMPANY_VIEW_FORUM_DETAIL,
  COACH_VIEW_FORUM_DETAIL,
  ATHLETE_VIEW_FORUM_DETAIL,
  ATHLETE_COMMENT,
  COACH_COMMENT,
  RECOMMEND_FORUM,
  GET_RECOMMEND_FORUM,
  EDIT_FORUM,
  DELETE_FORUM,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from "../../constants/ActionType";

import Draftus from "../../api/Draftus";
import { message } from "antd";

export const addForum = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: ADD_FORUM,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/add-threads", data);
      if (response.data.success) {
        message.success(response.data.message);
        return dispatch({
          type: ADD_FORUM,
          payload: {
            loading: false,

            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        return dispatch({
          type: ADD_FORUM,
          payload: {
            loading: false,

            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: ADD_FORUM,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const updateForum = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: EDIT_FORUM,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/edit-threads", data);
      if (response.data.success) {
        message.success(response.data.message);
        return dispatch({
          type: EDIT_FORUM,
          payload: {
            loading: false,

            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        return dispatch({
          type: EDIT_FORUM,
          payload: {
            loading: false,

            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: EDIT_FORUM,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const deleteForum = (id) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: DELETE_FORUM,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/delete-threads", { id: id });
      if (response.data.success) {
        message.success(response.data.message);
        return dispatch({
          type: DELETE_FORUM,
          payload: {
            loading: false,

            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        return dispatch({
          type: DELETE_FORUM,
          payload: {
            loading: false,

            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: DELETE_FORUM,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const coachViewForum = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: COACH_VIEW_FORUM,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.get("/get-threads", data);
      if (response.data.success) {
        return dispatch({
          type: COACH_VIEW_FORUM,
          payload: {
            loading: false,
            coach_View_Forum: response.data.data.data,
            coachLoadMoreURL: response.data.data.next_page_url,
            successMessage: response.data.message,
          },
        });
      }
    } else {
      return dispatch({
        type: COACH_VIEW_FORUM,
        payload: {
          loading: false,
          coach_View_Forum: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: COACH_VIEW_FORUM,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const loadMoreCoachForum = (url) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COACH_VIEW_FORUM,
      payload: {
        loading: true,
      },
    });
    const endPoint = url.split("/");
    const response = await Draftus.get(endPoint[endPoint.length - 1]);
    if (response.data.success) {
      const oldCoachForum = getState().forum.coach_View_Forum;
      const newCoachForum = oldCoachForum.concat(response.data.data.data);
      dispatch({
        type: COACH_VIEW_FORUM,
        payload: {
          loading: false,
          coach_View_Forum: newCoachForum,
          coachLoadMoreURL: response.data.data.next_page_url,
        },
      });
    } else {
      dispatch({
        type: COACH_VIEW_FORUM,
        payload: {
          loading: false,
          errorMessage: "Error: " + response.data.message,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: COACH_VIEW_FORUM,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const athleteViewForum = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: ATHLETE_VIEW_FORUM,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.get("/coach-threads", data);
      if (response.data.success) {
        return dispatch({
          type: ATHLETE_VIEW_FORUM,
          payload: {
            loading: false,
            athlete_View_Forum: response.data.data.data,
            athleteLoadMoreURL: response.data.data.next_page_url,
            successMessage: response.data.message,
          },
        });
      }
    } else {
      return dispatch({
        type: ATHLETE_VIEW_FORUM,
        payload: {
          loading: false,
          athlete_View_Forum: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: ATHLETE_VIEW_FORUM,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};
export const loadMoreCoachForumByAthlete =
  (url) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ATHLETE_VIEW_FORUM,
        payload: {
          loading: true,
        },
      });
      const endPoint = url.split("/");
      const response = await Draftus.get(endPoint[endPoint.length - 1]);
      if (response.data.success) {
        const oldCoachForumInAthlete = getState().forum.athlete_View_Forum;
        const newCoachForumInAthlete = oldCoachForumInAthlete.concat(
          response.data.data.data
        );
        dispatch({
          type: ATHLETE_VIEW_FORUM,
          payload: {
            loading: false,
            athlete_View_Forum: newCoachForumInAthlete,
            athleteLoadMoreURL: response.data.data.next_page_url,
          },
        });
      } else {
        dispatch({
          type: ATHLETE_VIEW_FORUM,
          payload: {
            loading: false,
            errorMessage: "Error: " + response.data.message,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: ATHLETE_VIEW_FORUM,
        payload: {
          loading: false,
          errorMessage: "Error: " + err,
        },
      });
    }
  };

export const companyViewForum = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: COMPANY_VIEW_FORUM,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.get("/company-threads", data);
      if (response.data.success) {
        return dispatch({
          type: COMPANY_VIEW_FORUM,
          payload: {
            loading: false,
            company_View_Forum: response.data.data.data,
            companyLoadMoreURL: response.data.data.next_page_url,
            successMessage: response.data.message,
          },
        });
      }
    } else {
      return dispatch({
        type: COMPANY_VIEW_FORUM,
        payload: {
          loading: false,
          company_View_Forum: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: COMPANY_VIEW_FORUM,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};
export const loadMoreCoachForumByCompany =
  (url) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMPANY_VIEW_FORUM,
        payload: {
          loading: true,
        },
      });
      const endPoint = url.split("/");
      const response = await Draftus.get(endPoint[endPoint.length - 1]);
      if (response.data.success) {
        const oldCoachForumInCompany = getState().forum.company_View_Forum;
        const newCoachForumInCompany = oldCoachForumInCompany.concat(
          response.data.data.data
        );
        dispatch({
          type: COMPANY_VIEW_FORUM,
          payload: {
            loading: false,
            company_View_Forum: newCoachForumInCompany,
            companyLoadMoreURL: response.data.data.next_page_url,
          },
        });
      } else {
        dispatch({
          type: COMPANY_VIEW_FORUM,
          payload: {
            loading: false,
            errorMessage: "Error: " + response.data.message,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: COMPANY_VIEW_FORUM,
        payload: {
          loading: false,
          errorMessage: "Error: " + err,
        },
      });
    }
  };

export const companyViewForumDetail = (id) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: COMPANY_VIEW_FORUM_DETAIL,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("company-threads-id", {
        thread_id: id,
      });
      if (response.data.success) {
        return dispatch({
          type: COMPANY_VIEW_FORUM_DETAIL,
          payload: {
            loading: false,
            company_View_Forum_Detail: response.data.data,
            successMessage: response.data.message,
          },
        });
      }
    } else {
      return dispatch({
        type: COMPANY_VIEW_FORUM_DETAIL,
        payload: {
          loading: false,
          company_View_Forum_Detail: {},
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: COMPANY_VIEW_FORUM_DETAIL,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const coachViewForumDetail = (id) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: COACH_VIEW_FORUM_DETAIL,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/thread-by-id", { thread_id: id });
      if (response.data.success) {
        return dispatch({
          type: COACH_VIEW_FORUM_DETAIL,
          payload: {
            loading: false,
            coach_View_Forum_Detail: response.data.data,
            successMessage: response.data.message,
          },
        });
      }
    } else {
      return dispatch({
        type: COACH_VIEW_FORUM_DETAIL,
        payload: {
          loading: false,
          coach_View_Forum_Detail: {},
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: COACH_VIEW_FORUM_DETAIL,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const athleteViewForumDetail = (id) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: ATHLETE_VIEW_FORUM_DETAIL,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/coach-threads-id", {
        thread_id: id,
      });
      if (response.data.success) {
        return dispatch({
          type: ATHLETE_VIEW_FORUM_DETAIL,
          payload: {
            loading: false,
            athlete_View_Forum_Detail: response.data.data.thread_by_id,
            successMessage: response.data.message,
          },
        });
      }
    } else {
      return dispatch({
        type: ATHLETE_VIEW_FORUM_DETAIL,
        payload: {
          loading: false,
          athlete_View_Forum_Detail: {},
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: ATHLETE_VIEW_FORUM_DETAIL,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const athleteComment = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: ATHLETE_COMMENT,
        payload: {
          loading: true,
          isAthleteComment: false,
        },
      });
      const response = await Draftus.post("/threads-post", data);
      if (response.data.success) {
        return dispatch({
          type: ATHLETE_COMMENT,
          payload: {
            loading: false,
            athlete_Comment: response.data.data,
            successMessage: response.data.message,
            isAthleteComment: true,
          },
        });
      }
    } else {
      return dispatch({
        type: ATHLETE_COMMENT,
        payload: {
          loading: false,
          athlete_Comment: {},
          errorMessage: "Error: ",
          isAthleteComment: false,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: ATHLETE_COMMENT,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
        isAthleteComment: false,
      },
    });
  }
};

export const coachComment = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: COACH_COMMENT,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/threads-post", data);
      if (response.data.success) {
        return dispatch({
          type: COACH_COMMENT,
          payload: {
            loading: false,
            coach_Comment: response.data.data,
            successMessage: response.data.message,
          },
        });
      }
    } else {
      return dispatch({
        type: COACH_COMMENT,
        payload: {
          loading: false,
          coach_Comment: {},
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: COACH_COMMENT,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};
export const recommendForum = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: RECOMMEND_FORUM,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/recommend-forum", data);
      if (response.data.success) {
        message.success(response.data.message);
        return dispatch({
          type: RECOMMEND_FORUM,
          payload: {
            loading: false,

            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        return dispatch({
          type: RECOMMEND_FORUM,
          payload: {
            loading: false,

            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: RECOMMEND_FORUM,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const getRecommendForum = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: GET_RECOMMEND_FORUM,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.get("/recommended-forum", data);
      if (response.data.success) {
        return dispatch({
          type: GET_RECOMMEND_FORUM,
          payload: {
            loading: false,
            get_recommend_Forum: response.data.data,
            successMessage: response.data.message,
          },
        });
      }
    } else {
      return dispatch({
        type: GET_RECOMMEND_FORUM,
        payload: {
          loading: false,
          get_recommend_Forum: [],
          errorMessage: "Error: ",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: GET_RECOMMEND_FORUM,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const editComment = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: EDIT_COMMENT,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/threads-post-edit", data);
      if (response.data.success) {
        message.success(response.data.message);
        return dispatch({
          type: EDIT_COMMENT,
          payload: {
            loading: false,

            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        return dispatch({
          type: EDIT_COMMENT,
          payload: {
            loading: false,

            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    return dispatch({
      type: EDIT_COMMENT,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const editAthleteCommentByID = (id) => async (dispatch) => {
  console.log(id);
  if (id) {
    return dispatch({
      type: ATHLETE_COMMENT,
      payload: {
        loading: false,
        EditAthleteComment: id,
      },
    });
  } else {
    dispatch({
      type: ATHLETE_COMMENT,
      payload: {
        loading: false,
        EditAthleteComment: {},
      },
    });
  }
};

export const deleteComment = (id) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: DELETE_COMMENT,
        payload: {
          loading: true,
        },
      });
      const response = await Draftus.post("/threads-post-delete", { id: id });
      if (response.data.success) {
        message.success(response.data.message);
        return dispatch({
          type: DELETE_COMMENT,
          payload: {
            loading: false,

            successMessage: response.data.message,
          },
        });
      } else {
        message.error(response.data.message);
        return dispatch({
          type: DELETE_COMMENT,
          payload: {
            loading: false,

            errorMessage: "Error: ",
          },
        });
      }
    }
  } catch (err) {
    dispatch({
      type: DELETE_COMMENT,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};
