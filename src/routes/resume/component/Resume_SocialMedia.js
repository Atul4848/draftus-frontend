import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Form, Select } from "antd";
import {
  socialResume,
  createResume,
  getResume,
} from "../../../redux/actions/resumeAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Resume_SocialMedia() {
  /*   const dispatch = useDispatch();
  const [form] = Form.useForm(); */
  const resume = useSelector((state) => state.resume);
  const { get_Resume, loading } = resume;
  let history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { Option } = Select;

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  const onFinish = async (data) => {
    const newData = await {
      ...data,
    };
    await dispatch(socialResume(newData));

    setIsModalVisible(false);
    dispatch(getResume());
    form.resetFields();
  };

  return (
    <div>
      <Button type="link" onClick={showModal}>
        Add
      </Button>
      <Modal
        title="Social Media "
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
          <Form.Item
            name="social_media"
            label=" Profile"
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
              onChange={onChange}
            >
              <Option value="facebook">FaceBook</Option>
              <Option value="instagram">Instagram</Option>
              <Option value="twitter">Twitter</Option>
              <Option value="Linkedin">Linkedin</Option>
            </Select>
            {/*  <Input /> */}
          </Form.Item>

          <Form.Item
            name="link"
            label=" Link"
            required={true}
            rules={[
              {
                required: true,
                message: "This field is Mandatory!",
              },
            ]}
          >
            <Input />
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
export default Resume_SocialMedia;
