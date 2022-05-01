import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Skeleton,
  Row,
  Col,
  Form,
  Input,
  Modal,
  Spin,
  Radio,
} from "antd";
import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  athleteDetail,
  acceptAthlete,
  rejectAthlete,
  removeAthlete,
  get_Requested_Athlete,
  athleteSeenByCoach,
} from "../../redux/actions/coachAction";
import { getResumeById } from "../../redux/actions/resumeAction";
import profile from "../../assets/logo1.png";
import moment from "moment";
import { FcSportsMode } from "react-icons/fc";

import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
  AiFillLinkedin,
  AiOutlineDoubleLeft,
} from "react-icons/ai";
import {
  REQUESTED,
  UPLOAD_PIC,
  YOUTUBE_LINK,
} from "../../constants/ActionType";
import RejectForm from "../rejectpage/RejectForm";
import ShowMoreText from "react-show-more-text";
/* import {
  athleteCoachDetails,
  updateCoachSkill,
  companyCoach,
  assignCoachToAthlete,
  getCoachToAssignAthlete,
} from "../../redux/actions/companyaction"; */
import { listOfCoach, coachAssign } from "../../redux/actions/coachAction";
import { WechatOutlined } from "@ant-design/icons";
import StarRatings from 'react-star-ratings';
/* s */

