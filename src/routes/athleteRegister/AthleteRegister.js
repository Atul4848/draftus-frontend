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
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { invitedCoachAthlete } from "../../redux/actions/userAuthAction";
import { invitedUser } from "../../redux/actions/companyaction";
import { useHistory, useParams } from "react-router-dom";
/* import SocialMediaLogin from "../login/component/SocialMediaLogin"; */
import { ATHLETE } from "../../constants/ActionType";
import { getSkill } from "../../redux/actions/curriculumAction";

function AthleteRegister() {
  const { id, company_id } = useParams();
  const { Option } = Select;
  let history = useHistory();
  const [form] = Form.useForm();
  const [skills, setSkills] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const company_detail = useSelector((state) => state.company_detail);

  const { invited_user, loading } = company_detail;
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const skill = useSelector((state) => state.curriculum_detail.skill);

  const selectSkill = (key) => {
    setSkills(key);
  };
  /* useEffect(() => {
    if (invited_user && invited_user.name != "") {
      const Name = invited_user.name;
      const splitted = Name.split(" ");

      const updatedFname = splitted[0];
      const updatedLname = splitted[splitted.length - 1];
      setFname(updatedFname);
      setLname(updatedLname);
    }
  }, [invited_user]); */

  useEffect(() => {
    collectAthleteRole();
  }, [invited_user]);

  const collectAthleteRole = async () => {
    if (Object.keys(invited_user).length !== 0) {
      const formObj = {
        email:
          invited_user && invited_user.email != "" ? invited_user.email : null,
        phone:
          invited_user && invited_user.phone != "" ? invited_user.phone : null,
        role: ATHLETE,
      };
      await form.setFieldsValue(formObj);
    }
  };

  const onFinish = async (data) => {
    const newData = await {
      ...data,
      isInvited: 1,
      invite_id: id,
      company_id: company_id,
    };
    dispatch(invitedCoachAthlete(newData));
  };

  useEffect(() => {
    checkAndProceed();
  }, [user]);

  const checkAndProceed = () => {
    if (user.isAuth) {
      history.push("/profile");
    }
  };

  useEffect(() => {
    checkInvitedUser();
  }, []);

  const checkInvitedUser = async () => {
    await dispatch(invitedUser(id));
  };
  useEffect(() => {
    collectSkillData();
  }, []);

  const collectSkillData = async () => {
    await dispatch(getSkill());
  };

  return (
    <div>
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
                          <Input placeholder="Enter Email Address" disabled />
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
                              min: 8,
                              pattern: "(?=.*[a-z])", //at least one small letter
                              pattern: "(?=.*[A-Z])", //at least one capital
                              pattern: "(?=.*d)", //at least one digit
                              pattern: "(?=.*[@$!%*#?&])", //at least one symbol
                              message:
                                "Please use at least a upper case, Lower case , numbers and Special character.",
                            },
                            /*  {
                              pattern:
                                "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$",
                              message:
                                "Please use at least a upper case, Lower case and numbers.",
                            }, */
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
                          name="skill_id"
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
                            onChange={selectSkill}
                            value={skills}
                            optionLabelProp="label"
                          >
                            {skill.map((item) => (
                              <Option key={item.id} label={item.name}>
                                {item.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>

                    <Form.Item name="role"></Form.Item>

                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="signIn0">
                        <Form.Item>
                          <Button className="btn__login " htmlType="submit">
                            SIGN UP
                          </Button>
                        </Form.Item>
                      </div>
                    </Col>
                    {/* <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="sideline">OR Login</div>
                  </Col> */}

                    {/* <Col xs={24} sm={24} md={24} lg={24}>
                    <SocialMediaLogin />
                  </Col> */}
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
export default AthleteRegister;
