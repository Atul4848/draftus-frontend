import React from "react";

import { Button, Row, Col } from "antd";
function SuccessMessage() {
  return (
    <div className="newContnainer">
      <Row
        gutter={[16, 16]}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Col xs={24} sm={24} md={17} lg={17}>
          <div className="receivedpage">
            <i className="fa fa-check-square" aria-hidden="true"></i>
            <p>Request accepted.</p>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default SuccessMessage;
