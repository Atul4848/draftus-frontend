import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Form, InputNumber } from "antd";
import {
  educationResume,
  getResume,
} from "../../../redux/actions/resumeAction";
import { useDispatch, useSelector } from "react-redux";

function Resume_Education() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };
  function onChange(value) {
    console.log("changed", value);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (data) => {
    const newData = await {
      ...data,
    };
    await dispatch(educationResume(newData));

    setIsModalVisible(false);
    dispatch(getResume());
    form.resetFields();
  };

  return (
    <div>
      <Button onClick={showModal}>Add Education</Button>
      <Modal
        title="Education  "
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
          <Form.Item
            name="institute"
            label=" College/University"
            required={true}
            rules={[
              {
                required: true,
                message: "This field is Mandatory!",
              },
              {
                max: 100,
                message: "Institude name must be maximum 100 digits.",
              },
            ]}
          >
            <Input placeholder="Enter College/University Name" />
          </Form.Item>
          <Form.Item
            name="name"
            label=" Degree"
            required={true}
            rules={[
              {
                required: true,
                message: "This field is Mandatory!",
              },
              {
                max: 100,
                message: "Education must be maximum 100 digits.",
              },
            ]}
          >
            <Input placeholder="Enter Degree " />
          </Form.Item>
          <Form.Item
            name="university"
            label=" Degree Concentration"
            required={true}
            rules={[
              {
                required: true,
                message: "This field is Mandatory!",
              },
              {
                max: 100,
                message: "University name must be maximum 100 digits.",
              },
            ]}
          >
            <Input placeholder="Enter Degree Concentration " />
          </Form.Item>
          <Form.Item
            name="start_date"
            label=" Start Date"
            required={true}
            rules={[
              {
                required: true,
                message: "This field is Mandatory!",
              },
            ]}
          >
            <Input type="date" placeholder="Enter Class Start date" />
          </Form.Item>
          <Form.Item
            name="end_date"
            label=" End Date"
            //required={true}
            rules={[
              /* {
                required: true,
                message: "This field is Mandatory!",
              }, */
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("start_date") < value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("End Date Should be Greater than Start date!")
                  );
                },
              }),
            ]}
          >
            <Input type="date" placeholder="Enter Class End Date" />
          </Form.Item>
          {
            <Form.Item
              name="grade"
              label=" Total marks"
              required={true}
              rules={[
                {
                  required: true,

                  message: "This field is Mandatory!",
                },
              ]}
            >
              <InputNumber
                min={0}
                max={100}
                maxLength={4}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
                onChange={onChange}
              />
            </Form.Item>
          }
          <div className="modelbox-btn-mb">
            <Form.Item>
              <Button
                className="ant-btn ant-btn btn__profile1"
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
export default Resume_Education;
