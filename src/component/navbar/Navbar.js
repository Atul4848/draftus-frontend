import React from "react";
import { Menu, Col, Row } from "antd";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HeaderLogin from "./HeaderLogin";
import { logout } from "../../redux/actions/userAuthAction";
import { useHistory } from "react-router-dom";

function Header() {
  let history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);

  const logoutSession = async () => {
    await dispatch(logout());
    history.push("/login");
  };
  return (
    <div className="header_nav">
      <Row gutter={[10, 10]}>
        <Col xs={7} sm={7} md={6} lg={6}>
          {isAuth ? (
            <Link to="/profile">
              <div className="headerlogo">
                <img src={Logo} alt="logo" />
              </div>
            </Link>
          ) : (
            <Link to="/">
              <div className="headerlogo">
                <img src={Logo} alt="logo" />
              </div>
            </Link>
          )}
        </Col>

        <Col
          xs={17}
          sm={17}
          md={18}
          lg={18}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div className="navsec">
            <Menu mode="horizontal">
              <Menu.Item key="1">
                <HeaderLogin />
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/contact" className="text-decoration-none">
                  <div className="iconsNav">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    <span>Contact Us</span>
                  </div>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/about" className="text-decoration-none">
                  <div className="iconsNav">
                    <i className="fa fa-id-badge" aria-hidden="true"></i>
                    <span> About Us</span>
                  </div>
                </Link>
              </Menu.Item>

              {/* <Menu.Item key="5">
                <Link href="/register">Register</Link>
              </Menu.Item> */}
              {isAuth ? (
                <Menu.Item key="6">
                  <div onClick={logoutSession}>
                    <div className="iconsNav">
                      <i className="fa fa-sign-out" aria-hidden="true"></i>
                      <span> Logout</span>
                    </div>
                  </div>
                </Menu.Item>
              ) : null}
            </Menu>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default Header;
