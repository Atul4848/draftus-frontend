import React from "react";
import { Card, Button, Row, Col } from "antd";
import Athletes from "../../../assets/coach.jpg";
import Athletesimg from "../../../assets/atl.jpg";
import teamimg from "../../../assets/successful-happy-business-team.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";

function FeaturedClasses() {
  const isAuth = useSelector((state) => state.user.isAuth);
  return (
    <div className="themestek-bgcolor-darkgrey">
      <Row gutter={[16, 10]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="themestek-vc_cta3-headers">
            <h4 className="themestek-custom-heading">
              OUR <span> CLASSES </span>
            </h4>
            <h2 className="themestek-custom-heading">OUR FEATURED CLASSES</h2>
          </div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <Card className="themestek-post-item">
            <img src={Athletesimg} alt="athlete" />
            <div className="themestek-pf-box-title">
              <h1>Corporate Athlete</h1>
              <p>
                As a corporate athlete, you will be among the best talent on the
                web. You have a unique opportunity to post a resume AND video
                highlighting your talents, strengths, and expatiates. While
                explaining why you’re the best candidate for the position you’re
                seeking.
              </p>
              <div className="themestek-box-link themestek-vc_btn3">
                {isAuth ? null : (
                  <Link to="/login" className="text-decoration-none">
                    <Button type="link">
                      Click Here
                      <i
                        className="fa fa-long-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <Card className="themestek-post-item">
            <img src={Athletes} alt="athlete" />
            <div className="themestek-pf-box-title">
              <h1>COACHES</h1>
              <p>
                Draftus incorporates combined technology to provide coaching and
                mentor matching that connects directly to the recruitment
                process creating a more robust and true diversity search. As a
                Coach, you are the experienced mentor- the professional within
                an organization that is willing to help an Athlete plan for
                their future.
              </p>
              <div className="themestek-box-link themestek-vc_btn3">
                {isAuth ? null : (
                  <Link to="/login" className="text-decoration-none">
                    <Button type="link">
                      Click Here
                      <i
                        className="fa fa-long-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <Card className="themestek-post-item">
            <img src={teamimg} alt="athlete" />
            <div className="themestek-pf-box-title">
              <h1>Teams</h1>
              <p>
                A Draftus Team has access to the best candidates of color that
                are experienced hires or students seeking undergraduate or
                graduate degree from colleges and universities around the
                country. Not only will you have a diverse talent pool from which
                to choose, but will have an opportunity to introduce your firm
                to educated, eager potential recruits.
              </p>
              <div className="themestek-box-link themestek-vc_btn3">
                {isAuth ? null : (
                  <Link to="/login" className="text-decoration-none">
                    <Button type="link">
                      Click Here
                      <i
                        className="fa fa-long-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default FeaturedClasses;
