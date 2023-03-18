import React, { useRef, useEffect, useState, CSSProperties } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../store/authenticationSlices";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";
import ButtonSpinner from "../components/UI/spinners/spinner";
const Login = () => {
  const token = Cookies.get("connect.sid");
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    user && navigate("/");
  }, [user]);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        console.log(values);
        const { email, password } = values;
        const user = { email, password };
        dispatch(loginUser(user));
      }}
    >
      {(formik) => (
        <Helmet title="Login">
          <div className="buble"></div>
          <div className="vawe">
            <Container className="login-container">
              <div className="right-side"></div>
              <Row className="login-row">
                <Col lg="6" md="6" sm="12" className="m-auto text-center w-100">
                  <h3 className="login-text">Login</h3>
                  <form
                    className="form mb-5 login-form w-60"
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="form__group">
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter a valid email address"
                        autoComplete="off"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.email && formik.touched.email ? (
                        <div class="error">* {formik.errors.email}</div>
                      ) : null}
                    </div>
                    <div
                      className="form__group"
                      style={{ marginBottom: "5px" }}
                    >
                      <input
                        type="password"
                        id="password"
                        autoComplete="off"
                        placeholder="Enter password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.password && formik.touched.password ? (
                        <div class="error">* {formik.errors.password}</div>
                      ) : null}
                    </div>
                    <div className="d-flex flex-column align-items-end">
                      <span>
                        <a href="/reset-password" className="login-create-acc">
                          Forget Password
                        </a>
                      </span>
                      <button
                        disabled={isLoading}
                        type="submit"
                        className="login-button w-100"
                      >
                        {isLoading ? <ButtonSpinner /> : <span>Login</span>}
                      </button>
                    </div>
                    <span className="login-create-acc">
                      <Link to="/register">
                        Don't have an account? Create an account
                      </Link>
                    </span>
                  </form>
                </Col>
              </Row>
            </Container>
          </div>
        </Helmet>
      )}
    </Formik>
  );
};

export default Login;
