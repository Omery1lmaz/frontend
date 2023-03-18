import React, { useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { RegisterUser } from "../store/authenticationSlices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/login.css";
import ButtonSpinner from "../components/UI/spinners/spinner";

const Register = () => {
  const validate = Yup.object({
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),

    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });

  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isSuccess) {
      toast.success("Emailinizi Onaylayınız");
    }
  }, [isSuccess]);

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        const { name, email, password } = values;
        const user = { email, password, name };

        dispatch(RegisterUser(user));
      }}
    >
      {(formik) => (
        <Helmet title="Signup">
          <div className="buble"></div>
          <div className="vawe">
            <Container className="login-container">
              <div className="right-side"></div>
              <Row className="login-row">
                <Col lg="6" md="6" sm="12" className="m-auto text-center w-100">
                  <h3 className="login-text">Register</h3>
                  <form
                    className="form mb-5 login-form w-60"
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="form__group">
                      <input
                        type="text"
                        id="name"
                        placeholder="Enter a name"
                        autoComplete="off"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.name && formik.touched.name ? (
                        <div class="error">* {formik.errors.name}</div>
                      ) : null}
                    </div>
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
                    <div className="form__group">
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

                    <div className="d-flex flex-column align-items-center">
                      <button
                        disabled={isLoading}
                        type="submit"
                        className="login-button w-100"
                      >
                        {isLoading ? <ButtonSpinner /> : <span>Sign Up</span>}
                      </button>
                      <span className="login-create-acc">
                        <Link to="/login">Already have an account? Login </Link>
                      </span>
                    </div>
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

export default Register;
