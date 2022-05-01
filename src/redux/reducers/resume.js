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

const INITIAL_STATE = {
  loading: false,
  get_Resume: {},
  get_Resume_By_Id: {},
  /*  education_Edit_Resume: {}, */
};

const Resume = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EDUCATION_RESUME:
      const education_Resume = { ...state, ...action.payload };
      return education_Resume;
    case GET_RESUME:
      const get_Resume = { ...state, ...action.payload };
      return get_Resume;
    case CREATE_RESUME:
      const create_Resume = { ...state, ...action.payload };
      return create_Resume;
    case WORK_RESUME:
      const work_Resume = { ...state, ...action.payload };
      return work_Resume;
    case SOCIAL_MEDIA:
      const social_Resume = { ...state, ...action.payload };
      return social_Resume;
    /* case EDUCATION_RESUME_ID:
      const education_Edit_Resume = { ...state, ...action.payload };
      return education_Edit_Resume; */
    case EDUCATION_DELETE:
      const education_Delete = { ...state, ...action.payload };
      return education_Delete;
    case WORK_DELETE:
      const get_Delete = { ...state, ...action.payload };
      return get_Delete;
    case SOCIAL_MEDIA_DELETE:
      const create_Delete = { ...state, ...action.payload };
      return create_Delete;
    case GET_RESUME_BY_ID:
      const get_Resume_By_Id = { ...state, ...action.payload };
      return get_Resume_By_Id;
    default:
      return state;
  }
};

export default Resume;
