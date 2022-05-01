import { Tag } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ATHLETE,
  COACH,
  COMPANY,
  UPLOAD_PIC,
} from "../../../constants/ActionType";
import logo from "../../../assets/logo1.png";
import { getMessage } from "../../../redux/actions/chatAction";

const MyContacts = ({ userDetail, setSelectedId, selectedId }) => {
  const dispatch = useDispatch();

  const athlete_detail = useSelector((state) => state.athlete_detail);
  const { my_Coach, adminInCoach } = athlete_detail;

  const coach_detail = useSelector((state) => state.coach_detail);
  const { acceptedAthlete, adminInAthlete, coach_Team } = coach_detail;

  const company_detail = useSelector((state) => state.company_detail);
  const { company_Coach, adminInCompanyCoach } = company_detail;

  const startConversation = async (id) => {
    await dispatch(getMessage(id));
    setSelectedId(id);
  };

  return (
    <div className="my-conversation-ncc">
      <div className="scroll-chat-sc">
        {userDetail && userDetail.user && userDetail.user.role === ATHLETE ? (
          <div>
            {my_Coach == "" ? (
              <div className="nofound0 nheight-no-nfs ">
                Contact not <span> Found !</span>
              </div>
            ) : (
              <>
                {adminInCoach &&
                  adminInCoach.map((item) => {
                    const bgColor = selectedId === item.id ? "#f8f8f8" : "";
                    return (
                      <div
                        className="chat-btm-cbms"
                        style={{ cursor: "pointer", backgroundColor: bgColor }}
                        onClick={() => startConversation(item.id)}
                      >
                        <div className="chatimg-cbms">
                          <img
                            src={
                              item &&
                              item.get_user_details &&
                              item.get_user_details.avatar != null
                                ? UPLOAD_PIC + item.get_user_details.avatar
                                : logo
                            }
                            alt="logo"
                          ></img>
                        </div>

                        <div className="chattext-cbms">
                          <div className="chattext-cbms-innerp">
                            <span>
                              <span>
                                {item && item.fname != "" ? item.fname : "N/A"}
                              </span>
                              <span> </span>
                              <span>
                                {item && item.lname != "" ? item.lname : "N/A"}
                              </span>
                            </span>
                            <p>
                              <Tag color="red">Admin</Tag>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {my_Coach &&
                  my_Coach.map((item) => (
                    <div
                      className="chat-btm-cbms"
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedId === item.coach_id ? "#f8f8f8" : "",
                      }}
                      onClick={() => startConversation(item.coach_id)}
                    >
                      <div className="chatimg-cbms">
                        <img
                          src={
                            item &&
                            item.coach_data &&
                            item.coach_data.get_user_details &&
                            item.coach_data.get_user_details.avatar != null
                              ? UPLOAD_PIC +
                                item.coach_data.get_user_details.avatar
                              : logo
                          }
                          alt="logo"
                        ></img>
                      </div>
                      <div className="chattext-cbms">
                        <div className="chattext-cbms-innerp">
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
                          <p>
                            <Tag color="blue">Coach</Tag>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        ) : null}

        {userDetail && userDetail.user && userDetail.user.role == COACH ? (
          <div>
            {acceptedAthlete == "" ? (
              <div className="nofound0 nheight-no-nf">
                Contacts not <span> Found !</span>
              </div>
            ) : (
              <>
                {adminInAthlete &&
                  adminInAthlete.map((item) => (
                    <div
                      className="chat-btm-cbms"
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedId === item.id ? "#f8f8f8" : "",
                      }}
                      onClick={() => startConversation(item.id)}
                    >
                      <div className="chatimg-cbms">
                        <img
                          src={
                            item &&
                            item.get_user_details &&
                            item.get_user_details.avatar != null
                              ? UPLOAD_PIC + item.get_user_details.avatar
                              : logo
                          }
                          alt="logo"
                        ></img>
                      </div>

                      <div className="chattext-cbms">
                        <div className="chattext-cbms-innerp">
                          <span>
                            <span>
                              {item && item.fname != "" ? item.fname : "N/A"}
                            </span>
                            <span> </span>
                            <span>
                              {item && item.lname != "" ? item.lname : "N/A"}
                            </span>
                          </span>
                          <p>
                            <Tag color="red">Admin</Tag>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                {acceptedAthlete &&
                  acceptedAthlete.map((item) => (
                    <div
                      className="chat-btm-cbms"
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedId === item.athlete_id ? "#f8f8f8" : "",
                      }}
                      onClick={() => startConversation(item.athlete_id)}
                    >
                      <div className="chatimg-cbms">
                        <img
                          src={
                            item &&
                            item.user &&
                            item.user.get_user_details &&
                            item.user.get_user_details.avatar != null
                              ? UPLOAD_PIC + item.user.get_user_details.avatar
                              : logo
                          }
                          alt="logo"
                        ></img>
                      </div>

                      <div className="chattext-cbms">
                        <div className="chattext-cbms-innerp">
                          <span>
                            <span>
                              {item && item.user && item.user.fname != ""
                                ? item.user.fname
                                : "N/A"}
                            </span>
                            <span> </span>
                            <span>
                              {item && item.user && item.user.lname != ""
                                ? item.user.lname
                                : "N/A"}
                            </span>
                          </span>
                          <p>
                            <Tag color="purple">Athlete</Tag>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                {coach_Team &&
                  coach_Team.map((item) => (
                    <div
                      className="chat-btm-cbms"
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedId === item.company_id ? "#f8f8f8" : "",
                      }}
                      onClick={() => startConversation(item.company_id)}
                    >
                      <div className="chatimg-cbms">
                        <img
                          src={
                            item &&
                            item.company_details &&
                            item.company_details.get_user_details &&
                            item.company_details.get_user_details.avatar != null
                              ? UPLOAD_PIC +
                                item.company_details.get_user_details.avatar
                              : logo
                          }
                          alt="logo"
                        ></img>
                      </div>

                      <div className="chattext-cbms">
                        <div className="chattext-cbms-innerp">
                          <span>
                            <span>
                              {item &&
                              item.company_details &&
                              item.company_details.fname != ""
                                ? item.company_details.fname
                                : "N/A"}
                            </span>
                            <span> </span>
                            <span>
                              {item &&
                              item.company_details &&
                              item.company_details.lname != ""
                                ? item.company_details.lname
                                : "N/A"}
                            </span>
                          </span>
                          <p>
                            <Tag color="green">Team</Tag>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        ) : null}

        {userDetail && userDetail.user && userDetail.user.role == COMPANY ? (
          <div>
            {company_Coach == "" ? (
              <div className="nofound0 nheight-no-nf ">
                Contacts not <span> Found !</span>
              </div>
            ) : (
              <>
                {adminInCompanyCoach &&
                  adminInCompanyCoach.map((item) => (
                    <div
                      className="chat-btm-cbms"
                      onClick={() => startConversation(item.id)}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedId === item.id ? "#f8f8f8" : "",
                      }}
                    >
                      <div className="chatimg-cbms">
                        <img
                          src={
                            item &&
                            item.get_user_details &&
                            item.get_user_details.avatar != null
                              ? UPLOAD_PIC + item.get_user_details.avatar
                              : logo
                          }
                          alt="logo"
                        />
                      </div>

                      <div className="chattext-cbms">
                        <div className="chattext-cbms-innerp">
                          <span>
                            <span>
                              {item && item.fname != "" ? item.fname : "N/A"}{" "}
                              {item && item.lname != "" ? item.lname : "N/A"}
                            </span>
                          </span>
                          <p>
                            <Tag color="red">Admin</Tag>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                {company_Coach &&
                  company_Coach.map((item) => (
                    <div
                      className="chat-btm-cbms"
                      onClick={() => startConversation(item.coach_id)}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedId === item.coach_id ? "#f8f8f8" : "",
                      }}
                    >
                      <div className="chatimg-cbms">
                        <img
                          src={
                            item &&
                            item.coach_details &&
                            item.coach_details.get_user_details &&
                            item.coach_details.get_user_details.avatar != null
                              ? UPLOAD_PIC +
                                item.coach_details.get_user_details.avatar
                              : logo
                          }
                          alt="logo"
                        ></img>
                      </div>
                      <div className="chattext-cbms">
                        <div className="chattext-cbms-innerp">
                          <span>
                            <span>
                              {item &&
                              item.coach_details &&
                              item.coach_details.fname != ""
                                ? item.coach_details.fname
                                : "N/A"}
                            </span>
                            <span> </span>
                            <span>
                              {item &&
                              item.coach_details &&
                              item.coach_details.lname != ""
                                ? item.coach_details.lname
                                : "N/A"}
                            </span>
                          </span>
                          <p>
                            <Tag color="blue">Coach</Tag>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MyContacts;
