import React, { useEffect } from "react";
import { Collapse, Skeleton, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  get_Requested_Athlete,
  findAthlete_id,
} from "../../redux/actions/coachAction";
import { Link } from "react-router-dom";

function CoachAthletepending() {
  const { Panel } = Collapse;
  const dispatch = useDispatch();
  const coach_detail = useSelector((state) => state.coach_detail);
  const { loading, getRequestedAthlete } = coach_detail;

  useEffect(() => {
    collectUserData();
  }, []);

  const collectUserData = async () => {
    await dispatch(get_Requested_Athlete());
  };

  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <h3 className="activecoaches d-flex justify-content-start">
            Athletes Pending Request
          </h3>
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
                        <Link to={"/profile/athlete_detail/" + item.athlete_id}>
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
                      <div className="drpdownclas">
                        <b> Contact :</b>{" "}
                        <span>
                          {item && item.user && item.user.get_user_details != ""
                            ? item.user.get_user_details.phone
                            : "N/A"}
                        </span>
                      </div>
                      <Link to={"/profile/athlete_detail/" + item.athlete_id}>
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
export default CoachAthletepending;
