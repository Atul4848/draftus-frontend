import React, { useEffect } from "react";
import { Collapse, Skeleton, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { athleteRemoveByCoach } from "../../redux/actions/athleteAction";
import { Link } from "react-router-dom";

function AthleteRemoveByCoach() {
  const { Panel } = Collapse;

  const dispatch = useDispatch();
  const athlete_detail = useSelector((state) => state.athlete_detail);
  const { athlete_Removed_By_Coach, loading } = athlete_detail;
  console.log(athlete_Removed_By_Coach);
  useEffect(() => {
    dispatch(athleteRemoveByCoach());
  }, []);

  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <h3 className="activecoaches d-flex justify-content-start">
            Removed By Coach
          </h3>
          <div className="coachesflied">
            {athlete_Removed_By_Coach == "" ? (
              <div className="nofound0">
                No Data <span> Found !</span>
              </div>
            ) : (
              <Collapse ghost>
                {athlete_Removed_By_Coach.map((item) => (
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
                    key={item ? item.id : "1"}
                  >
                    <div className="drpdownclas">
                      <span>
                        {item && item.reject_message != ""
                          ? item.reject_message
                          : "N/A"}
                      </span>
                      <Link to={"/profile/coach_details/" + item.coach_id}>
                        <div className="btnedu">
                          <Button>View Detail</Button>
                        </div>
                      </Link>
                    </div>
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
export default AthleteRemoveByCoach;
