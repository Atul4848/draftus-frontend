import React from "react";

import { Card, Col, Row } from "antd";

import { Link } from "react-router-dom";

function ForumAnnouncement() {
  return (
    <div>
      <div className="newContnainer">
        <div className="athlete__home">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24}>
              <h2 className="themestek-custom-heading">Forum</h2>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Link to="/profile/forum">
                <div className="bbp-forum-info">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="bbp-forum-title">
                        <i
                          className="fa fa-arrow-circle-right"
                          aria-hidden="true"
                        ></i>
                        <h4>Forum</h4>
                      </div>

                      <div className="bbp-forum-content">
                        <p>
                          This forum is for our announcements. Only our staff
                          can create new topics.
                        </p>
                      </div>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="timebtm">
                        <p className="nameans">admin</p>
                        <time datetime="2020-07-24T00:12:56+00:00">
                          <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
                          24 July 2020, 0:12
                        </time>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Link>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className="bbp-forum-info">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <Link to="/athlete/ForumDetails">
                      <div className="bbp-forum-title">
                        <i
                          className="fa fa-arrow-circle-right"
                          aria-hidden="true"
                        ></i>
                        <h4>Announcements</h4>
                      </div>
                    </Link>

                    <div className="bbp-forum-content">
                      <p>
                        This forum is for our announcements. Only our staff can
                        create new topics.
                      </p>
                    </div>
                  </Col>

                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="timebtm">
                      <p className="nameans">admin</p>
                      <time datetime="2020-07-24T00:12:56+00:00">
                        <i className="fa fa-clock-o" aria-hidden="true"></i> 24
                        July 2020, 0:12
                      </time>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
export default ForumAnnouncement;
