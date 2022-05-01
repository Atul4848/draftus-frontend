import React, { useEffect } from "react";
import { Collapse, Skeleton, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { coachViewForum } from "../../redux/actions/forumAction";
import { Link } from "react-router-dom";
import ShowMoreText from "react-show-more-text";

function CoachForums() {
  const { Panel } = Collapse;

  const dispatch = useDispatch();
  const forum = useSelector((state) => state.forum);
  const { coach_View_Forum, loading } = forum;

  useEffect(() => {
    dispatch(coachViewForum());
  }, []);

  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <h3 className="activecoaches d-flex justify-content-start">
            My Forum
          </h3>
          <div className="coachesflied">
            {coach_View_Forum == "" ? (
              <div className="nofound0">
                No Data <span> Found !</span>
              </div>
            ) : (
              <Collapse ghost>
                {coach_View_Forum.map((item) => (
                  <Panel
                    header={
                      <span>
                        {item && item.title != "" ? item.title : "N/A"}
                      </span>
                    }
                    key={item ? item.id : "1"}
                  >
                    <div className="drpdownclas">
                      <span>
                        <ShowMoreText
                          lines={3}
                          more="Show more"
                          less="Show less"
                          expanded={false}
                          truncatedEndingComponent={"..."}

                          //onClick={executeScroll}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                item && item.description != ""
                                  ? item.description
                                  : "N/A",
                            }}
                          ></div>
                        </ShowMoreText>
                      </span>
                    </div>
                    <Link to={"/profile/forum_details/" + item.id}>
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
export default CoachForums;
