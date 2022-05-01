import React, { useEffect } from "react";
import { Card, Button, Skeleton, Row, Col, Form, Input, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
/* import { addForum } from "../../redux/actions/forumAction"; */

import {
  /* coachViewForumDetail, */
  getCurriculum,
  updateCurriculum,
} from "../../../redux/actions/curriculumAction";

function EditCoreCurriculum() {
  const { id } = useParams();
  console.log(id);
  const { TextArea } = Input;
  let history = useHistory();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const curriculum_detail = useSelector((state) => state.curriculum_detail);
  const { curriculum, loading } = curriculum_detail;
  /*  const forum = useSelector((state) => state.forum);
  const { coach_View_Forum_Detail, loading } = forum; */

  /* useEffect(() => {
    getCurriculumData();
  }, []);

  const getCurriculumData = async () => {
    await dispatch(getCurriculum());
  }; */

  /* useEffect(() => {
    dispatch(coachViewForumDetail(id));
  }, []); */
  const onFinish = async (data) => {
    const newData = await {
      ...data,
      curriculum_id: id,
    };
    await dispatch(updateCurriculum(newData));
    history.push("/profile/curriculum");
  };

  useEffect(() => {
    collectEditedForum();
  }, []);

  const collectEditedForum = async () => {
    if (curriculum == "") {
      return history.push("/profile/curriculum");
    } else {
      const target = await curriculum.find((data) => data.id == id);

      const formObj = {
        name: target.name,
        description: target.description,
        video_link: target.video_link,
      };
      console.log(formObj);
      await form.setFieldsValue(formObj);
    }
  };

  return (
    <div className="newContnainer">
      <div className="athlete__home">
        <h2 className="themestek-custom-heading"> Corriculum</h2>
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
        )}
      </div>
    </div>
  );
}
export default EditCoreCurriculum;
