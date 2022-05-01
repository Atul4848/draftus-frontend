import React, { useEffect } from "react";

import { Form, Input, Button, Checkbox, Row, Col, Card, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/actions/userAuthAction";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FORGET_PASSWORD } from "../../constants/config";
import SocialMediaLogin from "./component/SocialMediaLogin";

function Login() {
  let history = useHistory();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const { isAuth } = userState;
  const { state } = useLocation();

  const onFinish = async (values) => {
    await dispatch(login(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    checkForAuthentication();
  }, [userState]);

  const checkForAuthentication = () => {
    if (userState.isAuth) {
      state ? history.push(state.from.pathname) : history.push("/profile");
    }
  };

  return (
    <div>
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
              <Row gutter={[10, 10]}>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <h2 className=" eds-text-hl">Log in</h2>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Row gutter={[10, 10]}>
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Please input your username!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: (
                                <Tooltip
                                  visible={true}
                                  className="tooltipassword0"
                                  placement="leftBottom"
                                  title="Please use at least a upper case, Lower case and numbers."
                                />
                              ),
                            },
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Form.Item name="remember" valuePropName="checked">
                          <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <div className="forgotPwd">
                          <Link to="/forget_password">Forgot Password?</Link>
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12}>
                        <Form.Item>
                          <Button className="btn__login " htmlType="submit">
                            Login
                          </Button>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12}>
                        <Form.Item>
                          <Link to="/register">
                            <Button className="btn-dark__sign ">Sign Up</Button>
                          </Link>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="sideline">OR Register</div>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24}>
                  <SocialMediaLogin />
                </Col>
              </Row>
            </div>
            {/*  <Link to="/coach_register">
              <Button>Coach register</Button>
            </Link> */}
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default Login;
