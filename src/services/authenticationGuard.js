import React, { useEffect } from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import { GetUserDetails } from "../store/authenticationSlices.js";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";

const GuardedRoute = ({ component: Component, auth, ...rest }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  useEffect(() => {}, [user]);
  let sayac = 0;
  useEffect(async () => {
    if (user) {
      dispatch(GetUserDetails());
    }
  }, []);

  return user ? <Component /> : <Navigate to="/" />;
};

export default GuardedRoute;
