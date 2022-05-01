import React, { useEffect } from "react";
import { Button, Collapse, Radio, Skeleton } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { findCoachs, findCoach_id } from "../../../redux/actions/athleteAction";

function Find_Coach() {
  const dispatch = useDispatch();
  const athlete_detail = useSelector((state) => state.athlete_detail);
  const { loading, findCoach } = athlete_detail;

  useEffect(() => {
    collectUserData();
  }, []);

  const collectUserData = async () => {
    await dispatch(findCoachs());
  };
  const [value, setValue] = React.useState(1);

  const onChange = async (e) => {
    await dispatch(findCoach_id(e.target.value));
    /* console.log("radio checked", e.target.value); */
    setValue(e.target.value);
  };
  console.log(findCoach);
  return (
    <div>
      <h3 className="activecoaches d-flex justify-content-start">COACHES</h3>

      <div className="coachesflied">
        {loading ? (
          <Skeleton />
        ) : (
          <>
            {findCoach == "" ? (
              <div className="nofound0">
                No Data <span> Found !</span>
              </div>
            ) : (
              <Radio.Group name="radiogroup" onChange={onChange} value={value}>
                {findCoach &&
                  findCoach.map((item) => (
                    <div className="form-check">
                      <Radio value={item.id}>{item ? item.fname : "n/a"}</Radio>
                    </div>
                  ))}
              </Radio.Group>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default Find_Coach;