function AthleteDetail() {
  const [videoUrl, setURL] = useState("");
  let { id } = useParams();
  const dispatch = useDispatch();
  let history = useHistory();
  const coach_detail = useSelector((state) => state.coach_detail);
  const resume = useSelector((state) => state.resume.get_Resume_By_Id);
  const [loadingData, setLoadingData] = useState(true);
  const company_detail = useSelector((state) => state.company_detail);
  const {
    company_Coach,

    get_Coach_To_Assign_Athlete,
  } = company_detail;

  const {
    loading,
    athlete_detail,
    athlete_status,
    acceptRejectFlag,
    athlete_skill,
    list_Of_Coach,
  } = coach_detail;

  useEffect(() => {
    collectAThleteDetail();
  }, [id]);

  const collectAThleteDetail = async () => {
    await dispatch(athleteDetail(id));
    await dispatch(getResumeById(id));
    if (athlete_status && athlete_status.status != REQUESTED) {
      await dispatch(athleteSeenByCoach(id));
    }
  };

  /*   useEffect(() => {
    dispatch(athleteDetail(id));
    dispatch(getResumeById(id));
    if (athlete_status && athlete_status.status != REQUESTED) {
      dispatch(athleteSeenByCoach(id));
    }
  
  }, [id]); */

  const [recommend, setRecommend] = useState();

  const selectRecommend = (e) => {
    setRecommend(e.target.value);
  };

  const userDetail = useSelector((state) => state.user.userDetail);

  useEffect(() => {
    collectListOfCoach();
  }, [userDetail]);

  const collectListOfCoach = async () => {
    if (Object.keys(userDetail).length != "") {
      const companyID =
        userDetail && userDetail.company && userDetail.company.company_id != ""
          ? userDetail.company.company_id
          : null;
      await dispatch(listOfCoach(companyID));
    }
  };

  /* useEffect(() => {
    dispatch(listOfCoach(userDetail.company.company_id));
  }, [id]); */

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

  const { form } = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModalRemove = () => {
    setIsRemove(true);
  };

  const handleCancelRemove = () => {
    setIsRemove(false);
  };

  const athleteAccepted = async () => {
    await dispatch(acceptAthlete(athlete_detail.id));
    dispatch(athleteDetail(id));
    /* history.push("/profile/request_success"); */
  };
  const onFinish = async (data) => {
    const newData = await {
      ...data,
      request_id: athlete_detail.id,
    };
    await dispatch(rejectAthlete(newData));
    setIsModalVisible(false);
    history.push("/profile");
    dispatch(athleteDetail(id));
  };

  const onRemove = async (data) => {
    const newData = await {
      ...data,
      request_id: athlete_detail.id,
    };
    await dispatch(removeAthlete(newData));
    setIsRemove(false);
    history.push("/profile");

    /* dispatch(athleteDetail(id)); */
  };
  const [isModalReccomend, setIsModalReccomend] = useState(false);

  const showModalRecommend = () => {
    setIsModalReccomend(true);
  };

  const handleCancelRecommend = () => {
    setIsModalReccomend(false);
  };
  const IsRecommended = async () => {
    /* const newDatalogin = await {
      athlete_id: id,
      coach_id: recommend,
    }; */
    await dispatch(
      coachAssign({
        athlete_id: id,
        coach_id: recommend,
      })
    );
    /* console.log("radio checked", e.target.value); */

    setIsModalReccomend(false);
    setRecommend();
  };

  useEffect(() => {
    if (
      athlete_detail &&
      athlete_detail.user &&
      athlete_detail.user.get_user_details &&
      athlete_detail.user.get_user_details.video_url != null
    ) {
      const youTubeUrl = athlete_detail.user.get_user_details.video_url;
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

      /* const splitted = youTubeUrl.split("/");
      const updatedURL = YOUTUBE_LINK + splitted[splitted.length - 1];
      setURL(updatedURL); */
    }
  }, [athlete_detail]);

  console.log("test_athlete", athlete_detail)
  return (
    <div className="newContnainer">
      {loading ? (
        <Spin className="loader-ld" />
      ) : (
        <>
          <Card>
            <Row gutter={[25, 16]}>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="back-btn-bb">
                  <Button type="link" onClick={() => history.push("/profile")}>
                    <AiOutlineDoubleLeft />
                  </Button>
                  <h2 className="themestek-custom-heading">Athlete</h2>{" "}
                  <div
                    className="btn-profil-t"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    {list_Of_Coach == "" ? null : (
                      <Button
                        className="ant-btn ant-btn btn__profile1"
                        onClick={showModalRecommend}
                      >
                        Assign Coach
                      </Button>
                    )}
                  </div>
                  <Modal
                    title=" Assign Coach "
                    visible={isModalReccomend}
                    onCancel={handleCancelRecommend}
                    footer={null}
                    className="modelbox_mb"
                  >
                    <div>
                      <>
                        {list_Of_Coach == "" ? (
                          <div className="nofound0">
                            No Data <span> Found !</span>
                          </div>
                        ) : (
                          <Radio.Group
                            name="radiogroup"
                            onChange={selectRecommend}
                            value={recommend}
                          >
                            {list_Of_Coach &&
                              list_Of_Coach.map((item) => (
                                <div className="form-check">
                                  <Radio value={item ? item.coach_id : "1"}>
                                    <span>
                                      {item &&
                                        item.coach_details &&
                                        item.coach_details.fname != ""
                                        ? item.coach_details.fname
                                        : "N/A"}
                                    </span>
                                    <span> </span>
                                    <span>
                                      {item &&
                                        item.coach_details &&
                                        item.coach_details.lname != ""
                                        ? item.coach_details.lname
                                        : "N/A"}
                                    </span>
                                  </Radio>
                                </div>
                              ))}
                          </Radio.Group>
                        )}
                      </>
                    </div>
                    {recommend && company_Coach != "" ? (
                      <div
                        className="btn-profil-t"
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      >
                        <Button
                          className="ant-btn ant-btn btn__profile1"
                          onClick={IsRecommended}
                        >
                          Assign
                        </Button>
                      </div>
                    ) : null}
                  </Modal>
                </div>
              </Col>
              <Col xs={24} sm={24} md={7} lg={7}>
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
                  </div>
                  <div className="profileinform">
                    <b>Email :</b>
                    <span>
                      {athlete_detail &&
                        athlete_detail.user &&
                        athlete_detail.user.email != ""
                        ? athlete_detail.user.email
                        : "N/A"}
                    </span>
                  </div>
                  <div className="profileinform">
                    <b>Contact :</b>
                    <span>
                      {athlete_detail &&
                        athlete_detail.user &&
                        athlete_detail.user.get_user_details != ""
                        ? athlete_detail.user.get_user_details.phone
                        : "N/A"}
                    </span>
                  </div>
                  <div className="profileinform">
                    <b>Address :</b>
                    <span>
                      {athlete_detail &&
                        athlete_detail.user &&
                        athlete_detail.user.get_user_details != ""
                        ? athlete_detail.user.get_user_details.address
                        : "N/A"}
                    </span>
                  </div>
                  <div className="profileinform">
                    <b>Postcode:</b>
                    <span>
                      {athlete_detail &&
                        athlete_detail.user &&
                        athlete_detail.user.get_user_details &&
                        athlete_detail.user.get_user_details.postal_code
                        ? athlete_detail.user.get_user_details.postal_code
                        : "N/A"}
                    </span>
                  </div>
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
                            <p>{i < athlete_skill.length - 1 ? "," : null}</p>
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
                        <div className="profileinform">
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
                        </div>
                      ) : null}
                      {athlete_detail &&
                        athlete_detail.user &&
                        athlete_detail.user.athlete_extra_details &&
                        athlete_detail.user.athlete_extra_details
                          .extra_curricular != null ? (
                        <div className="profileinform">
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
                        </div>
                      ) : null}
                      {athlete_detail &&
                        athlete_detail.user &&
                        athlete_detail.user.athlete_extra_details &&
                        athlete_detail.user.athlete_extra_details
                          .family_household != null ? (
                        <div className="profileinform">
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
                        </div>
                      ) : null}
                      {athlete_detail &&
                        athlete_detail.user &&
                        athlete_detail.user.athlete_extra_details &&
                        athlete_detail.user.athlete_extra_details
                          .first_generation_college_student != null ? (
                        <div className="profileinform">
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
                        </div>
                      ) : null}
                    </>
                  ) : null}
                </div>
                {/*   {athlete_status && athlete_status.status == REQUESTED ? null : (
                 
                )} */}
                {athlete_status && athlete_status.status == REQUESTED ? (
                  <Row gutter={[25, 16]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div>
                        <Button
                          className="ant-btn ant-btn btn__profile1 "
                          onClick={() => athleteAccepted()}
                        >
                          Accept
                        </Button>
                      </div>

                      <div>
                        {/* <Button className="ant-btn ant-btn btn__profile1 ">
                        <Link to="#">Reject</Link>
                      </Button> */}
                        {/* <RejectForm id={athlete_detail.id} /> */}
                        <div>
                          <Button
                            className="ant-btn ant-btn btn__profile1"
                            onClick={showModal}
                          >
                            Reject
                          </Button>
                          <Modal
                            title="Reject "
                            visible={isModalVisible}
                            onCancel={handleCancel}
                            footer={null}
                          >
                            <Form
                              name="basic"
                              onFinish={onFinish}
                              layout="vertical"
                              form={form}
                            >
                              <Form.Item
                                name="reject_message"
                                label=" Reason for Rejection "
                                required={true}
                                rules={[
                                  {
                                    required: true,
                                    message: "This field is Mandatory!",
                                  },
                                ]}
                              >
                                <Input placeholder="Enter your reason here!" />
                              </Form.Item>

                              <Form.Item>
                                <div className="button__area2">
                                  <Button
                                    className="ant-btn ant-btn btn__profile1"
                                    htmlType="submit"
                                  >
                                    Reject
                                  </Button>
                                </div>
                              </Form.Item>
                            </Form>
                          </Modal>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <Row gutter={[25, 16]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div>
                        <Button
                          className="ant-btn ant-btn btn__profile1 "
                          icon={<WechatOutlined />}
                          onClick={() =>
                            history.push("/chat", { contactID: id })
                          }
                        >
                          Message
                        </Button>
                      </div>
                      <div>
                        <Button
                          className="ant-btn ant-btn btn__profile1 "
                          onClick={showModalRemove}
                        >
                          Remove
                        </Button>
                        <Modal
                          title="Remove "
                          visible={isRemove}
                          onCancel={handleCancelRemove}
                          footer={null}
                        >
                          <Form
                            name="basic"
                            onFinish={onRemove}
                            layout="vertical"
                          >
                            <Form.Item
                              name="reject_message"
                              label=" Reason for Removing "
                              required={true}
                              rules={[
                                {
                                  required: true,
                                  message: "This field is Mandatory!",
                                },
                              ]}
                            >
                              <Input placeholder="Enter your reason here!" />
                            </Form.Item>

                            <Form.Item>
                              <div className="button__area2">
                                <Button
                                  className="ant-btn ant-btn btn__profile1"
                                  htmlType="submit"
                                >
                                  Remove
                                </Button>
                              </div>
                            </Form.Item>
                          </Form>
                        </Modal>
                      </div>
                    </Col>
                  </Row>
                )}
              </Col>
              {athlete_detail &&
                athlete_detail.user &&
                athlete_detail.user.get_user_details &&
                athlete_detail.user.get_user_details.video_url != null ? (
                <>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <Col xs={24} sm={24} md={7} lg={7}>
                      <div>
                        <div className="mb-4">
                          {/* {
                            athlete_detail &&
                              athlete_detail.rating != undefined ? (
                              <StarRatings
                                rating={
                                  Number(athlete_detail.rating.total)
                                  // 2.403
                                }
                                starDimension="24px"
                                starSpacing="4px"
                              />
                            ) : null
                          } */}
                          {
                            athlete_detail &&
                              athlete_detail.rating != undefined ? (
                                <p className="text-end">Rating- <span style={{color:"#4862AE"}}>{Number(athlete_detail.rating.total)}</span></p>
                            ) : null
                          }
                        </div>
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
                </>
              ) : (
                <Col xs={24} sm={24} md={7} lg={7}>
                  <div className="mb-4">
                    {
                      athlete_detail &&
                        athlete_detail.rating != undefined ? (
                          <>
                        {/* <StarRatings
                          rating={
                            Number(athlete_detail.rating.total)
                            // 2.403
                          }
                          starDimension="24px"
                          starSpacing="4px"
                        /> */}
                        <p className="text-end">Rating- <span style={{color:"#4862AE"}}>{Number(athlete_detail.rating.total)}</span></p>
                        </>
                      ) : null
                    }
                  </div>
                </Col>
              )}
            </Row>
          </Card>
          {athlete_detail &&
            athlete_detail.user &&
            athlete_detail.user.get_user_details &&
            athlete_detail.user.get_user_details.description == null ? null : (
            <Card>
              <div className="brifhding">
                <h2 className="themestek-custom-heading">Description:</h2>

                <p>
                  {athlete_detail &&
                    athlete_detail.user &&
                    athlete_detail.user.get_user_details &&
                    athlete_detail.user.get_user_details.description
                    ? athlete_detail.user.get_user_details.description
                    : "N/A"}
                </p>
              </div>
            </Card>
          )}
          <Card>
            <Row
              gutter={[10, 10]}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Col xs={24} sm={24} md={19} lg={19}>
                <div className="">
                  <h2 className=" eds-text-hl"> Resume</h2>

                  <div className="resume_name">
                    <b className="fullname-rn">
                      <i class="fa fa-user-circle-o" aria-hidden="true"></i>

                      <span className="name-rn">
                        {" "}
                        {athlete_detail &&
                          athlete_detail.user &&
                          athlete_detail.user.fname != ""
                          ? athlete_detail.user.fname
                          : "N/A"}
                      </span>
                      <span> </span>
                      <span className="surname-rn">
                        {" "}
                        {athlete_detail &&
                          athlete_detail.user &&
                          athlete_detail.user.lname != ""
                          ? athlete_detail.user.lname
                          : "N/A"}
                      </span>
                    </b>
                    <p className="email-rn">
                      <i class="fa fa-envelope" aria-hidden="true"></i>
                      {athlete_detail &&
                        athlete_detail.user &&
                        athlete_detail.user.email != ""
                        ? athlete_detail.user.email
                        : "N/A"}
                    </p>
                    <p className="email-rn">
                      <i class="fa fa-phone" aria-hidden="true"></i>
                      {athlete_detail &&
                        athlete_detail.user &&
                        athlete_detail.user.get_user_details != ""
                        ? athlete_detail.user.get_user_details.phone
                        : "N/A"}
                    </p>
                    <>
                      {athlete_skill != "" ? (
                        <p className="email-rn">
                          <div className="icon0qwe">
                            <FcSportsMode />
                          </div>
                          <span className="span0hyk">
                            {athlete_skill.map((item, i) => (
                              <span className="spanskill-0">
                                {item && item.skill && item.skill.name
                                  ? item.skill.name
                                  : null}

                                <span>
                                  {i < athlete_skill.length - 1 ? "," : null}
                                </span>
                              </span>
                            ))}
                          </span>
                        </p>
                      ) : null}
                    </>
                    {/*  <p className="email-rn">
                    <FcSportsMode />
                    Cricket, Football, Volleyball
                  </p> */}
                  </div>

                  <div className="resum-education">
                    <Row
                      gutter={[10, 10]}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Col xs={24} sm={24} md={12} lg={12}>
                        <h2 className="heading-education"> Education</h2>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12}>
                        <div
                          className="btnedu-0"
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        ></div>
                      </Col>
                    </Row>

                    {resume && resume.education == "" ? (
                      <div className="nofound0">
                        No Data <span> Found !</span>
                      </div>
                    ) : (
                      <>
                        {resume &&
                          resume.education &&
                          resume.education.map((item) => (
                            <div className="main-institute">
                              <div className="educ-hding-eh">
                                <Row
                                  gutter={[10, 10]}
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Col xs={24} sm={24} md={12} lg={12}>
                                    <h2 className="heading-insti">
                                      {item.institute}
                                    </h2>
                                  </Col>
                                  <Col xs={24} sm={24} md={12} lg={12}>
                                    <div
                                      className="editicon_ei"
                                      style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                      }}
                                    ></div>
                                  </Col>
                                </Row>
                              </div>
                              <div className="name-grade  present-grade-pg">
                                <b>{item.name}</b>
                                <span> - </span>
                                <p>{item.grade}</p>
                              </div>
                              <div className="name-grade">
                                <b>
                                  {item && item.university != ""
                                    ? item.university
                                    : "N/A"}
                                </b>
                              </div>
                              <div className="name-grade">
                                <p>{moment(item.end_date).format(" YYYY")}</p>
                                {/* <b>{moment(item.start_date).format("L")}</b>
                                <p>{moment(item.end_date).format("L")}</p> */}
                              </div>
                            </div>
                          ))}
                      </>
                    )}
                  </div>

                  <div className="resum-education">
                    <Row
                      gutter={[10, 10]}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Col xs={24} sm={24} md={12} lg={12}>
                        <h2 className="heading-education"> Employment</h2>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12}>
                        <div
                          className="btnedu-0"
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        ></div>
                      </Col>
                    </Row>

                    <>
                      {resume && resume.work == "" ? (
                        <div className="nofound0">
                          No Data <span> Found !</span>
                        </div>
                      ) : (
                        <>
                          {resume &&
                            resume.work &&
                            resume.work.map((item) => (
                              <div className="main-institute">
                                <Row
                                  gutter={[10, 10]}
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Col xs={24} sm={24} md={12} lg={12}>
                                    <h2 className="heading-insti">
                                      {item.job_title}
                                    </h2>
                                  </Col>
                                  <Col xs={24} sm={24} md={12} lg={12}>
                                    <div
                                      className="editicon_ei"
                                      style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                      }}
                                    ></div>
                                  </Col>
                                </Row>
                                <div className="name-grade">
                                  <b>{item.company_name}</b>
                                </div>

                                <div className="name-grade">
                                  <b>{moment(item.start_date).format("L")}</b>
                                  <p>{moment(item.end_date).format("L")}</p>
                                </div>
                                <div className="name-grade">
                                  <b>
                                    {item && item.skills != ""
                                      ? item.skills
                                      : "N/A"}
                                  </b>
                                </div>
                              </div>
                            ))}
                        </>
                      )}
                    </>
                  </div>
                  <div className="resum-education">
                    <Row
                      gutter={[10, 10]}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Col xs={24} sm={24} md={12} lg={12}>
                        <h2 className="heading-education"> Social Media</h2>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12}>
                        <div
                          className="btnedu-0"
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        ></div>
                      </Col>
                    </Row>

                    <>
                      {resume && resume.social_media == "" ? null : (
                        <div className="main-institute">
                          {resume &&
                            resume.social_media &&
                            resume.social_media.map((item) => (
                              <>
                                <div className="educ-hding-eh">
                                  <Row
                                    gutter={[10, 10]}
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Col xs={24} sm={24} md={12} lg={12}>
                                      <h2 className="heading-insti">
                                        {item && item.name == "facebook" ? (
                                          <div className="social-media-icons">
                                            <AiFillFacebook />
                                            <a href={item.link} target="_blank">
                                              {item.link}
                                            </a>
                                          </div>
                                        ) : null}
                                        {item && item.name == "instagram" ? (
                                          <div className="social-media-icons">
                                            <AiFillInstagram />
                                            <a href={item.link} target="_blank">
                                              {item.link}
                                            </a>
                                          </div>
                                        ) : null}
                                        {item && item.name == "twitter" ? (
                                          <div className="social-media-icons">
                                            <AiFillTwitterSquare />
                                            <a href={item.link} target="_blank">
                                              {item.link}
                                            </a>
                                          </div>
                                        ) : null}
                                        {item && item.name == "Linkedin" ? (
                                          <div className="social-media-icons">
                                            <AiFillLinkedin />
                                            <a href={item.link} target="_blank">
                                              {item.link}
                                            </a>
                                          </div>
                                        ) : null}
                                        {/* <a href={item.link} target="_blank">
                                    {item.name}
                                  </a> */}
                                      </h2>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12}></Col>
                                  </Row>
                                </div>
                                <div className="name-grade">
                                  {/*  <a href= target="_blank">
                                {item.link}
                              </a> */}
                                </div>
                              </>
                            ))}
                        </div>
                      )}
                    </>
                  </div>

                  <div className="resum-education">
                    <Row
                      gutter={[10, 10]}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Col xs={24} sm={24} md={12} lg={12}>
                        <h2 className="heading-education">Summary</h2>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12}>
                        <div
                          className="editicon_ei"
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        ></div>
                      </Col>
                    </Row>
                    <div className="main-institute">
                      <div className="name-grade">
                        <b>
                          {resume && resume.summary != "" ? (
                            resume.summary
                          ) : (
                            <div className="nofound0">
                              No Data <span> Found !</span>
                            </div>
                          )}
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </>
      )}
    </div>
  );
}
export default AthleteDetail;
