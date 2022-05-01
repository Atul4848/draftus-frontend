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
} from "antd";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  acceptTeam,
  teamDetail,
  rejectTeam,
} from "../../redux/actions/coachAction";

import profile from "../../assets/logo1.png";
import { WechatOutlined } from "@ant-design/icons";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { REQUEST, UPLOAD_PIC, YOUTUBE_LINK } from "../../constants/ActionType";

function CompanyDetail() {
  const [videoUrl, setURL] = useState("");
  let { id } = useParams();
  const dispatch = useDispatch();
  let history = useHistory();
  const coach_detail = useSelector((state) => state.coach_detail);

  const {
    loading,

    athlete_skill,
    team_Detail,
  } = coach_detail;

  useEffect(() => {
    dispatch(teamDetail(id));
  }, [id]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

  const { form } = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  /*  const showModalRemove = () => {
    setIsRemove(true);
  };

  const handleCancelRemove = () => {
    setIsRemove(false);
  }; */

  const athleteAccepted = async () => {
    await dispatch(acceptTeam(team_Detail.id));
    dispatch(teamDetail(id));
  };
  const onFinish = async (data) => {
    const newData = await {
      ...data,
      request_id: team_Detail.id,
    };
    await dispatch(rejectTeam(newData));
    setIsModalVisible(false);

    dispatch(teamDetail(id));
  };

  /*  const onRemove = async (data) => {
    const newData = await {
      ...data,
      request_id: athlete_detail.id,
    };
    await dispatch(removeAthlete(newData));
    setIsRemove(false);
    history.push("/profile");

    
  }; */

  useEffect(() => {
    if (
      team_Detail &&
      team_Detail.company_details &&
      team_Detail.company_details.get_user_details &&
      team_Detail.company_details.get_user_details.video_url != null
    ) {
      const youTubeUrl = team_Detail.company_details.get_user_details.video_url;
      const splitted = youTubeUrl.split("/");
      const updatedURL = YOUTUBE_LINK + splitted[splitted.length - 1];
      setURL(updatedURL);
    }
  }, [team_Detail]);

  return (
    <div className="newContnainer">
      {loading ? (
        <Spin className="loader-ld" />
      ) : (
        <>
          <Card>
            {loading ? (
              <Skeleton />
            ) : (
              <Row gutter={[25, 16]}>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="back-btn-bb">
                    <Button
                      type="link"
                      onClick={() => history.push("/profile")}
                    >
                      <AiOutlineDoubleLeft />
                    </Button>
                    <h2 className="themestek-custom-heading">Team</h2>{" "}
                  </div>
                </Col>
                <Col xs={24} sm={24} md={7} lg={7}>
                  <div className="athlete__home_img">
                    <img
                      src={
                        team_Detail &&
                        team_Detail.company_details &&
                        team_Detail.company_details.get_user_details &&
                        team_Detail.company_details.get_user_details.avatar !=
                          null
                          ? UPLOAD_PIC +
                            team_Detail.company_details.get_user_details.avatar
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
                          {team_Detail &&
                          team_Detail.company_details &&
                          team_Detail.company_details.fname != ""
                            ? team_Detail.company_details.fname
                            : "N/A"}
                        </p>
                        <p>
                          {team_Detail &&
                          team_Detail.company_details &&
                          team_Detail.company_details.lname != ""
                            ? team_Detail.company_details.lname
                            : "N/A"}
                        </p>
                      </span>
                    </div>
                    <div className="profileinform">
                      <b>Email :</b>
                      <span>
                        {team_Detail &&
                        team_Detail.company_details &&
                        team_Detail.company_details.email != ""
                          ? team_Detail.company_details.email
                          : "N/A"}
                      </span>
                    </div>
                    <div className="profileinform">
                      <b>Contact :</b>
                      <span>
                        {team_Detail &&
                        team_Detail.company_details &&
                        team_Detail.company_details.get_user_details != ""
                          ? team_Detail.company_details.get_user_details.phone
                          : "N/A"}
                      </span>
                    </div>
                    <div className="profileinform">
                      <b>Address :</b>
                      <span>
                        {team_Detail &&
                        team_Detail.company_details &&
                        team_Detail.company_details.get_user_details != ""
                          ? team_Detail.company_details.get_user_details.address
                          : "N/A"}
                      </span>
                    </div>
                    <div className="profileinform">
                      <b>Postcode:</b>
                      <span>
                        {team_Detail &&
                        team_Detail.company_details &&
                        team_Detail.company_details.get_user_details &&
                        team_Detail.company_details.get_user_details.postal_code
                          ? team_Detail.company_details.get_user_details
                              .postal_code
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
                  </div>
                  {/*  {team_Detail && team_Detail.status == REQUEST ? null : (
                    <Button
                      type="primary"
                      icon={<WechatOutlined />}
                      onClick={() => history.push("/chat", { contactID: id })}
                    >
                      Message
                    </Button>
                  )} */}
                  {team_Detail && team_Detail.status == REQUEST ? (
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
                      </Col>
                    </Row>
                  )}
                </Col>
                {team_Detail &&
                team_Detail.user &&
                team_Detail.user.get_user_details &&
                team_Detail.user.get_user_details.video_url != null ? (
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
            )}
          </Card>
          {team_Detail &&
          team_Detail.user &&
          team_Detail.user.get_user_details &&
          team_Detail.user.get_user_details.description != null ? (
            <Card>
              <div className="brifhding">
                <h2 className="themestek-custom-heading">Description:</h2>
                {loading ? (
                  <Skeleton />
                ) : (
                  <p>
                    {team_Detail &&
                    team_Detail.user &&
                    team_Detail.user.get_user_details &&
                    team_Detail.user.get_user_details.description
                      ? team_Detail.user.get_user_details.description
                      : "N/A"}
                  </p>
                )}
              </div>
            </Card>
          ) : null}
        </>
      )}
    </div>
  );
}
export default CompanyDetail;
