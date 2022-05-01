import React from "react";
import { Button, Row, Col, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { COMPANY, COACH, ATHLETE } from "../constants/ActionType";
import { useSelector } from "react-redux";

function RolesButton() {
  const userDetails = useSelector((state) => state.user);
  const { loading, userDetail } = userDetails;
  return (
    <div>
      <>
        {loading ? (
          <Skeleton.Input style={{ width: 200 }} />
        ) : (
          <>
            {userDetail &&
            userDetail.user &&
            userDetail.user.role == ATHLETE ? (
              <Row
                gutter={[10, 10]}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Col xs={24} sm={24} md={6} lg={6}>
                  <div className="wgl-buttonshiftl">
                    <Link to="/profile/request_coach">
                      <Button>Request Coach</Button>
                    </Link>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <div className="wgl-buttonshiftl">
                    <Link to="/chat">
                      <Button>Message Coach</Button>
                    </Link>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <div className="wgl-buttonshiftl">
                    <Link to="/profile/athlete_view_coach_forum">
                      <Button>My Forum</Button>
                    </Link>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <div className="wgl-buttonshiftl">
                    <Link to="/profile/assigned_curriculum">
                      <Button>Curriculum</Button>
                    </Link>
                  </div>
                </Col>
              </Row>
            ) : null}
          </>
        )}
      </>
      <>
        {loading ? (
          <Skeleton.Input style={{ width: 200 }} />
        ) : (
          <>
            {userDetail && userDetail.user && userDetail.user.role == COACH ? (
              <Row
                gutter={[10, 10]}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Col xs={24} sm={24} md={6} lg={6}>
                  <div className="wgl-buttonshiftl">
                    <Link to="/profile/athlete_request">
                      <Button>Request </Button>
                    </Link>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <div className="wgl-buttonshiftl">
                    <Link to="/chat">
                      <Button>Message </Button>
                    </Link>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <div className="wgl-buttonshiftl">
                    <Link to="/profile/forum">
                      <Button>Manage Forum</Button>
                    </Link>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <div className="wgl-buttonshiftl">
                    <Link to="/profile/curriculum">
                      <Button>Core Curriculum</Button>
                    </Link>
                  </div>
                </Col>
              </Row>
            ) : null}
          </>
        )}
      </>
      <>
        {loading ? (
          <Skeleton.Input style={{ width: 200 }} />
        ) : (
          <>
            {userDetail &&
            userDetail.user &&
            userDetail.user.role == COMPANY ? (
              <Row
                gutter={[10, 10]}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {/* <Col xs={24} sm={24} md={6} lg={6}>
                  <div className="wgl-buttonshiftl">
                    <Link to="/profile/request-coach">
                      <Button> Request Coach</Button>
                    </Link>
                  </div>
                </Col> */}
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="wgl-buttonshiftl">
                    <Link to="/profile/management">
                      <Button> Management</Button>
                    </Link>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="wgl-buttonshiftl">
                    <Link to="/profile/company_view_coach_forum">
                      <Button>Coach Forum</Button>
                    </Link>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="wgl-buttonshiftl">
                    <Link to="/chat">
                      <Button>Message Coach</Button>
                    </Link>
                  </div>
                </Col>
              </Row>
            ) : null}
          </>
        )}
      </>
    </div>
  );
}
export default RolesButton;
