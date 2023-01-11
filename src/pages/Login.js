import React, { useRef, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../store/authenticationSlices";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log(values);
        const { email, password } = values;
        const user = { email, password };
        dispatch(loginUser(user));
      }}
    >
      {(formik) => (
        <Helmet title="Login">
          <CommonSection title="Login" />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

          <section>
            <Container>
              <Row>
                <Col lg="6" md="6" sm="12" className="m-auto text-center">
                  <form className="form mb-5" onSubmit={formik.handleSubmit}>
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
                    <button type="submit" className="addTOCart__btn">
                      Login
                    </button>
                  </form>
                  <Link to="/register">
                    Don't have an account? Create an account
                  </Link>
                </Col>
              </Row>
            </Container>
          </section>
        </Helmet>
      )}
    </Formik>
  );
};

export default Login;
