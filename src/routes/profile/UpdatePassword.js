import React, { useEffect } from "react";

import { Card, Button, Input, Row, Col, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updatedPassword } from "../../redux/actions/updatePasswordAction";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function UpdatePassword() {
  const [form] = Form.useForm();
  const isPasswordUpdated = useSelector(
    (state) => state.passwordUpdate.isPasswordUpdated
  );

  const onFinish = async (values) => {
    const newPassword = await {
      ...values,
    };
    dispatch(updatedPassword(newPassword));
  };

  useEffect(() => {
    if (isPasswordUpdated) {
      form.resetFields();
    }
  }, [isPasswordUpdated]);

  const dispatch = useDispatch();

  return (
    <div className="newContnainer">
      <Row
        gutter={[10, 10]}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="login-form-container0">
            <Row gutter={[0, 0]}>
              <Col xs={24} sm={24} md={24} lg={24}>
                <h2 className=" eds-text-hl">Update Password</h2>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
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
                          name="old_password"
                          label="Current Password"
                          required={false}
                          rules={[
                            {
                              required: false,
                              message: "Please enter your current password!",
                            },
                          ]}
                        >
                          <Input.Password
                            placeholder="Enter your Current password"
                            iconRender={(visible) =>
                              visible ? (
                                <EyeTwoTone />
                              ) : (
                                <EyeInvisibleOutlined />
                              )
                            }
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="inputLogin1">
                        <Form.Item
                          name="new_password"
                          label="New Password"
                          required={true}
                          rules={[
                            {
                              required: true,
                              message: "Please input your Password!",
                            },
                            {
                              min: 8,
                              message: "Password must be minimum 8 characters.",
                            },
                            {
                              min: 8,
                              pattern: "(?=.*[a-z])", //at least one small letter
                              pattern: "(?=.*[A-Z])", //at least one capital
                              pattern: "(?=.*d)", //at least one digit
                              pattern: "(?=.*[@$!%*#?&])", //at least one symbol
                              message:
                                "Please use at least a upper case, Lower case , numbers and Special character.",
                            },
                          ]}
                        >
                          <Input.Password
                            placeholder="Enter your password"
                            iconRender={(visible) =>
                              visible ? (
                                <EyeTwoTone />
                              ) : (
                                <EyeInvisibleOutlined />
                              )
                            }
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="inputLogin1">
                        <Form.Item
                          name="c_password"
                          label="Confirm Password"
                          required={true}
                          rules={[
                            {
                              required: true,
                              message: "Please input your Confirm Password!",
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  getFieldValue("new_password") === value
                                ) {
                                  return Promise.resolve();
                                }

                                return Promise.reject(
                                  new Error("Password does not match!")
                                );
                              },
                            }),
                          ]}
                        >
                          <Input.Password
                            placeholder="Enter Confirm password"
                            iconRender={(visible) =>
                              visible ? (
                                <EyeTwoTone />
                              ) : (
                                <EyeInvisibleOutlined />
                              )
                            }
                          />
                        </Form.Item>
                      </div>
                    </Col>

                    <Col span={24}>
                      <div className="signIn0">
                        <Form.Item>
                          <Button
                            className="ant-btn btn__login "
                            htmlType="submit"
                          >
                            SAVE CHANGES
                          </Button>
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default UpdatePassword;
