import { COUNTRY, COUNTY, CITY } from "../../constants/ActionType";

const INITIAL_STATE = {
  loading: false,
  country: [],
  county: [],
  city: [],
};

const address = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COUNTRY:
      const country = { ...state, ...action.payload };
      return country;
    case COUNTY:
      const county = { ...state, ...action.payload };
      return county;
    case CITY:
      const city = { ...state, ...action.payload };
      return city;

    default:
      return state;
  }
};

export default address;
