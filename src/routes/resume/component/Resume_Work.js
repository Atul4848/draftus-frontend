import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Form } from "antd";
import { workResume, getResume } from "../../../redux/actions/resumeAction";
import { useDispatch } from "react-redux";

function Resume_Work() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (data) => {
    const newData = await {
      ...data,
    };
    await dispatch(workResume(newData));

    setIsModalVisible(false);
    dispatch(getResume());
    form.resetFields();
  };
  return (
    <div>
      <Button onClick={showModal}>Add Employment</Button>
      <Modal
        title=" Employment "
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
          <Form.Item
            name="job_title"
            label=" Job Title"
            required={true}
            rules={[
              {
                required: true,
                message: "This field is Mandatory!",
              },
              {
                max: 100,
                message: "Job Title must be maximum 100 digits.",
              },
            ]}
          >
            <Input placeholder="Enter your Job Title!" />
          </Form.Item>
          <Form.Item
            name="company_name"
            label=" Company Name"
            required={true}
            rules={[
              {
                required: true,
                message: "This field is Mandatory!",
              },
              {
                max: 100,
                message: "Company name must be maximum 100 digits.",
              },
            ]}
          >
            <Input placeholder="Enter your Company Name!" />
          </Form.Item>
          <Form.Item
            name="job_start_date"
            label=" Job Start Date"
            required={true}
            rules={[
              {
                required: true,
                message: "This field is Mandatory!",
              },
            ]}
          >
            <Input type="date" placeholder="Enter Job Start Date!" />
          </Form.Item>
          <Form.Item
            name="job_end_date"
            label="Job End Date"
            required={true}
            rules={[
              {
                required: true,
                message: "This field is Mandatory!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("job_start_date") < value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("End Date Should be Greater than Start date!")
                  );
                },
              }),
            ]}
          >
            <Input type="date" placeholder="Enter Job End Date!" />
          </Form.Item>
          <Form.Item
            name="skills"
            label="Skills"
            required={true}
            rules={[
              {
                required: true,
                message: "This field is Mandatory!",
              },
            ]}
          >
            <TextArea rows={4} maxLength={500} />
          </Form.Item>
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
export default Resume_Work;
