import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
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
  Modal,
  Spin,
} from "antd";
import {
  SocialMediaAuth,
  socialMediaDirectLogin,
  checkSocialFacebook,
  checkSocialGoogle,
  socialLogin,
  socialLoginGoogle,
} from "../../../redux/actions/userAuthAction";
import { useHistory } from "react-router-dom";
import { BsFacebook, BsGoogle } from "react-icons/bs";
import SocialButton from "./SocialMediaButton";
import SocialAuth from "../../socialAuth/SocialAuth";
import { getSkill } from "../../../redux/actions/curriculumAction";
import LinkedInAuth from "./LinkedInAuth";

function SocialMediaLogin() {
  const [role, setRole] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [googleModal, setGoogleModal] = useState(false);
  const [form] = Form.useForm();
  const [skills, setSkills] = useState([]);
  const { Option } = Select;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const {
    socialMedia,
    loading,
    isAuth,
    check_Social,
    check_Social_Google,
    check_social_flag,
    check_Social_Google_flag,
  } = user;

  const skill = useSelector((state) => state.curriculum_detail.skill);
  let history = useHistory();

  const handleSocialLoginFacebook = async (user) => {
    await dispatch(SocialMediaAuth(user));

    const chechData = await {
      email: user ? user._profile.email : null,
    };
    await dispatch(checkSocialFacebook(chechData));
  };

  const handleSocialLoginGoogle = async (user) => {
    await dispatch(SocialMediaAuth(user));
    const chechDataGoogle = await {
      email: user ? user._profile.email : null,
    };
    await dispatch(checkSocialGoogle(chechDataGoogle));
  };

  const selectSkill = (key) => {
    setSkills(key);
  };

  const selectRole = (value) => {
    setRole(value);
  };

  useEffect(async () => {
    if (check_social_flag == false && check_Social == false) {
      setIsModalVisible(true);
    } else if (check_social_flag == true && check_Social == true) {
      const newDatalogin = await {
        provider: socialMedia ? socialMedia._provider : null,
        email:
          socialMedia && socialMedia._profile
            ? socialMedia._profile.email
            : null,
        provider_id:
          socialMedia && socialMedia._profile ? socialMedia._profile.id : null,
      };
      await dispatch(socialLogin(newDatalogin));
    }
  }, [check_social_flag, check_Social]);
  //console.log(check_social_flag, check_Social);

  useEffect(async () => {
    if (check_Social_Google_flag == false && check_Social_Google == false) {
      setGoogleModal(true);
    } else if (
      check_Social_Google_flag == true &&
      check_Social_Google == true
    ) {
      const newDataloginGoogle = await {
        provider: socialMedia ? socialMedia._provider : null,
        email:
          socialMedia && socialMedia._profile
            ? socialMedia._profile.email
            : null,
        provider_id:
          socialMedia && socialMedia._profile ? socialMedia._profile.id : null,
      };
      await dispatch(socialLogin(newDataloginGoogle));
    }
  }, [check_Social_Google_flag, check_Social_Google]);
  //console.log(check_Social_Google_flag, check_Social_Google);

  useEffect(() => {
    collectSkillData();
  }, []);

  const collectSkillData = async () => {
    await dispatch(getSkill());
  };

  const onFinishFacebook = async (data) => {
    const newData = await {
      ...data,
      fname: socialMedia ? socialMedia._profile.firstName : null,
      lname: socialMedia ? socialMedia._profile.lastName : null,
      email: socialMedia ? socialMedia._profile.email : null,
      provider: socialMedia ? socialMedia._provider : null,
      provider_id: socialMedia ? socialMedia._profile.id : null,
    };
    dispatch(socialMediaDirectLogin(newData));
    setIsModalVisible(false);
  };
  const onFinishGoogle = async (data) => {
    const newData = await {
      ...data,
      fname: socialMedia ? socialMedia._profile.firstName : null,
      lname: socialMedia ? socialMedia._profile.lastName : null,
      email: socialMedia ? socialMedia._profile.email : null,
      provider: socialMedia ? socialMedia._provider : null,
      provider_id: socialMedia ? socialMedia._profile.id : null,
    };
    dispatch(socialMediaDirectLogin(newData));
    setIsModalVisible(false);
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  return (
    <div className="social-menu">
      <SocialButton
        provider="facebook"
        appId=""
        /*451362399680030  */
        onLoginSuccess={handleSocialLoginFacebook}
        onLoginFailure={handleSocialLoginFailure}
        autoCleanUri={true}
      >
        <BsFacebook color="blue" />
        <Modal
          title="Social Login "
          visible={isModalVisible}
          footer={null}
          closable={null}
        >
          <Form
            name="basic"
            onFinish={onFinishFacebook}
            layout="vertical"
            form={form}
          >
            <Form.Item
              name="skill_id"
              label="Skills  "
              required={true}
              rules={[
                {
                  required: true,
                  message: "This field is Mandatory!",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="select skills"
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
            <Form.Item
              name="role"
              label="Role  "
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
                placeholder="Select Role"
                optionFilterProp="children"
                autoComplete="none"
                onChange={selectRole}
                value={role}
                allowClear
              >
                <Option value={2}>Team</Option>

                <Option value={4}>Athlete</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <div className="button__area2">
                <Button htmlType="submit">Login</Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </SocialButton>
      <SocialButton
        provider="google"
        appId=""
        onLoginSuccess={handleSocialLoginGoogle}
        onLoginFailure={handleSocialLoginFailure}
        /* onLoginFailure={handleSocialLoginFailure} */
      >
        <BsGoogle color="red" />
        <Modal
          title="Social Login "
          visible={googleModal}
          footer={null}
          closable={null}
        >
          <Form
            name="basic"
            onFinish={onFinishGoogle}
            layout="vertical"
            form={form}
          >
            <Form.Item
              name="skill_id"
              label="Skills  "
              required={true}
              rules={[
                {
                  required: true,
                  message: "This field is Mandatory!",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="select skills"
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
            <Form.Item
              name="role"
              label="Role  "
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
                placeholder="Select Role"
                optionFilterProp="children"
                autoComplete="none"
                onChange={selectRole}
                value={role}
                allowClear
              >
                <Option value={2}>Team</Option>

                <Option value={4}>Athlete</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <div className="button__area2">
                <Button htmlType="submit">Login</Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </SocialButton>
      <LinkedInAuth />
    </div>
  );
}
export default SocialMediaLogin;
