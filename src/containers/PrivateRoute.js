import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { tryLocalSignIn } from "../redux/actions/userAuthAction";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { isAuth, reloadFlag } = user;

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    await dispatch(tryLocalSignIn());
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuth && !reloadFlag) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
