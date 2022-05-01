import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  coachViewForumDetail,
  coachComment,
  recommendForum,
  deleteComment,
  editComment,
} from "../../redux/actions/forumAction";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Input,
  Form,
  Button,
  Skeleton,
  Spin,
  Modal,
  Radio,
  Popconfirm,
} from "antd";
import { useParams } from "react-router-dom";
//import moment from "moment";
import moment from "moment-timezone";
import { AUSTRALIA } from "../../constants/ActionType";
import { get_Athlete } from "../../redux/actions/coachAction";
import { AiFillDelete } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AiOutlineDoubleLeft } from "react-icons/ai";

function ForumDetails() {
  let history = useHistory();
  const user = useSelector((state) => state.user);
  const [editor, setEditor] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [targetComment, setTargetComment] = useState(undefined);
  const { userDetail } = user;
  const { id } = useParams();
  const { TextArea } = Input;
  //let history = useHistory();
  const [form] = Form.useForm();
  //const dispatch = useDispatch();
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const executeScrollComment = () => scrollToBottom(messagesEndRef);

  const dispatch = useDispatch();
  const forum = useSelector((state) => state.forum);
  const { coach_View_Forum_Detail, loading } = forum;
  const [recommend, setRecommend] = useState();

  const selectRecommend = (e) => {
    setRecommend(e.target.value);
  };

  const coach_detail = useSelector((state) => state.coach_detail);
  const { acceptedAthlete } = coach_detail;

  useEffect(() => {
    dispatch(coachViewForumDetail(id));
  }, []);

  const onFinish = async (data) => {
    if (isUpdate) {
      const newData = await {
        id: targetComment,
        threads_id: id,
        ...data,
      };
      await dispatch(editComment(newData));
    } else {
      const newData = await {
        threads_id: id,
        ...data,
      };
      await dispatch(coachComment(newData));
    }
    dispatch(coachViewForumDetail(id));
    form.resetFields();
    setTargetComment(undefined);
    setIsUpdate(false);
  };

  /* const onFinish = async (data) => {
    const newData = await {
      threads_id: id,
      ...data,
    };
    await dispatch(coachComment(newData));
    dispatch(coachViewForumDetail(id));
    form.resetFields();
    
  }; */

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModalAthlete = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    collectUserData();
  }, []);

  const collectUserData = async () => {
    await dispatch(get_Athlete());
  };

  const [value, setValue] = React.useState(1);

  const IsRecommended = async () => {
    const newDatalogin = await {
      thread_id: id,

      athlete_id: recommend,
    };
    await dispatch(recommendForum(newDatalogin));
    /* console.log("radio checked", e.target.value); */

    setIsModalVisible(false);
  };

  const editcommentId = async (id) => {
    const postData = coach_View_Forum_Detail.posts;
    const target = await postData.find((x) => x.id === id);
    await form.setFieldsValue({ body: target.body });
    await setTargetComment(id);
    await setIsUpdate(true);
  };

  function cancel(e) {
    console.log(e);
  }

  return (
    <div>
      <div className="newContnainer">
        <div className="athlete__home">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className="back-btn-bb">
                <Button
                  type="link"
                  onClick={() => history.push("/profile/forum")}
                >
                  <AiOutlineDoubleLeft />
                </Button>
                <h2 className="themestek-custom-heading">Forum</h2>
              </div>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24}>
              <div className="bbp-forum-info">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    {loading ? (
                      <Skeleton />
                    ) : (
                      <>
                        <div className="bbp-forum-title">
                          <i
                            className="fa fa-arrow-circle-right"
                            aria-hidden="true"
                          ></i>
                          <h4>
                            {coach_View_Forum_Detail &&
                            coach_View_Forum_Detail.title != ""
                              ? coach_View_Forum_Detail.title
                              : "N/A"}
                          </h4>
                        </div>

                        <div className="bbp-forum-content" ref={myRef}>
                          <p>
                            {coach_View_Forum_Detail &&
                            coach_View_Forum_Detail.description != ""
                              ? coach_View_Forum_Detail.description
                              : "N/A"}
                          </p>
                        </div>
                        <div
                          className="btn-profil-t"
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            className="ant-btn ant-btn btn__profile1"
                            onClick={showModalAthlete}
                          >
                            Recommend
                          </Button>
                        </div>
                        <Modal
                          title="Athlete "
                          visible={isModalVisible}
                          onCancel={handleCancel}
                          footer={null}
                          className="modelbox_mb"
                        >
                          <div>
                            {loading ? (
                              <Spin size="large" className="spinner" />
                            ) : (
                              <>
                                {acceptedAthlete == "" ? (
                                  <div className="nofound0">
                                    No Data <span> Found !</span>
                                  </div>
                                ) : (
                                  <Radio.Group
                                    name="radiogroup"
                                    onChange={selectRecommend}
                                    value={recommend}
                                  >
                                    {acceptedAthlete &&
                                      acceptedAthlete.map((item) => (
                                        <div className="form-check">
                                          <Radio value={item.athlete_id}>
                                            <span>
                                              {item &&
                                              item.user &&
                                              item.user.fname != ""
                                                ? item.user.fname
                                                : "n/a"}
                                            </span>
                                            <span> </span>
                                            <span>
                                              {item &&
                                              item.user &&
                                              item.user.lname != ""
                                                ? item.user.lname
                                                : "n/a"}
                                            </span>
                                          </Radio>
                                        </div>
                                      ))}
                                  </Radio.Group>
                                )}
                              </>
                            )}
                          </div>
                          {recommend && acceptedAthlete != "" ? (
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
                                Recommend
                              </Button>
                            </div>
                          ) : null}
                        </Modal>
                      </>
                    )}
                  </Col>
                </Row>
              </div>
            </Col>
            {/* <Col xs={24} sm={24} md={24} lg={24}>
              <div className="bbp-forum-title">
                <h4>2 Answer</h4>
              </div>
            </Col> */}
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className="scrollforum">
                <Row gutter={[6, 6]}>
                  {loading ? (
                    <Spin size="large" className="spinner" />
                  ) : (
                    <>
                      {coach_View_Forum_Detail == "" ? (
                        <div className="nofound0">
                          No Data <span> Found !</span>
                        </div>
                      ) : (
                        <>
                          {coach_View_Forum_Detail &&
                            coach_View_Forum_Detail.posts &&
                            coach_View_Forum_Detail.posts.map((item) => (
                              <Col xs={24} sm={24} md={24} lg={24}>
                                <div className="bbp-forum-info">
                                  <div className="anser">{item.body}</div>
                                  {userDetail &&
                                  userDetail.user &&
                                  userDetail.user.id == item.user_id ? (
                                    <div className="edit-delete">
                                      <Button
                                        onClick={() => editcommentId(item.id)}
                                      >
                                        <i
                                          class="fa fa-pencil-square-o"
                                          aria-hidden="true"
                                          onClick={executeScrollComment}
                                        ></i>
                                      </Button>
                                      <Button>
                                        <Popconfirm
                                          title="Are you sure to delete this Message?"
                                          onConfirm={async () => {
                                            await dispatch(
                                              deleteComment(item.id)
                                            );
                                            dispatch(coachViewForumDetail(id));
                                          }}
                                          onCancel={cancel}
                                          okText="Yes"
                                          cancelText="No"
                                        >
                                          <AiFillDelete />
                                        </Popconfirm>
                                      </Button>
                                    </div>
                                  ) : null}
                                  <div className="timebtm">
                                    <p className="nameans">
                                      <span>{item.user_name.fname}</span>
                                      <span> </span>
                                      <span>{item.user_name.lname}</span>
                                    </p>
                                    <time>
                                      <i
                                        className="fa fa-clock-o"
                                        aria-hidden="true"
                                      ></i>{" "}
                                      {moment
                                        .tz(item.created_at, AUSTRALIA)
                                        .format("LLLL")}
                                    </time>
                                  </div>
                                </div>
                              </Col>
                            ))}
                        </>
                      )}
                    </>
                  )}
                </Row>
              </div>
            </Col>
            <div></div>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className="bbp-forum-title" ref={messagesEndRef}>
                <h4>Your Answer</h4>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
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
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="inputLogin1">
                      <Form.Item
                        name="body"
                        required={true}
                        rules={[
                          {
                            required: true,
                            message: "This field is Mandatory!",
                          },
                        ]}
                      >
                        <TextArea placeholder="Enter Answer" />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="inputLogin1">
                      <Form.Item>
                        <div className="postanw" onClick={executeScroll}>
                          <Button className="ant-btn  " htmlType="submit">
                            {targetComment ? "Update" : "POST"}
                          </Button>
                        </div>
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
export default ForumDetails;
