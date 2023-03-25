import React, { useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import { GetUserDetails } from "../store/authenticationSlices.js";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";

const GuardedRoute = ({ component: Component, auth, ...rest }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log(user, "user authentication");
  }, [user]);
  let sayac = 0;
  useEffect(async () => {
    const token = Cookies.get("connect.sid");
    if (token) {
      if (!user && sayac === 0) {
        dispatch(GetUserDetails());
        sayac++;
      }
    }
  }, []);

  return user ? <Component /> : <Navigate to="/" />;
};

export default GuardedRoute;
