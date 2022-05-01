import React from "react";
import management from "../../assets/home.jpg";
import { Col, Row, Spin } from "antd";

import CompanyButton from "./component/CompanyButton";
import CompanyAthlete from "../../component/company/CompanyAthlete";
import CompanyCoach from "../../component/company/CompanyCoaches";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/logo1.png";
import { UPLOAD_PIC } from "../../constants/ActionType";
import InvitedCoachAthlete from "./component/InvitedCoachAthlete";

function CoachAthleteManagement() {
  const userDetails = useSelector((state) => state.user);
  const { loading, userDetail } = userDetails;
  return (
    <div>
      {loading ? (
        <Spin className="loader-ld" />
      ) : (
        <>
          {" "}
          <div className="banner__top">
            <div className="elementor-background-overlay"></div>
            <img src={management} alt="banner" />
            <div className="carousel-caption">
              <h3>
                <span>Management</span>
              </h3>
              <p>
                The ultimate job sourcing and recruitment tool for top
                candidates of color in the industry.
              </p>
            </div>
          </div>
          <div className="newContnainer">
            <div>
              {/* <h2 className="themestek-custom-heading"> Management</h2> */}
              {/* <div className="teammanagements_img">
          <img src={management} alt="Banner" />
        </div> */}

              {/* {loading ? (
          <Spin size="large" className="spinner" />
        ) : (
          <div className="teammanagements_img">
            <img
              src={
                userDetail &&
                userDetail.user_details &&
                userDetail.user_details.avatar != null
                  ? UPLOAD_PIC + userDetail.user_details.avatar
                  : logo
              }
              alt="Banner"
            />
           
          </div>
        )} */}
            </div>
            {userDetail &&
            userDetail.user_details &&
            userDetail.user_details.description == null ? null : (
              <>
                <div className="brifhding">
                  <h2 className="themestek-custom-heading">ABOUT US</h2>
                  <p>
                    {userDetail &&
                    userDetail.user_details &&
                    userDetail.user_details.description != null
                      ? userDetail.user_details.description
                      : "N/A"}
                  </p>
                </div>
              </>
            )}
            <div className="athlete__home">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={13} lg={13}>
                  <CompanyCoach />
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <CompanyAthlete />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <InvitedCoachAthlete />
                </Col>
              </Row>
            </div>
            <CompanyButton />
          </div>
        </>
      )}
    </div>
  );
}
export default CoachAthleteManagement;
