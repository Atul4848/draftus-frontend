import React, { useEffect, useState } from "react";

import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  DatePicker,
  Space,
  Skeleton,
  Modal,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { register, SocialMediaAuth } from "../../redux/actions/userAuthAction";
import { getCurriculum } from "../../redux/actions/curriculumAction";
import { useHistory } from "react-router-dom";
import moment from "moment";

function SocialAuth() {
  const [role, setRole] = useState();
  const [gender, setGender] = useState();
  const [curriculums, setCurriculums] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dob, setDOB] = useState();
  let history = useHistory();
  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { socialMedia, loading } = user;
  console.log(socialMedia);
  const curriculum = useSelector((state) => state.curriculum_detail.curriculum);

  const selectCurriculum = (key) => {
    setCurriculums(key);
  };

  const selectRole = (value) => {
    setRole(value);
  };

  const selectGender = (value) => {
    setGender(value);
  };
  const dateFormat = "YYYY/MM/DD";

  function Date_of_Birth(date) {
    setDOB(date);
  }

  useEffect(() => {
    collectCurriculumData();
  }, []);

  const collectCurriculumData = async () => {
    await dispatch(getCurriculum());
  };

  /*  useEffect(() => {
    collectSocailmediaData();
  }, []);

  const collectSocailmediaData = async () => {
    if (Object.keys(socialMedia).length === 0) {
      return history.push("/login");
    } else {
      const formObj = {
        fname: socialMedia ? socialMedia._profile.firstName : null,
        lname: socialMedia ? socialMedia._profile.lastName : null,
        email: socialMedia ? socialMedia._profile.email : null,
        google_token:
          socialMedia && socialMedia._provider == "google"
            ? socialMedia._token.accessToken
            : null,
        google_id:
          socialMedia && socialMedia._provider == "google"
            ? socialMedia._profile.id
            : null,
        facebook_id:
          socialMedia && socialMedia._provider == "facebook"
            ? socialMedia._profile.id
            : null,
        facebook_token:
          socialMedia && socialMedia._provider == "facebook"
            ? socialMedia._token.accessToken
            : null,
      };
      await form.setFieldsValue(formObj);
    }

    await dispatch(SocialMediaAuth());
  }; */

  /*  useEffect(() => {
    if (
      socialMedia &&
      socialMedia._profile &&
      socialMedia._token &&
      socialMedia._profile.email != null &&
      socialMedia._token.accessToken != null
    ) {
      const email = socialMedia._profile.email;
      const social_token = socialMedia._token.accessToken;
      dispatch(register(email, social_token));
    }
  }, []); */
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (data) => {
    const newData = await {
      ...data,
      dob: dob,
    };
    dispatch(register(newData));
    setIsModalVisible(false);
  };

  useEffect(() => {
    checkAndProceed();
  }, [user]);

  const checkAndProceed = () => {
    if (user.isAuth) {
      history.push("/profile");
    }
  };

  return (
    <div>
      <Button className="ant-btn ant-btn btn__profile1" onClick={showModal}>
        Reject
      </Button>
      <Modal
        title="Reject "
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
          {/* <Form.Item name="facebook_token"></Form.Item>
          <Form.Item name="google_token"></Form.Item>
          <Form.Item name="google_id"></Form.Item>
          <Form.Item name="facebook_id"></Form.Item>
          <Form.Item name="fname"></Form.Item>
          <Form.Item name="lname"></Form.Item>
          <Form.Item name="email"></Form.Item> */}

          <Form.Item
            name="curriculum_id"
            label="Skills  "
            required={true}
            rules={[
              {
                required: true,
                message: "This field is Mandatory!",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="select skills"
              onChange={selectCurriculum}
              value={curriculums}
              optionLabelProp="label"
            >
              {curriculum.map((item) => (
                <Option key={item.id} label={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="role"
            label="Role  "
            required={true}
            rules={[
              {
                required: true,
                message: "This field is Mandatory!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select Role"
              optionFilterProp="children"
              autoComplete="none"
              onChange={selectRole}
              value={role}
              allowClear
            >
              <Option value={2}>Team</Option>

              <Option value={4}>Athlete</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <div className="button__area2">
              <Button htmlType="submit">Reject</Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
    /*  <div>
      {loading ? (
        <Skeleton />
      ) : (
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
                <h2 className=" eds-text-hl">Register</h2>
                <Form
                  name="basic"
                  form={form}
                  onFinish={onFinish}
                  layout="vertical"
                >
                  <Row gutter={[10, 10]}>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <div className="inputLogin1">
                        <Form.Item
                          name="fname"
                          label="First Name"
                          required={true}
                          rules={[
                            {
                              required: true,
                              message: "This field is Mandatory!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter First name" />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <div className="inputLogin1">
                        <Form.Item
                          name="lname"
                          label="Last Name"
                          required={true}
                          rules={[
                            {
                              required: true,
                              message: "This field is Mandatory!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter Last name" />
                        </Form.Item>
                      </div>
                    </Col>
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
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="inputLogin1">
                        <Form.Item
                          name="phone"
                          label="Phone number"
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
                          <Input placeholder="Enter Phone number" />
                        </Form.Item>
                      </div>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="inputLogin1">
                        <Form.Item
                          name="password"
                          label="Password"
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
                              pattern: "^[a-zA-Z0-9_]*$",
                              message:
                                "Please input only letters or numbers. Thank you!",
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
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="inputLogin1">
                        <Form.Item
                          name="curriculum_id"
                          label="Skills  "
                          required={true}
                          rules={[
                            {
                              required: true,
                              message: "This field is Mandatory!",
                            },
                          ]}
                        >
                          <Select
                            mode="multiple"
                            placeholder="select skills"
                            onChange={selectCurriculum}
                            value={curriculums}
                            optionLabelProp="label"
                          >
                            {curriculum.map((item) => (
                              <Option key={item.id} label={item.name}>
                                {item.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="inputLogin1">
                        <Form.Item
                          name="role"
                          label="Role  "
                          required={true}
                          rules={[
                            {
                              required: true,
                              message: "This field is Mandatory!",
                            },
                          ]}
                        >
                         
                          <Select
                            showSearch
                            placeholder="Select Role"
                            optionFilterProp="children"
                            autoComplete="none"
                            onChange={selectRole}
                            value={role}
                            allowClear
                          >
                            <Option value={2}>Team</Option>

                            
                            <Option value={4}>Athlete</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>

                    <Form.Item name="facebook_token"></Form.Item>
                    <Form.Item name="google_token"></Form.Item>
                    <Form.Item name="google_id"></Form.Item>
                    <Form.Item name="facebook_id"></Form.Item>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="signIn0">
                        <Form.Item>
                          <Button className="btn__login " htmlType="submit">
                            SIGN UP
                          </Button>
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div> */
  );
}
export default SocialAuth;
