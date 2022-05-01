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

const INITIAL_STATE = {
  loading: false,
  loadedFlag: false,
  isAuth: false,
  curriculum: [],
  skill: [],
  view_Curriculum: [],
  get_Assigned_Curriculum: [],
  errorMessage: "",
  successMessage: "",
  assignedCurriculumLoadMoreURL: null,
  curriculumLoadMoreURL: null,
};

const Curriculum = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CURRICULUM:
      const curriculum = { ...state, ...action.payload };
      return curriculum;
    case SKILL:
      const skill = { ...state, ...action.payload };
      return skill;
    case VIEW_CURRICULUM:
      const view_Curriculum = { ...state, ...action.payload };
      return view_Curriculum;
    case ADD_CURRICULUM:
      const add_Curriculum = { ...state, ...action.payload };
      return add_Curriculum;
    case EDIT_CURRICULUM:
      const edit_Curriculum = { ...state, ...action.payload };
      return edit_Curriculum;
    case DELETE_CURRICULUM:
      const delete_Curriculum = { ...state, ...action.payload };
      return delete_Curriculum;
    case GET_ASSIGNED_CURRICULUM:
      const get_Assigned_Curriculum = { ...state, ...action.payload };
      return get_Assigned_Curriculum;
    case COACH_ASSIGN_CURRICULUM:
      const coach_Assign_Curriculum = { ...state, ...action.payload };
      return coach_Assign_Curriculum;

    default:
      return state;
  }
};

export default Curriculum;
