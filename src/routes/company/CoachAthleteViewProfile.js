import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  Button,
  Skeleton,
  Row,
  Col,
  Modal,
  Form,
  Input,
  Select,
  Radio,
  Spin,
} from "antd";
import { BsFillPenFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  athleteCoachDetails,
  updateCoachSkill,
  companyCoach,
  assignCoachToAthlete,
  getCoachToAssignAthlete,
} from "../../redux/actions/companyaction";
import { getSkill } from "../../redux/actions/curriculumAction";
import moment from "moment";
import { getResumeById } from "../../redux/actions/resumeAction";
import profile from "../../assets/logo1.png";
import { UPLOAD_PIC, YOUTUBE_LINK, COACH } from "../../constants/ActionType";
import ShowMoreText from "react-show-more-text";
import { FcSportsMode } from "react-icons/fc";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
  AiFillLinkedin,
  AiOutlineDoubleLeft,
} from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { WechatOutlined } from "@ant-design/icons";
import StarRatings from 'react-star-ratings';


function CoachAthleteViewProfile() {
  const [skills, setSkills] = useState([]);
  let history = useHistory();
  const [videoUrl, setURL] = useState("");
  const [videoUrlAthlete, setURLAthlete] = useState("");
  let { id } = useParams();
  const { Option } = Select;
  const dispatch = useDispatch();
  const company_detail = useSelector((state) => state.company_detail);
  const {
    coach_Athlete_details,
    rating,
    loading,
    coach_Athlete_skill,
    company_Coach,
    company_View_Athlete_Of_Coach,
    company_View_Coach_Of_Athlete,
    get_Coach_To_Assign_Athlete,
  } = company_detail;
  const resume = useSelector((state) => state.resume.get_Resume_By_Id);

  const selectSkill = (key) => {
    setSkills(key);
    console.log(key);
  };
  // console.log("rating",rating);
  useEffect(() => {
    dispatch(athleteCoachDetails(id));
    dispatch(getResumeById(id));
    dispatch(getCoachToAssignAthlete(id));
  }, [id]);

  useEffect(() => {
    if (
      coach_Athlete_details &&
      coach_Athlete_details.coach_details &&
      coach_Athlete_details.coach_details.get_user_details &&
      coach_Athlete_details.coach_details.get_user_details.video_url != null
    ) {
      const youTubeUrl =
        coach_Athlete_details.coach_details.get_user_details.video_url;
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
  }, [coach_Athlete_details]);

  useEffect(() => {
    if (
      coach_Athlete_details &&
      coach_Athlete_details.athlete_details &&
      coach_Athlete_details.athlete_details.get_user_details &&
      coach_Athlete_details.athlete_details.get_user_details.video_url != null
    ) {
      const youTubeUrlAthlete =
        coach_Athlete_details.athlete_details.get_user_details.video_url;
      const splittedAthlete = youTubeUrlAthlete.split("/");
      const updatedYoutubeUrlAthlete =
        splittedAthlete[splittedAthlete.length - 1];

      if (updatedYoutubeUrlAthlete != "=") {
        const splittedUrlAthlete = updatedYoutubeUrlAthlete.split("=");

        const updatedURLAthlete =
          YOUTUBE_LINK + splittedUrlAthlete[splittedUrlAthlete.length - 1];
        setURLAthlete(updatedURLAthlete);
      } else {
        const updatedURLAthlete =
          YOUTUBE_LINK + splittedAthlete[splittedAthlete.length - 1];
        setURLAthlete(updatedURLAthlete);
      }
      /* const splittedAthlete = youTubeUrlAthlete.split("/");
      const updatedURLAthlete =
        YOUTUBE_LINK + splittedAthlete[splittedAthlete.length - 1];
      setURLAthlete(updatedURLAthlete); */
    }
  }, [coach_Athlete_details]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const skill = useSelector((state) => state.curriculum_detail.skill);

  const [isModalReccomend, setIsModalReccomend] = useState(false);

  const showModalRecommend = () => {
    setIsModalReccomend(true);
  };

  const handleCancelRecommend = () => {
    setIsModalReccomend(false);
  };

  useEffect(() => {
    collectSkillData();
  }, []);

  const collectSkillData = async () => {
    await dispatch(getSkill());
  };

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    collectSocailmediaData();
  }, [coach_Athlete_skill]);

  const collectSocailmediaData = async () => {
    if (coach_Athlete_skill != "") {
      const formObj = {
        skill_id:
          coach_Athlete_skill &&
          coach_Athlete_skill.map((item) =>
            String(item && item.skill_id != "" ? item.skill_id : null)
          ),
      };
      console.log(formObj);
      await form.setFieldsValue(formObj);
    }
  };
  console.log(coach_Athlete_skill);

  const onFinish = async (data) => {
    const newData = await {
      ...data,
      coach_id: id,
    };
    await dispatch(updateCoachSkill(newData));
    setIsModalVisible(false);
    dispatch(athleteCoachDetails(id));
    dispatch(getResumeById(id));
  };

  useEffect(() => {
    collectUserData();
  }, []);

  const collectUserData = async () => {
    await dispatch(companyCoach());
  };

  const IsRecommended = async () => {
    const newDatalogin = await {
      athlete_id: id,
      coach_id: recommend,
    };
    await dispatch(assignCoachToAthlete(newDatalogin));
    /* console.log("radio checked", e.target.value); */

    setIsModalReccomend(false);
  };

  const [recommend, setRecommend] = useState();

  const selectRecommend = (e) => {
    setRecommend(e.target.value);
  };

  return (
    <div className="newContnainer">
      {loading ? (
        <Spin className="loader-ld" />
      ) : (
        <>
          <Card>
            <Row gutter={[25, 16]}>
              {coach_Athlete_details &&
                coach_Athlete_details.coach_details &&
                coach_Athlete_details.coach_details.role == COACH ? (
                <>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="back-btn-bb">
                      <Button
                        type="link"
                        onClick={() => history.push("/profile")}
                      >
                        <AiOutlineDoubleLeft />
                      </Button>
                      <h2 className="themestek-custom-heading">Coach</h2>{" "}
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={7} lg={7}>
                    <div className="athlete__home_img">
                      <img
                        src={
                          coach_Athlete_details &&
                            coach_Athlete_details.coach_details &&
                            coach_Athlete_details.coach_details
                              .get_user_details &&
                            coach_Athlete_details.coach_details.get_user_details
                              .avatar != null
                            ? UPLOAD_PIC +
                            coach_Athlete_details.coach_details
                              .get_user_details.avatar
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
                            {coach_Athlete_details &&
                              coach_Athlete_details.coach_details &&
                              coach_Athlete_details.coach_details.fname != ""
                              ? coach_Athlete_details.coach_details.fname
                              : "N/A"}
                          </p>
                          <p>
                            {coach_Athlete_details &&
                              coach_Athlete_details.coach_details &&
                              coach_Athlete_details.coach_details.lname != ""
                              ? coach_Athlete_details.coach_details.lname
                              : "N/A"}
                          </p>
                        </span>
                      </div>
                      <div className="profileinform">
                        <b>Email :</b>
                        <span>
                          {" "}
                          {coach_Athlete_details &&
                            coach_Athlete_details.coach_details &&
                            coach_Athlete_details.coach_details.email != ""
                            ? coach_Athlete_details.coach_details.email
                            : "N/A"}
                        </span>
                      </div>
                      <div className="profileinform">
                        <b>Contact :</b>
                        <span>
                          {" "}
                          {coach_Athlete_details &&
                            coach_Athlete_details.coach_details &&
                            coach_Athlete_details.coach_details
                              .get_user_details &&
                            coach_Athlete_details.coach_details.get_user_details
                              .phone != ""
                            ? coach_Athlete_details.coach_details
                              .get_user_details.phone
                            : "N/A"}
                        </span>
                      </div>
                      <div className="profileinform">
                        <b>Address :</b>
                        <span>
                          {coach_Athlete_details &&
                            coach_Athlete_details.coach_details &&
                            coach_Athlete_details.coach_details
                              .get_user_details &&
                            coach_Athlete_details.coach_details.get_user_details
                              .address != null
                            ? coach_Athlete_details.coach_details
                              .get_user_details.address
                            : "N/A"}
                        </span>
                      </div>
                      <div className="profileinform">
                        <b>Postcode:</b>
                        <span>
                          {coach_Athlete_details &&
                            coach_Athlete_details.coach_details &&
                            coach_Athlete_details.coach_details
                              .get_user_details &&
                            coach_Athlete_details.coach_details.get_user_details
                              .postal_code != null
                            ? coach_Athlete_details.coach_details
                              .get_user_details.postal_code
                            : "N/A"}
                        </span>
                      </div>
                      {coach_Athlete_skill != null ? (
                        <div className="profileinform-se">
                          <b>Skills:</b>
                          <div className="skilledit-se">
                            <span>
                              {coach_Athlete_skill.map((item, i) => (
                                <>
                                  <p>
                                    {item && item.skill && item.skill.name
                                      ? item.skill.name
                                      : null}
                                  </p>
                                  <p>
                                    {i < coach_Athlete_skill.length - 1
                                      ? ","
                                      : null}
                                  </p>
                                </>
                              ))}
                            </span>
                            {coach_Athlete_skill != null ? (
                              <>
                                <Button
                                  className="ant-btn ant-btn "
                                  onClick={showModal}
                                >
                                  <i
                                    class="fa fa-pencil"
                                    aria-hidden="true"
                                  ></i>
                                </Button>
                                <Modal
                                  title="Skill "
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
                                      name="skill_id"
                                      label=" Skills"
                                      required={true}
                                      rules={[
                                        {
                                          required: true,
                                          message: "This field is Mandatory!",
                                        },
                                      ]}
                                    >
                                      <Select
                                        mode="multiple"
                                        placeholder="select Skills"
                                        onChange={selectSkill}
                                        value={skills}
                                        optionLabelProp="label"
                                      >
                                        {skill.map((item) => (
                                          <Option
                                            key={item.id}
                                            label={item.name}
                                          >
                                            {item.name}
                                          </Option>
                                        ))}
                                      </Select>
                                    </Form.Item>

                                    <Form.Item>
                                      <div className="button__area2">
                                        <Button htmlType="submit">
                                          Submit
                                        </Button>
                                      </div>
                                    </Form.Item>
                                  </Form>
                                </Modal>
                              </>
                            ) : null}
                          </div>
                        </div>
                      ) : null}
                      <>
                        {company_View_Athlete_Of_Coach != "" ? (
                          <div className="profileinform-se">
                            <b>Athletes:</b>
                            <div className="skilledit-se">
                              <span>
                                {company_View_Athlete_Of_Coach &&
                                  company_View_Athlete_Of_Coach.map(
                                    (item, i) => (
                                      <>
                                        <p>
                                          {item &&
                                            item.user &&
                                            item.user.fname != ""
                                            ? item.user.fname
                                            : null}
                                        </p>

                                        <p>
                                          {item &&
                                            item.user &&
                                            item.user.lname != ""
                                            ? item.user.lname
                                            : null}
                                        </p>
                                        <p>
                                          {i <
                                            company_View_Athlete_Of_Coach.length -
                                            1
                                            ? ","
                                            : null}
                                        </p>
                                      </>
                                    )
                                  )}
                              </span>
                            </div>
                          </div>
                        ) : null}
                      </>
                      <Button
                        className="ant-btn ant-btn btn__profile1 "
                        icon={<WechatOutlined />}
                        onClick={() => history.push("/chat", { contactID: id })}
                      >
                        Message
                      </Button>
                    </div>
                  </Col>
                  {coach_Athlete_details &&
                    coach_Athlete_details.coach_details &&
                    coach_Athlete_details.coach_details.get_user_details &&
                    coach_Athlete_details.coach_details.get_user_details
                      .video_url != null ? (
                    <>
                      {loading ? (
                        <Skeleton />
                      ) : (
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
                    </>
                  ) : null}
                  {coach_Athlete_details &&
                    coach_Athlete_details.coach_details &&
                    coach_Athlete_details.coach_details.get_user_details &&
                    coach_Athlete_details.coach_details.get_user_details
                      .description != null ? (
                    <Card>
                      <div className="brifhding">
                        <h2 className="themestek-custom-heading">
                          Description:
                        </h2>
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <p>
                            {coach_Athlete_details &&
                              coach_Athlete_details.coach_details &&
                              coach_Athlete_details.coach_details
                                .get_user_details &&
                              coach_Athlete_details.coach_details.get_user_details
                                .description != null
                              ? coach_Athlete_details.coach_details
                                .get_user_details.description
                              : "N/A"}
                          </p>
                        )}
                      </div>
                    </Card>
                  ) : null}
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
                          {loading ? (
                            <Skeleton />
                          ) : (
                            <div className="resume_name">
                              <b className="fullname-rn">
                                <i
                                  class="fa fa-user-circle-o"
                                  aria-hidden="true"
                                ></i>

                                <span className="name-rn">
                                  {coach_Athlete_details &&
                                    coach_Athlete_details.coach_details &&
                                    coach_Athlete_details.coach_details.fname !=
                                    ""
                                    ? coach_Athlete_details.coach_details.fname
                                    : "N/A"}
                                </span>
                                <span> </span>
                                <span className="surname-rn">
                                  {coach_Athlete_details &&
                                    coach_Athlete_details.coach_details &&
                                    coach_Athlete_details.coach_details.lname !=
                                    ""
                                    ? coach_Athlete_details.coach_details.lname
                                    : "N/A"}
                                </span>
                              </b>
                              <p className="email-rn">
                                <i
                                  class="fa fa-envelope"
                                  aria-hidden="true"
                                ></i>
                                {coach_Athlete_details &&
                                  coach_Athlete_details.coach_details &&
                                  coach_Athlete_details.coach_details.email != ""
                                  ? coach_Athlete_details.coach_details.email
                                  : "N/A"}
                              </p>
                              <p className="email-rn">
                                <i class="fa fa-phone" aria-hidden="true"></i>
                                {coach_Athlete_details &&
                                  coach_Athlete_details.coach_details &&
                                  coach_Athlete_details.coach_details
                                    .get_user_details &&
                                  coach_Athlete_details.coach_details
                                    .get_user_details.phone != ""
                                  ? coach_Athlete_details.coach_details
                                    .get_user_details.phone
                                  : "N/A"}
                              </p>
                              {coach_Athlete_skill != null ? (
                                <p className="email-rn">
                                  <div className="icon0qwe">
                                    <FcSportsMode />
                                  </div>
                                  <span className="span0hyk">
                                    {coach_Athlete_skill.map((item, i) => (
                                      <span className="spanskill-0">
                                        {item && item.skill && item.skill.name
                                          ? item.skill.name
                                          : null}

                                        <span>
                                          {i < coach_Athlete_skill.length - 1
                                            ? ","
                                            : null}
                                        </span>
                                      </span>
                                    ))}
                                  </span>
                                </p>
                              ) : null}
                              {/*  <p className="email-rn">
                    <FcSportsMode />
                    Cricket, Football, Volleyball
                  </p> */}
                            </div>
                          )}

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
                                <h2 className="heading-education">
                                  {" "}
                                  Education
                                </h2>
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
                            {loading ? (
                              <Skeleton />
                            ) : (
                              <>
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
                                          <Row
                                            gutter={[10, 10]}
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                          >
                                            <Col
                                              xs={24}
                                              sm={24}
                                              md={12}
                                              lg={12}
                                            >
                                              <h2 className="heading-insti">
                                                {item.institute}
                                              </h2>
                                            </Col>
                                            <Col
                                              xs={24}
                                              sm={24}
                                              md={12}
                                              lg={12}
                                            >
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
                                            <b>{item.name}</b>
                                            <p>{item.grade}</p>
                                          </div>
                                          <div className="name-grade">
                                            <b>
                                              {item && item.university != ""
                                                ? item.university
                                                : "N/A"}
                                            </b>
                                          </div>
                                          {/* <div className="name-grade">
                              <b>CBSE</b>
                            </div> */}
                                          <div className="name-grade">
                                            <p>
                                              {moment(item.end_date).format(
                                                " YYYY"
                                              )}
                                            </p>
                                            {/*  <b>
                                            {moment(item.start_date).format(
                                              "L"
                                            )}
                                          </b>
                                          <p>
                                            {moment(item.end_date).format("L")}
                                          </p> */}
                                          </div>
                                        </div>
                                      ))}
                                  </>
                                )}
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
                                <h2 className="heading-education">
                                  Employment
                                </h2>
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
                            {loading ? (
                              <Skeleton />
                            ) : (
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
                                            <Col
                                              xs={24}
                                              sm={24}
                                              md={12}
                                              lg={12}
                                            >
                                              <h2 className="heading-insti">
                                                {item.job_title}
                                              </h2>
                                            </Col>
                                            <Col
                                              xs={24}
                                              sm={24}
                                              md={12}
                                              lg={12}
                                            >
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
                                            <b>
                                              {moment(item.start_date).format(
                                                "L"
                                              )}
                                            </b>
                                            <p>
                                              {moment(item.end_date).format(
                                                "L"
                                              )}
                                            </p>
                                          </div>
                                          <div className="name-grade">
                                            <b>
                                              {item && item.skills != ""
                                                ? item.skills
                                                : "N/A"}
                                            </b>
                                          </div>
                                          {/* <div className="name-grade">
                                <b>
                                  Design, Html, css, Js, React js, bootstrap
                                </b>
                              </div> */}
                                        </div>
                                      ))}
                                  </>
                                )}
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
                                <h2 className="heading-education">
                                  Social Media
                                </h2>
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
                            {loading ? (
                              <Skeleton />
                            ) : (
                              <>
                                {resume && resume.social_media == "" ? null : (
                                  <div className="main-institute">
                                    {resume &&
                                      resume.social_media &&
                                      resume.social_media.map((item) => (
                                        <>
                                          <Row
                                            gutter={[10, 10]}
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                          >
                                            <Col
                                              xs={24}
                                              sm={24}
                                              md={12}
                                              lg={12}
                                            >
                                              <h2 className="heading-insti">
                                                {item &&
                                                  item.name == "facebook" ? (
                                                  <div className="social-media-icons">
                                                    <AiFillFacebook />
                                                    <a
                                                      href={item.link}
                                                      target="_blank"
                                                    >
                                                      {item.link}
                                                    </a>
                                                  </div>
                                                ) : null}
                                                {item &&
                                                  item.name == "instagram" ? (
                                                  <div className="social-media-icons">
                                                    <AiFillInstagram />
                                                    <a
                                                      href={item.link}
                                                      target="_blank"
                                                    >
                                                      {item.link}
                                                    </a>
                                                  </div>
                                                ) : null}
                                                {item &&
                                                  item.name == "twitter" ? (
                                                  <div className="social-media-icons">
                                                    <AiFillTwitterSquare />
                                                    <a
                                                      href={item.link}
                                                      target="_blank"
                                                    >
                                                      {item.link}
                                                    </a>
                                                  </div>
                                                ) : null}
                                                {item &&
                                                  item.name == "Linkedin" ? (
                                                  <div className="social-media-icons">
                                                    <AiFillLinkedin />
                                                    <a
                                                      href={item.link}
                                                      target="_blank"
                                                    >
                                                      {item.link}
                                                    </a>
                                                  </div>
                                                ) : null}
                                                {/* <a href={item.link} target="_blank">
                                    {item.name}
                                  </a> */}
                                              </h2>
                                            </Col>
                                            <Col
                                              xs={24}
                                              sm={24}
                                              md={12}
                                              lg={12}
                                            ></Col>
                                          </Row>
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
                                  {resume && resume.summary != ""
                                    ? resume.summary
                                    : "N/A"}
                                </b>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </>
              ) : (
                <>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="back-btn-bb">
                      <Button
                        type="link"
                        onClick={() => history.push("/profile")}
                      >
                        <AiOutlineDoubleLeft />
                      </Button>
                      <h2 className="themestek-custom-heading">Athlete</h2>{" "}
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={7} lg={7}>
                    <div className="athlete__home_img">
                      <img
                        src={
                          coach_Athlete_details &&
                            coach_Athlete_details.athlete_details &&
                            coach_Athlete_details.athlete_details
                              .get_user_details &&
                            coach_Athlete_details.athlete_details.get_user_details
                              .avatar != null
                            ? UPLOAD_PIC +
                            coach_Athlete_details.athlete_details
                              .get_user_details.avatar
                            : profile
                        }
                        alt="Profile"
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={9} lg={9}>
                    <div>
                      <div className="profileinform">
                        <b>Name :</b>
                        <span>
                          <p>
                            {coach_Athlete_details &&
                              coach_Athlete_details.athlete_details &&
                              coach_Athlete_details.athlete_details.fname != null
                              ? coach_Athlete_details.athlete_details.fname
                              : "N/A"}
                          </p>
                          <p>
                            {coach_Athlete_details &&
                              coach_Athlete_details.athlete_details &&
                              coach_Athlete_details.athlete_details.lname != ""
                              ? coach_Athlete_details.athlete_details.lname
                              : "N/A"}
                          </p>
                        </span>
                      </div>
                      <div className="profileinform">
                        <b>Email :</b>
                        <span>
                          {" "}
                          {coach_Athlete_details &&
                            coach_Athlete_details.athlete_details &&
                            coach_Athlete_details.athlete_details.email != ""
                            ? coach_Athlete_details.athlete_details.email
                            : "N/A"}
                        </span>
                      </div>
                      <div className="profileinform">
                        <b>Contact :</b>
                        <span>
                          {" "}
                          {coach_Athlete_details &&
                            coach_Athlete_details.athlete_details &&
                            coach_Athlete_details.athlete_details
                              .get_user_details != ""
                            ? coach_Athlete_details.athlete_details
                              .get_user_details.phone
                            : "N/A"}
                        </span>
                      </div>
                      <div className="profileinform">
                        <b>Address :</b>
                        <span>
                          {coach_Athlete_details &&
                            coach_Athlete_details.athlete_details &&
                            coach_Athlete_details.athlete_details
                              .get_user_details &&
                            coach_Athlete_details.athlete_details.get_user_details
                              .address != null
                            ? coach_Athlete_details.athlete_details
                              .get_user_details.address
                            : "N/A"}
                        </span>
                      </div>
                      <div className="profileinform">
                        <b>Postcode:</b>
                        <span>
                          {coach_Athlete_details &&
                            coach_Athlete_details.athlete_details &&
                            coach_Athlete_details.athlete_details
                              .get_user_details &&
                            coach_Athlete_details.athlete_details.get_user_details
                              .postal_code != null
                            ? coach_Athlete_details.athlete_details
                              .get_user_details.postal_code
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                    {coach_Athlete_skill != null ? (
                      <div className="profileinform">
                        <b>Skills:</b>
                        <span>
                          {coach_Athlete_skill.map((item, i) => (
                            <>
                              <p>
                                {item && item.skill && item.skill.name
                                  ? item.skill.name
                                  : null}
                              </p>
                              <p>
                                {i < coach_Athlete_skill.length - 1
                                  ? ","
                                  : null}
                              </p>
                            </>
                          ))}
                        </span>
                      </div>
                    ) : null}
                    {coach_Athlete_details &&
                      coach_Athlete_details.athlete_details &&
                      coach_Athlete_details.athlete_details
                        .athlete_extra_details != null ? (
                      <>
                        {coach_Athlete_details &&
                          coach_Athlete_details.athlete_details &&
                          coach_Athlete_details.athlete_details
                            .athlete_extra_details &&
                          coach_Athlete_details.athlete_details
                            .athlete_extra_details.additional_interests !=
                          null ? (
                          <div className="profileinform">
                            <b>Additional Interest::</b>
                            <span>
                              {coach_Athlete_details &&
                                coach_Athlete_details.athlete_details &&
                                coach_Athlete_details.athlete_details
                                  .athlete_extra_details &&
                                coach_Athlete_details.athlete_details
                                  .athlete_extra_details.additional_interests !=
                                null
                                ? coach_Athlete_details.athlete_details
                                  .athlete_extra_details.additional_interests
                                : "N/A"}
                            </span>
                          </div>
                        ) : null}
                        {coach_Athlete_details &&
                          coach_Athlete_details.athlete_details &&
                          coach_Athlete_details.athlete_details
                            .athlete_extra_details &&
                          coach_Athlete_details.athlete_details
                            .athlete_extra_details.extra_curricular != null ? (
                          <div className="profileinform">
                            <b>Extra Curriculum:</b>
                            <span>
                              {coach_Athlete_details &&
                                coach_Athlete_details.athlete_details &&
                                coach_Athlete_details.athlete_details
                                  .athlete_extra_details &&
                                coach_Athlete_details.athlete_details
                                  .athlete_extra_details.extra_curricular != null
                                ? coach_Athlete_details.athlete_details
                                  .athlete_extra_details.extra_curricular
                                : "N/A"}
                            </span>
                          </div>
                        ) : null}
                        {coach_Athlete_details &&
                          coach_Athlete_details.athlete_details &&
                          coach_Athlete_details.athlete_details
                            .athlete_extra_details &&
                          coach_Athlete_details.athlete_details
                            .athlete_extra_details
                            .first_generation_college_student != null ? (
                          <div className="profileinform">
                            <b>Single family household:</b>
                            <span>
                              {coach_Athlete_details &&
                                coach_Athlete_details.athlete_details &&
                                coach_Athlete_details.athlete_details
                                  .athlete_extra_details &&
                                coach_Athlete_details.athlete_details
                                  .athlete_extra_details
                                  .first_generation_college_student != 0
                                ? "Yes"
                                : "No"}
                            </span>
                          </div>
                        ) : null}
                        {coach_Athlete_details &&
                          coach_Athlete_details.athlete_details &&
                          coach_Athlete_details.athlete_details
                            .athlete_extra_details &&
                          coach_Athlete_details.athlete_details
                            .athlete_extra_details
                            .first_generation_college_student != null ? (
                          <div className="profileinform">
                            <b>First generation college student:</b>
                            <span>
                              {coach_Athlete_details &&
                                coach_Athlete_details.athlete_details &&
                                coach_Athlete_details.athlete_details
                                  .athlete_extra_details &&
                                coach_Athlete_details.athlete_details
                                  .athlete_extra_details
                                  .first_generation_college_student != 0
                                ? "Yes"
                                : "No"}
                            </span>
                          </div>
                        ) : null}
                      </>
                    ) : null}
                    <>
                      {company_View_Coach_Of_Athlete != "" ? (
                        <div className="profileinform-se">
                          <b>Coaches:</b>
                          <div className="skilledit-se">
                            <span>
                              {company_View_Coach_Of_Athlete &&
                                company_View_Coach_Of_Athlete.map((item, i) => (
                                  <>
                                    <p>
                                      {item &&
                                        item.coach_data &&
                                        item.coach_data.fname != ""
                                        ? item.coach_data.fname
                                        : null}
                                    </p>

                                    <p>
                                      {item &&
                                        item.coach_data &&
                                        item.coach_data.lname != ""
                                        ? item.coach_data.lname
                                        : null}
                                    </p>
                                    <p>
                                      {i <
                                        company_View_Coach_Of_Athlete.length - 1
                                        ? ","
                                        : null}
                                    </p>
                                  </>
                                ))}
                            </span>
                          </div>
                        </div>
                      ) : null}
                    </>
                  </Col>
                  {/* <div>
                    {
                      rating != undefined ? (
                        <StarRatings
                          rating={
                            Number(rating.total)
                            // 2.403
                          }
                          starDimension="24px"
                          starSpacing="4px"
                        />
                      ) : null
                    }
                  </div> */}
                  {coach_Athlete_details &&
                    coach_Athlete_details.athlete_details &&
                    coach_Athlete_details.athlete_details.get_user_details &&
                    coach_Athlete_details.athlete_details.get_user_details
                      .video_url != null ? (
                    <div>
                      {loading ? (
                        <Skeleton />
                      ) : (<>
                        <div className="mx-2 mb-3">
                          {/* {
                            rating != undefined ? (
                              <StarRatings
                                rating={
                                  Number(rating.total)
                                  // 2.403
                                }
                                starDimension="24px"
                                starSpacing="4px"
                              />
                            ) : null
                          } */}
                          {rating != undefined ?
                            <p className="text-end">Rating- <span style={{color:"#4862AE"}}>{Number(rating.total)}</span></p> : null}
                        </div>
                        <Col xs={24} sm={24} md={7} lg={7}>
                          <div>
                            <iframe
                              width="auto"
                              height="auto"
                              src={videoUrlAthlete}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </Col>
                      </>

                      )}
                    </div>
                  ) :
                    (
                      rating != undefined ?
                        (
                          <>
                          {/* <StarRatings
                            rating={
                              Number(rating.total)
                              // 2.403
                            }
                            starDimension="24px"
                            starSpacing="4px"
                          /> */}
                          <p className="text-end">Rating- <span style={{color:"#4862AE"}}>{Number(rating.total)}</span></p>
                          </>
                        )
                        : null
                    )}


                  {coach_Athlete_details &&
                    coach_Athlete_details.athlete_details &&
                    coach_Athlete_details.athlete_details.get_user_details &&
                    coach_Athlete_details.athlete_details.get_user_details
                      .description != null ? (
                    <Card>
                      <div className="brifhding">
                        <h2 className="themestek-custom-heading">
                          Description:
                        </h2>
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <p>
                            {coach_Athlete_details &&
                              coach_Athlete_details.athlete_details &&
                              coach_Athlete_details.athlete_details
                                .get_user_details &&
                              coach_Athlete_details.athlete_details
                                .get_user_details.description != null
                              ? coach_Athlete_details.athlete_details
                                .get_user_details.description
                              : "N/A"}
                          </p>
                        )}
                      </div>
                    </Card>
                  ) : null}
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
                          {loading ? (
                            <Skeleton />
                          ) : (
                            <div className="resume_name">
                              <b className="fullname-rn">
                                <i
                                  class="fa fa-user-circle-o"
                                  aria-hidden="true"
                                ></i>

                                <span className="name-rn">
                                  {coach_Athlete_details &&
                                    coach_Athlete_details.athlete_details &&
                                    coach_Athlete_details.athlete_details.fname !=
                                    null
                                    ? coach_Athlete_details.athlete_details
                                      .fname
                                    : "N/A"}
                                </span>
                                <span className="surname-rn">
                                  {coach_Athlete_details &&
                                    coach_Athlete_details.athlete_details &&
                                    coach_Athlete_details.athlete_details.lname !=
                                    null
                                    ? coach_Athlete_details.athlete_details
                                      .lname
                                    : "N/A"}
                                </span>
                              </b>
                              <p className="email-rn">
                                <i
                                  class="fa fa-envelope"
                                  aria-hidden="true"
                                ></i>
                                {coach_Athlete_details &&
                                  coach_Athlete_details.athlete_details &&
                                  coach_Athlete_details.athlete_details.email !=
                                  ""
                                  ? coach_Athlete_details.athlete_details.email
                                  : "N/A"}
                              </p>
                              <p className="email-rn">
                                <i class="fa fa-phone" aria-hidden="true"></i>
                                {coach_Athlete_details &&
                                  coach_Athlete_details.athlete_details &&
                                  coach_Athlete_details.athlete_details
                                    .get_user_details != ""
                                  ? coach_Athlete_details.athlete_details
                                    .get_user_details.phone
                                  : "N/A"}
                              </p>
                              {coach_Athlete_skill != null ? (
                                <p className="email-rn">
                                  <div className="icon0qwe">
                                    <FcSportsMode />
                                  </div>
                                  <span className="span0hyk">
                                    {coach_Athlete_skill.map((item, i) => (
                                      <span className="spanskill-0">
                                        {item && item.skill && item.skill.name
                                          ? item.skill.name
                                          : null}

                                        <span>
                                          {i < coach_Athlete_skill.length - 1
                                            ? ","
                                            : null}
                                        </span>
                                      </span>
                                    ))}
                                  </span>
                                </p>
                              ) : null}
                              {/*  <p className="email-rn">
                    <FcSportsMode />
                    Cricket, Football, Volleyball
                  </p> */}
                            </div>
                          )}

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
                                <h2 className="heading-education">
                                  {" "}
                                  Education
                                </h2>
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
                            {loading ? (
                              <Skeleton />
                            ) : (
                              <>
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
                                          <Row
                                            gutter={[10, 10]}
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                          >
                                            <Col
                                              xs={24}
                                              sm={24}
                                              md={12}
                                              lg={12}
                                            >
                                              <h2 className="heading-insti">
                                                {item.institute}
                                              </h2>
                                            </Col>
                                            <Col
                                              xs={24}
                                              sm={24}
                                              md={12}
                                              lg={12}
                                            >
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
                                          {/* <div className="name-grade">
                              <b>CBSE</b>
                            </div> */}
                                          <div className="name-grade">
                                            <p>
                                              {moment(item.end_date).format(
                                                " YYYY"
                                              )}
                                            </p>
                                            {/*  <b>
                                            {moment(item.start_date).format(
                                              "L"
                                            )}
                                          </b>
                                          <p>
                                            {moment(item.end_date).format("L")}
                                          </p> */}
                                          </div>
                                        </div>
                                      ))}
                                  </>
                                )}
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
                                <h2 className="heading-education">
                                  {" "}
                                  Employment
                                </h2>
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
                            {loading ? (
                              <Skeleton />
                            ) : (
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
                                            <Col
                                              xs={24}
                                              sm={24}
                                              md={12}
                                              lg={12}
                                            >
                                              <h2 className="heading-insti">
                                                {item.job_title}
                                              </h2>
                                            </Col>
                                            <Col
                                              xs={24}
                                              sm={24}
                                              md={12}
                                              lg={12}
                                            >
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
                                            <b>
                                              {moment(item.start_date).format(
                                                "L"
                                              )}
                                            </b>
                                            <p>
                                              {moment(item.end_date).format(
                                                "L"
                                              )}
                                            </p>
                                          </div>
                                          <div className="name-grade">
                                            <b>
                                              {item && item.skills != ""
                                                ? item.skills
                                                : "N/A"}
                                            </b>
                                          </div>
                                          {/* <div className="name-grade">
                                <b>
                                  Design, Html, css, Js, React js, bootstrap
                                </b>
                              </div> */}
                                        </div>
                                      ))}
                                  </>
                                )}
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
                                <h2 className="heading-education">
                                  {" "}
                                  Social Media
                                </h2>
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
                            {loading ? (
                              <Skeleton />
                            ) : (
                              <>
                                {resume && resume.social_media == "" ? null : (
                                  <div className="main-institute">
                                    {resume &&
                                      resume.social_media &&
                                      resume.social_media.map((item) => (
                                        <>
                                          <Row
                                            gutter={[10, 10]}
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                          >
                                            <Col
                                              xs={24}
                                              sm={24}
                                              md={12}
                                              lg={12}
                                            >
                                              <h2 className="heading-insti">
                                                {item &&
                                                  item.name == "facebook" ? (
                                                  <div className="social-media-icons">
                                                    <AiFillFacebook />
                                                    <a
                                                      href={item.link}
                                                      target="_blank"
                                                    >
                                                      {item.link}
                                                    </a>
                                                  </div>
                                                ) : null}
                                                {item &&
                                                  item.name == "instagram" ? (
                                                  <div className="social-media-icons">
                                                    <AiFillInstagram />
                                                    <a
                                                      href={item.link}
                                                      target="_blank"
                                                    >
                                                      {item.link}
                                                    </a>
                                                  </div>
                                                ) : null}
                                                {item &&
                                                  item.name == "twitter" ? (
                                                  <div className="social-media-icons">
                                                    <AiFillTwitterSquare />
                                                    <a
                                                      href={item.link}
                                                      target="_blank"
                                                    >
                                                      {item.link}
                                                    </a>
                                                  </div>
                                                ) : null}
                                                {item &&
                                                  item.name == "Linkedin" ? (
                                                  <div className="social-media-icons">
                                                    <AiFillLinkedin />
                                                    <a
                                                      href={item.link}
                                                      target="_blank"
                                                    >
                                                      {item.link}
                                                    </a>
                                                  </div>
                                                ) : null}
                                                {/* <a href={item.link} target="_blank">
                                    {item.name}
                                  </a> */}
                                              </h2>
                                            </Col>
                                            <Col
                                              xs={24}
                                              sm={24}
                                              md={12}
                                              lg={12}
                                            ></Col>
                                          </Row>
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
                                  {resume && resume.summary != ""
                                    ? resume.summary
                                    : "N/A"}
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
            </Row>
          </Card>
        </>
      )}
    </div>
  );
}
export default CoachAthleteViewProfile;
