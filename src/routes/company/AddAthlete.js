import React, { useEffect, useState } from "react";

import { Card, Button, Input, Row, Col, Form, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { inviteAthlete } from "../../redux/actions/addCoachAction";
import { ATHLETE } from "../../constants/ActionType";

function AddAthlete() {
  const [isAthlete, setIsAthlete] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const add_coach = useSelector((state) => state.addCoach.add_coach);

  const athleteModal = () => {
    setIsAthlete(true);
  };

  const athleteModalCancel = () => {
    setIsAthlete(false);
  };

  const onFinish = async (values) => {
    const newCoach = await {
      ...values,
      role: ATHLETE,
    };
    dispatch(inviteAthlete(newCoach));
    setIsAthlete(false);
  };

  useEffect(() => {
    if (add_coach) {
      form.resetFields();
    }
  }, [add_coach]);

  return (
    <div className="wgl-buttonshiftl">
      <Button className="ant-btn ant-btn btn__profile1" onClick={athleteModal}>
        Add Athlete
      </Button>
      <Modal
        title="Add Athlete "
        visible={isAthlete}
        onCancel={athleteModalCancel}
        footer={null}
      >
        <Form
          name="basic"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className="inputLogin1">
                <Form.Item
                  name="name"
                  label="Name"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "Please enter Athlete Name!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Athlete Name" autoComplete="off" />
                </Form.Item>
              </div>
            </Col>
            <Form.Item name="role"></Form.Item>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className="inputLogin1">
                <Form.Item
                  name="email"
                  label="Email"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "Please enter  Athlete Email !",
                    },
                  ]}
                >
                  <Input placeholder="Enter Athlete Email" />
                </Form.Item>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className="inputLogin1">
                <Form.Item
                  name="phone"
                  label="Phone"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "This field is Mandatory!",
                    },
                    {
                      min: 10,
                      message: "Phone number must be minimum 10 digits.",
                    },
                    {
                      max: 12,
                      message: "Phone number must be maximum 12 digits.",
                    },
                    {
                      pattern: "^[0-9]+$",
                      message: "Please input a valid phone number",
                    },
                  ]}
                >
                  <Input placeholder="Enter Athlete Phone" />
                </Form.Item>
              </div>
            </Col>

            <Col span={24}>
              <div className="signIn0">
                <Form.Item>
                  <Button className="ant-btn btn__login " htmlType="submit">
                    Add Athlete
                  </Button>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
export default AddAthlete;
