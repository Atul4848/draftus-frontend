import React from "react";
import { Card, Button, Skeleton, Row, Col, Form, Input, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addCurriculum } from "../../../redux/actions/curriculumAction";

function AddCoreCurriculum() {
  const { TextArea } = Input;
  let history = useHistory();
  const { form } = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = async (data) => {
    const newData = await {
      ...data,
    };
    await dispatch(addCurriculum(newData));
    history.push("/profile/curriculum");
  };
  return (
    <div className="newContnainer">
      <div className="athlete__home">
        <h2 className="themestek-custom-heading"> Curriculum</h2>
        <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
          <Row
            gutter={[10, 10]}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Col xs={24} sm={24} md={24} lg={16}>
              <div className="inputLogin1">
                <Form.Item
                  name="name"
                  label="Title"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "Please enter Title!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Title" />
                </Form.Item>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={16}>
              <div className="inputLogin1">
                <Form.Item
                  name="video_link"
                  label="Video Link"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "Please enter Video Link!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Video Link" />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24} sm={24} md={24} lg={16}>
              <div className="inputLogin1">
                <Form.Item
                  name="description"
                  label="Description"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "Please enter Description!",
                    },
                  ]}
                >
                  <TextArea placeholder="Enter Description" maxLength={500} />
                </Form.Item>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={16}>
              <div className="inputLogin1">
                <Form.Item>
                  <div className="button__area2">
                    <Button className="ant-btn btn__login " htmlType="submit">
                      Submit
                    </Button>
                  </div>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
export default AddCoreCurriculum;
