import React, { useEffect } from "react";
import Contactus from "../../assets/contact.jpg";
import { Card, Form, Button, Input, InputNumber, Row, Col } from "antd";
import { HiLocationMarker, HiPhone, HiOutlineMail } from "react-icons/hi";
import { MdContactPage } from "react-icons/md";
import { postContactUs } from "../../redux/actions/contactusAction";
import { useSelector, useDispatch } from "react-redux";

function Contact() {
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const [disable, setDisable] = React.useState(false);
  const isContactus = useSelector((state) => state.contact_us.isContactus);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const newPassword = await {
      ...values,
    };
    dispatch(postContactUs(newPassword));
    setDisable(true);
  };
  useEffect(() => {
    if (isContactus) {
      form.resetFields();
    }
  }, [isContactus]);
  return (
    <div>
      <div className="banner__top">
        <div className="elementor-background-overlay"></div>
        <img src={Contactus} alt="banner" />
        <div className="carousel-caption">
          <h3>
            <span>CONTACT</span> US
          </h3>
          <p>
            The ultimate job sourcing and recruitment tool for top candidates of
            color in the industry.
          </p>
        </div>
      </div>
      <div className="newContnainer">
        <Row
          gutter={[10, 10]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Col xs={24} sm={24} md={16} lg={16}>
            <div className="siteorigin-widget-tinymce ">
              <h3>
                <strong>Contact Us</strong>
              </h3>
              <p>
                Mauris at tempus mi, ut iaculis dui. Integer laoreet mattis
                justo nec pretium. Ut nibh elit, fermentum vel hendrerit vel,
                dictum nec velit. Morbi volutpat suscipit.
              </p>
            </div>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Row gutter={[10, 10]}>
              <Col xs={24} sm={24} md={8} lg={8}>
                <div className="content-list__0">
                  <HiLocationMarker />
                  <p>3097 Clearfork Trail, Frisco, Texas 75034</p>
                </div>
                <div className="content-list__0">
                  <HiPhone />
                  <p>12345634567</p>
                </div>
                <div className="content-list__0">
                  <MdContactPage />
                  <p>Fax: (917) 591 - 5505</p>
                </div>
                <div className="content-list__0">
                  <HiOutlineMail />
                  <p>Email: info@draftus.com</p>
                </div>
              </Col>
              <Col xs={24} sm={24} md={16} lg={16}>
                <div className="contact-form">
                  <Form name="nest-messages" form={form} onFinish={onFinish}>
                    <Row gutter={[10, 10]}>
                      <Col xs={24} sm={24} md={12} lg={12}>
                        <Form.Item
                          name="name"
                          required={true}
                          rules={[
                            {
                              required: true,
                              message: "This field is Mandatory!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter your name*" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12}>
                        <Form.Item
                          name="company_name"
                          required={true}
                          rules={[
                            {
                              required: true,
                              message: "This field is Mandatory!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter your Company Name" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item
                          name="phone"
                          required={true}
                          rules={[
                            {
                              required: true,
                              message: "This field is Mandatory!",
                            },
                            {
                              min: 10,
                              message:
                                "Phone number must be minimum 10 digits.",
                            },
                            {
                              max: 12,
                              message:
                                "Phone number must be maximum 12 digits.",
                            },
                            {
                              pattern: "^[0-9]+$",
                              message: "Please input a valid phone number",
                            },
                          ]}
                        >
                          <Input placeholder="Phone" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item
                          name="email"
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
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item
                          name="message"
                          required={true}
                          rules={[
                            {
                              required: true,
                              message: "This field is Mandatory!",
                            },
                          ]}
                        >
                          <TextArea
                            rows={4}
                            placeholder="Your Message..."
                            maxLength={500}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item>
                          <Button
                            className="ant-btn btn__login "
                            htmlType="submit"
                          >
                            Send Your Message
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default Contact;
