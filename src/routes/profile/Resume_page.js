import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getResume } from "../../redux/actions/resumeAction";
import { Spin } from "antd";
import moment from "moment";
import { UserProfile } from "../../redux/actions/userAuthAction";

function Resume_page() {
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);
  const { get_Resume, loading } = resume;
  const userDetails = useSelector((state) => state.user);
  const { userDetail, isAuth } = userDetails;
  console.log(get_Resume);
  useEffect(() => {
    collectUserData();
  }, []);
  useEffect(() => {
    if (isAuth) {
      collectUserDataProfile();
    }
  }, [isAuth]);

  const collectUserDataProfile = async () => {
    await dispatch(UserProfile());
  };

  const collectUserData = async () => {
    await dispatch(getResume());
  };
  return (
    <div>
      <h1>Resume </h1>
      <Link to="/profile/resume/create-resume">ADD RESUME</Link>
      {loading ? (
        <Spin className="loader-ld" />
      ) : (
        <div>
          {get_Resume == null ? (
            "Create Your Resume"
          ) : (
            <>
              <div className="profileinform">
                <b>Name :</b>
                <span>
                  <p>
                    {userDetail && userDetail.user != null
                      ? userDetail.user.fname
                      : "N/A"}
                  </p>
                  <p>
                    {userDetail && userDetail.user != null
                      ? userDetail.user.lname
                      : "N/A"}
                  </p>
                </span>
              </div>
              <div className="profileinform">
                <b>Email :</b>
                <span>
                  {userDetail && userDetail.user != null
                    ? userDetail.user.email
                    : "N/A"}
                </span>
              </div>
              <div className="profileinform">
                <b>Contact :</b>
                <span>
                  {userDetail && userDetail.user_details != null
                    ? userDetail.user_details.phone
                    : "N/A"}
                </span>
              </div>
              <div>
                <h1>Education</h1>
                {get_Resume &&
                  get_Resume.education &&
                  get_Resume.education.map((item) => (
                    <div>
                      <div className="profileinform">
                        <b>Institute :</b>
                        <span>
                          {item && item.institute != ""
                            ? item.institute
                            : "N/A"}
                        </span>
                      </div>
                      <div className="profileinform">
                        <b>Name :</b>
                        <span>
                          {item && item.name != "" ? item.name : "N/A"}
                        </span>
                      </div>
                      <div className="profileinform">
                        <b>Grade :</b>
                        <span>
                          {item && item.grade != "" ? item.grade : "N/A"}
                        </span>
                      </div>
                      <div className="profileinform">
                        <b>Start Date :</b>
                        <span>
                          {moment(
                            item && item.start_date != ""
                              ? item.start_date
                              : "N/A"
                          ).format("l")}
                        </span>
                      </div>
                      <div className="profileinform">
                        <b>End Date :</b>
                        <span>
                          {moment(
                            item && item.end_date != "" ? item.end_date : "N/A"
                          ).format("l")}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
              <div>
                <h1>Experience</h1>
                {get_Resume &&
                  get_Resume.work &&
                  get_Resume.work.map((item) => (
                    <div>
                      <div className="profileinform">
                        <b>Company Name :</b>
                        <span>
                          {item && item.company_name != ""
                            ? item.company_name
                            : "N/A"}
                        </span>
                      </div>
                      <div className="profileinform">
                        <b>Job Title :</b>
                        <span>
                          {item && item.job_title != ""
                            ? item.job_title
                            : "N/A"}
                        </span>
                      </div>

                      <div className="profileinform">
                        <b>Start Date :</b>
                        <span>
                          {moment(
                            item && item.start_date != ""
                              ? item.start_date
                              : "N/A"
                          ).format("l")}
                        </span>
                      </div>
                      <div className="profileinform">
                        <b>End Date :</b>
                        <span>
                          {moment(
                            item && item.end_date != "" ? item.end_date : "N/A"
                          ).format("l")}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
              <div>
                <h1>Social Media</h1>
                {get_Resume &&
                  get_Resume.social_media &&
                  get_Resume.social_media.map((item) => (
                    <div>
                      <div className="profileinform">
                        <b>Social Media Name :</b>
                        <span>
                          {item && item.name != "" ? item.name : "N/A"}
                        </span>
                      </div>
                      <div className="profileinform">
                        <b>Social Media Link :</b>
                        <span>
                          {item && item.link != "" ? item.link : "N/A"}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="profileinform">
                <b>Summary :</b>
                <span>
                  {get_Resume && get_Resume.summary != null
                    ? get_Resume.summary
                    : "N/A"}
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
export default Resume_page;
