import React, { useEffect, useState, useRef } from "react";
import {
  getConversation,
  sendMessage,
  getMessage,
} from "../../redux/actions/chatAction";
import { Row, Col, Input, Button, Form, Spin, Tabs } from "antd";
import { get_Athlete, getTeam } from "../../redux/actions/coachAction";
import { myCoach } from "../../redux/actions/athleteAction";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logo1.png";
import {
  UPLOAD_PIC,
  ATHLETE,
  COMPANY,
  COACH,
} from "../../constants/ActionType";
import moment from "moment-timezone";
import { companyCoach } from "../../redux/actions/companyaction";
import { useHistory } from "react-router-dom";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import {
  CommentOutlined,
  WechatOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import ConversationList from "./components/ConversationList";
import MyContacts from "./components/MyContacts";
import { useLocation } from "react-router-dom";

function Chat() {
  const [form] = Form.useForm();
  const { TabPane } = Tabs;
  var messagesEndRef = useRef(null);
  let history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const [loadingData, setLoadingData] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [selectedId, setSelectedId] = useState(undefined);

  const chat = useSelector((state) => state.chat);
  const { get_conversation, get_message } = chat;

  const userDetails = useSelector((state) => state.user);
  const { userDetail } = userDetails;

  const athlete_detail = useSelector((state) => state.athlete_detail);
  const { loading } = athlete_detail;

  useEffect(() => {
    if (userDetail && userDetail.user && userDetail.user.role == ATHLETE) {
      collectCoachData();
    } else if (userDetail && userDetail.user && userDetail.user.role == COACH) {
      collectUserData();
    } else if (
      userDetail &&
      userDetail.user &&
      userDetail.user.role == COMPANY
    ) {
      collectCompanyCoachData();
    }
  }, [userDetail]);

  const collectCoachData = async () => {
    await dispatch(myCoach());
  };

  const collectUserData = async () => {
    await dispatch(get_Athlete());
    await dispatch(getTeam());
  };

  const collectCompanyCoachData = async () => {
    await dispatch(companyCoach());
  };

  useEffect(() => {
    dispatch(getConversation());
    let timer1 = setInterval(() => dispatch(getConversation()), 30000);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const onFinish = async (data) => {
    const newData = await {
      receiver_id: selectedId,
      ...data,
    };
    await dispatch(sendMessage(newData));
    form.resetFields();
    dispatch(getConversation());
    dispatch(getMessage(selectedId));
  };

  useEffect(() => {
    scrollToBottom();
  }, [get_message, messagesEndRef.current]);

  var messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  useEffect(() => {
    if (
      location.state &&
      location.state.contactID !== undefined &&
      isFirstLoad
    ) {
      setSelectedId(parseInt(location.state.contactID));
      setIsFirstLoad(false);
    } else if (isFirstLoad && get_conversation.length && userDetail.user) {
      if (userDetail.user.id === get_conversation[0].reciever_id) {
        setSelectedId(get_conversation[0].sender_id);
      } else if (userDetail.user.id === get_conversation[0].sender_id) {
        setSelectedId(get_conversation[0].reciever_id);
      } else {
        setSelectedId(null);
      }

      setIsFirstLoad(false);
    }
  }, [userDetail, get_conversation]);

  useEffect(() => {
    if (selectedId !== undefined || selectedId !== null) {
      collectConversationMessage();
    } else {
      setLoadingData(false);
    }

    let setTimeoutMessages = setInterval(() => {
      if (selectedId) {
        dispatch(getMessage(selectedId));
      }
    }, 30000);

    return () => {
      clearTimeout(setTimeoutMessages);
    };
  }, [selectedId]);

  const collectConversationMessage = async () => {
    await dispatch(getMessage(selectedId));
    await setLoadingData(false);
  };

  return (
    <div className="newContnainer">
      <Row gutter={[25, 16]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          {loadingData ? (
            <Spin className="loader-ld" />
          ) : (
            <>
              <div className="athlete__home">
                <Row gutter={[25, 16]}>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="back-btn-bb">
                      <Button
                        type="link"
                        onClick={() => history.push("/profile")}
                      >
                        <AiOutlineDoubleLeft />
                      </Button>
                      <h2 className="themestek-custom-heading">Chat</h2>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={10} lg={10}>
                    <div className="chattabs-ct">
                      <Tabs defaultActiveKey="1">
                        <TabPane
                          tab={
                            <span>
                              <WechatOutlined />
                              My Chats
                            </span>
                          }
                          key="1"
                        >
                          {get_conversation.length > 0 ? (
                            <ConversationList
                              userDetail={userDetail}
                              get_conversation={get_conversation}
                              setSelectedId={setSelectedId}
                              selectedId={selectedId}
                            />
                          ) : (
                            <p style={{ textAlign: "center" }}>
                              go to your contacts to start a conversations.
                            </p>
                          )}
                        </TabPane>
                        <TabPane
                          tab={
                            <span>
                              <ContactsOutlined />
                              My Contacts
                            </span>
                          }
                          key="2"
                        >
                          <MyContacts
                            userDetail={userDetail}
                            setSelectedId={setSelectedId}
                            selectedId={selectedId}
                          />
                        </TabPane>
                      </Tabs>
                    </div>
                  </Col>

                  <Col xs={24} sm={24} md={14} lg={14}>
                    {selectedId == undefined ? (
                      <div className="selecttheperson-stp">
                        <h2>Select the person</h2>
                      </div>
                    ) : (
                      <>
                        <div className="chat_proile_cp">
                          <img
                            src={
                              get_message &&
                              get_message.receiver_details &&
                              get_message.receiver_details.avatar != null
                                ? UPLOAD_PIC +
                                  get_message.receiver_details.avatar
                                : logo
                            }
                            alt="logo"
                          />
                          <h3 class="activecoaches">
                            <span>
                              <span>
                                {get_message &&
                                get_message.receiver_data &&
                                get_message.receiver_data.fname != ""
                                  ? get_message.receiver_data.fname
                                  : "N/A"}
                              </span>
                              <span> </span>
                              <span>
                                {get_message &&
                                get_message.receiver_data &&
                                get_message.receiver_data.lname != ""
                                  ? get_message.receiver_data.lname
                                  : "N/A"}
                              </span>
                            </span>
                            {/*  <>{get_message.receiver_data}</> */}
                          </h3>
                        </div>
                        <div className="scrollbar0 chat-msg-2zw">
                          {loading && chat.loading ? (
                            <Spin className="loader-ld" />
                          ) : (
                            <>
                              {get_message && get_message.messages == "" ? (
                                <div className="startchat-icon-sci">
                                  <p>
                                    <CommentOutlined />
                                  </p>
                                  <h2>Start Chat</h2>
                                </div>
                              ) : (
                                <>
                                  {get_message !== "" ? (
                                    <>
                                      {" "}
                                      {get_message &&
                                        get_message.messages &&
                                        get_message.messages.map((item) => (
                                          <>
                                            <div>
                                              {userDetail &&
                                              userDetail.user &&
                                              userDetail.user.id ==
                                                item.sender_id ? (
                                                <div
                                                  className="_2aBzC right-msg"
                                                  /*  ref={messagesEndRef} */
                                                >
                                                  <div
                                                    ref={messagesEndRef}
                                                  ></div>
                                                  <div className="msg-bubble">
                                                    <div className="msg-text">
                                                      {item.message_text}
                                                    </div>
                                                  </div>
                                                  <div className="msg-info">
                                                    <div className="msg-info-time">
                                                      {moment
                                                        .tz(
                                                          item.created_at,
                                                          "America/Toronto"
                                                        )
                                                        .format(
                                                          "HH:mm A DD MMM YYYY "
                                                        )}
                                                    </div>
                                                  </div>

                                                  {/*  <div
                                                    ref={messagesEndRef}
                                                  ></div> */}
                                                </div>
                                              ) : (
                                                <div
                                                  className="_2aBzC"
                                                  /* ref={messagesEndRef} */
                                                >
                                                  <div
                                                    ref={messagesEndRef}
                                                  ></div>
                                                  <div className="msg-bubble">
                                                    <div className="msg-text">
                                                      {item.message_text}
                                                    </div>
                                                  </div>
                                                  <div className="msg-info">
                                                    <div className="msg-info-time">
                                                      {moment
                                                        .tz(
                                                          item.created_at,
                                                          "America/Toronto"
                                                        )
                                                        .format(
                                                          "HH:mm A DD MMM YYYY "
                                                        )}
                                                    </div>
                                                  </div>
                                                  {/* <div
                                                    ref={messagesEndRef}
                                                  ></div> */}
                                                </div>
                                              )}
                                            </div>
                                          </>
                                        ))}
                                    </>
                                  ) : (
                                    "No Text Found"
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </div>
                        <div className="BzCMsg-text">
                          <Form
                            name="basic"
                            onFinish={onFinish}
                            layout="vertical"
                            form={form}
                          >
                            <Row
                              gutter={[10, 10]}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Col xs={24} sm={24} md={20} lg={20}>
                                <Form.Item
                                  name="message"
                                  required={true}
                                  rules={[
                                    {
                                      required: true,
                                      message: "This field is Mandatory!",
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={24} md={4} lg={4}>
                                <Form.Item>
                                  <div>
                                    <Button
                                      className="msger-send-btn  "
                                      htmlType="submit"
                                    >
                                      Send
                                    </Button>
                                  </div>
                                </Form.Item>
                              </Col>
                            </Row>
                          </Form>
                        </div>
                      </>
                    )}
                  </Col>
                </Row>
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
export default Chat;
