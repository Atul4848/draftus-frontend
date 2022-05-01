import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Form, Skeleton } from "antd";
import {
  educationResume,
  createResume,
} from "../../../redux/actions/resumeAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FcSportsMode } from "react-icons/fc";

function Resume_Summary({ summaryData }) {
  const userDetails = useSelector((state) => state.user);
  const { userDetail, loading } = userDetails;
  const resume = useSelector((state) => state.resume);
  const { get_Resume } = resume;
  let history = useHistory();
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

  useEffect(() => {
    collectUserWork();
  }, [get_Resume]);

  const collectUserWork = async () => {
    if (get_Resume != null) {
      const formObj = {
        summary: summaryData.summary,
      };
      await form.setFieldsValue(formObj);
      console.log(formObj);
    }
  };

  const onFinish = async (data) => {
    const newData = await {
      ...data,
    };
    await dispatch(createResume(newData));
    setIsModalVisible(false);
    history.push("/profile/resume");
  };
  return (
    <div>
      <Button className="ant-btn ant-btn btn__profile1" onClick={showModal}>
        Resume
      </Button>
      <Modal
        className="resum_page-rp"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="login-form-container0 ">
          <h2 className=" eds-text-hl"> Resume</h2>
          {loading ? (
            <Skeleton />
          ) : (
            <div className="resume_name">
              <b className="fullname-rn">
                <i class="fa fa-user-circle-o" aria-hidden="true"></i>

                <span className="name-rn">
                  {userDetail && userDetail.user != null
                    ? userDetail.user.fname
                    : "N/A"}
                </span>
                <span className="surname-rn">
                  {userDetail && userDetail.user != null
                    ? userDetail.user.lname
                    : "N/A"}
                </span>
              </b>
              <p className="email-rn">
                <i class="fa fa-envelope" aria-hidden="true"></i>
                {userDetail && userDetail.user != null
                  ? userDetail.user.email
                  : "N/A"}
              </p>
              <>
                {userDetail &&
                userDetail.user_details &&
                userDetail.user_details.phone != null ? (
                  <p className="email-rn">
                    <i class="fa fa-phone" aria-hidden="true"></i>
                    {userDetail && userDetail.user_details != null
                      ? userDetail.user_details.phone
                      : "N/A"}
                  </p>
                ) : null}
              </>
              {/* {userDetail && userDetail.curriculum != "" ? (
                <p className="email-rn">
                  <FcSportsMode />
                  Cricket, Football, Volleyball
                </p>
              ) : null} */}
              {/* <>
                {userDetail && userDetail.skill != "" ? (
                  <div className="profileinform_p">
                    <b>Skills:</b>
                    <div className="description_profile0 skill-sl">
                      {userDetail &&
                        userDetail.skill &&
                        userDetail.skill.map((item, i) => (
                          <p>
                            <>
                              {item && item.skill && item.skill.name
                                ? item.skill.name
                                : null}
                            </>

                            <span>
                              {i < userDetail.skill.length - 1 ? "," : null}
                            </span>
                          </p>
                        ))}
                    </div>
                  </div>
                ) : null}
              </> */}
              <>
                {userDetail && userDetail.skill != "" ? (
                  <p className="email-rn">
                    <FcSportsMode />

                    {userDetail &&
                      userDetail.skill &&
                      userDetail.skill.map((item, i) => (
                        <>
                          <>
                            {item && item.skill && item.skill.name
                              ? item.skill.name
                              : null}
                          </>

                          <span>
                            {i < userDetail.skill.length - 1 ? "," : null}
                          </span>
                        </>
                      ))}
                  </p>
                ) : null}
              </>
            </div>
          )}
          <h2 className=" eds-text-hl">Profile Summary</h2>
          <p>
            Your Profile Summary should mention the highlights of your career
            and education, what your professional interests are, and what kind
            of a career you are looking for.
          </p>
          <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
            <Form.Item
              name="summary"
              required={true}
              rules={[
                {
                  required: true,
                  message: "This field is Mandatory!",
                },
              ]}
            >
              <TextArea rows={4} maxLength={1000} />
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
              <Form.Item>
                <Button
                  className="ant-btn ant-btn btn__profile1"
                  onClick={() => setIsModalVisible(false)}
                >
                  Cancel
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
export default Resume_Summary;
