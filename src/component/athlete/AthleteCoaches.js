import React, { useEffect } from "react";
import { Collapse, Skeleton, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { myCoach } from "../../redux/actions/athleteAction";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function AthleteCoaches() {
  const history = useHistory();
  const { Panel } = Collapse;
  const dispatch = useDispatch();
  const athlete_detail = useSelector((state) => state.athlete_detail);
  const { my_Coach, loading } = athlete_detail;

  useEffect(() => {
    collectUserData();
  }, []);

  const collectUserData = async () => {
    await dispatch(myCoach());
  };

  const redirect = () => {
    history.push("/profile/coach_details/" + my_Coach.coach_id);
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
            {my_Coach == "" ? (
              <div className="nofound0">
                No Data <span> Found !</span>
              </div>
            ) : (
              <Collapse ghost>
                {my_Coach &&
                  my_Coach.map((item) => (
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
                      <div className="drpdownclas">
                        <b> Name :</b>
                        <Link to={"/profile/coach_details/" + item.coach_id}>
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
                        </Link>
                      </div>
                      <div className="drpdownclas">
                        <b> Email :</b>
                        <span>
                          {item &&
                          item.coach_data &&
                          item.coach_data.email != ""
                            ? item.coach_data.email
                            : "N/A"}
                        </span>
                      </div>
                      <div className="drpdownclas">
                        <b> Contact :</b>
                        <span>
                          {item &&
                          item.coach_data &&
                          item.coach_data.get_user_details != ""
                            ? item.coach_data.get_user_details.phone
                            : "N/A"}
                        </span>
                      </div>
                      <Link to={"/profile/coach_details/" + item.coach_id}>
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
export default AthleteCoaches;
