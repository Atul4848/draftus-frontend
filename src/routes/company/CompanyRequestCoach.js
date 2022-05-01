import React, { useEffect } from "react";

import { Row, Col, Button, Skeleton, Spin, Radio, Collapse, Card } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import { UPLOAD_PIC } from "../../constants/ActionType";
import {
  getAllCoach,
  companyRequestCoach,
} from "../../redux/actions/companyaction";
import profile from "../../assets/logo1.png";
import { AiOutlineDoubleLeft } from "react-icons/ai";

function CompanyRequestCoach() {
  const { Panel } = Collapse;
  let history = useHistory();
  const dispatch = useDispatch();
  const company_detail = useSelector((state) => state.company_detail);
  const { all_Coach, loading } = company_detail;

  const RequestCoach = async (id) => {
    await dispatch(companyRequestCoach(id));

    dispatch(getAllCoach());
    setGetData();
    setCoachId();
  };

  useEffect(() => {
    collectUserData();
  }, []);

  const collectUserData = async () => {
    await dispatch(getAllCoach());
  };
  const [coachId, setCoachId] = React.useState();
  const [value, setValue] = React.useState(1);
  const [getData, setGetData] = React.useState();
  const [loadingData, setLoadingData] = React.useState(false);

  const onChange = async (e) => {
    setValue(e.target.value);
    setCoachId(e.target.value);
    const target = await all_Coach.find((data) => data.id == e.target.value);
    console.log(target);
    setGetData(target);
    setLoadingData(false);
  };

  return (
    <div className="newContnainer">
      <div className="athlete__home">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <div className="back-btn-bb">
              <Button type="link" onClick={() => history.push("/profile")}>
                <AiOutlineDoubleLeft />
              </Button>
              <h2 className="themestek-custom-heading">Request Coach</h2>{" "}
            </div>
            {/*  <h2 className="themestek-custom-heading">Request Coach</h2> */}
          </Col>
          <Col xs={24} sm={24} md={10} lg={10}>
            <div>
              <h3 className="activecoaches d-flex justify-content-start">
                COACHES
              </h3>

              <div className="coachesflied">
                {loading ? (
                  <Skeleton />
                ) : (
                  <>
                    {all_Coach == "" ? (
                      <div className="nofound0">
                        No Data <span> Found !</span>
                      </div>
                    ) : (
                      <Radio.Group
                        name="radiogroup"
                        onChange={onChange}
                        value={value}
                      >
                        {all_Coach &&
                          all_Coach.map((item) => (
                            <div className="form-check">
                              <Radio value={item.id}>
                                <span>{item ? item.fname : "n/a"}</span>
                                <span> </span>
                                <span>{item ? item.lname : "n/a"}</span>
                              </Radio>
                            </div>
                          ))}
                      </Radio.Group>
                    )}
                  </>
                )}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={14} lg={14}>
            {loadingData ? (
              <Spin size="large" className="spinner" />
            ) : (
              <Row gutter={[16, 16]}>
                {getData == null ? (
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="nofound0">Please Select the Coach</div>
                  </Col>
                ) : (
                  <>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <h3 className="activecoaches d-flex justify-content-start">
                        Coach's Profile
                      </h3>
                    </Col>
                    <Col xs={24} sm={24} md={9} lg={9}>
                      <div className="athlete__home_img">
                        <img
                          src={
                            getData &&
                            getData.get_user_details &&
                            getData.get_user_details.avatar != null
                              ? UPLOAD_PIC + getData.get_user_details.avatar
                              : profile
                          }
                          alt=""
                        />
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={15} lg={15}>
                      <div className="profileinform">
                        <p>
                          <b>Name : </b>{" "}
                          <span>
                            <p>{getData != "" ? getData.fname : "N/A"}</p>
                            <p>{getData ? getData.lname : "N/A"}</p>
                          </span>
                        </p>
                        <p>
                          <b>Email : </b>
                          <span>
                            {getData && getData.email ? getData.email : "N/A"}
                          </span>
                        </p>
                        <p>
                          <b>Contact : </b>
                          <span>
                            {getData &&
                            getData.get_user_details &&
                            getData.get_user_details.phone
                              ? getData.get_user_details.phone
                              : "N/A"}
                          </span>
                        </p>
                        <p>
                          <b> Address : </b>
                          <span>
                            {getData &&
                            getData.get_user_details &&
                            getData.get_user_details.address
                              ? getData.get_user_details.address
                              : "N/A"}
                          </span>
                        </p>

                        <p>
                          <b> Postcode : </b>
                          <span>
                            {getData &&
                            getData.get_user_details &&
                            getData.get_user_details.postal_code
                              ? getData.get_user_details.postal_code
                              : "N/A"}
                          </span>
                        </p>
                        {/*  {coach_detail_skill != "" ? (
                          <p>
                            <b>Skills:</b>
                            <span>
                              {coach_detail_skill.map((item, i) => (
                                <>
                                  <p>
                                    {item && item.skill && item.skill.name
                                      ? item.skill.name
                                      : null}
                                  </p>
                                  <p>
                                    {i < coach_detail_skill.length - 1
                                      ? ","
                                      : null}
                                  </p>
                                </>
                              ))}
                            </span>
                          </p>
                        ) : null} */}
                      </div>
                    </Col>
                  </>
                )}
              </Row>
            )}
          </Col>
        </Row>
      </div>

      {coachId == undefined ? null : (
        <Col xs={24} sm={24} md={8} lg={8}>
          <div className="wgl-buttonshiftl">
            <Button onClick={() => RequestCoach(coachId)}>Request Coach</Button>
          </div>
        </Col>
      )}
    </div>
  );
}

export default CompanyRequestCoach;
