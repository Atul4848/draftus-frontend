import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  coachViewForum,
  deleteForum,
  loadMoreCoachForum,
} from "../../redux/actions/forumAction";
import { Skeleton, Card, Col, Row, Button, Spin, Popconfirm } from "antd";
//import moment from "moment";
import moment from "moment-timezone";
import { AUSTRALIA } from "../../constants/ActionType";
import { AiFillDelete, AiOutlineDoubleLeft } from "react-icons/ai";

function Forum_Page() {
  let history = useHistory();
  const dispatch = useDispatch();
  const forum = useSelector((state) => state.forum);
  const { coach_View_Forum, loading } = forum;

  useEffect(() => {
    dispatch(coachViewForum());
  }, []);

  const deleteData = async (id) => {
    await dispatch(deleteForum(id));
    dispatch(coachViewForum());
  };
  function cancel(e) {
    console.log(e);
  }

  return (
    <div className="newContnainer">
      <div className="athlete__home">
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            {loading ? (
              <Spin size="large" className="spinner" />
            ) : (
              <div className="back-btn-bb">
                <Button type="link" onClick={() => history.push("/profile")}>
                  <AiOutlineDoubleLeft />
                </Button>
                <h2 className="themestek-custom-heading">Forum</h2>
              </div>
            )}
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <div className="add-forum-af">
              <Link to="/profile/forum/add_forum">Add Forum </Link>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24}>
            {loading ? (
              <Skeleton />
            ) : (
              <div className="forum_page_fp">
                {coach_View_Forum == "" ? (
                  <div className="nofound0 height-nofount">
                    No Forum <span> Found !</span>
                  </div>
                ) : (
                  <>
                    {coach_View_Forum &&
                      coach_View_Forum.map((item) => (
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="bbp-forum-info">
                            <Row gutter={[16, 16]}>
                              <Col xs={24} sm={24} md={20} lg={20}>
                                <Link to={"/profile/forum_details/" + item.id}>
                                  <div className="bbp-forum-title">
                                    <i
                                      className="fa fa-arrow-circle-right"
                                      aria-hidden="true"
                                    ></i>

                                    <h4>{item.title}</h4>
                                  </div>
                                </Link>
                                <Link to={"/profile/forum_details/" + item.id}>
                                  <div className="bbp-forum-content">
                                    <p>{item.description}</p>
                                  </div>
                                </Link>
                              </Col>
                              <Col xs={24} sm={24} md={4} lg={4}>
                                <div className="edit-delete">
                                  <Link
                                    to={"/profile/forum/edit_forum/" + item.id}
                                  >
                                    <Button>
                                      <i
                                        class="fa fa-pencil-square-o"
                                        aria-hidden="true"
                                      ></i>
                                    </Button>
                                  </Link>
                                  <Button>
                                    <Popconfirm
                                      title="Are you sure to delete this Forum?"
                                      onConfirm={() => deleteData(item.id)}
                                      onCancel={cancel}
                                      okText="Yes"
                                      cancelText="No"
                                    >
                                      <AiFillDelete />
                                    </Popconfirm>
                                  </Button>
                                </div>
                              </Col>
                              <Col xs={24} sm={24} md={24} lg={24}>
                                <div className="timebtm">
                                  {/*   <p className="nameans">admin</p> */}
                                  <time datetime="2020-07-24T00:12:56+00:00">
                                    <i
                                      className="fa fa-clock-o"
                                      aria-hidden="true"
                                    ></i>{" "}
                                    {moment
                                      .tz(item.created_at, AUSTRALIA)
                                      .format("LLLL")}
                                  </time>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      ))}
                  </>
                )}
              </div>
            )}
          </Col>
          {forum.coachLoadMoreURL != null ? (
            <div className="loadmore">
              <Button
                className="ant-btn ant-btn btn__profile1"
                onClick={() =>
                  dispatch(loadMoreCoachForum(forum.coachLoadMoreURL))
                }
              >
                Load More
              </Button>
            </div>
          ) : null}
        </Row>
      </div>
    </div>
  );
}
export default Forum_Page;
