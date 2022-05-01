import React, { useEffect } from "react";
import { Collapse, Skeleton, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getRecommendForum } from "../../redux/actions/forumAction";
import { Link } from "react-router-dom";
import ShowMoreText from "react-show-more-text";

function AthleteRecommendedForum() {
  const { Panel } = Collapse;

  const dispatch = useDispatch();
  const forum = useSelector((state) => state.forum);
  const { get_recommend_Forum, loading } = forum;

  useEffect(() => {
    dispatch(getRecommendForum());
  }, []);

  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <h3 className="activecoaches d-flex justify-content-start">
            Recommended Forum
          </h3>
          <div className="coachesflied">
            {get_recommend_Forum &&
            get_recommend_Forum.recommend_threads == "" ? (
              <div className="nofound0">
                No Data <span> Found !</span>
              </div>
            ) : (
              <Collapse ghost>
                <>
                  {get_recommend_Forum.map((item) => (
                    <Panel
                      header={
                        <span>
                          {item &&
                          item.recommend_threads &&
                          item.recommend_threads.title != ""
                            ? item.recommend_threads.title
                            : "N/A"}
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
                                  item &&
                                  item.recommend_threads &&
                                  item.recommend_threads.description != ""
                                    ? item.recommend_threads.description
                                    : "N/A",
                              }}
                            ></div>
                          </ShowMoreText>
                        </span>
                      </div>
                      {item && item.recommend_threads == null ? null : (
                        <Link
                          to={
                            "/profile/athlete-view-coach-forum-detail/" +
                            item.recommend_threads.id
                          }
                        >
                          <div className="btnedu">
                            <Button>View Detail</Button>
                          </div>
                        </Link>
                      )}
                    </Panel>
                  ))}
                </>
              </Collapse>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default AthleteRecommendedForum;
