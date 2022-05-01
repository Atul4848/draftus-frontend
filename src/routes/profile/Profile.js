import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { UserProfile } from "../../redux/actions/userAuthAction";
import { companyAthlete } from "../../redux/actions/companyaction";
import { getResume } from "../../redux/actions/resumeAction";
import { Button, Skeleton, Row, Col, Spin, message } from "antd";
import { Link } from "react-router-dom";
import CompanyAthlete from "../../component/company/CompanyAthlete";
import CompanyCoach from "../../component/company/CompanyCoaches";
import logo from "../../assets/logo1.png";
import {
  COMPANY,
  COACH,
  ATHLETE,
  UPLOAD_PIC,
  YOUTUBE_LINK,
} from "../../constants/ActionType";
import AthleteActiveCoaches from "../../component/athlete/AthleteCoaches";
import AthleteActiveForum from "../../component/athlete/AthleteActiveForum";
import AthleteCoreCurriculum from "../../component/athlete/AthleteCoreCurriculum";
import AthletePendingCoach from "../../component/athlete/AthletePendingCoach";
import AthleteRecommendedForum from "../../component/athlete/AthleteRecommendedForum";
import CoachAthlete from "../../component/coach/CoachAthlete";
import CoachAthletepending from "../../component/coach/CoachAthletepending";
import CoachForums from "../../component/coach/CoachForums";
import RoleButton from "../../component/RolesButton";
import { useHistory, useLocation } from "react-router-dom";
import Resume_Summary from "../resume/component/Resume_Summary";
import AthleteRejectByCoach from "../../component/athlete/AthleteRejectByCoach";
import AthleteRemoveByCoach from "../../component/athlete/AthleteRemoveByCoach";
import PotentialAthlete from "../../component/coach/PotentialAthlete";
import ListOfCompany from "../../component/coach/ListOfCompany";
import ListOfActiveCompany from "../../component/coach/ListOfActiveCompany";
import CompanyRequested from "../../component/company/CompanyRequested";
import AthleteFilterByCompany from "../../component/coach/AthleteFilterByCompany";
import StarRatings from "react-star-ratings";
import "bootstrap/dist/css/bootstrap.css";

