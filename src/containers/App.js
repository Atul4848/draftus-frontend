import React, { useEffect, useState } from "react";
import "../App.css";
import { Layout } from "antd";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import "../styles/main.css";

import Home from "../routes/home/Home";
import Login from "../routes/login/Login";
import Navbar from "../component/navbar/Navbar";
import { hot } from "react-hot-loader";
import About from "../routes/about_us/About_us";
import Contact from "../routes/contact_us/Contact_Us";
import Footer from "../component/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { tryLocalSignIn, UserProfile } from "../redux/actions/userAuthAction";
import Profilepage from "../routes/profile/Profile";
import PrivateRoute from "./PrivateRoute";
import Register from "../routes/register/Register";
//import SocialAuth from "../routes/socialAuth/SocialAuth";
import ScrollToTop from "../component/scroll_to_top/Scroll_To_Top";
import UpdatePassword from "../routes/profile/UpdatePassword";
import DraftusContact from "../component/navbar/DraftusContact";
import Request_Coach from "../routes/athlete/Request_Coach";
import AthleteRequestPage from "../routes/coach/AthleteRequestPage";
import SucessMessage from "../routes/sucessPage/SuccessMessage";
import RejectMessage from "../routes/rejectpage/RejectMessage";
import Coach_register from "../routes/coachRegister/CoachRegister";
import CoachAthleteManagement from "../routes/company/CoachAthleteManagement";
import AddCoach from "../routes/company/AddCoach";
import Athlete_register from "../routes/athleteRegister/AthleteRegister";
import AddAthlete from "../routes/company/AddAthlete";
import PageNotFound from "../component/PageNotFound";
import ProfileEdit from "../routes/profile/ProfileEdit";
import CoachAthleteViewProfile from "../routes/company/CoachAthleteViewProfile";
import Coach_detail from "../routes/athlete/Coach_detail";
import AthleteDetail from "../routes/coach/AthleteDetail";
import AddForums from "../routes/coach/AddForums";
import Forum_Page from "../routes/coach/Forum_Page";
import AthleteViewCoachForum from "../routes/athlete/AthleteViewCoachForum";
import CompanyViewCoachForum from "../routes/company/CompanyViewCoachForum";
import ForumAnnouncement from "../routes/forum_announcement/ForumAnnouncement";
import ForumDetails from "../routes/coach/ForumDetails";
import ForgetPassword from "../routes/profile/ForgetPassword";
import ResetPassword from "../routes/profile/ResetPassword";
import AthleteViewCoachForumDetail from "../routes/athlete/AthleteViewCoachForumDetail";
import companyViewCoachForumDetail from "../routes/company/CompanyViewCoachForumDetail";
import Resume_page from "../routes/profile/Resume_page";
import Create_Resume from "../routes/profile/Create_Resume";
import Chat from "../routes/chat/Chat";
import Resume from "../routes/resume/Resume";
import EditForum from "../routes/coach/EditForum";
import CoreCurriculum from "../routes/coach/CoreCurriculum";
import CoreCurriculumPage from "../routes/coach/coreCurriculum/CoreCurriculumPage";
import AddCoreCurriculum from "../routes/coach/coreCurriculum/AddCoreCurriculum";
import EditCoreCurriculum from "../routes/coach/coreCurriculum/EditCoreCurriculum";
import AssignedCurriculum from "../routes/athlete/AssignedCurriculum";
import CompanyRequestCoach from "../routes/company/CompanyRequestCoach";
import CompanyDetail from "../routes/coach/CompanyDetail";
import "bootstrap/dist/css/bootstrap.css";
import { LinkedInCallback } from "react-linkedin-login-oauth2";

