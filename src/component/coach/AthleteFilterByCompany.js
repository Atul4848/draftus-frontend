import React, { useEffect, useState } from "react";
import {
  Button,
  Collapse,
  Skeleton,
  Row,
  Col,
  Select,
  Badge,
  Card,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  get_Athlete,
  get_Requested_Athlete,
  filterByCompanyId,
  getTeam,
} from "../../redux/actions/coachAction";
import { Link } from "react-router-dom";
import RibbonContent from "./RibbonContent";

function AthleteFilterByCompany() {
  const { Panel } = Collapse;
  const { Option } = Select;
  const dispatch = useDispatch();
  const [dataId, setDataId] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const coach_detail = useSelector((state) => state.coach_detail);
  const {
    loading,
    filterloading,
    getRequestedAthlete,
    acceptedAthlete,
    coach_Team,
    filter_By_Company_Id,
  } = coach_detail;

  const onChange = async (value) => {
    console.log(`selected ${value}`);
    await dispatch(filterByCompanyId(value));
    setDataId(value);
    setLoadingData(false);
  };

  useEffect(() => {
    collectUserData();
  }, []);

  const collectUserData = async () => {
    await dispatch(get_Athlete());
    await dispatch(get_Requested_Athlete());
    //await dispatch(getTeam());
    setLoadingData(false);
  };

  /* useEffect(() => {
    collectRequestedAthlete();
  }, []);

  const collectRequestedAthlete = async () => {
   
  }; */

  return (
    <div>
      <div className="select-team-st">
        <Select
          allowClear
          placeholder="Select Team"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {coach_Team == "" ? (
            "no data found"
          ) : (
            <>
              {coach_Team.map((item) => (
                <Option value={item.company_id}>
                  <span>
                    <span>{item.company_details.fname}</span>
                    <span> </span>
                    <span>{item.company_details.lname}</span>
                  </span>
                </Option>
              ))}
            </>
          )}
        </Select>
      </div>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <h3 className="activecoaches d-flex justify-content-start">
                Athlete
              </h3>
              {dataId == undefined ? (
                <div className="coachesflied">
                  {acceptedAthlete == "" ? (
                    <div className="nofound0">
                      No Data <span> Found !</span>
                    </div>
                  ) : (
                    <Collapse ghost>
                      {acceptedAthlete &&
                        acceptedAthlete.map((item) => (
                          <Panel
                            header={
                              <span>
                                <span>
                                  {item && item.user != ""
                                    ? item.user.fname
                                    : "N/A"}
                                </span>
                                <span> </span>
                                <span>
                                  {item && item.user != ""
                                    ? item.user.lname
                                    : "N/A"}
                                </span>
                              </span>
                            }
                            key={item != "" ? item.athlete_id : "N/A"}
                          >
                            <div className="drpdownclas">
                              <b> Name :</b>
                              <Link
                                to={
                                  "/profile/athlete_detail/" + item.athlete_id
                                }
                              >
                                <span>
                                  {item && item.user != ""
                                    ? item.user.fname
                                    : "N/A"}
                                </span>
                                <span> </span>
                                <span>
                                  {item && item.user != ""
                                    ? item.user.lname
                                    : "N/A"}
                                </span>
                              </Link>
                            </div>
                            <div className="drpdownclas">
                              <b> Email :</b>{" "}
                              <span>
                                {item && item.user != ""
                                  ? item.user.email
                                  : "N/A"}
                              </span>
                            </div>
                            <div className="drpdownclas">
                              <b> Contact :</b>{" "}
                              <span>
                                {item &&
                                item.user &&
                                item.user.get_user_details != ""
                                  ? item.user.get_user_details.phone
                                  : "N/A"}
                              </span>
                            </div>
                            <Link
                              to={"/profile/athlete_detail/" + item.athlete_id}
                            >
                              <div className="btnedu">
                                <Button>View Detail</Button>
                              </div>
                            </Link>
                          </Panel>
                        ))}
                    </Collapse>
                  )}
                </div>
              ) : (
                <div className="coachesflied">
                  {filter_By_Company_Id == "" ? (
                    <div className="nofound0">
                      No Data <span> Found !</span>
                    </div>
                  ) : (
                    <Collapse ghost>
                      {filter_By_Company_Id &&
                        filter_By_Company_Id.map((item) => (
                          <>
                            {item && item.status == 0 ? null : (
                              <Panel
                                header={
                                  <span>
                                    <span>
                                      {item && item.user != ""
                                        ? item.user.fname
                                        : "N/A"}
                                    </span>
                                    <span> </span>
                                    <span>
                                      {item && item.user != ""
                                        ? item.user.lname
                                        : "N/A"}
                                    </span>
                                  </span>
                                }
                                key={item != "" ? item.athlete_id : "N/A"}
                              >
                                <div className="drpdownclas">
                                  <b> Name :</b>
                                  <Link
                                    to={
                                      "/profile/athlete_detail/" +
                                      item.athlete_id
                                    }
                                  >
                                    <span>just to test active</span>
                                    <span> </span>
                                    <span>
                                      {item && item.user != ""
                                        ? item.user.lname
                                        : "N/A"}
                                    </span>
                                  </Link>
                                </div>
                                <div className="drpdownclas">
                                  <b> Email :</b>{" "}
                                  <span>
                                    {item && item.user != ""
                                      ? item.user.email
                                      : "N/A"}
                                  </span>
                                </div>
                                <div className="drpdownclas">
                                  <b> Contact :</b>{" "}
                                  <span>
                                    {item &&
                                    item.user &&
                                    item.user.get_user_details != ""
                                      ? item.user.get_user_details.phone
                                      : "N/A"}
                                  </span>
                                </div>
                                <Link
                                  to={
                                    "/profile/athlete_detail/" + item.athlete_id
                                  }
                                >
                                  <div className="btnedu">
                                    <Button>View Detail</Button>
                                  </div>
                                </Link>
                              </Panel>
                            )}
                          </>
                        ))}
                    </Collapse>
                  )}
                </div>
              )}
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <>
                <h3 className="activecoaches d-flex justify-content-start">
                  Athletes Pending Request
                </h3>
                {dataId == undefined ? (
                  <div className="coachesflied">
                    {getRequestedAthlete == "" ? (
                      <div className="nofound0">
                        No Data <span> Found !</span>
                      </div>
                    ) : (
                      <Collapse ghost>
                        {getRequestedAthlete &&
                          getRequestedAthlete.map((item) => (
                            <Panel
                              header={
                                <span>
                                  <span>
                                    {item && item.user != ""
                                      ? item.user.fname
                                      : "N/A"}
                                  </span>
                                  <span> </span>
                                  <span>
                                    {item && item.user != ""
                                      ? item.user.lname
                                      : "N/A"}
                                  </span>
                                </span>
                              }
                              key={item != "" ? item.athlete_id : "N/A"}
                            >
                              <div className="team-assign-ta">
                                {item && item.assign_by != null ? (
                                  <Badge.Ribbon
                                    text={
                                      item.assign_by.fname +
                                      "  " +
                                      item.assign_by.lname
                                    }
                                  >
                                    <RibbonContent item={item} />
                                  </Badge.Ribbon>
                                ) : (
                                  <RibbonContent item={item} />
                                )}
                              </div>
                            </Panel>
                          ))}
                      </Collapse>
                    )}
                  </div>
                ) : (
                  <div className="coachesflied">
                    {filter_By_Company_Id == "" ? (
                      <div className="nofound0">
                        No Data <span> Found !</span>
                      </div>
                    ) : (
                      <Collapse ghost>
                        {filter_By_Company_Id &&
                          filter_By_Company_Id.map((item) => (
                            <>
                              {item && item.status == 1 ? null : (
                                <Panel
                                  header={
                                    <span>
                                      <span>
                                        {item && item.user != ""
                                          ? item.user.fname
                                          : "N/A"}
                                      </span>
                                      <span> </span>
                                      <span>
                                        {item && item.user != ""
                                          ? item.user.lname
                                          : "N/A"}
                                      </span>
                                    </span>
                                  }
                                  key={item != "" ? item.athlete_id : "N/A"}
                                >
                                  <div className="drpdownclas">
                                    <b> Name :</b>
                                    <Link
                                      to={
                                        "/profile/athlete_detail/" +
                                        item.athlete_id
                                      }
                                    >
                                      <span>just to test pending</span>
                                      <span> </span>
                                      <span>
                                        {item && item.user != ""
                                          ? item.user.lname
                                          : "N/A"}
                                      </span>
                                    </Link>
                                  </div>
                                  <div className="drpdownclas">
                                    <b> Email :</b>{" "}
                                    <span>
                                      {item && item.user != ""
                                        ? item.user.email
                                        : "N/A"}
                                    </span>
                                  </div>
                                  <div className="drpdownclas">
                                    <b> Contact :</b>{" "}
                                    <span>
                                      {item &&
                                      item.user &&
                                      item.user.get_user_details != ""
                                        ? item.user.get_user_details.phone
                                        : "N/A"}
                                    </span>
                                  </div>
                                  <Link
                                    to={
                                      "/profile/athlete_detail/" +
                                      item.athlete_id
                                    }
                                  >
                                    <div className="btnedu">
                                      <Button>View Detail</Button>
                                    </div>
                                  </Link>
                                </Panel>
                              )}
                            </>
                          ))}
                      </Collapse>
                    )}
                  </div>
                )}
              </>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}
export default AthleteFilterByCompany;
