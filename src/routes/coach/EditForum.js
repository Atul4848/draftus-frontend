import React, { useEffect } from "react";
import { Card, Button, Skeleton, Row, Col, Form, Input, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addForum } from "../../redux/actions/forumAction";
import {
  coachViewForumDetail,
  updateForum,
} from "../../redux/actions/forumAction";

function EditForum() {
  const { id } = useParams();
  console.log(id);
  const { TextArea } = Input;
  let history = useHistory();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const forum = useSelector((state) => state.forum);
  const { coach_View_Forum_Detail, loading } = forum;

  useEffect(() => {
    dispatch(coachViewForumDetail(id));
  }, []);
  const onFinish = async (data) => {
    const newData = await {
      ...data,
      id: id,
    };
    await dispatch(updateForum(newData));
    history.push("/profile/forum");
  };

  useEffect(() => {
    collectEditedForum();
  }, [coach_View_Forum_Detail]);

  const collectEditedForum = async () => {
    if (Object.keys(coach_View_Forum_Detail).length === 0) {
      return history.push("/profile/forum");
    } else {
      const formObj = {
        title: coach_View_Forum_Detail.title,
        description: coach_View_Forum_Detail.description,
      };
      console.log(formObj);
      await form.setFieldsValue(formObj);
    }
  };
  console.log(coach_View_Forum_Detail);

  return (
    <div className="newContnainer">
      <div className="athlete__home">
        <h2 className="themestek-custom-heading"> FORUM</h2>
        {loading ? (
          <Skeleton />
        ) : (
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
                    name="title"
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
                    <TextArea placeholder="Enter Description" />
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
        )}
      </div>
    </div>
  );
}
export default EditForum;
