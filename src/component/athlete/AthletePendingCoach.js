import React, { useEffect } from "react";
import { Button, Collapse, Skeleton, Badge } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { requestedCoach } from "../../redux/actions/athleteAction";
import { Link } from "react-router-dom";
import CoachSeenAthlete from "./CoachSeenAthlete";

function AthletePendingCoach() {
  const { Panel } = Collapse;
  const dispatch = useDispatch();
  const athlete_detail = useSelector((state) => state.athlete_detail);
  const { requested_coach, loading } = athlete_detail;

  useEffect(() => {
    collectUserData();
  }, []);

  const collectUserData = async () => {
    await dispatch(requestedCoach());
  };

  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <h3 className="activecoaches d-flex justify-content-start">
            Pending Coaches
          </h3>
          <div className="coachesflied">
            {requested_coach == "" ? (
              <div className="nofound0">
                No Data <span> Found !</span>
              </div>
            ) : (
              <Collapse ghost>
                {requested_coach &&
                  requested_coach.map((item) => (
                    <Panel
                      header={
                        <span>
                          <span>
                            {item &&
                            item.coach_data &&
                            item.coach_data.fname != ""
                              ? item.coach_data.fname
                              : "N/A"}
                          </span>
                          <span> </span>
                          <span>
                            {item &&
                            item.coach_data &&
                            item.coach_data.lname != ""
                              ? item.coach_data.lname
                              : "N/A"}
                          </span>
                        </span>
                      }
                      key={item ? item.coach_id : "1"}
                    >
                      {item && item.is_seen == 1 ? (
                        <Badge.Ribbon text="Profile Viewed">
                          <CoachSeenAthlete item={item} />
                        </Badge.Ribbon>
                      ) : (
                        <CoachSeenAthlete item={item} />
                      )}
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
export default AthletePendingCoach;
