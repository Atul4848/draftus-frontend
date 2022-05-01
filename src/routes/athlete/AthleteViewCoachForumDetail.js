import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  athleteViewForumDetail,
  athleteComment,
  editComment,
  editAthleteCommentByID,
  deleteComment,
} from "../../redux/actions/forumAction";
import {
  Row,
  Col,
  Input,
  Form,
  Button,
  Skeleton,
  Spin,
  Popconfirm,
} from "antd";
import { useParams } from "react-router-dom";
//import moment from "moment";
import moment from "moment-timezone";
import { AUSTRALIA } from "../../constants/ActionType";
import { AiFillDelete, AiOutlineDoubleLeft } from "react-icons/ai";
import { useHistory } from "react-router-dom";

function AthleteViewCoachForumDetail() {
  let history = useHistory();
  const user = useSelector((state) => state.user);
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
  const { athlete_View_Forum_Detail, loading, isAthleteComment } = forum;

  const [isUpdate, setIsUpdate] = useState(false);
  const [targetComment, setTargetComment] = useState(undefined);

  useEffect(() => {
    dispatch(athleteViewForumDetail(id));
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
      await dispatch(athleteComment(newData));
    }
    dispatch(athleteViewForumDetail(id));
    form.resetFields();
    setTargetComment(undefined);
    setIsUpdate(false);
  };

  const editcommentId = async (id) => {
    const postData = athlete_View_Forum_Detail.posts;
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
                  onClick={() =>
                    history.push("/profile/athlete_view_coach_forum")
                  }
                >
                  <AiOutlineDoubleLeft />
                </Button>
                <h2 className="themestek-custom-heading">Forum</h2>{" "}
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
                            {athlete_View_Forum_Detail &&
                            athlete_View_Forum_Detail.title != ""
                              ? athlete_View_Forum_Detail.title
                              : "N/A"}
                          </h4>
                        </div>

                        <div className="bbp-forum-content" ref={myRef}>
                          <p>
                            {athlete_View_Forum_Detail &&
                            athlete_View_Forum_Detail.description != ""
                              ? athlete_View_Forum_Detail.description
                              : "N/A"}
                          </p>
                        </div>
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
            {loading ? (
              <Spin size="large" className="spinner" />
            ) : (
              <>
                {athlete_View_Forum_Detail == "" ? (
                  <div className="nofound0">
                    No Data <span> Found !</span>
                  </div>
                ) : (
                  <>
                    {athlete_View_Forum_Detail &&
                      athlete_View_Forum_Detail.posts &&
                      athlete_View_Forum_Detail.posts.map((item) => (
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="bbp-forum-info">
                            <div className="anser">{item.body}</div>
                            {userDetail &&
                            userDetail.user &&
                            userDetail.user.id == item.user_id ? (
                              <div className="edit-delete">
                                <Button
                                  onClick={
                                    () => editcommentId(item.id)
                                    /* executeScrollComment */
                                  }
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
                                      await dispatch(deleteComment(item.id));
                                      dispatch(athleteViewForumDetail(id));
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
                                ></i>
                                {moment
                                  .tz(item.created_at, AUSTRALIA)
                                  .format("LLLL")}
                                {/* {moment(item.created_at).format("LLLL")} */}
                              </time>
                            </div>
                          </div>
                        </Col>
                      ))}
                  </>
                )}
              </>
            )}
            <div ref={messagesEndRef}></div>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className="bbp-forum-title">
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
                        <div className="postanw">
                          <Button
                            className="ant-btn  "
                            htmlType="submit"
                            onClick={executeScroll}
                          >
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
export default AthleteViewCoachForumDetail;
