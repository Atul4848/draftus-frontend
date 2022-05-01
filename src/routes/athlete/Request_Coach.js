import React, { useEffect } from "react";

import { Row, Col, Button, Skeleton, Spin, Radio, Collapse, Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  requestCoaches,
  coachDetail,
  findCoachs,
  findCoach_id,
} from "../../redux/actions/athleteAction";
import { useHistory } from "react-router-dom";
import profile from "../../assets/logo1.png";
import { UPLOAD_PIC } from "../../constants/ActionType";
import ShowMoreText from "react-show-more-text";
import { Link } from "react-router-dom";
import { AiOutlineDoubleLeft } from "react-icons/ai";

function Request_Coach() {
  const { Panel } = Collapse;
  let history = useHistory();
  const dispatch = useDispatch();
  const athlete_detail = useSelector((state) => state.athlete_detail);
  const {
    loading,
    Coach_id,
    coach_detail,
    findCoach,
    coach_detail_skill,
    coach_detail_threads,
  } = athlete_detail;

  const RequestCoach = async () => {
    await dispatch(requestCoaches(Coach_id));
    /* history.push("/profile/request_success"); */
    dispatch(coachDetail());
    dispatch(findCoachs());
    dispatch(findCoach_id());
    setDataId();
  };

  useEffect(() => {
    dispatch(coachDetail(Coach_id));
  }, [Coach_id]);
  /*   useEffect(() => {
    dispatch(coachViewForum());
  }, []); */

  useEffect(() => {
    collectUserData();
  }, []);

  const collectUserData = async () => {
    await dispatch(findCoachs());
  };
  const [value, setValue] = React.useState(1);
  const [dataId, setDataId] = React.useState();

  const onChange = async (e) => {
    await dispatch(findCoach_id(e.target.value));
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
              <h2 className="themestek-custom-heading">Request Coach</h2>
            </div>
            {/*  <h2 className="themestek-custom-heading">Request Coach</h2> */}
          </Col>
          <Col xs={24} sm={24} md={10} lg={10}>
            <div>
              <h3 className="activecoaches d-flex justify-content-start">
                COACHES
              </h3>

              <div className="coachesflied">
                {loading ? (
                  <Skeleton />
                ) : (
                  <>
                    {findCoach == "" ? (
                      <div className="nofound0">
                        No Data <span> Found !</span>
                      </div>
                    ) : (
                      <Radio.Group
                        name="radiogroup"
                        onChange={onChange}
                        value={value}
                      >
                        {findCoach &&
                          findCoach.map((item) => (
                            <div className="form-check">
                              <Radio value={item.id}>
                                <span>{item ? item.fname : "n/a"}</span>
                                <span> </span>
                                <span>{item ? item.lname : "n/a"}</span>
                              </Radio>
                            </div>
                          ))}
                      </Radio.Group>
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
                {Object.keys(Coach_id).length == "" &&
                Object.keys(coach_detail).length == "" ? (
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="nofound0">Please Select the Coach</div>
                  </Col>
                ) : (
                  <>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <h3 className="activecoaches d-flex justify-content-start">
                        Coach's Profile
                      </h3>
                    </Col>
                    <Col xs={24} sm={24} md={9} lg={9}>
                      <div className="athlete__home_img">
                        <img
                          src={
                            coach_detail &&
                            coach_detail.get_user_details &&
                            coach_detail.get_user_details.avatar != null
                              ? UPLOAD_PIC +
                                coach_detail.get_user_details.avatar
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
                              {coach_detail != "" ? coach_detail.fname : "N/A"}
                            </p>
                            <p>{coach_detail ? coach_detail.lname : "N/A"}</p>
                          </span>
                        </p>
                        <p>
                          <b>Email : </b>
                          <span>
                            {coach_detail && coach_detail.email
                              ? coach_detail.email
                              : "N/A"}
                          </span>
                        </p>
                        <p>
                          <b>Contact : </b>
                          <span>
                            {coach_detail &&
                            coach_detail.get_user_details &&
                            coach_detail.get_user_details.phone
                              ? coach_detail.get_user_details.phone
                              : "N/A"}
                          </span>
                        </p>
                        <p>
                          <b> Address : </b>
                          <span>
                            {coach_detail &&
                            coach_detail.get_user_details &&
                            coach_detail.get_user_details.address
                              ? coach_detail.get_user_details.address
                              : "N/A"}
                          </span>
                        </p>

                        <p>
                          <b> Postcode : </b>
                          <span>
                            {coach_detail &&
                            coach_detail.get_user_details &&
                            coach_detail.get_user_details.postal_code
                              ? coach_detail.get_user_details.postal_code
                              : "N/A"}
                          </span>
                        </p>
                        {coach_detail_skill != "" ? (
                          <p>
                            <b>Skills:</b>
                            <span>
                              {coach_detail_skill.map((item, i) => (
                                <>
                                  <p>
                                    {item && item.skill && item.skill.name
                                      ? item.skill.name
                                      : null}
                                  </p>
                                  <p>
                                    {i < coach_detail_skill.length - 1
                                      ? ","
                                      : null}
                                  </p>
                                </>
                              ))}
                            </span>
                          </p>
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
      {}
      {coach_detail &&
      coach_detail.get_user_details &&
      coach_detail.get_user_details.description ? (
        <div className="brifhding">
          <h2 className="themestek-custom-heading">Description:</h2>
          {loading ? (
            <Skeleton />
          ) : (
            <p>
              {coach_detail &&
              coach_detail.get_user_details &&
              coach_detail.get_user_details.description
                ? coach_detail.get_user_details.description
                : "N/A"}
            </p>
          )}
        </div>
      ) : null}

      <div className="athlete__home">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <div>
              {loading ? (
                <Skeleton />
              ) : (
                <>
                  <h3 className="activecoaches d-flex justify-content-start">
                    Coach Forum
                  </h3>
                  <div className="coachesflied">
                    {coach_detail_threads == "" ? (
                      <div className="nofound0">
                        No Data <span> Found !</span>
                      </div>
                    ) : (
                      <Collapse ghost>
                        {coach_detail_threads &&
                          coach_detail_threads.map((item) => (
                            <Panel
                              header={
                                <span>
                                  {item && item.title != ""
                                    ? item.title
                                    : "N/A"}
                                </span>
                              }
                              key={item ? item.id : "1"}
                            >
                              <div className="drpdownclas">
                                <span>
                                  <ShowMoreText
                                    lines={3}
                                    more="Show more"
                                    less="Show less"
                                    expanded={false}
                                    truncatedEndingComponent={"..."}

                                    //onClick={executeScroll}
                                  >
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          item && item.description != ""
                                            ? item.description
                                            : "N/A",
                                      }}
                                    ></div>
                                  </ShowMoreText>
                                </span>
                              </div>
                              {/* <Link
                                to={
                                  "/profile/athlete-view-coach-forum-detail/" +
                                  item.id
                                }
                              >
                                <Button>View Detail</Button>
                              </Link> */}
                            </Panel>
                          ))}
                      </Collapse>
                    )}
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
      {dataId == undefined ? null : (
        <Col xs={24} sm={24} md={8} lg={8}>
          <div className="wgl-buttonshiftl">
            <Button onClick={() => RequestCoach()}>Request Coach</Button>
          </div>
        </Col>
      )}
    </div>
  );
}

export default Request_Coach;
