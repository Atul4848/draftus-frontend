import React from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "antd";

const PageNotFound = () => (
  <div className="newContnainer1">
    <div className="errormsg">
      <span className="notfoundmsg">
        <h1>
          4<span>0</span>4
        </h1>
        <p> Page Not Found!</p>
      </span>
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Col xs={24} sm={24} md={4} lg={4}>
          <div className="back__home0">
            <Link to="/">
              <Button> Go Home </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  </div>
);

export default PageNotFound;
