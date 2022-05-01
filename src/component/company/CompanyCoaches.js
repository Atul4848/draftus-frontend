import React, { useEffect } from "react";
import { Collapse, Skeleton, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { companyCoach } from "../../redux/actions/companyaction";
import { Link } from "react-router-dom";

function CompanyCoaches() {
  const { Panel } = Collapse;
  const dispatch = useDispatch();
  const company_detail = useSelector((state) => state.company_detail);
  const { company_Coach, loading } = company_detail;

  useEffect(() => {
    collectUserData();
  }, []);

  const collectUserData = async () => {
    await dispatch(companyCoach());
  };

  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <h3 className="activecoaches d-flex justify-content-start">
            Coaches
          </h3>
          <div className="coachesflied">
            {company_Coach == "" ? (
              <div className="nofound0">
                No Data <span> Found !</span>
              </div>
            ) : (
              <Collapse ghost>
                {company_Coach &&
                  company_Coach.map((item) => (
                    <Panel
                      header={
                        <span>
                          <span>
                            {item &&
                            item.coach_details &&
                            item.coach_details.fname != ""
                              ? item.coach_details.fname
                              : "N/A"}
                          </span>
                          <span> </span>
                          <span>
                            {item &&
                            item.coach_details &&
                            item.coach_details.lname != ""
                              ? item.coach_details.lname
                              : "N/A"}
                          </span>
                        </span>
                      }
                      key={item ? item.coach_id : "1"}
                    >
                      <div className="drpdownclas">
                        <b> Name :</b>
                        <Link to={"/profile/details/" + item.coach_id}>
                          <span>
                            {item &&
                            item.coach_details &&
                            item.coach_details.fname != ""
                              ? item.coach_details.fname
                              : "N/A"}
                          </span>
                          <span> </span>
                          <span>
                            {item &&
                            item.coach_details &&
                            item.coach_details.lname != ""
                              ? item.coach_details.lname
                              : "N/A"}
                          </span>
                        </Link>
                      </div>
                      <div className="drpdownclas">
                        <b> Email :</b>{" "}
                        <span>
                          {item &&
                          item.coach_details &&
                          item.coach_details.email != ""
                            ? item.coach_details.email
                            : "N/A"}
                        </span>
                      </div>
                      <div className="drpdownclas">
                        <b> Contact :</b>
                        <span>
                          {item &&
                          item.coach_details &&
                          item.coach_details.get_user_details != ""
                            ? item.coach_details.get_user_details.phone
                            : "N/A"}
                        </span>
                      </div>
                      <Link to={"/profile/details/" + item.coach_id}>
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
export default CompanyCoaches;
