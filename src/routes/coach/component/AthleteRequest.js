import React, { useEffect } from "react";
import { Button, Collapse, Radio, Skeleton } from "antd";

import { useSelector, useDispatch } from "react-redux";
import {
  get_Requested_Athlete,
  findAthlete_id,
} from "../../../redux/actions/coachAction";

function AthleteRequest() {
  const dispatch = useDispatch();
  const coach_detail = useSelector((state) => state.coach_detail);
  const { loading, getRequestedAthlete } = coach_detail;

  useEffect(() => {
    collectUserData();
  }, []);

  const collectUserData = async () => {
    await dispatch(get_Requested_Athlete());
  };
  const [value, setValue] = React.useState(1);

  const onChange = async (e) => {
    await dispatch(findAthlete_id(e.target.value));
    /* console.log("radio checked", e.target.value); */
    setValue(e.target.value);
  };

  return (
    <div>
      <h3 className="activecoaches d-flex justify-content-start">
        ATHLETE PROFILE
      </h3>

      <div className="coachesflied">
        {loading ? (
          <Skeleton />
        ) : (
          <>
            {getRequestedAthlete != "" ? (
              <Radio.Group name="radiogroup" onChange={onChange} value={value}>
                {getRequestedAthlete &&
                  getRequestedAthlete.map((item) => (
                    <div className="form-check">
                      <Radio value={item ? item.athlete_id : null}>
                        {item ? item.user.fname : "n/a"}
                      </Radio>
                    </div>
                  ))}
              </Radio.Group>
            ) : (
              <div className="nofound0">
                No Data <span> Found !</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default AthleteRequest;
