import React, { useEffect, useRef, useState } from "react";
import { Card, Button, Skeleton, Row, Col, Spin } from "antd";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { coachDetail } from "../../redux/actions/athleteAction";
import profile from "../../assets/logo1.png";
import { UPLOAD_PIC, YOUTUBE_LINK, REQUEST } from "../../constants/ActionType";
import ShowMoreText from "react-show-more-text";
import moment from "moment";
import { getResumeById } from "../../redux/actions/resumeAction";
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
function Coach_detail() {
  const messageRef = useRef(null);
  const [videoUrl, setURL] = useState("");
  let { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const athlete_detail = useSelector((state) => state.athlete_detail);
  const {
    coach_detail,
    loading,
    coach_detail_skill,
    coach_detail_status,
    coach_deatil_company,
  } = athlete_detail;
  const resume = useSelector((state) => state.resume.get_Resume_By_Id);
  useEffect(() => {
    dispatch(coachDetail(id));
    dispatch(getResumeById(id));
  }, [id]);

  const executeScroll = () =>
    messageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest", // <-- only scroll this div, not the parent as well
    });

  useEffect(() => {
    if (
      coach_detail &&
      coach_detail.get_user_details &&
      coach_detail.get_user_details.video_url != null
    ) {
      const youTubeUrl = coach_detail.get_user_details.video_url;
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
  }, [coach_detail]);

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
                  <h2 className="themestek-custom-heading">Coach</h2>{" "}
                </div>
              </Col>
              <Col xs={24} sm={24} md={7} lg={7}>
                <div className="athlete__home_img">
                  <img
                    src={
                      coach_detail &&
                      coach_detail.get_user_details &&
                      coach_detail.get_user_details.avatar != null
                        ? UPLOAD_PIC + coach_detail.get_user_details.avatar
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
                        {coach_detail && coach_detail != ""
                          ? coach_detail.fname
                          : "N/A"}
                      </p>
                      <p>
                        {coach_detail && coach_detail != ""
                          ? coach_detail.lname
                          : "N/A"}
                      </p>
                    </span>
                  </div>
                  <div className="profileinform">
                    <b>Email :</b>
                    <span>
                      {coach_detail && coach_detail != ""
                        ? coach_detail.email
                        : "N/A"}
                    </span>
                  </div>
                  <div className="profileinform">
                    <b>Contact :</b>
                    <span>
                      {coach_detail &&
                      coach_detail.get_user_details &&
                      coach_detail.get_user_details.phone != ""
                        ? coach_detail.get_user_details.phone
                        : "N/A"}
                    </span>
                  </div>
                  <div className="profileinform">
                    <b>Address :</b>
                    <span>
                      {coach_detail &&
                      coach_detail.get_user_details &&
                      coach_detail.get_user_details.address != ""
                        ? coach_detail.get_user_details.address
                        : "N/A"}
                    </span>
                  </div>
                  <div className="profileinform">
                    <b>Postcode:</b>
                    <span>
                      {coach_detail &&
                      coach_detail.get_user_details &&
                      coach_detail.get_user_details.postal_code != ""
                        ? coach_detail.get_user_details.postal_code
                        : "N/A"}
                    </span>
                  </div>
                  {coach_detail_skill != "" ? (
                    <div className="profileinform">
                      <b>Skills:</b>
                      <span>
                        {coach_detail_skill &&
                          coach_detail_skill.map((item, i) => (
                            <>
                              <p>
                                {item && item.skill && item.skill.name
                                  ? item.skill.name
                                  : null}
                              </p>
                              <p>
                                {i < coach_detail_skill.length - 1 ? "," : null}
                              </p>
                            </>
                          ))}
                      </span>
                    </div>
                  ) : null}
                  <>
                    {coach_deatil_company != "" ? (
                      <div className="profileinform">
                        <b>Team:</b>
                        <span>
                          {coach_deatil_company &&
                            coach_deatil_company.map((item, i) => (
                              <>
                                <p>
                                  <p>
                                    {" "}
                                    {item &&
                                    item.company_details &&
                                    item.company_details.fname
                                      ? item.company_details.fname
                                      : null}
                                  </p>

                                  <p>
                                    {" "}
                                    {item &&
                                    item.company_details &&
                                    item.company_details.lname
                                      ? item.company_details.lname
                                      : null}
                                  </p>
                                </p>
                                <p>
                                  {i < coach_deatil_company.length - 1
                                    ? ","
                                    : null}
                                </p>
                              </>
                            ))}
                        </span>
                      </div>
                    ) : null}
                  </>
                </div>
                {coach_detail_status &&
                coach_detail_status.status != REQUEST ? null : (
                  <Button
                    className="ant-btn ant-btn btn__profile1 "
                    icon={<WechatOutlined />}
                    onClick={() => history.push("/chat", { contactID: id })}
                  >
                    Message
                  </Button>
                )}
              </Col>
              {coach_detail &&
              coach_detail.get_user_details &&
              coach_detail.get_user_details.video_url != null ? (
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
            </Row>
          </Card>
          <Card>
            <div className="brifhding">
              <h2 className="themestek-custom-heading">Description:</h2>

              <p>
                {coach_detail &&
                coach_detail.get_user_details &&
                coach_detail.get_user_details.description
                  ? coach_detail.get_user_details.description
                  : "N/A"}
              </p>
            </div>
          </Card>
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
                        {coach_detail && coach_detail != ""
                          ? coach_detail.fname
                          : "N/A"}
                      </span>
                      <span className="surname-rn">
                        {coach_detail && coach_detail != ""
                          ? coach_detail.lname
                          : "N/A"}
                      </span>
                    </b>
                    <p className="email-rn">
                      <i class="fa fa-envelope" aria-hidden="true"></i>
                      {coach_detail && coach_detail != ""
                        ? coach_detail.email
                        : "N/A"}
                    </p>
                    <p className="email-rn">
                      <i class="fa fa-phone" aria-hidden="true"></i>
                      {coach_detail &&
                      coach_detail.get_user_details &&
                      coach_detail.get_user_details.phone != ""
                        ? coach_detail.get_user_details.phone
                        : "N/A"}
                    </p>
                    <>
                      {coach_detail_skill != "" ? (
                        <p className="email-rn">
                          <div className="icon0qwe">
                            <FcSportsMode />
                          </div>
                          <span className="span0hyk">
                            {coach_detail_skill.map((item, i) => (
                              <span className="spanskill-0">
                                {item && item.skill && item.skill.name
                                  ? item.skill.name
                                  : null}

                                <span>
                                  {i < coach_detail_skill.length - 1
                                    ? ","
                                    : null}
                                </span>
                              </span>
                            ))}
                          </span>
                        </p>
                      ) : null}
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
                                <div className="educ-hding-eh">
                                  <Row
                                    gutter={[10, 10]}
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Col xs={24} sm={24} md={24} lg={24}>
                                      <h2 className="heading-insti">
                                        {item.institute}
                                      </h2>
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
                                {/* <div className="name-grade">
                              <b>CBSE</b>
                            </div> */}
                                <div className="name-grade">
                                  <p>{moment(item.end_date).format(" YYYY")}</p>
                                  {/*  <b>{moment(item.start_date).format("L")}</b>
                                <p>{moment(item.end_date).format("L")}</p> */}
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
                        <h2 className="heading-education"> Work</h2>
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
                                  <Col xs={24} sm={24} md={24} lg={24}>
                                    <h2 className="heading-insti">
                                      {item.job_title}
                                    </h2>
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
    </div>
  );
}
export default Coach_detail;
