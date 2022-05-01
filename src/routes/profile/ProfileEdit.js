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
  Upload,
  Spin,
  Radio,
} from "antd";
import profile from "../../assets/logo1.png";
import { useSelector, useDispatch } from "react-redux";
import {
  UpdateProfile,
  removeProfile,
} from "../../redux/actions/userAuthAction";
import { UPLOAD_PIC, ATHLETE } from "../../constants/ActionType";
import {
  getCountries,
  getCounty,
  getCity,
} from "../../redux/actions/addressAction";
import { useHistory } from "react-router-dom";
import { getSkill } from "../../redux/actions/curriculumAction";
import usePrevious from "../../hooks/usePrevious";

function ProfileEdit() {
  const { TextArea } = Input;
  const [videoUrl, setURL] = useState("");
  const [videoType, setType] = useState("");
  const [household, sethousehold] = React.useState();

  const onChangehousehold = (e) => {
    console.log("radio checked", e.target.value);
    sethousehold(e.target.value);
  };
  const [collegeStudent, setcollegeStudent] = React.useState();

  const onChangecollegeStudent = (e) => {
    console.log("radio checked", e.target.value);
    setcollegeStudent(e.target.value);
  };

  let history = useHistory();
  const [skills, setSkills] = useState([]);
  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, userDetail } = user;
  const skill = useSelector((state) => state.curriculum_detail.skill);

  const selectSkill = (key) => {
    setSkills(key);
    console.log(key);
  };

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url:
        userDetail &&
        userDetail.user_details &&
        userDetail.user_details.avatar != null
          ? UPLOAD_PIC + userDetail.user_details.avatar
          : profile,
    },
  ]);

  const address = useSelector((state) => state.address);
  const { country, county, city } = address;

  useEffect(() => {
    collectSkillData();
  }, []);

  const collectSkillData = async () => {
    await dispatch(getSkill());
  };

  const onChange = async ({ fileList: newFileList }) => {
    if (fileList && fileList[0] && fileList[0].thumbUrl && fileList[0].type) {
      const pic = fileList[0].thumbUrl;

      const splitted = pic.split(",");
      const updatedType = "data:" + fileList[0].type + ";base64";
      const updatedURL = splitted[splitted.length - 1];

      setType(updatedType);
      setURL(updatedURL);
    } /* else {
      await dispatch(removeProfile());
    } */
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const prevUserDetail = usePrevious(userDetail);

  useEffect(() => {
    collectSocailmediaData();
  }, []);

  const collectSocailmediaData = async () => {
    if (Object.keys(userDetail).length === 0) {
      return history.push("/profile");
    } else {
      const formObj = {
        fname: userDetail.user.fname,
        lname: userDetail.user.lname,
        email: userDetail.user.email,
        phone: userDetail.user_details.phone,
        address: userDetail.user_details.address,
        city: userDetail.user_details.city,
        postal_code: userDetail.user_details.postal_code,
        province: userDetail.user_details.province,
        video_url:
          userDetail &&
          userDetail.user_details &&
          userDetail.user_details.video_url != null
            ? userDetail.user_details.video_url
            : null,
        description:
          userDetail &&
          userDetail.user_details &&
          userDetail.user_details.description != null
            ? userDetail.user_details.description
            : null,
        country_id:
          userDetail &&
          userDetail.user_details &&
          userDetail.user_details.country_id != null
            ? parseInt(userDetail.user_details.country_id)
            : null,
        state_id:
          userDetail &&
          userDetail.user_details &&
          userDetail.user_details.state_id != null
            ? parseInt(userDetail.user_details.state_id)
            : null,
        city_id:
          userDetail &&
          userDetail.user_details &&
          userDetail.user_details.city_id != null
            ? parseInt(userDetail.user_details.city_id)
            : null,
        extra_curricular:
          userDetail &&
          userDetail.athlete_extra_details &&
          userDetail.athlete_extra_details.extra_curricular != null
            ? userDetail.athlete_extra_details.extra_curricular
            : null,
        additional_interests:
          userDetail &&
          userDetail.athlete_extra_details &&
          userDetail.athlete_extra_details.additional_interests != null
            ? userDetail.athlete_extra_details.additional_interests
            : null,
        first_generation_college_student:
          userDetail &&
          userDetail.athlete_extra_details &&
          userDetail.athlete_extra_details.first_generation_college_student !=
            null
            ? userDetail.athlete_extra_details.first_generation_college_student
            : null,
        family_household:
          userDetail &&
          userDetail.athlete_extra_details &&
          userDetail.athlete_extra_details.family_household != null
            ? userDetail.athlete_extra_details.family_household
            : null,

        skill_id: userDetail.skill.map((item) => String(item.skill_id)),
      };
      console.log(formObj);
      await form.setFieldsValue(formObj);
      await dispatch(getCountries());
      await dispatch(getSkill(formObj.skill_id));
      await dispatch(getCounty(formObj.country_id));
      await dispatch(getCity(formObj.state_id));
    }
  };

  const collectStates = async (value) => {
    await dispatch(getCounty(value));
    await form.setFieldsValue({
      state_id: undefined,
      city_id: undefined,
    });
  };

  const collectCities = async (value) => {
    await dispatch(getCity(value));
    await form.setFieldsValue({
      city_id: undefined,
    });
  };

  const updateProfileDetails = (values) => {
    const AthleteOnly =
      userDetail && userDetail.user && userDetail.user.role == ATHLETE
        ? 1
        : null;
    console.log("Success:", values);
    const newData = {
      ...values,
      avatar: videoUrl,
      type: videoType,
      extraDetails: AthleteOnly,
    };
    dispatch(UpdateProfile(newData));
    history.push("/profile");
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
                <h2 className=" eds-text-hl">Profile Edit</h2>
                <Form
                  name="basic"
                  form={form}
                  onFinish={updateProfileDetails}
                  layout="vertical"
                >
                  <Row gutter={[10, 10]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="inputLogin1">
                        <Form.Item
                          required={true}
                          rules={[
                            {
                              required: true,
                              message: "This field is Mandatory!",
                            },
                          ]}
                        >
                          <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}
                            showUploadList={{ showPreviewIcon: false }}
                          >
                            {fileList.length < 1 && "+ Upload"}
                          </Upload>
                        </Form.Item>
                      </div>
                    </Col>
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
                        <Form.Item name="skill_id" label="Skills  ">
                          <Select
                            mode="multiple"
                            placeholder="select Skills"
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

                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="inputLogin1">
                        <Form.Item
                          name="address"
                          label="Address  "
                          required={false}
                        >
                          <Input placeholder="Enter Address " />
                        </Form.Item>
                      </div>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="inputLogin1">
                        <Form.Item
                          name="country_id"
                          label="Country  "
                          required={false}
                        >
                          <Select
                            showSearch
                            placeholder="Select Country"
                            optionFilterProp="children"
                            autoComplete="none"
                            onChange={collectStates}
                            allowClear
                          >
                            {/* <Option value="231">United States</Option> */}
                            {country.map((item) => (
                              <Option value={item.id}>{item.name}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="inputLogin1">
                        <Form.Item
                          name="state_id"
                          label="State  "
                          required={false}
                        >
                          <Select
                            showSearch
                            placeholder="Select State"
                            optionFilterProp="children"
                            onChange={collectCities}
                            allowClear
                          >
                            {county.map((item) => (
                              <Option value={item.id}>{item.name}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="inputLogin1">
                        <Form.Item
                          name="city_id"
                          label="Towns and cities  "
                          required={false}
                        >
                          <Select
                            showSearch
                            placeholder="Select Towns or Cities"
                            optionFilterProp="children"
                            allowClear
                          >
                            {city.map((item) => (
                              <Option value={item.id}>{item.name}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="inputLogin1">
                        <Form.Item
                          name="postal_code"
                          label="Postcode"
                          required={false}
                        >
                          <Input
                            placeholder="Enter your Postcode"
                            maxLength={10}
                          />
                        </Form.Item>
                      </div>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="inputLogin1">
                        <Form.Item
                          name="video_url"
                          label="Video Link  "
                          required={false}
                        >
                          <Input placeholder="Enter Video Link" />
                        </Form.Item>
                      </div>
                    </Col>

                    {userDetail &&
                    userDetail.user &&
                    userDetail.user.role == ATHLETE ? (
                      <>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="inputLogin1">
                            <Form.Item
                              name="family_household"
                              label="Single family household?  "
                              required={false}
                            >
                              <Radio.Group
                                name="radiogroup"
                                defaultValue={
                                  userDetail &&
                                  userDetail.athlete_extra_details &&
                                  userDetail.athlete_extra_details
                                    .family_household != null
                                    ? userDetail.athlete_extra_details
                                        .family_household
                                    : null
                                }
                                onChange={onChangehousehold}
                                value={household}
                              >
                                <Space direction="vertical">
                                  <Radio value={1}>Yes</Radio>
                                  <Radio value={0}>No</Radio>
                                </Space>
                              </Radio.Group>
                            </Form.Item>
                          </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="inputLogin1">
                            <Form.Item
                              name="first_generation_college_student"
                              label="First generation college student?  "
                              required={false}
                            >
                              <Radio.Group
                                name="radiogroup"
                                defaultValue={
                                  userDetail &&
                                  userDetail.athlete_extra_details &&
                                  userDetail.athlete_extra_details
                                    .first_generation_college_student != null
                                    ? userDetail.athlete_extra_details
                                        .first_generation_college_student
                                    : null
                                }
                                onChange={onChangecollegeStudent}
                                value={collegeStudent}
                              >
                                <Space direction="vertical">
                                  <Radio value={1}>Yes</Radio>
                                  <Radio value={0}>No</Radio>
                                </Space>
                              </Radio.Group>
                            </Form.Item>
                          </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="inputLogin1">
                            <Form.Item
                              name="extra_curricular"
                              label="Extracurricular Activities  "
                              required={false}
                            >
                              <Input placeholder="  Ex. sports, cheer, theatre, chess" />
                            </Form.Item>
                          </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="inputLogin1">
                            <Form.Item
                              name="additional_interests"
                              label="Additional Interests  "
                              required={false}
                            >
                              <Input placeholder="Enter Additional Interests" />
                            </Form.Item>
                          </div>
                        </Col>
                      </>
                    ) : null}
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="inputLogin1">
                        <Form.Item
                          name="description"
                          label="Description  "
                          required={false}
                        >
                          <TextArea
                            placeholder="Enter the description"
                            showCount
                          />
                        </Form.Item>
                      </div>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="signIn0">
                        <Form.Item>
                          <Button className="btn__login " htmlType="submit">
                            Update
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
    </div>
  );
}
export default ProfileEdit;
