import React, { useEffect } from "react";
import { Collapse, Skeleton, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { companyAthlete } from "../../redux/actions/companyaction";
import { Link } from "react-router-dom";

function CompanyAthlete() {
  const { Panel } = Collapse;
  const dispatch = useDispatch();
  const company_detail = useSelector((state) => state.company_detail);
  const { loading, company_Athlete } = company_detail;
  useEffect(() => {
    collectUserData();
  }, []);

  const collectUserData = async () => {
    await dispatch(companyAthlete());
  };

  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <h3 className="activecoaches d-flex justify-content-start">
            Athletes
          </h3>
          <div className="coachesflied">
            {company_Athlete == "" ? (
              <div className="nofound0">
                No Data <span> Found !</span>
              </div>
            ) : (
              <Collapse ghost>
                {company_Athlete &&
                  company_Athlete.map((item) => (
                    <Panel
                      header={
                        <span>
                          <span>
                            {item &&
                            item.athlete_details &&
                            item.athlete_details.fname != ""
                              ? item.athlete_details.fname
                              : "N/A"}
                          </span>
                          <span> </span>
                          <span>
                            {item &&
                            item.athlete_details &&
                            item.athlete_details.lname != ""
                              ? item.athlete_details.lname
                              : "N/A"}
                          </span>
                        </span>
                      }
                      key={item ? item.athlete_id : "1"}
                    >
                      <div className="drpdownclas">
                        <b> Name :</b>
                        <Link to={"/profile/details/" + item.athlete_id}>
                          <span>
                            {item &&
                            item.athlete_details &&
                            item.athlete_details.fname != ""
                              ? item.athlete_details.fname
                              : "N/A"}
                          </span>
                          <span> </span>
                          <span>
                            {item &&
                            item.athlete_details &&
                            item.athlete_details.lname != ""
                              ? item.athlete_details.lname
                              : "N/A"}
                          </span>
                        </Link>
                      </div>
                      <div className="drpdownclas">
                        <b> Email :</b>{" "}
                        <span>
                          {item &&
                          item.athlete_details &&
                          item.athlete_details.email != ""
                            ? item.athlete_details.email
                            : "N/A"}
                        </span>
                      </div>
                      <div className="drpdownclas">
                        <b> Contact :</b>{" "}
                        <span>
                          {item &&
                          item.athlete_details &&
                          item.athlete_details.get_user_details != ""
                            ? item.athlete_details.get_user_details.phone
                            : "N/A"}
                        </span>
                      </div>
                      <Link to={"/profile/details/" + item.athlete_id}>
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
export default CompanyAthlete;