function Profile() {
  const [videoUrl, setURL] = useState("");
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const { loading, userDetail, isAuth } = userDetails;
  const resume = useSelector((state) => state.resume);
  const coach_detail = useSelector((state) => state.coach_detail);
  const { get_Resume } = resume;
  const { state } = useLocation();
  let history = useHistory();

  // console.log("test",userDetail.user_details.rating.total)
  useEffect(() => {
    if (isAuth) {
      collectUserData();
    }
  }, [isAuth]);

  const collectUserData = async () => {
    dispatch(UserProfile());
  };
  useEffect(() => {
    checkForAuthentication();
  }, [userDetails]);

  const checkForAuthentication = () => {
    if (loading && userDetails.isAuth) {
      state ? history.push(state.from.pathname) : history.push("/profile");
    }
  };

  useEffect(() => {
    if (
      userDetail &&
      userDetail.user_details &&
      userDetail.user_details.video_url != null
    ) {
      const youTubeUrl = userDetail.user_details.video_url;
      const splitted = youTubeUrl.split("/");
      const updatedYoutubeUrl = splitted[splitted.length - 1];

      if (updatedYoutubeUrl != "=") {
        const splittedUrl = updatedYoutubeUrl.split("=");

        const updatedURL = YOUTUBE_LINK + splittedUrl[splittedUrl.length - 1];
        setURL(updatedURL);
      } else {
        const updatedURL = YOUTUBE_LINK + splitted[splitted.length - 1];
        setURL(updatedURL);
      }
    }
  }, [userDetails]);

  useEffect(() => {
    collectResume();
  }, []);

  const collectResume = async () => {
    await dispatch(getResume());
  };

  return (
    <div>
      <>
        <div className="newContnainer">
          {loading ? (
            <Spin className="loader-ld" />
          ) : (
            <>
              <div className="athlete__home">
                <Row gutter={[16, 10]}>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <Row gutter={[16, 10]}>
                      <>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <>
                            {userDetail &&
                            userDetail.user &&
                            userDetail.user.role == COMPANY ? (
                              <h2 className="themestek-custom-heading">
                                TEAM DASHBOARD
                              </h2>
                            ) : null}
                          </>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24}>
                          <>
                            {userDetail &&
                            userDetail.user &&
                            userDetail.user.role == COACH ? (
                              <h2 className="themestek-custom-heading">
                                COACH DASHBOARD
                              </h2>
                            ) : null}
                          </>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24}>
                          <>
                            <div className="d-flex">
                              {userDetail &&
                              userDetail.user &&
                              userDetail.user.role == ATHLETE ? (
                                <h2 className="themestek-custom-heading1">
                                  ATHLETE DASHBOARD
                                </h2>
                              ) : null}
                              {
                                userDetail && 
                                userDetail.user_details && 
                                userDetail.user_details.rating != undefined &&
                                userDetail.user.role == ATHLETE ?(
                                  <>
                                  {/* <StarRatings
                                rating={
                                  Number(userDetail.user_details.rating.total) 
                                  // 2.403
                                }
                                starDimension="20px"
                                starSpacing="2px"
                              /> */}
                              <p className="text-end">Rating- <span style={{color:"#4862AE"}}>{Number(userDetail.user_details.rating.total)}</span>pan</p>
                              </>
                                ) : null
                              }
                            </div>
                          </>
                        </Col>
                      </>
                    </Row>
                  </Col>

                  <Col xs={24} sm={24} md={7} lg={7}>
                    <div className="athlete__home_img">
                      <img
                        src={
                          userDetail &&
                          userDetail.user_details &&
                          userDetail.user_details.avatar != null
                            ? UPLOAD_PIC + userDetail.user_details.avatar
                            : logo
                        }
                        alt="Profile"
                      />
                    </div>
                  </Col>

                  <Col xs={24} sm={24} md={10} lg={10}>
                    <div>
                      <div className="profileinform">
                        <b>Name :</b>
                        <span>
                          <p>
                            {userDetail && userDetail.user != null
                              ? userDetail.user.fname
                              : "N/A"}
                          </p>
                          <p>
                            {userDetail && userDetail.user != null
                              ? userDetail.user.lname
                              : "N/A"}
                          </p>
                        </span>
                      </div>
                      <div className="profileinform">
                        <b>Email :</b>
                        <span>
                          {userDetail && userDetail.user != null
                            ? userDetail.user.email
                            : "N/A"}
                        </span>
                      </div>
                      <div className="profileinform">
                        <b>Contact :</b>
                        <span>
                          {userDetail && userDetail.user_details != null
                            ? userDetail.user_details.phone
                            : "N/A"}
                        </span>
                      </div>
                      <>
                        {userDetail && userDetail.skill != "" ? (
                          <div className="profileinform_p">
                            <b>Skills:</b>
                            <div className="description_profile0 skill-sl">
                              {userDetail &&
                                userDetail.skill &&
                                userDetail.skill.map((item, i) => (
                                  <p>
                                    <>
                                      {item && item.skill && item.skill.name
                                        ? item.skill.name
                                        : null}
                                    </>

                                    <span>
                                      {i < userDetail.skill.length - 1
                                        ? ","
                                        : null}
                                    </span>
                                  </p>
                                ))}
                            </div>
                          </div>
                        ) : null}
                      </>

                      <>
                        {userDetail && userDetail.company != null ? (
                          <div className="profileinform">
                            <b>Team :</b>
                            <span>
                              <p>
                                {userDetail &&
                                userDetail.company &&
                                userDetail.company.company_details &&
                                userDetail.company.company_details.fname != null
                                  ? userDetail.company.company_details.fname
                                  : "N/A"}
                              </p>
                              <p>
                                {userDetail &&
                                userDetail.company &&
                                userDetail.company.company_details &&
                                userDetail.company.company_details.lname != null
                                  ? userDetail.company.company_details.lname
                                  : "N/A"}
                              </p>
                            </span>
                          </div>
                        ) : null}
                      </>

                      <div className="profileinform">
                        <b>Address :</b>
                        <span>
                          {userDetail &&
                          userDetail.user_details &&
                          userDetail.user_details.address != null
                            ? userDetail.user_details.address
                            : "N/A"}
                        </span>
                      </div>
                      <div className="profileinform">
                        <b>Country :</b>
                        <span>
                          {userDetail &&
                          userDetail.user_details &&
                          userDetail.user_details.country &&
                          userDetail.user_details.country.name != null
                            ? userDetail.user_details.country.name
                            : "N/A"}
                        </span>
                      </div>
                      <div className="profileinform">
                        <b>State :</b>
                        <span>
                          {userDetail &&
                          userDetail.user_details &&
                          userDetail.user_details.state &&
                          userDetail.user_details.state.name != null
                            ? userDetail.user_details.state.name
                            : "N/A"}
                        </span>
                      </div>
                      <div className="profileinform">
                        <b>City :</b>
                        <span>
                          {userDetail &&
                          userDetail.user_details &&
                          userDetail.user_details.city &&
                          userDetail.user_details.city.name != null
                            ? userDetail.user_details.city.name
                            : "N/A"}
                        </span>
                      </div>
                      <div className="profileinform">
                        <b>Postcode:</b>
                        <span>
                          {userDetail &&
                          userDetail.user_details &&
                          userDetail.user_details.postal_code != null
                            ? userDetail.user_details.postal_code
                            : "N/A"}
                        </span>
                      </div>
                      {userDetail &&
                      userDetail.athlete_extra_details != null ? (
                        <>
                          {userDetail &&
                          userDetail.athlete_extra_details &&
                          userDetail.athlete_extra_details
                            .additional_interests != null ? (
                            <div className="profileinform">
                              <b>Additional Interest:</b>
                              <span>
                                {userDetail &&
                                userDetail.athlete_extra_details &&
                                userDetail.athlete_extra_details
                                  .additional_interests != null
                                  ? userDetail.athlete_extra_details
                                      .additional_interests
                                  : null}
                              </span>
                            </div>
                          ) : null}
                          <>
                            {userDetail &&
                            userDetail.athlete_extra_details &&
                            userDetail.athlete_extra_details.extra_curricular !=
                              null ? (
                              <div className="profileinform">
                                <b>Extra Curriculum:</b>
                                <span>
                                  {userDetail &&
                                  userDetail.athlete_extra_details &&
                                  userDetail.athlete_extra_details
                                    .extra_curricular != null
                                    ? userDetail.athlete_extra_details
                                        .extra_curricular
                                    : null}
                                </span>
                              </div>
                            ) : null}
                          </>
                          <>
                            {userDetail &&
                            userDetail.athlete_extra_details &&
                            userDetail.athlete_extra_details.family_household !=
                              null ? (
                              <div className="profileinform">
                                <b>Single family household:</b>
                                <span>
                                  {userDetail &&
                                  userDetail.athlete_extra_details &&
                                  userDetail.athlete_extra_details
                                    .family_household != 0
                                    ? "Yes"
                                    : "No"}
                                </span>
                              </div>
                            ) : null}
                          </>
                          <>
                            {userDetail &&
                            userDetail.athlete_extra_details &&
                            userDetail.athlete_extra_details
                              .first_generation_college_student != null ? (
                              <div className="profileinform">
                                <b>First generation college student:</b>
                                <span>
                                  {userDetail &&
                                  userDetail.athlete_extra_details &&
                                  userDetail.athlete_extra_details
                                    .first_generation_college_student != 0
                                    ? "Yes"
                                    : "No"}
                                </span>
                              </div>
                            ) : null}
                          </>
                        </>
                      ) : null}
                    </div>

                    <Row gutter={[25, 16]}>
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <div>
                          <Button className="ant-btn ant-btn btn__profile1 ">
                            <Link
                              to="/profile/profile_edit"
                              className="text-decoration-none"
                            >
                              Edit
                            </Link>
                          </Button>
                        </div>

                        <div>
                          <Button className="ant-btn ant-btn btn__profile1 ">
                            <Link
                              to="/update_password"
                              className="text-decoration-none"
                            >
                              Update Password
                            </Link>
                          </Button>
                        </div>
                        {userDetail &&
                        userDetail.user &&
                        userDetail.user.role == COMPANY ? null : (
                          <div>
                            {get_Resume == null ? (
                              <Resume_Summary />
                            ) : (
                              <Button className="ant-btn ant-btn btn__profile1">
                                <Link
                                  to="/profile/resume"
                                  className="text-decoration-none"
                                >
                                  Resume
                                </Link>
                              </Button>
                            )}
                            {/* <Button type="link">
                         
                          <Resume_Summary />
                        </Button> */}
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Col>
                  {userDetail &&
                  userDetail.user_details &&
                  userDetail.user_details.video_url == null ? null : (
                    <Col xs={24} sm={24} md={7} lg={7}>
                      <div>
                        <iframe
                          width="auto"
                          height="auto"
                          src={videoUrl}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>

              {userDetail &&
              userDetail.user_details &&
              userDetail.user_details.description == null ? null : (
                <>
                  <div className="brifhding">
                    <h2 className="themestek-custom-heading">DESCRIPTION</h2>
                    <p>
                      {userDetail &&
                      userDetail.user_details &&
                      userDetail.user_details.description != null
                        ? userDetail.user_details.description
                        : "N/A"}
                    </p>
                    {/* <Button className="ant-btn ant-btn ant-btn btn__profile1 ">
            COACH MANAGEMENT
          </Button> */}
                  </div>
                </>
              )}
            </>
          )}

          <div className="athlete__home">
            <Row gutter={[16, 16]}>
              <>
                {userDetail &&
                userDetail.user &&
                userDetail.user.role == ATHLETE ? (
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <>
                      <AthleteActiveCoaches />
                    </>
                  </Col>
                ) : null}
              </>
              <>
                {userDetail &&
                userDetail.user &&
                userDetail.user.role == ATHLETE ? (
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <>
                      <AthletePendingCoach />
                    </>
                  </Col>
                ) : null}
              </>
              <>
                {userDetail &&
                userDetail.user &&
                userDetail.user.role == ATHLETE ? (
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <>
                      <AthleteRecommendedForum />
                    </>
                  </Col>
                ) : null}
              </>
              <>
                {userDetail &&
                userDetail.user &&
                userDetail.user.role == ATHLETE ? (
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <>
                      <AthleteActiveForum />
                    </>
                  </Col>
                ) : null}
              </>

              <>
                {userDetail &&
                userDetail.user &&
                userDetail.user.role == ATHLETE ? (
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <>
                      <AthleteRejectByCoach />
                    </>
                  </Col>
                ) : null}
              </>
              <>
                {userDetail &&
                userDetail.user &&
                userDetail.user.role == ATHLETE ? (
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <>
                      <AthleteRemoveByCoach />
                    </>
                  </Col>
                ) : null}
              </>
            </Row>

            <Row gutter={[16, 16]}>
              <>
                {userDetail &&
                userDetail.user &&
                userDetail.user.role == COACH ? (
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <>
                      <CoachAthlete />
                    </>
                  </Col>
                ) : null}
              </>
              <>
                {userDetail &&
                userDetail.user &&
                userDetail.user.role == COACH ? (
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <>
                      <CoachAthletepending />
                    </>
                  </Col>
                ) : null}
              </>
              {/* 
              <Col xs={24} sm={24} md={24} lg={24}>
                <>
                  {userDetail &&
                  userDetail.user &&
                  userDetail.user.role == COACH ? (
                    <AthleteFilterByCompany />
                  ) : null}
                </>
              </Col> */}

              {/* <Col xs={24} sm={24} md={12} lg={12}>
                <>
                  {userDetail &&
                  userDetail.user &&
                  userDetail.user.role == COACH ? (
                    <ListOfActiveCompany />
                  ) : null}
                </>
              </Col>

              <Col xs={24} sm={24} md={12} lg={12}>
                <>
                  {userDetail &&
                  userDetail.user &&
                  userDetail.user.role == COACH ? (
                    <ListOfCompany />
                  ) : null}
                </>
              </Col> */}
              <>
                {userDetail &&
                userDetail.user &&
                userDetail.user.role == COACH ? (
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <>
                      <PotentialAthlete />
                    </>
                  </Col>
                ) : null}
              </>
              <>
                {userDetail &&
                userDetail.user &&
                userDetail.user.role == COACH ? (
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <>
                      <CoachForums />
                    </>
                  </Col>
                ) : null}
              </>

              <>
                {userDetail &&
                userDetail.user &&
                userDetail.user.role == COMPANY ? (
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <>
                      <CompanyAthlete />
                    </>
                  </Col>
                ) : null}
              </>
              <>
                {userDetail &&
                userDetail.user &&
                userDetail.user.role == COMPANY ? (
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <>
                      <CompanyCoach />
                    </>
                  </Col>
                ) : null}
              </>
              {/*  <>
                <Col xs={24} sm={24} md={12} lg={12}>
                  <>
                    {userDetail &&
                    userDetail.user &&
                    userDetail.user.role == COMPANY ? (
                      <CompanyRequested />
                    ) : null}
                  </>
                </Col>
              </> */}
            </Row>
          </div>

          <RoleButton />
        </div>
      </>
    </div>
  );
}
export default Profile;
