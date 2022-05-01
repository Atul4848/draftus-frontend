import React, { useEffect } from "react";
//import AthleteRequest from "./component/AthleteRequest";

import { Row, Col, Button, Skeleton, Radio, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  acceptAthlete,
  rejectAthlete,
  athleteDetail,
  get_Requested_Athlete,
  findAthlete_id,
  athleteSeenByCoach,
} from "../../redux/actions/coachAction";
import { useHistory } from "react-router-dom";
import profile from "../../assets/logo1.png";
import { UPLOAD_PIC, REQUESTED } from "../../constants/ActionType";
import RejectForm from "../rejectpage/RejectForm";
import ShowMoreText from "react-show-more-text";
import { AiOutlineDoubleLeft } from "react-icons/ai";

function AthleteRequestPage() {
  let history = useHistory();
  const dispatch = useDispatch();
  const coach_detail = useSelector((state) => state.coach_detail);
  const {
    loading,
    Athlete_id,
    athlete_detail,
    getRequestedAthlete,
    athlete_skill,
    athlete_status,
  } = coach_detail;

  const athleteAccepted = async () => {
    setDataId();
    await dispatch(acceptAthlete(athlete_detail.id));
    /* history.push("/profile/request_success"); */
    await dispatch(get_Requested_Athlete());
    await dispatch(athleteDetail());
  };
  const athleteRejected = async () => {
    await dispatch(rejectAthlete(athlete_detail.id));
    /* history.push("/profile/request_reject"); */
  };
  useEffect(() => {
    dispatch(athleteDetail(Athlete_id));
    if (athlete_status && athlete_status.status != REQUESTED) {
      dispatch(athleteSeenByCoach(Athlete_id));
    }
  }, [Athlete_id]);

  useEffect(() => {
    collectUserData();
  }, []);

  const collectUserData = async () => {
    await dispatch(get_Requested_Athlete());
    setDataId();
  };
  const [value, setValue] = React.useState(1);
  const [dataId, setDataId] = React.useState();

  const onChange = async (e) => {
    await dispatch(findAthlete_id(e.target.value));
    /* console.log("radio checked", e.target.value); */
    setValue(e.target.value);

    setDataId(e.target.value);
  };

  return (
    <div className="newContnainer">
      <div className="athlete__home">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <div className="back-btn-bb">
              <Button type="link" onClick={() => history.push("/profile")}>
                <AiOutlineDoubleLeft />
              </Button>
              <h2 className="themestek-custom-heading">Athlete Request</h2>
            </div>
            {/*  <h2 className="themestek-custom-heading">Athlete Request </h2> */}
          </Col>
          <Col xs={24} sm={24} md={10} lg={10}>
            <div>
              <h3 className="activecoaches d-flex justify-content-start">
                ATHLETE
              </h3>

              <div className="coachesflied">
                {loading ? (
                  <Skeleton />
                ) : (
                  <>
                    {getRequestedAthlete != "" ? (
                      <Radio.Group
                        name="radiogroup"
                        onChange={onChange}
                        value={value}
                      >
                        {getRequestedAthlete &&
                          getRequestedAthlete.map((item) => (
                            <div className="form-check">
                              <Radio value={item ? item.athlete_id : null}>
                                <span>{item ? item.user.fname : "n/a"}</span>
                                <span> </span>
                                <span>{item ? item.user.lname : "n/a"}</span>
                              </Radio>
                            </div>
                          ))}
                      </Radio.Group>
                    ) : (
                      <div className="nofound0">
                        No Data <span> Found !</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={14} lg={14}>
            {loading ? (
              <Spin size="large" className="spinner" />
            ) : (
              <Row gutter={[16, 16]}>
                {Object.keys(Athlete_id).length == "" &&
                Object.keys(athlete_detail).length == "" ? (
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="nofound0">Please Select the Athlete</div>
                  </Col>
                ) : (
                  <>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <h3 className="activecoaches d-flex justify-content-start">
                        Athlete Profile
                      </h3>
                    </Col>
                    <Col xs={24} sm={24} md={9} lg={9}>
                      <div className="athlete__home_img">
                        <img
                          src={
                            athlete_detail &&
                            athlete_detail.user &&
                            athlete_detail.user.get_user_details &&
                            athlete_detail.user.get_user_details.avatar != null
                              ? UPLOAD_PIC +
                                athlete_detail.user.get_user_details.avatar
                              : profile
                          }
                          alt=""
                        />
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={15} lg={15}>
                      <div className="profileinform">
                        <p>
                          <b>Name : </b>{" "}
                          <span>
                            <p>
                              {athlete_detail &&
                              athlete_detail.user &&
                              athlete_detail.user.fname != ""
                                ? athlete_detail.user.fname
                                : "N/A"}
                            </p>
                            <p>
                              {athlete_detail &&
                              athlete_detail.user &&
                              athlete_detail.user.lname != ""
                                ? athlete_detail.user.lname
                                : "N/A"}
                            </p>
                          </span>
                        </p>
                        <p>
                          <b>Email : </b>
                          <span>
                            {athlete_detail &&
                            athlete_detail.user &&
                            athlete_detail.user.email != ""
                              ? athlete_detail.user.email
                              : "N/A"}
                          </span>
                        </p>
                        <p>
                          <b>Contact : </b>
                          <span>
                            {athlete_detail &&
                            athlete_detail.user &&
                            athlete_detail.user.get_user_details != ""
                              ? athlete_detail.user.get_user_details.phone
                              : "N/A"}
                          </span>
                        </p>
                        <p>
                          <b> Address : </b>
                          <span>
                            {athlete_detail &&
                            athlete_detail.user &&
                            athlete_detail.user.get_user_details != ""
                              ? athlete_detail.user.get_user_details.address
                              : "N/A"}
                          </span>
                        </p>

                        <p>
                          <b> Postcode : </b>
                          <span>
                            {athlete_detail &&
                            athlete_detail.user &&
                            athlete_detail.user.get_user_details &&
                            athlete_detail.user.get_user_details.description
                              ? athlete_detail.user.get_user_details.postal_code
                              : "N/A"}
                          </span>
                        </p>
                        {athlete_skill != "" ? (
                          <div className="profileinform">
                            <b>Skills:</b>
                            <span>
                              {athlete_skill.map((item, i) => (
                                <>
                                  <p>
                                    {item && item.skill && item.skill.name
                                      ? item.skill.name
                                      : null}
                                  </p>
                                  <p>
                                    {i < athlete_skill.length - 1 ? "," : null}
                                  </p>
                                </>
                              ))}
                            </span>
                          </div>
                        ) : null}
                        {athlete_detail &&
                        athlete_detail.user &&
                        athlete_detail.user.athlete_extra_details != null ? (
                          <>
                            {athlete_detail &&
                            athlete_detail.user &&
                            athlete_detail.user.athlete_extra_details &&
                            athlete_detail.user.athlete_extra_details
                              .additional_interests != null ? (
                              <p>
                                <b>Additional Interest:</b>
                                <span>
                                  {athlete_detail &&
                                  athlete_detail.user &&
                                  athlete_detail.user.athlete_extra_details &&
                                  athlete_detail.user.athlete_extra_details
                                    .additional_interests != null
                                    ? athlete_detail.user.athlete_extra_details
                                        .additional_interests
                                    : "N/A"}
                                </span>
                              </p>
                            ) : null}
                            {athlete_detail &&
                            athlete_detail.user &&
                            athlete_detail.user.athlete_extra_details &&
                            athlete_detail.user.athlete_extra_details
                              .extra_curricular != null ? (
                              <p>
                                <b>Extra Curriculum:</b>
                                <span>
                                  {athlete_detail &&
                                  athlete_detail.user &&
                                  athlete_detail.user.athlete_extra_details &&
                                  athlete_detail.user.athlete_extra_details
                                    .extra_curricular != null
                                    ? athlete_detail.user.athlete_extra_details
                                        .extra_curricular
                                    : "N/A"}
                                </span>
                              </p>
                            ) : null}
                            {athlete_detail &&
                            athlete_detail.user &&
                            athlete_detail.user.athlete_extra_details &&
                            athlete_detail.user.athlete_extra_details
                              .family_household != null ? (
                              <p>
                                <b>Single family household:</b>
                                <span>
                                  {athlete_detail &&
                                  athlete_detail.user &&
                                  athlete_detail.user.athlete_extra_details &&
                                  athlete_detail.user.athlete_extra_details
                                    .family_household != 0
                                    ? "Yes"
                                    : "No"}
                                </span>
                              </p>
                            ) : null}
                            {athlete_detail &&
                            athlete_detail.user &&
                            athlete_detail.user.athlete_extra_details &&
                            athlete_detail.user.athlete_extra_details
                              .first_generation_college_student != null ? (
                              <p>
                                <b>First generation college student:</b>
                                <span>
                                  {athlete_detail &&
                                  athlete_detail.user &&
                                  athlete_detail.user.athlete_extra_details &&
                                  athlete_detail.user.athlete_extra_details
                                    .first_generation_college_student != 0
                                    ? "Yes"
                                    : "No"}
                                </span>
                              </p>
                            ) : null}
                          </>
                        ) : null}
                      </div>
                    </Col>
                  </>
                )}
              </Row>
            )}
          </Col>
        </Row>
      </div>
      {athlete_detail &&
      athlete_detail.user &&
      athlete_detail.user.get_user_details &&
      athlete_detail.user.get_user_details.description ? (
        <div className="brifhding">
          <h2 className="themestek-custom-heading">Description:</h2>
          {loading ? (
            <Skeleton />
          ) : (
            <p>
              {athlete_detail &&
              athlete_detail.user &&
              athlete_detail.user.get_user_details &&
              athlete_detail.user.get_user_details.description
                ? athlete_detail.user.get_user_details.description
                : "N/A"}
            </p>
          )}
        </div>
      ) : null}
      {/* <div className="athlete__home"> */}
      {dataId == undefined /* && getRequestedAthlete == "" */ ? null : (
        <Row
          gutter={[25, 16]}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              className="ant-btn ant-btn btn__profile1"
              onClick={() => athleteAccepted()}
            >
              Accept
            </Button>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <RejectForm id={athlete_detail.id} />
            {/* <Button
            className="ant-btn ant-btn btn__profile0"
            onClick={() => athleteRejected()}
          >
            Reject
          </Button> */}
          </Col>
        </Row>
      )}
      {/* </div> */}
    </div>
  );
}

export default AthleteRequestPage;
