import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  companyViewForum,
  loadMoreCoachForumByCompany,
} from "../../redux/actions/forumAction";
import { Skeleton, Card, Col, Row, Button, Spin, Badge } from "antd";
//import moment from "moment";
import moment from "moment-timezone";
import { AUSTRALIA } from "../../constants/ActionType";
import { useHistory } from "react-router-dom";
import { AiOutlineDoubleLeft } from "react-icons/ai";

function CompanyViewCoachForum() {
  let history = useHistory();
  const dispatch = useDispatch();
  const forum = useSelector((state) => state.forum);
  const { company_View_Forum, loading } = forum;

  useEffect(() => {
    dispatch(companyViewForum());
  }, []);
  return (
    <div className="newContnainer">
      <div className="athlete__home">
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={24} lg={24}>
            {loading ? (
              <Spin size="large" className="spinner" />
            ) : (
              <div className="back-btn-bb">
                <Button type="link" onClick={() => history.push("/profile")}>
                  <AiOutlineDoubleLeft />
                </Button>
                <h2 className="themestek-custom-heading">Forum</h2>{" "}
              </div>
            )}
          </Col>
          {/*  <Col
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
             <Link to="/profile/forum/add_forum">Create Forum</Link>
          </Col> */}
          <Col xs={24} sm={24} md={24} lg={24}>
            {loading ? (
              <Skeleton />
            ) : (
              <div className="forum_page_fp">
                {company_View_Forum == "" ? (
                  "No Forum has been Created"
                ) : (
                  <>
                    {company_View_Forum &&
                      company_View_Forum.map((item) => (
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <Link
                            to={
                              "/profile/company-view-coach-forum-detail/" +
                              item.id
                            }
                          >
                            <Badge.Ribbon
                              text={
                                <>
                                  <span>{item.thread_user_details.fname}</span>
                                  <span> </span>
                                  <span>{item.thread_user_details.lname}</span>
                                </>
                              }
                            >
                              <Card hoverable>
                                {/* <div className="bbp-forum-info"> */}
                                <Row gutter={[16, 16]}>
                                  <Col xs={24} sm={24} md={24} lg={24}>
                                    <div className="bbp-forum-title">
                                      <i
                                        className="fa fa-arrow-circle-right"
                                        aria-hidden="true"
                                      ></i>
                                      <h4>{item.title}</h4>
                                    </div>

                                    <div className="bbp-forum-content">
                                      <p>
                                        {item && item.description != ""
                                          ? item.description
                                          : "N/A"}
                                      </p>
                                    </div>
                                  </Col>

                                  <Col xs={24} sm={24} md={24} lg={24}>
                                    <div className="timebtm">
                                      {/*  <p className="nameans">admin</p> */}
                                      <time datetime="2020-07-24T00:12:56+00:00">
                                        <i
                                          className="fa fa-clock-o"
                                          aria-hidden="true"
                                        ></i>{" "}
                                        {/*  {moment(item.created_at).format(
                                        "YYYY Do MMMM,h:mm:ss a "
                                      )} */}
                                        {moment
                                          .tz(item.created_at, AUSTRALIA)
                                          .format("LLLL")}
                                      </time>
                                    </div>
                                  </Col>
                                </Row>
                                {/*  </div> */}
                              </Card>
                            </Badge.Ribbon>
                          </Link>
                        </Col>
                      ))}
                  </>
                )}
              </div>
            )}
          </Col>
          {forum.companyLoadMoreURL != null ? (
            <div className="loadmore">
              <Button
                className="ant-btn ant-btn btn__profile1"
                onClick={() =>
                  dispatch(
                    loadMoreCoachForumByCompany(forum.companyLoadMoreURL)
                  )
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
export default CompanyViewCoachForum;
