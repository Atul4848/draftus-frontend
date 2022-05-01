import React, { useState, useEffect } from "react";
import { COACH, ATHLETE } from "../../../constants/ActionType";
import { Link } from "react-router-dom";
import { Modal, Input, Form, Button, Row, Col } from "antd";
import { inviteCoach } from "../../../redux/actions/addCoachAction";
import { useDispatch, useSelector } from "react-redux";
import AddAthlete from "../AddAthlete";
import AddCoach from "../AddCoach";

function CompanyButton() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formcoach] = Form.useForm();
  const add_coach = useSelector((state) => state.addCoach.add_coach);

  /*   const onFinish = async (data) => {
    const newData = await {
      ...data,
      
    };
    dispatch(rejectAthlete(newData));
    setIsModalVisible(false);
    await dispatch(get_Requested_Athlete());
    await dispatch(athleteDetail());
  }; */

  return (
    <div>
      <Row
        gutter={[10, 10]}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Col
          xs={24}
          sm={24}
          md={8}
          lg={8}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <AddCoach />
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <AddAthlete />
        </Col>
      </Row>
    </div>
  );
}
export default CompanyButton;
