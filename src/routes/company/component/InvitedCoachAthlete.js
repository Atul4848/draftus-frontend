import React, { useEffect } from "react";
import { Collapse, Skeleton, Badge } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { invitedAthleteCoach } from "../../../redux/actions/addCoachAction";
import { Link } from "react-router-dom";
import { COACH } from "../../../constants/ActionType";

function InvitedCoachAthlete() {
  const { Panel } = Collapse;
  const dispatch = useDispatch();
  const addCoach = useSelector((state) => state.addCoach);
  const { invited, loading } = addCoach;

  useEffect(() => {
    collectUserData();
  }, []);

  const collectUserData = async () => {
    await dispatch(invitedAthleteCoach());
  };

  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <h3 className="activecoaches d-flex justify-content-start">
            Invited
          </h3>
          <div className="coachesflied">
            {invited == "" ? (
              <div className="nofound0">
                No Data <span> Found !</span>
              </div>
            ) : (
              <Collapse ghost>
                {invited.map((item) => (
                  <>
                    <Panel
                      header={
                        <span>
                          <span>
                            {item && item.name != "" ? item.name : "N/A"}
                          </span>
                        </span>
                      }
                      key={item ? item.id : "1"}
                    >
                      {item && item.role == COACH ? (
                        <Badge.Ribbon text="Coach">
                          <>
                            <div className="drpdownclas">
                              <b> Name :</b>

                              <span>
                                {item && item.name != "" ? item.name : "N/A"}
                              </span>
                            </div>
                            <div className="drpdownclas">
                              <b> Email :</b>
                              <span>
                                {item && item.email != "" ? item.email : "N/A"}
                              </span>
                            </div>
                            <div className="drpdownclas">
                              <b> Contact :</b>
                              <span>
                                {item && item.phone != "" ? item.phone : "N/A"}
                              </span>
                            </div>
                          </>
                        </Badge.Ribbon>
                      ) : (
                        <Badge.Ribbon text="Athlete">
                          <>
                            <div className="drpdownclas">
                              <b> Name :</b>

                              <span>
                                {item && item.name != "" ? item.name : "N/A"}
                              </span>
                            </div>
                            <div className="drpdownclas">
                              <b> Email :</b>
                              <span>
                                {item && item.email != "" ? item.email : "N/A"}
                              </span>
                            </div>
                            <div className="drpdownclas">
                              <b> Contact :</b>
                              <span>
                                {item && item.phone != "" ? item.phone : "N/A"}
                              </span>
                            </div>
                          </>
                        </Badge.Ribbon>
                      )}
                    </Panel>
                  </>
                ))}
              </Collapse>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default InvitedCoachAthlete;
