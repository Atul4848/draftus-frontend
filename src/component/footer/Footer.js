import React, { useEffect } from "react";
import { Row, Col, Button, Input, Form } from "antd";
import Logo from "../../assets/logofooter.png";
import { Link } from "react-router-dom";
import { subscribeUs } from "../../redux/actions/subscribeusAction";
import { useSelector, useDispatch } from "react-redux";

function Footer() {
  const [form] = Form.useForm();

  const [disable, setDisable] = React.useState(false);
  const isSubscribe = useSelector((state) => state.subscribe.isSubscribe);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    await dispatch(subscribeUs(values));
    setDisable(true);
  };

  useEffect(() => {
    if (isSubscribe) {
      form.resetFields();
    }
  }, [isSubscribe]);

  return (
    <div className="footer_btn0">
      <Row gutter={[16, 10]}>
        <Col xs={24} sm={24} md={7} lg={7}>
          <div className="footerLogo0">
            <img src={Logo} alt="logo" />
          </div>

          <div className="themestek-footer-text">
            <p>
              There are many variations of passages of lorem ipsum available,
              but the majority have suffered alteration in some form by
              injected.
            </p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={17} lg={17}>
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={12} md={4} lg={4}></Col>
            <Col xs={24} sm={24} md={8} lg={8}>
              <div className="widget-as-link">
                <h3 className="widget-title">Explore</h3>
                <ul className="footermenu">
                  <li>
                    <Link to="/">
                      <Button type="link">
                        <i
                          className="fa fa-long-arrow-right"
                          aria-hidden="true"
                        ></i>
                        HOME
                      </Button>
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/login">
                      <Button type="link">
                        <i
                          className="fa fa-long-arrow-right"
                          aria-hidden="true"
                        ></i>
                        ATHLETES
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/login">
                      <Button type="link">
                        <i
                          className="fa fa-long-arrow-right"
                          aria-hidden="true"
                        ></i>
                        COACHES
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <Button type="link">
                        <i
                          className="fa fa-long-arrow-right"
                          aria-hidden="true"
                        ></i>
                        TEAMS
                      </Button>
                    </Link>
                  </li> */}

                  <li>
                    <Link to="/about">
                      <Button type="link">
                        <i
                          className="fa fa-long-arrow-right"
                          aria-hidden="true"
                        ></i>
                        ABOUT US
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact">
                      <Button type="link">
                        <i
                          className="fa fa-long-arrow-right"
                          aria-hidden="true"
                        ></i>
                        CONTACT US
                      </Button>
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12}>
              <div className="widget-as-link">
                <h3 className="widget-title">Subscribe us</h3>
                <Form
                  name="basic"
                  onFinish={onFinish}
                  form={form}
                  layout="vertical"
                >
                  <Form.Item
                    name="email"
                    /* label={"Subscribe us "} */
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
                    <Input placeholder="Email Address" />
                  </Form.Item>

                  <Form.Item>
                    <div className="button__area2">
                      <Button type="primary" htmlType="submit">
                        SUBSCRIBE
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default Footer;
