import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Skeleton } from "antd";

function HeaderLogin() {
  const user = useSelector((state) => state.user);
  const { isAuth, userDetail, loading } = user;
  return (
    <div>
      {isAuth ? (
        <Link to="/profile" className="text-decoration-none">
          {loading ? (
            <Skeleton.Button />
          ) : (
            <div className="iconsNav">
              <i className="fa fa-user" aria-hidden="true"></i>
              <span>
                Hello,
                <span>
                  {" "}
                  {userDetail && userDetail.user != null
                    ? userDetail.user.fname
                    : "N/A"}
                </span>
              </span>
            </div>
          )}
        </Link>
      ) : (
        <Link to="/login" className="text-decoration-none">
          <div className="iconsNav">
            <i className="fa fa-sign-in" aria-hidden="true"></i>
            <span> Sign In</span>
          </div>
        </Link>
      )}
    </div>
  );
}
export default HeaderLogin;
