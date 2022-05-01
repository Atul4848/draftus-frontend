import React, { useEffect } from "react";
import { Button, Collapse, Skeleton } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getPotentialAthlete } from "../../redux/actions/coachAction";
import { Link } from "react-router-dom";

function PotentialAthlete() {
  const { Panel } = Collapse;
  const dispatch = useDispatch();
  const coach_detail = useSelector((state) => state.coach_detail);
  const { loading, potential_Athlete } = coach_detail;
  console.log(potential_Athlete);

  useEffect(() => {
    collectUserData();
  }, []);

  const collectUserData = async () => {
    await dispatch(getPotentialAthlete());
  };

  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <h3 className="activecoaches d-flex justify-content-start">
            Potential Athlete
          </h3>
          <div className="coachesflied">
            {potential_Athlete == "" ? (
              <div className="nofound0">
                No Data <span> Found !</span>
              </div>
            ) : (
              <Collapse ghost>
                {potential_Athlete &&
                  potential_Athlete.map((item) => (
                    <Panel
                      header={
                        <span>
                          <span>
                            {item && item.user != "" ? item.user.fname : "N/A"}
                          </span>
                          <span> </span>
                          <span>
                            {item && item.user != "" ? item.user.lname : "N/A"}
                          </span>
                        </span>
                      }
                      key={item != "" ? item.athlete_id : "N/A"}
                    >
                      <div className="drpdownclas">
                        <b> Name :</b>
                        <Link to={"/profile/athlete_detail/" + item.user_id}>
                          <span>
                            {item && item.user != "" ? item.user.fname : "N/A"}
                          </span>
                          <span> </span>
                          <span>
                            {item && item.user != "" ? item.user.lname : "N/A"}
                          </span>
                        </Link>
                      </div>
                      <div className="drpdownclas">
                        <b> Email :</b>{" "}
                        <span>
                          {item && item.user != "" ? item.user.email : "N/A"}
                        </span>
                      </div>
                      {/* <div className="drpdownclas">
                        <b> Contact :</b>{" "}
                        <span>
                          {item && item.user && item.user.get_user_details != ""
                            ? item.user.get_user_details.phone
                            : "N/A"}
                        </span>
                      </div> */}
                      <Link to={"/profile/athlete_detail/" + item.user_id}>
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
export default PotentialAthlete;
