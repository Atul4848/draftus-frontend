import React, { useEffect } from "react";
import { Input, Button, Card, Row, Col, Form } from "antd";

import { forgetPassword } from "../../redux/actions/forgotPasswordAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

function ForgetPassword() {
  const [form] = Form.useForm();
  const history = useHistory();
  const [disable, setDisable] = React.useState(false);
  const isPasswordForgot = useSelector(
    (state) => state.forgotPassword.isPasswordForgot
  );
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const newPassword = await {
      ...values,
    };
    dispatch(forgetPassword(newPassword));
    setDisable(true);
  };
  useEffect(() => {
    if (isPasswordForgot) {
      form.resetFields();
    }
  }, [isPasswordForgot]);

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
                <h2 className=" eds-text-hl">Find Your Account</h2>
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
                          <Input placeholder="Enter Email Address" />
                        </Form.Item>
                      </div>
                    </Col>

                    <Col span={24}>
                      <Row gutter={[20, 20]}>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <div className="signIn0">
                            <Form.Item>
                              <Button className="btn__login " htmlType="submit">
                                Submit
                              </Button>
                            </Form.Item>
                          </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <div className="signIn1">
                            <Form.Item>
                              <Button
                                className="btn-dark__sign "
                                type="primary"
                                onClick={() => history.push("/login")}
                              >
                                Cancel
                              </Button>
                            </Form.Item>
                          </div>
                        </Col>
                      </Row>
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
export default ForgetPassword;
