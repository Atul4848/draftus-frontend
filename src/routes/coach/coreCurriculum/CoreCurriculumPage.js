import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurriculum,
  deleteCurriculum,
  assignCurriculum,
  loadMoreCurriculum,
} from "../../../redux/actions/curriculumAction";
import { get_Athlete } from "../../../redux/actions/coachAction";
import {
  Skeleton,
  Card,
  Col,
  Row,
  Button,
  Spin,
  Modal,
  Radio,
  Popconfirm,
} from "antd";
import { Link, useHistory } from "react-router-dom";
import moment from "moment-timezone";
import { AUSTRALIA, YOUTUBE_LINK } from "../../../constants/ActionType";
import { AiFillDelete, AiOutlineDoubleLeft } from "react-icons/ai";
import { CalendarOutlined, ReloadOutlined } from "@ant-design/icons";

function CoreCurriculumPage() {
  const [videoUrl, setURL] = useState("");
  let history = useHistory();
  const dispatch = useDispatch();
  const curriculum_detail = useSelector((state) => state.curriculum_detail);
  const { curriculum, curriculumLoadMoreURL } = curriculum_detail;
  const [loading, setLoading] = useState(true);

  const coach_detail = useSelector((state) => state.coach_detail);
  const { acceptedAthlete } = coach_detail;

  useEffect(() => {
    collectUserData();
  }, []);

  const collectUserData = async () => {
    await dispatch(get_Athlete());
  };

  const [recommend, setRecommend] = useState();
  const [curriculumId, setCurriculumId] = useState();

  const selectRecommend = (e) => {
    setRecommend(e.target.value);
  };

  useEffect(() => {
    getCurriculumData();
  }, []);

  const getCurriculumData = async () => {
    await dispatch(getCurriculum());
    setLoading(false);
  };

  const deleteData = async (id) => {
    await dispatch(deleteCurriculum(id));
    dispatch(getCurriculum());
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModalAthlete = (id) => {
    setIsModalVisible(true);
    setCurriculumId(id);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const IsRecommended = async () => {
    const newDatalogin = await {
      curriculum_id: curriculumId,

      athlete_id: recommend,
    };
    await dispatch(assignCurriculum(newDatalogin));

    setCurriculumId();
    setIsModalVisible(false);
    setRecommend();
  };
  function cancel(e) {
    console.log(e);
  }

  return (
    <div className="newContnainer ">
      <div className="back-btn-bb">
        <Button type="link" onClick={() => history.push("/profile")}>
          <AiOutlineDoubleLeft />
        </Button>
        <h2 className="themestek-custom-heading">Curriculum</h2>
        <div className="add-forum-af add-curriculum-acb">
          <Link to="/profile/curriculum/add_Curriculum">Add Curriculum </Link>
        </div>
      </div>
      {/*  <Button type="link" onClick={() => history.push("/profile")}>
        <AiOutlineDoubleLeft />
      </Button>
      <h2 className="themestek-custom-heading">Curriculum</h2> */}

      {loading ? (
        <Spin className="loader-ld" />
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
                  curriculum.map((item) => {
                    const youTubeUrl = item.video_link;
                    const splitted = youTubeUrl.split("/");
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
                                  <div className="btnedtdelte-corecui">
                                    <h2>{item.name}</h2>
                                    <div className="edit-delete">
                                      <Link
                                        to={
                                          "/profile/curriculum/edit-curriculum/" +
                                          item.id
                                        }
                                      >
                                        <Button>
                                          <i
                                            class="fa fa-pencil-square-o"
                                            aria-hidden="true"
                                          ></i>
                                        </Button>
                                      </Link>
                                      <Button>
                                        <Popconfirm
                                          title="Are you sure to delete this Curriculum?"
                                          onConfirm={() => deleteData(item.id)}
                                          onCancel={cancel}
                                          okText="Yes"
                                          cancelText="No"
                                        >
                                          <AiFillDelete />
                                        </Popconfirm>
                                      </Button>
                                    </div>
                                  </div>
                                  <p>{item.description}</p>
                                  <b>
                                    <CalendarOutlined /> {""}
                                    {moment
                                      .tz(item.created_at, AUSTRALIA)
                                      .format("LLLL")}
                                  </b>
                                </div>
                                <div className="btnedtdelte-corecui">
                                  <div
                                    className="btn-profil-t"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Button
                                      className="ant-btn ant-btn btn__profile1"
                                      onClick={() => showModalAthlete(item.id)}
                                    >
                                      Recommend
                                    </Button>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </Card>
                        </div>
                      </Col>
                    );
                  })}
                <Modal
                  title="Athlete "
                  visible={isModalVisible}
                  onCancel={handleCancel}
                  footer={null}
                  className="modelbox_mb"
                >
                  <div>
                    {loading ? (
                      <Spin size="large" className="spinner" />
                    ) : (
                      <>
                        {acceptedAthlete == "" ? (
                          <div className="nofound0">
                            No Data <span> Found !</span>
                          </div>
                        ) : (
                          <Radio.Group
                            name="radiogroup"
                            onChange={selectRecommend}
                            value={recommend}
                          >
                            {acceptedAthlete &&
                              acceptedAthlete.map((item) => (
                                <div className="form-check">
                                  <Radio value={item.athlete_id}>
                                    <span>
                                      {item &&
                                      item.user &&
                                      item.user.fname != ""
                                        ? item.user.fname
                                        : "n/a"}
                                    </span>
                                    <span> </span>
                                    <span>
                                      {item &&
                                      item.user &&
                                      item.user.lname != ""
                                        ? item.user.lname
                                        : "n/a"}
                                    </span>
                                  </Radio>
                                </div>
                              ))}
                          </Radio.Group>
                        )}
                      </>
                    )}
                  </div>
                  {recommend && acceptedAthlete != "" ? (
                    <div
                      className="btn-profil-t"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <Button
                        className="ant-btn ant-btn btn__profile1"
                        onClick={IsRecommended}
                      >
                        Recommend
                      </Button>
                    </div>
                  ) : null}
                </Modal>
                {curriculumLoadMoreURL != null ? (
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
                          dispatch(loadMoreCurriculum(curriculumLoadMoreURL))
                        }
                      >
                        <ReloadOutlined /> Load More
                      </Button>
                    </div>
                  </Col>
                ) : null}
              </Row>
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default CoreCurriculumPage;
