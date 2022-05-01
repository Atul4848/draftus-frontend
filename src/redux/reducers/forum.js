import {
  ADD_FORUM,
  COACH_VIEW_FORUM,
  ATHLETE_VIEW_FORUM,
  COMPANY_VIEW_FORUM,
  COACH_VIEW_FORUM_DETAIL,
  ATHLETE_VIEW_FORUM_DETAIL,
  COMPANY_VIEW_FORUM_DETAIL,
  ATHLETE_COMMENT,
  COACH_COMMENT,
  RECOMMEND_FORUM,
  GET_RECOMMEND_FORUM,
  EDIT_FORUM,
  DELETE_FORUM,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from "../../constants/ActionType";

const INITIAL_STATE = {
  loading: false,
  coach_View_Forum: [],
  athlete_View_Forum: [],
  company_View_Forum: [],
  coach_View_Forum_Detail: {},
  athlete_View_Forum_Detail: {},
  company_View_Forum_Detail: {},
  athlete_Comment: {},
  coach_Comment: {},
  isAthleteComment: false,
  get_recommend_Forum: [],
  delete: {},
  EditAthleteComment: {},
  coachLoadMoreURL: null,
  athleteLoadMoreURL: null,
  companyLoadMoreURL: null,
};

const forum = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_FORUM:
      const add_Forum = { ...state, ...action.payload };
      return add_Forum;
    case COACH_VIEW_FORUM:
      const coach_View_Forum = { ...state, ...action.payload };
      return coach_View_Forum;
    case ATHLETE_VIEW_FORUM:
      const athlete_View_Forum = { ...state, ...action.payload };
      return athlete_View_Forum;
    case COMPANY_VIEW_FORUM:
      const company_View_Forum = { ...state, ...action.payload };
      return company_View_Forum;
    case COACH_VIEW_FORUM_DETAIL:
      const coach_View_Forum_Detail = { ...state, ...action.payload };
      return coach_View_Forum_Detail;
    case ATHLETE_VIEW_FORUM_DETAIL:
      const athlete_View_Forum_Detail = { ...state, ...action.payload };
      return athlete_View_Forum_Detail;
    case COMPANY_VIEW_FORUM_DETAIL:
      const company_View_Forum_Detail = { ...state, ...action.payload };
      return company_View_Forum_Detail;
    case ATHLETE_COMMENT:
      const athlete_Comment = { ...state, ...action.payload };
      return athlete_Comment;
    case COACH_COMMENT:
      const coach_Comment = { ...state, ...action.payload };
      return coach_Comment;
    case RECOMMEND_FORUM:
      const recommend_Forum = { ...state, ...action.payload };
      return recommend_Forum;
    case GET_RECOMMEND_FORUM:
      const get_recommend_Forum = { ...state, ...action.payload };
      return get_recommend_Forum;
    case EDIT_FORUM:
      const edit_Forum = { ...state, ...action.payload };
      return edit_Forum;
    case DELETE_FORUM:
      const delete_Forum = {
        ...state,
        coach_Delete_Forum: state.coach_View_Forum.filter(
          (item) => item.id !== action.payload.id
        ),
      };
      return delete_Forum;
    case EDIT_COMMENT:
      const edit_Comment = { ...state, ...action.payload };
      return edit_Comment;
    case DELETE_COMMENT:
      const delete_Comment = { ...state, ...action.payload };
      return delete_Comment;

    default:
      return state;
  }
};

export default forum;
