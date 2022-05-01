import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { companyViewForumDetail } from "../../redux/actions/forumAction";
import { Row, Col, Input, Form, Button, Skeleton, Spin } from "antd";
import { useParams, useHistory } from "react-router-dom";
//import moment from "moment";
import moment from "moment-timezone";
import { AUSTRALIA } from "../../constants/ActionType";
import { AiOutlineDoubleLeft } from "react-icons/ai";

function CompanyViewCoachForumDetail() {
  let history = useHistory();
  const { id } = useParams();
  const { TextArea } = Input;
  //let history = useHistory();
  const { form } = Form.useForm();
  //const dispatch = useDispatch();

  const dispatch = useDispatch();
  const forum = useSelector((state) => state.forum);
  const { company_View_Forum_Detail, loading } = forum;
  console.log(company_View_Forum_Detail);
  useEffect(() => {
    dispatch(companyViewForumDetail(id));
  }, []);
  const onFinish = async (data) => {
    const newData = await {
      ...data,
    };
    /* await dispatch(addForum(newData));
    history.push("/profile/forum"); */
  };
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
                    history.push("/profile/company_view_coach_forum")
                  }
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
                            {company_View_Forum_Detail &&
                            company_View_Forum_Detail.thread_by_id &&
                            company_View_Forum_Detail.thread_by_id.title != ""
                              ? company_View_Forum_Detail.thread_by_id.title
                              : "N/A"}
                          </h4>
                        </div>

                        <div className="bbp-forum-content">
                          <p>
                            {company_View_Forum_Detail &&
                            company_View_Forum_Detail.thread_by_id &&
                            company_View_Forum_Detail.thread_by_id
                              .description != ""
                              ? company_View_Forum_Detail.thread_by_id
                                  .description
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
                {company_View_Forum_Detail &&
                company_View_Forum_Detail.thread_by_id &&
                company_View_Forum_Detail.thread_by_id.posts == "" ? (
                  <div className="nofound0">
                    No Comment <span> Found !</span>
                  </div>
                ) : (
                  <>
                    {company_View_Forum_Detail &&
                      company_View_Forum_Detail.thread_by_id &&
                      company_View_Forum_Detail.thread_by_id.posts &&
                      company_View_Forum_Detail.thread_by_id.posts.map(
                        (item) => (
                          <Col xs={24} sm={24} md={24} lg={24}>
                            <div className="bbp-forum-info">
                              <div className="anser">{item.body}</div>
                              <div className="timebtm">
                                <p className="nameans">
                                  <span>{item.user_name.fname}</span>
                                  <span> </span>
                                  <span>{item.user_name.lname}</span>
                                </p>
                                <time datetime="2020-07-24T00:12:56+00:00">
                                  <i
                                    className="fa fa-clock-o"
                                    aria-hidden="true"
                                  ></i>
                                  {/* {moment(item.user_name.created_at).format(
                                  "YYYY Do MMMM,h:mm:ss a "
                                )} */}
                                  {moment
                                    .tz(item.user_name.created_at, AUSTRALIA)
                                    .format("LLLL")}
                                </time>
                              </div>
                            </div>
                          </Col>
                        )
                      )}
                  </>
                )}
              </>
            )}
          </Row>
        </div>
      </div>
    </div>
  );
}
export default CompanyViewCoachForumDetail;
