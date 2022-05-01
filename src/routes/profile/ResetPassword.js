import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, Button, Input, Row, Col, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/actions/forgotPasswordAction";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function ResetPassword() {
  let history = useHistory();
  const { token, email } = useParams();
  const [form] = Form.useForm();
  const isPasswordForgot = useSelector(
    (state) => state.forgotPassword.isPasswordForgot
  );
  console.log(token, email);

  useEffect(() => {
    showEmail();
  }, []);
  const showEmail = async () => {
    const formObj = {
      email: email,
    };
    await form.setFieldsValue(formObj);
  };
  const onFinish = async (values) => {
    const newPassword = await {
      ...values,
      email: email,
      token: token,
    };
    dispatch(resetPassword(newPassword));
    history.push("/login");
  };

  useEffect(() => {
    if (isPasswordForgot) {
      form.resetFields();
    }
  }, [isPasswordForgot]);

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
                <h2 className=" eds-text-hl">Reset Password</h2>
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
                          name="email"
                          label="Email Address"
                          required={true}
                          rules={[
                            {
                              type: "email",
                              message: "The input is not valid E-mail!",
                            },
                            {
                              required: true,
                              message: "Please enter your Email !",
                            },
                          ]}
                        >
                          <Input placeholder="Enter Email Address" disabled />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="inputLogin1">
                        <Form.Item
                          name="password"
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
                          name="password_confirmation"
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
                                  getFieldValue("password") === value
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
                            SUBMIT
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
export default ResetPassword;
