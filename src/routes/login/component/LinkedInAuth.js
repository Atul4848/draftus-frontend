import React, { useEffect, useState } from "react";

import { useLinkedIn } from "react-linkedin-login-oauth2";
// You can use provided image shipped by this package or using your own
import { BsLinkedin } from "react-icons/bs";
//import { message } from "antd";
import { Form, Button, Select, Modal, message, Spin } from "antd";
import {
  generateLinkedInAccessToken,
  getLinkedinLiteProfile,
  socialLogin,
  checkSocialLinkedIn,
  socialMediaDirectLogin,
} from "../../../redux/actions/userAuthAction";
import { useDispatch, useSelector } from "react-redux";
import { LINKEDIN_REDIRECT_URL } from "../../../constants/config";

function LinkedInAuth() {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userState = useSelector((state) => state.user);
  const {
    check_Social_LinkedIn,
    check_Social_LinkedIn_flag,
    social_LinkedIn,
    linkedInAuthLoadingFlag,
  } = userState;
  const skill = useSelector((state) => state.curriculum_detail.skill);
  const { linkedInAuthFlag } = userState;
  const [code, setCode] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [form] = Form.useForm();
  const [skills, setSkills] = useState([]);
  const { Option } = Select;
  const [role, setRole] = useState();

  const [socialLinkedInData, setSocialLinkedInData] = useState("");
  useEffect(() => {
    var myStringArray =
      social_LinkedIn &&
      social_LinkedIn.mail &&
      social_LinkedIn.mail.elements[0];

    //var arrayLength = myStringArray[0];
    for (var key in myStringArray) {
      if (myStringArray[key].hasOwnProperty("emailAddress")) {
        setSocialLinkedInData(myStringArray[key]["emailAddress"]);
      }
    }
  }, [social_LinkedIn]);

  const selectSkill = (key) => {
    setSkills(key);
  };

  const selectRole = (value) => {
    setRole(value);
  };

  const { linkedInLogin } = useLinkedIn({
    clientId: "774w23ix79hivv",
    redirectUri: `${window.location.origin}/linkedin-auth`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
    scope: ["r_emailaddress", "r_liteprofile"],
    onSuccess: (code) => {
      setCode(code);
      setErrorMessage("");
    },
    onError: (error) => {
      setCode("");
      setErrorMessage(error.errorMessage);
    },
  });

  useEffect(() => {
    LinkedInFunction();
  }, [socialLinkedInData]);

  const LinkedInFunction = () => {
    if (socialLinkedInData != "") {
      /* dispatch(SocialMediaAuth(user)); */
      const chechDataGoogle = {
        email: socialLinkedInData != "" ? socialLinkedInData : null,
      };
      dispatch(checkSocialLinkedIn(chechDataGoogle));
    }
  };

  useEffect(() => {
    if (code !== "") {
      dispatch(
        generateLinkedInAccessToken({
          code: code,
          redirect_uri: LINKEDIN_REDIRECT_URL,
        })
      );
    }
  }, [code]);

  useEffect(() => {
    if (linkedInAuthFlag) {
      console.log("user successfully logged in by linkedin");
    }
  }, [linkedInAuthFlag]);

  useEffect(() => {
    if (errorMessage !== "") message.error(errorMessage);
  }, [errorMessage]);

  const onFinish = async (data) => {
    const newData = await {
      ...data,
      fname: social_LinkedIn ? social_LinkedIn.localizedFirstName : null,
      lname: social_LinkedIn ? social_LinkedIn.localizedLastName : null,
      email: socialLinkedInData != "" ? socialLinkedInData : null,
      provider: "LinkedIn",
      provider_id: social_LinkedIn ? social_LinkedIn.id : null,
    };
    dispatch(socialMediaDirectLogin(newData));
    setIsModalVisible(false);
  };

  useEffect(async () => {
    if (check_Social_LinkedIn == false && check_Social_LinkedIn_flag == false) {
      setIsModalVisible(true);
    } else if (
      check_Social_LinkedIn == true &&
      check_Social_LinkedIn_flag == true
    ) {
      const newDatalogin = await {
        provider: "LinkedIn",
        email: socialLinkedInData ? socialLinkedInData : null,
        provider_id: social_LinkedIn ? social_LinkedIn.id : null,
      };
      await dispatch(socialLogin(newDatalogin));
    }
  }, [check_Social_LinkedIn_flag, check_Social_LinkedIn]);

  return (
    <div>
      {linkedInAuthLoadingFlag ? (
        <Spin />
      ) : (
        <button
          style={{
            cursor: "pointer",
          }}
          onClick={linkedInLogin}
        >
          <BsLinkedin />
        </button>
      )}

      <Modal
        title="Social Login "
        visible={isModalVisible}
        footer={null}
        closable={null}
      >
        <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
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
    </div>
  );
}

export default LinkedInAuth;
