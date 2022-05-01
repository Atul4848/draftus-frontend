import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAssignedCurriculum,
  loadMoreAssignedCurriculum,
} from "../../redux/actions/curriculumAction";
import { Skeleton, Card, Col, Row, Button, Spin, Badge } from "antd";
import { useHistory } from "react-router-dom";
import moment from "moment-timezone";
import { AUSTRALIA, YOUTUBE_LINK } from "../../constants/ActionType";
import { AiFillDelete, AiOutlineDoubleLeft } from "react-icons/ai";
import { CalendarOutlined, ReloadOutlined } from "@ant-design/icons";

function AssignedCurriculum() {
  let history = useHistory();
  const dispatch = useDispatch();
  const curriculum_detail = useSelector((state) => state.curriculum_detail);
  const { get_Assigned_Curriculum, assignedCurriculumLoadMoreURL } =
    curriculum_detail;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurriculumData();
  }, []);

  const getCurriculumData = async () => {
    await dispatch(getAssignedCurriculum());
    setLoading(false);
  };

  return (
    <div className="newContnainer ">
      <div className="back-btn-bb">
        <Button type="link" onClick={() => history.push("/profile")}>
          <AiOutlineDoubleLeft />
        </Button>
        <h2 className="themestek-custom-heading">Curriculum</h2>
      </div>
      {/*  <h2 className="themestek-custom-heading">Curriculum</h2> */}

      {loading ? (
        <Spin className="loader-ld" />
      ) : (
        <>
          {get_Assigned_Curriculum != "" ? (
            <div>
              <Row gutter={[10, 10]}>
                {get_Assigned_Curriculum &&
                  get_Assigned_Curriculum.map((item) => {
                    const youTubeUrl =
                      (item && item.curriculum && item.curriculum.video_link) ||
                      "";
                    const splitted = youTubeUrl.split("/");
                    /* const updatedURL =
                      YOUTUBE_LINK + splitted[splitted.length - 1]; */
                    var updatedURL = "";
                    const updatedYoutubeUrl = splitted[splitted.length - 1];

                    if (updatedYoutubeUrl.includes("=")) {
                      const splittedUrl = updatedYoutubeUrl.split("=");

                      updatedURL =
                        YOUTUBE_LINK + splittedUrl[splittedUrl.length - 1];
                    } else {
                      updatedURL = YOUTUBE_LINK + splitted[splitted.length - 1];
                    }
                    return (
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <div className="curriculum-video-cvv">
                          <Badge.Ribbon
                            text={
                              <>
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
                              </>
                            }
                          >
                            <Card>
                              <Row gutter={[10, 10]}>
                                <Col xs={24} sm={24} md={8} lg={8}>
                                  <iframe
                                    width="auto"
                                    height="auto"
                                    src={updatedURL}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  ></iframe>
                                </Col>
                                <Col xs={24} sm={24} md={16} lg={16}>
                                  <div className="curriculum-video-desci">
                                    <h2>
                                      {item &&
                                      item.curriculum &&
                                      item.curriculum.name !== ""
                                        ? item.curriculum.name
                                        : "N/A"}
                                    </h2>
                                    <p>
                                      {item &&
                                      item.curriculum &&
                                      item.curriculum.description !== ""
                                        ? item.curriculum.description
                                        : "N/A"}
                                    </p>
                                    <b>
                                      <CalendarOutlined /> {""}
                                      {moment
                                        .tz(item.created_at, AUSTRALIA)
                                        .format("LLLL")}
                                    </b>
                                  </div>
                                </Col>
                              </Row>
                            </Card>
                          </Badge.Ribbon>
                        </div>
                      </Col>
                    );
                  })}
              </Row>
              {assignedCurriculumLoadMoreURL != null ? (
                <Row gutter={[10, 10]}>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div
                      className="Loadmore-btn-lb"
                      style={{
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        onClick={() =>
                          dispatch(
                            loadMoreAssignedCurriculum(
                              assignedCurriculumLoadMoreURL
                            )
                          )
                        }
                      >
                        <ReloadOutlined /> Load More
                      </Button>
                    </div>
                  </Col>
                </Row>
              ) : null}
            </div>
          ) : (
            <div className="nofound0">
              No Data <span> Found !</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default AssignedCurriculum;
