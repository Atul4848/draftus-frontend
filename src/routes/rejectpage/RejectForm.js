import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Form } from "antd";
import {
  rejectAthlete,
  get_Requested_Athlete,
  athleteDetail,
} from "../../redux/actions/coachAction";
import { useDispatch } from "react-redux";

function RejectForm({ id }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { form } = Form.useForm();
  console.log(id);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (data) => {
    const newData = await {
      ...data,
      request_id: id,
    };
    dispatch(rejectAthlete(newData));
    setIsModalVisible(false);
    await dispatch(get_Requested_Athlete());
    await dispatch(athleteDetail());
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
          <Form.Item
            name="reject_message"
            label=" Reason for Rejection"
            required={true}
            rules={[
              {
                required: true,
                message: "This field is Mandatory!",
              },
            ]}
          >
            <Input placeholder="Enter your reason here!" />
          </Form.Item>

          <Form.Item>
            <div className="button__area2">
              <Button htmlType="submit">Reject</Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
export default RejectForm;