const App = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const { isAuth } = userState;

  useEffect(() => {
    dispatch(tryLocalSignIn());
  }, []);

  useEffect(() => {
    checkAuth();
  }, [isAuth]);

  const checkAuth = async () => {
    const token = await localStorage.getItem("token");
    if (token && isAuth) {
      const token = localStorage.getItem("token");
      if (token.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
      }
      await dispatch(UserProfile());
      //history.push(location.state.from.pathname);
    }
  };

  return (
    <Router basename="/">
      <ScrollToTop />
      <div className="App">
        <Layout>
          <DraftusContact />
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/linkedin-auth" exact component={LinkedInCallback} />
            <Route path="/about" exact component={About} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/register" exact component={Register} />
            {/* <Route path="/socialauth" exact component={SocialAuth} /> */}
            <Route path="/forget_password" exact component={ForgetPassword} />

            <Route
              path="/reset-password/:token/:email"
              exact
              component={ResetPassword}
            />
            <Route
              path="/coach_register/:id/:company_id"
              exact
              component={Coach_register}
            />
            <Route
              path="/athlete_register/:id/:company_id"
              exact
              component={Athlete_register}
            />

            {/* PRIVATE ROUTE */}
            <PrivateRoute path="/chat" exact component={Chat} />
            <PrivateRoute path="/profile" exact component={Profilepage} />
            <PrivateRoute
              path="/update_password"
              exact
              component={UpdatePassword}
            />
            <PrivateRoute
              path="/profile/request_coach"
              exact
              component={Request_Coach}
            />
            <PrivateRoute
              path="/profile/athlete_request"
              exact
              component={AthleteRequestPage}
            />
            <PrivateRoute
              path="/profile/request_success"
              exact
              component={SucessMessage}
            />
            <PrivateRoute
              path="/profile/request_reject"
              exact
              component={RejectMessage}
            />
            <PrivateRoute
              path="/profile/management"
              exact
              component={CoachAthleteManagement}
            />
            <PrivateRoute
              path="/profile/add_coach"
              exact
              component={AddCoach}
            />
            <PrivateRoute
              path="/profile/add_athlete"
              exact
              component={AddAthlete}
            />
            <PrivateRoute
              path="/profile/profile_edit"
              exact
              component={ProfileEdit}
            />
            <PrivateRoute
              path="/profile/details/:id"
              exact
              component={CoachAthleteViewProfile}
            />
            <PrivateRoute
              path="/profile/coach_details/:id"
              exact
              component={Coach_detail}
            />
            <PrivateRoute
              path="/profile/athlete_detail/:id"
              exact
              component={AthleteDetail}
            />
            <PrivateRoute
              path="/profile/forum/add_forum"
              exact
              component={AddForums}
            />
            <PrivateRoute
              path="/profile/forum/edit_forum/:id"
              exact
              component={EditForum}
            />
            <PrivateRoute path="/profile/forum" exact component={Forum_Page} />
            <PrivateRoute
              path="/profile/athlete_view_coach_forum"
              exact
              component={AthleteViewCoachForum}
            />
            <PrivateRoute
              path="/profile/company_view_coach_forum"
              exact
              component={CompanyViewCoachForum}
            />
            <PrivateRoute
              path="/profile/forum_announcement"
              exact
              component={ForumAnnouncement}
            />
            <PrivateRoute
              path="/profile/forum_details/:id"
              exact
              component={ForumDetails}
            />
            <PrivateRoute
              path="/profile/athlete-view-coach-forum-detail/:id"
              exact
              component={AthleteViewCoachForumDetail}
            />
            <PrivateRoute
              path="/profile/company-view-coach-forum-detail/:id"
              exact
              component={companyViewCoachForumDetail}
            />

            <PrivateRoute path="/profile/resume" exact component={Resume} />
            {/*  <PrivateRoute
              path="/profile/curriculum"
              exact
              component={CoreCurriculum}
            /> */}
            <PrivateRoute
              path="/profile/curriculum"
              exact
              component={CoreCurriculumPage}
            />
            <PrivateRoute
              path="/profile/curriculum/add_Curriculum"
              exact
              component={AddCoreCurriculum}
            />
            <PrivateRoute
              path="/profile/curriculum/edit-curriculum/:id"
              exact
              component={EditCoreCurriculum}
            />
            <PrivateRoute
              path="/profile/assigned_curriculum"
              exact
              component={AssignedCurriculum}
            />
            <PrivateRoute
              path="/profile/request-coach"
              exact
              component={CompanyRequestCoach}
            />
            <PrivateRoute
              path="/profile/company-detail/:id"
              exact
              component={CompanyDetail}
            />

            <Route component={PageNotFound} />
          </Switch>
          <Footer />
        </Layout>
      </div>
    </Router>
  );
};

export default hot(module)(App);
