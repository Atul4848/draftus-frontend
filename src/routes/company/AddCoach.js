import React, { useEffect, useState } from "react";
import { COACH } from "../../constants/ActionType";
import { Card, Button, Input, Row, Col, Form, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { inviteCoach } from "../../redux/actions/addCoachAction";

function AddCoach() {
  const [isCoach, setIsCoach] = useState(false);
  const [formcoach] = Form.useForm();
  const add_coach = useSelector((state) => state.addCoach.add_coach);

  const addCoach = async (values) => {
    const newCoach = await {
      ...values,
      role: COACH,
    };
    dispatch(inviteCoach(newCoach));
    setIsCoach(false);
  };

  useEffect(() => {
    if (add_coach) {
      formcoach.resetFields();
    }
  }, [add_coach]);

  const coachModal = () => {
    setIsCoach(true);
  };

  const coachModalCancel = () => {
    setIsCoach(false);
  };

  const dispatch = useDispatch();

  return (
    <div className="wgl-buttonshiftl">
      <Button className="ant-btn ant-btn btn__profile1" onClick={coachModal}>
        Add Coach
      </Button>
      <Modal
        title="Add Coach "
        visible={isCoach}
        onCancel={coachModalCancel}
        footer={null}
      >
        <Form
          name="basic"
          form={formcoach}
          initialValues={{ remember: true }}
          onFinish={addCoach}
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
                      message: "Please enter Coach Name!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Coach Name" autoComplete="off" />
                </Form.Item>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className="inputLogin1">
                <Form.Item
                  name="email"
                  label="Email"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "Please enter  Coach Email !",
                    },
                  ]}
                >
                  <Input placeholder="Enter Coach Email" />
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
                  <Input placeholder="Enter Coach Phone" />
                </Form.Item>
              </div>
            </Col>

            <Col span={24}>
              <div className="signIn0">
                <Form.Item>
                  <Button className="ant-btn btn__login " htmlType="submit">
                    Add Coach
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
export default AddCoach;
