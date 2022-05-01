import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import User from "./user";
import updatePassword from "./updatePassword";
import Curriculum from "./curriculum";
import Company from "./company";
import Athlete from "./athlete";
import Coach from "./coach";
import AddCoach from "./addCoach";
import Forum from "./forum";
import Address from "./address";
import ForgotPassword from "./forgotPassword";
import Resume from "./resume";
import Chat from "./chat";
import Contact_us from "./contactUs";
import SubscribeUs from "./subscribeUs";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: User,
    passwordUpdate: updatePassword,
    athlete_detail: Athlete,
    curriculum_detail: Curriculum,
    company_detail: Company,
    coach_detail: Coach,
    addCoach: AddCoach,
    forum: Forum,
    address: Address,
    forgotPassword: ForgotPassword,
    resume: Resume,
    chat: Chat,
    contact_us: Contact_us,
    subscribe: SubscribeUs,
  });

export default rootReducer;
