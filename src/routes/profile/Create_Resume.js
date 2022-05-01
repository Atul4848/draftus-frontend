import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  DatePicker,
  Space,
  message,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
//import { createResume } from "../../redux/actions/resumeAction";
import { useHistory } from "react-router-dom";

function Create_Resume() {
  let history = useHistory();
  const { TextArea } = Input;
  const { Option } = Select;
  const [socialMedia, setSocialMedia] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [jobStartDate, setJobStartDate] = useState();
  const [jobEndDate, setJobEndDate] = useState();
  const [dob, setDOB] = useState();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  function selectStartDate(date, dateString) {
    console.log(date, dateString);

    setStartDate(date, dateString);
  }
  function selectEndDate(date, dateString) {
    console.log(date, "date");
    console.log(dateString, "date string");
    setEndDate(dateString);
  }
  function selectJobStartDate(date, dateString) {
    console.log(date, dateString);
    setJobStartDate(date, dateString);
  }
  function selectJobEndDate(date, dateString) {
    console.log(date, dateString);
    setJobEndDate(date, dateString);
  }
  const selectSocialMedia = (value) => {
    setSocialMedia(value);
  };
  /*  const onFinish = async (data) => {
    const newData = await {
      ...data,
     
    };
    dispatch(createResume(newData));
    history.push("/profile/resume");
  }; */
  const dateFormat = "YYYY-MM-DD";

  const onFormValuesChange = (changedValues, AllValues) => {
    console.log(AllValues, "all values");
  };

  const saveDataManually = async (date, dateString, name) => {
    const fields = form.getFieldsValue();
    await form.setFieldsValue({ ...fields, [name]: dateString });
  };

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
            <h2 className=" eds-text-hl">Create Resume</h2>
            <Form
              name="basic"
              form={form}
              /* onFinish={onFinish} */
              layout="vertical"
              onValuesChange={onFormValuesChange}
            >
              <Row gutter={[10, 10]}>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="inputLogin1">
                    <Form.Item
                      name="institute"
                      label="Institute"
                      required={true}
                      rules={[
                        {
                          required: true,
                          message: "This field is Mandatory!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter institute" />
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="inputLogin1">
                    <Form.Item
                      name="name"
                      label="Degree"
                      required={true}
                      rules={[
                        {
                          required: true,
                          message: "This field is Mandatory!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter  name" />
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="inputLogin1">
                    <Form.Item
                      name="grade"
                      label="Grade"
                      required={true}
                      rules={[
                        {
                          required: true,
                          message: "Please enter your Grade !",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Grade" />
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="inputLogin1">
                    <Form.Item
                      name="start_date"
                      label="Start Date "
                      required={true}
                      rules={[
                        {
                          required: true,
                          message: "This field is Mandatory!",
                        },
                      ]}
                    >
                      <Space direction="vertical">
                        <DatePicker
                          format={dateFormat}
                          value={startDate}
                          onChange={(date, dateString) =>
                            saveDataManually(date, dateString, "start_date")
                          }
                        />
                      </Space>
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="inputLogin1">
                    <Form.Item
                      name="end_date"
                      label="End Date "
                      required={true}
                      rules={[
                        {
                          required: true,
                          message: "This field is Mandatory!",
                        },
                      ]}
                    >
                      <Space direction="vertical">
                        <DatePicker
                          format={dateFormat}
                          value={endDate}
                          defaultValue={endDate}
                          onChange={(date, dateString) =>
                            saveDataManually(date, dateString, "end_date")
                          }
                        />
                      </Space>
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="inputLogin1">
                    <Form.Item
                      name="company_name"
                      label="Company Name"
                      required={true}
                      rules={[
                        {
                          required: true,
                          message: "Please enter your company name !",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Company name" />
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="inputLogin1">
                    <Form.Item
                      name="job_title"
                      label="Job Title"
                      required={true}
                      rules={[
                        {
                          required: true,
                          message: "Please enter your Job Title !",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Job Title" />
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="inputLogin1">
                    <Form.Item
                      name="job_start_date"
                      label="Job Start Date "
                      required={true}
                      rules={[
                        {
                          required: true,
                          message: "This field is Mandatory!",
                        },
                      ]}
                    >
                      <Space direction="vertical">
                        <DatePicker
                          format={dateFormat}
                          value={jobStartDate}
                          onChange={(date, dateString) =>
                            saveDataManually(date, dateString, "job_start_date")
                          }
                        />
                      </Space>
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="inputLogin1">
                    <Form.Item
                      name="job_end_date"
                      label="Job End Date "
                      required={true}
                      rules={[
                        {
                          required: true,
                          message: "This field is Mandatory!",
                        },
                      ]}
                    >
                      <Space direction="vertical">
                        <DatePicker
                          format={dateFormat}
                          value={jobEndDate}
                          onChange={(date, dateString) =>
                            saveDataManually(date, dateString, "job_end_date")
                          }
                        />
                      </Space>
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="inputLogin1">
                    <Form.Item
                      name="social_media"
                      label="Social Media  "
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
                        placeholder="Select Social Media"
                        optionFilterProp="children"
                        autoComplete="none"
                        onChange={selectSocialMedia}
                        value={socialMedia}
                        allowClear
                      >
                        <Option value="Facebook">Facebook</Option>

                        <Option value="Instagram">Instagram</Option>
                        <Option value="Twitter">Twitter</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="inputLogin1">
                    <Form.Item
                      name="link"
                      label="Link"
                      required={true}
                      rules={[
                        {
                          required: true,
                          message: "Please enter your Link !",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Link" />
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={16}>
                  <div className="inputLogin1">
                    <Form.Item
                      name="summary"
                      label="Summary"
                      required={true}
                      rules={[
                        {
                          required: true,
                          message: "Please enter Summary!",
                        },
                      ]}
                    >
                      <TextArea placeholder="Enter summary" />
                    </Form.Item>
                  </div>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="signIn0">
                    <Form.Item>
                      <Button className="btn__login " htmlType="submit">
                        CREATE RESUME
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
  );
}

export default Create_Resume;
