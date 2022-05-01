import React, { useEffect } from "react";
import { Button, Collapse, Skeleton } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getRequestedTeam } from "../../redux/actions/coachAction";
import { Link } from "react-router-dom";

function ListOfCompany() {
  const { Panel } = Collapse;
  const dispatch = useDispatch();
  const coach_detail = useSelector((state) => state.coach_detail);
  const { loading, requested_Team } = coach_detail;

  useEffect(() => {
    collectUserData();
  }, []);

  const collectUserData = async () => {
    await dispatch(getRequestedTeam());
  };

  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <h3 className="activecoaches d-flex justify-content-start">
            Pending Teams
          </h3>
          <div className="coachesflied">
            {requested_Team == "" ? (
              <div className="nofound0">
                No Data <span> Found !</span>
              </div>
            ) : (
              <Collapse ghost>
                {requested_Team &&
                  requested_Team.map((item) => (
                    <Panel
                      header={
                        <span>
                          <span>
                            {item && item.company_details != ""
                              ? item.company_details.fname
                              : "N/A"}
                          </span>
                          <span> </span>
                          <span>
                            {item && item.company_details != ""
                              ? item.company_details.lname
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
                            "/profile/company-detail/" + item.company_details.id
                          }
                        >
                          <span>
                            {item && item.company_details != ""
                              ? item.company_details.fname
                              : "N/A"}
                          </span>
                          <span> </span>
                          <span>
                            {item && item.company_details != ""
                              ? item.company_details.lname
                              : "N/A"}
                          </span>
                        </Link>
                      </div>
                      <div className="drpdownclas">
                        <b> Email :</b>{" "}
                        <span>
                          {item && item.company_details != ""
                            ? item.company_details.email
                            : "N/A"}
                        </span>
                      </div>
                      {/* <div className="drpdownclas">
                        <b> Contact :</b>{" "}
                        <span>
                          {item &&
                          item.company_details &&
                          item.company_details.get_user_details != ""
                            ? item.company_details.get_user_details.phone
                            : "N/A"}
                        </span>
                      </div> */}
                      <Link
                        to={
                          "/profile/company-detail/" + item.company_details.id
                        }
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
        </>
      )}
    </div>
  );
}
export default ListOfCompany;
