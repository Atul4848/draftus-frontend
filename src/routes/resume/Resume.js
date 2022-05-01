import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Skeleton,
  Form,
  Modal,
  Input,
  Select,
  InputNumber,
} from "antd";
import {
  getResume,
  educationResume,
  createResume,
  socialResume,
  workResume,
  deleteEducation,
  deleteWork,
  deleteSocialMedia,
} from "../../redux/actions/resumeAction";

import { useSelector, useDispatch } from "react-redux";
import Resume_Education from "./component/Resume_Education";
import Resume_Work from "./component/Resume_Work";
import { AiFillDelete, AiOutlineDoubleLeft } from "react-icons/ai";
import { FcSportsMode } from "react-icons/fc";
import moment from "moment";
import Resume_SocialMedia from "./component/Resume_SocialMedia";
import Resume_Summary from "./component/Resume_Summary";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
  AiFillLinkedin,
} from "react-icons/ai";
import { useHistory } from "react-router-dom";

function Resume() {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [workForm] = Form.useForm();
  const [socialform] = Form.useForm();
  const [summaryform] = Form.useForm();
  const { TextArea } = Input;

  const userDetails = useSelector((state) => state.user);
  const { userDetail, loading } = userDetails;
  const resume = useSelector((state) => state.resume);
  const { get_Resume } = resume;

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onChangePercentage(value) {
    console.log("changed", value);
  }

  useEffect(() => {
    collectResume();
  }, []);

  const collectResume = async () => {
    await dispatch(getResume());
  };
  //summary  start//
  const [isSummaryModal, setIsSummaryModal] = useState(false);

  const handleCancelSummary = () => {
    setIsSummaryModal(false);
  };
  const showModalSummary = async () => {
    setIsSummaryModal(true);
    const formObj = {
      summary: get_Resume.summary,
    };
    await summaryform.setFieldsValue(formObj);
  };
  const onFinish = async (data) => {
    const newData = await {
      id: get_Resume.id,
      ...data,
    };
    await dispatch(createResume(newData));
    dispatch(getResume());
    setIsSummaryModal(false);
  };
  /* useEffect(() => {
    collectUserWork();
  }, []);

  const collectUserWork = async () => {
    const formObj = {
      summary: get_Resume.summary,
    };
    await form.setFieldsValue(formObj);
    console.log(formObj);
    
  }; */
  /*  const editSummary = async (id) => {
    setIsSummaryModal(true);
    const postDataSocialMedia = get_Resume && get_Resume.summary;
    const formObj = {
      summary: postDataSocialMedia,
    };
    await form.setFieldsValue(formObj);
  }; */

  //summary end//

  //socialmedia start//

  const [isSocialMediaModal, setIsSocialMediaModal] = useState(false);

  const [targetSocialMedia, setTargetSocialMedia] = useState(undefined);
  const [idOfSocialMedia, setIdOfSocialMedia] = useState();

  const handleCancelSocialMedia = () => {
    setIsSocialMediaModal(false);
    setIdOfSocialMedia();
  };
  const showModalSocialMedia = async () => {
    setIsSocialMediaModal(true);
  };
  const editSocialMedia = async (id) => {
    setIsSocialMediaModal(true);
    const postDataSocialMedia = get_Resume && get_Resume.social_media;
    const targetSocialWork = await postDataSocialMedia.find((x) => x.id === id);
    const formObjSocialMedia = {
      social_media: targetSocialWork.name,
      link: targetSocialWork.link,
    };
    await socialform.setFieldsValue(formObjSocialMedia);
    await setTargetSocialMedia(targetSocialWork);
    console.log(targetSocialWork);

    const ResumeIdSocialMedia = id;
    setIdOfSocialMedia(ResumeIdSocialMedia);
  };
  const onFinishSocialMedia = async (data) => {
    /*  if (targetSocialMedia != undefined) { */
    const newData = await {
      id: idOfSocialMedia,
      ...data,
    };
    await dispatch(socialResume(newData));
    setIdOfSocialMedia();
    /* } else {
      const newData = await {
        ...data,
      };
      await dispatch(socialResume(newData));
    } */

    setIsSocialMediaModal(false);
    dispatch(getResume());
    socialform.resetFields();
  };

  const deleteSocialMediaId = async (id) => {
    await dispatch(deleteSocialMedia(id));
    dispatch(getResume());
  };

  //social media end//

  //education start//

  const [isEducationModal, setIsEducationModal] = useState(false);

  const [targetEducation, setTargetEducation] = useState(undefined);
  const [idOfEducation, setIdOfEducation] = useState();

  const handleCancelEducation = () => {
    setTargetEducation(undefined);
    setIsEducationModal(false);
    setIdOfEducation();
  };
  const showModalEducation = async () => {
    setIsEducationModal(true);
  };

  const editEducation = async (id) => {
    setIsEducationModal(true);

    const postData = get_Resume && get_Resume.education;
    const target = await postData.find((x) => x.id === id);

    await setTargetEducation(target);
    const StartDate = target.start_date;
    const StartDateArray = StartDate.split(" ");

    const EndDate = target.end_date;
    const EndDateArray = EndDate.split(" ");

    const formObjEucation = {
      institute: target.institute,
      name: target.name,
      start_date: StartDateArray[0],
      end_date: EndDateArray[0],
      grade: target.grade,
      university: target && target.university != "" ? target.university : null,
    };
    await form.setFieldsValue(formObjEucation);

    const ResumeId = id;
    setIdOfEducation(ResumeId);
  };

  const onFinishEducation = async (data) => {
    /*  if (targetEducation != undefined) { */
    const updateData = await {
      id: idOfEducation,
      ...data,
    };
    setTargetEducation(undefined);
    await dispatch(educationResume(updateData));
    setIdOfEducation();
    /* } else {
      const newData = await {
        ...data,
      };
      await dispatch(educationResume(newData));
    } */
    setIsEducationModal(false);
    dispatch(getResume());
    form.resetFields();
  };

  const deleteEducationId = async (id) => {
    await dispatch(deleteEducation(id));
    dispatch(getResume());
  };

  //education end//

  //work start//

  const [isWorkModal, setIsWorkModal] = useState(false);

  const [Work, setWork] = useState(undefined);
  const [idOfWork, setIdOfWork] = useState();

  const handleCancelWork = () => {
    setIsWorkModal(false);
    setIdOfWork();
  };
  const showModalWork = async () => {
    setIsWorkModal(true);
  };

  const editWork = async (id) => {
    setIsWorkModal(true);
    const postDataWork = get_Resume && get_Resume.work;
    const targetWorkData = await postDataWork.find((x) => x.id === id);

    await setWork(targetWorkData);
    const StartDateJob = targetWorkData.start_date;
    const StartDateArrayJob = StartDateJob.split(" ");

    const EndDateJob = targetWorkData.end_date;
    const EndDateArrayJob = EndDateJob.split(" ");

    const formObjWork = {
      company_name: targetWorkData.company_name,
      job_title: targetWorkData.job_title,
      job_start_date: StartDateArrayJob[0],
      job_end_date: EndDateArrayJob[0],
      skills:
        targetWorkData && targetWorkData.skills != ""
          ? targetWorkData.skills
          : null,
    };
    await workForm.setFieldsValue(formObjWork);

    const ResumeIdWork = id;
    setIdOfWork(ResumeIdWork);
  };

  const onFinishWork = async (data) => {
    /*   if (Work != undefined) { */
    const newData = await {
      id: idOfWork,
      ...data,
    };
    await dispatch(workResume(newData));

    /*   } else {
      const newData = await {
        ...data,
      };
      await dispatch(workResume(newData));
    } */

    setIsWorkModal(false);
    dispatch(getResume());
    workForm.resetFields();
  };

  const deleteWorkId = async (id) => {
    await dispatch(deleteWork(id));
    dispatch(getResume());
  };

  const dayCalculate = (start_date, end_date) => {
    let daydiff = moment(moment(end_date, "YYYY-MM-DD")).diff(
      moment(start_date, "YYYY-MM-DD"),
      "days"
    );
    let year = "0",
      days = "0",
      month = "0";
    if (daydiff > 365) {
      year = daydiff / 365;
      daydiff = daydiff % 365;
    }

    if (daydiff > 30) {
      month = daydiff / 30;
      daydiff = daydiff % 30;
    }

    days = daydiff;

    return (
      Math.round(year) +
      " years, " +
      Math.round(month) +
      " months, " +
      Math.round(days) +
      " days."
    );
  };
  //work end//
  let history = useHistory();

  return (
    <div className="newContnainer">
      <Row
        gutter={[10, 10]}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col xs={24} sm={24} md={20} lg={20}>
          <div className="login-form-container0 resume-des-rd">
            <h2 className=" eds-text-hl">
              <Button type="link" onClick={() => history.push("/profile")}>
                <AiOutlineDoubleLeft />
              </Button>
              Resume
            </h2>
            {loading ? (
              <Skeleton />
            ) : (
              <div className="resume_name">
                <b className="fullname-rn">
                  <i class="fa fa-user-circle-o" aria-hidden="true"></i>

                  <span className="name-rn">
                    {userDetail && userDetail.user != null
                      ? userDetail.user.fname
                      : "N/A"}
                  </span>
                  <span className="surname-rn">
                    {userDetail && userDetail.user != null
                      ? userDetail.user.lname
                      : "N/A"}
                  </span>
                </b>
                <p className="email-rn">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                  {userDetail && userDetail.user != null
                    ? userDetail.user.email
                    : "N/A"}
                </p>
                <>
                  {userDetail &&
                  userDetail.user_details &&
                  userDetail.user_details.phone != null ? (
                    <p className="email-rn">
                      <i class="fa fa-phone" aria-hidden="true"></i>
                      {userDetail && userDetail.user_details != null
                        ? userDetail.user_details.phone
                        : "N/A"}
                    </p>
                  ) : null}
                </>
                <>
                  {userDetail && userDetail.skill != "" ? (
                    <p className="email-rn">
                      <FcSportsMode />

                      {userDetail &&
                        userDetail.skill &&
                        userDetail.skill.map((item, i) => (
                          <>
                            <>
                              {item && item.skill && item.skill.name
                                ? item.skill.name
                                : null}
                            </>

                            <span>
                              {i < userDetail.skill.length - 1 ? "," : null}
                            </span>
                          </>
                        ))}
                    </p>
                  ) : null}
                </>
                {/* {userDetail && userDetail.curriculum != "" ? (
                  <p className="email-rn">
                    <FcSportsMode />
                    Cricket, Football, Volleyball
                  </p>
                ) : null} */}
              </div>
            )}
            <div className="resum-education ">
              <Row
                gutter={[10, 10]}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Col xs={14} sm={14} md={12} lg={12}>
                  <h2 className="heading-education"> Education</h2>
                </Col>
                <Col xs={10} sm={10} md={12} lg={12}>
                  <div
                    className="btnedu-0"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Button /* onClick={showModalEducation} */>
                      {/*  Add Education */}
                      <Resume_Education />
                    </Button>
                  </div>
                </Col>
              </Row>
              {loading ? (
                <Skeleton />
              ) : (
                <>
                  {get_Resume && get_Resume.education == "" ? null : (
                    //when Education Array has value
                    <div className="main-institute">
                      {get_Resume &&
                        get_Resume.education &&
                        get_Resume.education.map((item) => (
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
                                <Col xs={14} sm={14} md={12} lg={12}>
                                  <h2 className="heading-insti">
                                    {item.institute}
                                  </h2>
                                </Col>
                                <Col xs={10} sm={10} md={12} lg={12}>
                                  <div
                                    className="editicon_ei"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Button
                                      onClick={() => editEducation(item.id)}
                                    >
                                      <i
                                        class="fa fa-pencil"
                                        aria-hidden="true"
                                      ></i>

                                      {/* <Resume_Education
                                      target={targetEducation}
                                      targetId={idOfEducation}
                                    /> */}
                                    </Button>
                                    <Button
                                      onClick={() => deleteEducationId(item.id)}
                                    >
                                      <AiFillDelete />
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                            <div className="name-grade present-grade-pg">
                              <b>{item.name}</b>
                              <span> - </span>
                              <p>{item.grade}%</p>
                            </div>
                            <div className="name-grade">
                              <b>{item.university}</b>
                            </div>

                            <div className="name-grade">
                              {/*   <b>{moment(item.start_date).format("L")}</b> */}
                              <p>{moment(item.end_date).format(" YYYY")}</p>
                              {/*  <p>{moment(item.end_date).format("L")}</p> */}
                            </div>
                          </>
                        ))}
                    </div>
                  )}
                </>
              )}
            </div>

            <Modal
              title="Education  "
              visible={isEducationModal}
              onCancel={handleCancelEducation}
              footer={null}
            >
              <Form
                name="basic"
                onFinish={onFinishEducation}
                layout="vertical"
                form={form}
              >
                <Form.Item
                  name="institute"
                  label=" College/University"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "This field is Mandatory!",
                    },
                    {
                      max: 100,
                      message: "Institude name must be maximum 100 digits.",
                    },
                  ]}
                >
                  <Input placeholder="Enter College/University Name!" />
                </Form.Item>
                <Form.Item
                  name="name"
                  label=" Degree"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "This field is Mandatory!",
                    },
                    {
                      max: 100,
                      message: "Education must be maximum 100 digits.",
                    },
                  ]}
                >
                  <Input placeholder="Enter your Degree !" />
                </Form.Item>
                <Form.Item
                  name="university"
                  label=" Degree Concentration"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "This field is Mandatory!",
                    },
                    {
                      max: 100,
                      message: "University name must be maximum 100 digits.",
                    },
                  ]}
                >
                  <Input placeholder="Enter your Degree Concentration !" />
                </Form.Item>
                <Form.Item
                  name="start_date"
                  label=" Start Date"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "This field is Mandatory!",
                    },
                  ]}
                >
                  <Input type="date" placeholder="Enter Class Start date!" />
                </Form.Item>
                <Form.Item
                  name="end_date"
                  label=" End Date"
                  //required={true}
                  rules={[
                    /*  {
                      required: true,
                      message: "This field is Mandatory!",
                    }, */
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("start_date") < value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error(
                            "End Date Should be Greater than Start date!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input type="date" placeholder="Enter Class End Date!" />
                </Form.Item>
                <Form.Item
                  name="grade"
                  label=" Total Marks"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "This field is Mandatory!",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    max={100}
                    maxLength={4}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                    onChange={onChangePercentage}
                  />
                </Form.Item>
                <div className="modelbox-btn-mb">
                  <Form.Item>
                    <Button
                      className="ant-btn ant-btn btn__profile1"
                      htmlType="submit"
                    >
                      Save
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </Modal>

            <div className="resum-education">
              <Row
                gutter={[10, 10]}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Col xs={14} sm={14} md={12} lg={12}>
                  <h2 className="heading-education"> Employment</h2>
                </Col>
                <Col xs={10} sm={10} md={12} lg={12}>
                  <div
                    className="btnedu-0"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Button /* onClick={showModalWork} */>
                      {/*  Add Experience */}
                      <Resume_Work />
                    </Button>
                  </div>
                </Col>
              </Row>
              {loading ? (
                <Skeleton />
              ) : (
                <>
                  {get_Resume && get_Resume.work == "" ? null : (
                    <div className="main-institute">
                      {get_Resume &&
                        get_Resume.work &&
                        get_Resume.work.map((item) => (
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
                                <Col xs={14} sm={14} md={12} lg={12}>
                                  <h2 className="heading-insti">
                                    {item.job_title}
                                  </h2>
                                </Col>
                                <Col xs={10} sm={10} md={12} lg={12}>
                                  <div
                                    className="editicon_ei"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Button onClick={() => editWork(item.id)}>
                                      <i
                                        class="fa fa-pencil"
                                        aria-hidden="true"
                                      ></i>

                                      {/* <Resume_Work
                                      targetWork={targetWork}
                                      targetIdWork={idOfWork}
                                    /> */}
                                    </Button>
                                    <Button
                                      onClick={() => deleteWorkId(item.id)}
                                    >
                                      <AiFillDelete />
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                            <div className="name-grade">
                              <b>{item.company_name}</b>
                            </div>

                            <div className="name-grade">
                              <b>{moment(item.start_date).format("L")}</b>
                              <p>{moment(item.end_date).format("L")}</p>
                            </div>
                            <div className="name-grade">
                              {dayCalculate(item.start_date, item.end_date)}
                            </div>
                            <div className="name-grade">
                              <b>{item.skills}</b>
                            </div>
                          </>
                        ))}
                    </div>
                  )}
                </>
              )}
            </div>
            <Modal
              title="Work Experience "
              visible={isWorkModal}
              onCancel={handleCancelWork}
              footer={null}
            >
              <Form
                name="basic"
                onFinish={onFinishWork}
                layout="vertical"
                form={workForm}
              >
                <Form.Item
                  name="job_title"
                  label=" Job Title"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "This field is Mandatory!",
                    },
                    {
                      max: 100,
                      message: "Job Title must be maximum 100 digits.",
                    },
                  ]}
                >
                  <Input placeholder="Enter your Job Title!" />
                </Form.Item>
                <Form.Item
                  name="company_name"
                  label=" Company Name"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "This field is Mandatory!",
                    },
                    {
                      max: 100,
                      message: "Company name must be maximum 100 digits.",
                    },
                  ]}
                >
                  <Input placeholder="Enter your Company Name!" />
                </Form.Item>
                <Form.Item
                  name="job_start_date"
                  label=" Job Start Date"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "This field is Mandatory!",
                    },
                  ]}
                >
                  <Input type="date" placeholder="Enter Job Start Date!" />
                </Form.Item>
                <Form.Item
                  name="job_end_date"
                  label="Job End Date"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "This field is Mandatory!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("job_start_date") < value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error(
                            "End Date Should be Greater than Start date!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input type="date" placeholder="Enter Job End Date!" />
                </Form.Item>
                <Form.Item
                  name="skills"
                  label="Skills"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "This field is Mandatory!",
                    },
                  ]}
                >
                  <TextArea rows={4} maxLength={500} />
                </Form.Item>
                <div className="modelbox-btn-mb">
                  <Form.Item>
                    <Button
                      className="ant-btn ant-btn btn__profile1"
                      htmlType="submit"
                    >
                      Save
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </Modal>
            <div className="resum-education">
              <Row
                gutter={[10, 10]}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Col xs={14} sm={14} md={12} lg={12}>
                  <h2 className="heading-education"> Social Media</h2>
                </Col>
                <Col xs={10} sm={10} md={12} lg={12}>
                  <div
                    className="btnedu-0"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Button
                    /*  className="ant-btn ant-btn btn__profile1" */
                    /*   onClick={showModalSocialMedia} */
                    >
                      <Resume_SocialMedia />
                      {/*  Add SocialMedia */}
                    </Button>
                  </div>
                </Col>
              </Row>
              {loading ? (
                <Skeleton />
              ) : (
                <>
                  {get_Resume && get_Resume.social_media == "" ? null : (
                    <div className="main-institute">
                      {get_Resume &&
                        get_Resume.social_media &&
                        get_Resume.social_media.map((item) => (
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
                                  {item.name === "facebook" ? (
                                    <div className="social-media-icons">
                                      <AiFillFacebook />
                                      <a href={item.link} target="_blank">
                                        {item.link}
                                      </a>
                                    </div>
                                  ) : null}
                                  {item.name === "instagram" ? (
                                    <div className="social-media-icons">
                                      <AiFillInstagram />
                                      <a href={item.link} target="_blank">
                                        {item.link}
                                      </a>
                                    </div>
                                  ) : null}
                                  {item.name === "twitter" ? (
                                    <div className="social-media-icons">
                                      <AiFillTwitterSquare />
                                      <a href={item.link} target="_blank">
                                        {item.link}
                                      </a>
                                    </div>
                                  ) : null}
                                  {item.name === "Linkedin" ? (
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
                              <Col xs={24} sm={24} md={12} lg={12}>
                                <div
                                  className="editicon_ei"
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                  }}
                                >
                                  <Button
                                    onClick={() => editSocialMedia(item.id)}
                                  >
                                    <i
                                      class="fa fa-pencil"
                                      aria-hidden="true"
                                    ></i>
                                  </Button>
                                  <Button
                                    onClick={() => deleteSocialMediaId(item.id)}
                                  >
                                    <AiFillDelete />
                                  </Button>
                                </div>
                              </Col>
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
            <Modal
              title="Social Media
                 "
              visible={isSocialMediaModal}
              onCancel={handleCancelSocialMedia}
              footer={null}
            >
              <Form
                name="basic"
                onFinish={onFinishSocialMedia}
                layout="vertical"
                form={socialform}
              >
                <Form.Item
                  name="social_media"
                  label="Social Media  "
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "This field is Mandatory!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select Social Media"
                    optionFilterProp="children"
                    onChange={onChange}
                  >
                    <Option value="facebook">FaceBook</Option>
                    <Option value="instagram">Instagram</Option>
                    <Option value="twitter">Twitter</Option>
                    <Option value="Linkedin">Linkedin</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="link"
                  label="Link"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Link !",
                    },
                  ]}
                >
                  <Input placeholder="Enter Link" />
                </Form.Item>
                <div className="modelbox-btn-mb">
                  <Form.Item>
                    <Button
                      className="ant-btn ant-btn btn__profile1"
                      htmlType="submit"
                    >
                      Save
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </Modal>

            {get_Resume && get_Resume.summary != null ? (
              <div className="resum-education">
                <Row
                  gutter={[10, 10]}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Col xs={14} sm={14} md={12} lg={12}>
                    <h2 className="heading-education">Summary</h2>
                  </Col>
                  <Col xs={10} sm={10} md={12} lg={12}>
                    <div
                      className="editicon_ei"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Button onClick={showModalSummary}>
                        {/*  <Button type="link" onclick={() => editSummary()}> */}
                        <i class="fa fa-pencil" aria-hidden="true"></i>

                        {/* </Button> */}
                      </Button>
                      {/* <Resume_Summary summaryData={get_Resume.summary} /> */}
                      {/* <i class="fa fa-pencil-square-o" aria-hidden="true"></i> */}
                    </div>
                  </Col>
                </Row>
                <Modal
                  title="Profile Summary "
                  visible={isSummaryModal}
                  onCancel={handleCancelSummary}
                  footer={null}
                >
                  <Form
                    name="basic"
                    onFinish={onFinish}
                    layout="vertical"
                    form={summaryform}
                  >
                    {/*  <p>
                      Your Profile Summary should mention the highlights of your
                      career and education, what your professional interests
                      are, and what kind of a career you are looking for.
                    </p> */}
                    <Form.Item
                      name="summary"
                      label="Profile Summary"
                      required={true}
                      rules={[
                        {
                          required: true,
                          message: "This field is Mandatory!",
                        },
                      ]}
                    >
                      <TextArea rows={4} maxLength={1000} />
                    </Form.Item>
                    <div className="modelbox-btn-mb">
                      <Form.Item>
                        <Button
                          className="ant-btn ant-btn btn__profile1"
                          htmlType="submit"
                        >
                          Save
                        </Button>
                      </Form.Item>
                    </div>
                  </Form>
                </Modal>
                <div className="main-institute">
                  <div className="name-grade">
                    <b>
                      {get_Resume && get_Resume.summary != ""
                        ? get_Resume.summary
                        : "N/A"}
                    </b>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default Resume;
