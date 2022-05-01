import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurriculum } from "../../redux/actions/curriculumAction";
import { Skeleton, Card, Col, Row, Button, Spin } from "antd";
import moment from "moment-timezone";
import { AUSTRALIA } from "../../constants/ActionType";

function CoreCurriculum() {
  const dispatch = useDispatch();
  const curriculum_detail = useSelector((state) => state.curriculum_detail);
  const { curriculum, loading } = curriculum_detail;
  console.log(curriculum);
  useEffect(() => {
    getCurriculumData();
  }, []);

  const getCurriculumData = async () => {
    await dispatch(getCurriculum());
  };

  /* const youtubeVideo=(video)=>{
   
      const youTubeUrl = video;
      const splitted = youTubeUrl.split("/");
      const updatedURL = YOUTUBE_LINK + splitted[splitted.length - 1];
      setURL(updatedURL);
 
  } */

  return (
    <div className="newContnainer ">
      <h2 className="themestek-custom-heading">Curriculum</h2>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          {curriculum == "" ? (
            <div className="nofound0">
              No Data <span> Found !</span>
            </div>
          ) : (
            <div>
              <Row gutter={[10, 10]}>
                {curriculum &&
                  curriculum.map((item) => (
                    <Col xs={24} sm={24} md={6} lg={6}>
                      <div className="curriculum-video-cvv">
                        <Card>
                          <iframe
                            width="auto"
                            height="auto"
                            src={item.video_link}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                          <div className="curriculum-video-desci">
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                            <b>
                              {moment
                                .tz(item.created_at, AUSTRALIA)
                                .format("LLLL")}
                            </b>
                          </div>
                        </Card>
                      </div>
                    </Col>
                  ))}
              </Row>
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default CoreCurriculum;
